import test from "node:test";
import assert from "node:assert/strict";
import { onRequest } from "../functions/api/contact.js";

const valid = () => ({
  nombre: "Cliente prueba",
  email: "cliente@example.com",
  mensaje: "Necesito una web para mi negocio.",
  consentimiento: true,
  website: "",
  ts: Date.now() - 5000,
});
const request = (data, env = {}) =>
  onRequest({
    request: new Request("https://jddlabs.dev/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json", Origin: "https://jddlabs.dev" },
      body: JSON.stringify(data),
    }),
    env,
  });

test("rechaza campos inválidos y consentimiento ausente", async () => {
  const response = await request({});
  assert.equal(response.status, 400);
  assert.deepEqual(Object.keys((await response.json()).errores), [
    "nombre",
    "email",
    "mensaje",
    "consentimiento",
  ]);
});
test("el honeypot descarta sin llamar al proveedor", async () => {
  assert.equal((await request({ ...valid(), website: "spam" })).status, 200);
});
test("un formulario válido sin configuración informa del error", async () => {
  assert.equal((await request(valid())).status, 500);
});
test("envía solo los campos acordados y escapa el contenido HTML", async () => {
  const original = globalThis.fetch;
  let payload;
  globalThis.fetch = async (_url, options) => {
    payload = JSON.parse(options.body);
    return new Response("{}", { status: 200 });
  };
  try {
    const response = await request(
      {
        ...valid(),
        mensaje: "Texto <script>alert(1)</script>",
        telefono: "no incluir",
      },
      { RESEND_API_KEY: "test-only" },
    );
    assert.equal(response.status, 200);
    assert.equal(payload.reply_to, "cliente@example.com");
    assert(!payload.html.includes("<script>"));
    assert(payload.html.includes("&lt;script&gt;"));
    assert(!payload.text.includes("no incluir"));
  } finally {
    globalThis.fetch = original;
  }
});
test("un fallo del proveedor no devuelve éxito", async () => {
  const original = globalThis.fetch;
  globalThis.fetch = async () => new Response("unavailable", { status: 503 });
  try {
    assert.equal(
      (await request(valid(), { RESEND_API_KEY: "test-only" })).status,
      500,
    );
  } finally {
    globalThis.fetch = original;
  }
});

test('rechaza origen externo, formatos no JSON y estructuras inválidas', async () => {
 for (const [headers, body, expected] of [
  [{Origin:'https://evil.example','Content-Type':'application/json'},JSON.stringify(valid()),403],
  [{'Content-Type':'application/json'},JSON.stringify(valid()),403],
  [{Origin:'https://jddlabs.dev','Content-Type':'text/plain'},JSON.stringify(valid()),415],
  [{Origin:'https://jddlabs.dev','Content-Type':'application/json'},'[]',400],
  [{Origin:'https://jddlabs.dev','Content-Type':'application/json'},'null',400],
  [{Origin:'https://jddlabs.dev','Content-Type':'application/json'},'{',400],
  [{Origin:'https://jddlabs.dev','Content-Type':'application/json'},JSON.stringify({mensaje:'x'.repeat(17000)}),413],
 ]) {
  const response=await onRequest({request:new Request('https://jddlabs.dev/api/contact',{method:'POST',headers,body}),env:{}});
  assert.equal(response.status,expected);
 }
});
test('rechaza inyección de cabeceras por nombre o correo', async () => {
 assert.equal((await request({...valid(),nombre:'Nombre\r\nBcc: victim@example.com'})).status,400);
 assert.equal((await request({...valid(),email:'a@example.com\r\nBcc: victim@example.com'})).status,400);
});
test('neutraliza HTML y atributos de XSS sin interpretar el contenido', async () => {
 const original=globalThis.fetch; let payload;
 globalThis.fetch=async (_,options)=>{payload=JSON.parse(options.body);return new Response('{}');};
 try {
  const response=await request({...valid(),nombre:'<img src=x onerror=alert(1)>',mensaje:'<svg onload=alert(1)> & "texto" <a href="javascript:alert(1)">enlace</a>'},{RESEND_API_KEY:'test-only'});
  assert.equal(response.status,200);
  assert(!payload.html.includes('<img')); assert(!payload.html.includes('<svg')); assert(!payload.html.includes('<a href='));
  assert(payload.html.includes('&lt;svg')); assert(payload.html.includes('&quot;'));
  assert.equal(response.headers.get('X-Content-Type-Options'),'nosniff');
  assert.equal(response.headers.get('Cache-Control'),'no-store');
 } finally {globalThis.fetch=original;}
});
