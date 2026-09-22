import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../styles/index.css';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { avisoLegal, privacidad } from '../content/legal';

const DOCUMENTOS = {
  'aviso-legal': avisoLegal,
  privacidad,
};

/**
 * Ambas paginas legales comparten esta unica entrada. El HTML indica cual renderizar
 * con data-documento, de modo que Header y Footer no se dupliquen entre paginas: es
 * justo donde viven los enlaces obligatorios del principio XII.
 */
function PaginaLegal({ documento }) {
  return (
    <>
      <Header base="/" />
      <main data-inert-target className="pt-[var(--header-h)]">
        <article className="contenedor max-w-3xl py-section">
          <h1 className="text-fs-700 text-fg">{documento.titulo}</h1>
          <p className="mt-5 font-mono text-fs-100 uppercase tracking-[0.16em] text-fg-mute">
            Última actualización: {documento.actualizado}
          </p>

          {documento.secciones.map((seccion) => (
            <section key={seccion.titulo} className="mt-10">
              <h2 className="text-fs-500 text-fg">{seccion.titulo}</h2>

              {seccion.parrafos?.map((parrafo) => (
                <p key={parrafo} className="mt-5 text-fs-300 leading-relaxed text-fg-dim">
                  {parrafo}
                </p>
              ))}

              {seccion.datos && (
                <dl className="mt-5 divide-y divide-border border-y border-border">
                  {seccion.datos.map((dato) => (
                    <div key={dato.clave} className="flex flex-col gap-1 py-3 sm:flex-row sm:gap-4">
                      <dt className="w-48 shrink-0 font-mono text-fs-100 uppercase tracking-[0.16em] text-fg-mute">
                        {dato.clave}
                      </dt>
                      <dd className="text-fs-300 text-fg">
                        {dato.href ? (
                          <a href={dato.href} className="text-accent-2 underline underline-offset-2">
                            {dato.valor}
                          </a>
                        ) : (
                          dato.valor
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}

              {seccion.lista && (
                <ul className="mt-5 list-disc space-y-2 pl-6 text-fs-300 leading-relaxed text-fg-dim">
                  {seccion.lista.map((elemento) => (
                    <li key={elemento}>{elemento}</li>
                  ))}
                </ul>
              )}

              {seccion.parrafosFinales?.map((parrafo) => (
                <p key={parrafo} className="mt-5 text-fs-300 leading-relaxed text-fg-dim">
                  {parrafo}
                </p>
              ))}
            </section>
          ))}
        </article>
      </main>
      <Footer />
    </>
  );
}

const raiz = document.getElementById('root');
const documento = DOCUMENTOS[raiz.dataset.documento];

if (!documento) {
  throw new Error(
    `legal.jsx: data-documento="${raiz.dataset.documento}" no corresponde a ningun texto legal.`
  );
}

createRoot(raiz).render(
  <StrictMode>
    <PaginaLegal documento={documento} />
  </StrictMode>
);
