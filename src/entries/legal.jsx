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
        <article className="contenedor max-w-3xl py-16 sm:py-20">
          <h1 className="text-3xl text-ink sm:text-4xl">{documento.titulo}</h1>
          <p className="mt-3 text-sm text-muted">
            Última actualización: {documento.actualizado}
          </p>

          {documento.secciones.map((seccion) => (
            <section key={seccion.titulo} className="mt-10">
              <h2 className="text-xl text-ink">{seccion.titulo}</h2>

              {seccion.parrafos?.map((parrafo) => (
                <p key={parrafo} className="mt-4 text-base leading-relaxed text-muted">
                  {parrafo}
                </p>
              ))}

              {seccion.datos && (
                <dl className="mt-4 divide-y divide-ink/10 border-y border-ink/10">
                  {seccion.datos.map((dato) => (
                    <div key={dato.clave} className="flex flex-col gap-1 py-3 sm:flex-row sm:gap-4">
                      <dt className="w-48 shrink-0 text-sm font-medium text-ink">
                        {dato.clave}
                      </dt>
                      <dd className="text-base text-muted">
                        {dato.href ? (
                          <a href={dato.href} className="text-accent underline">
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
                <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-relaxed text-muted">
                  {seccion.lista.map((elemento) => (
                    <li key={elemento}>{elemento}</li>
                  ))}
                </ul>
              )}

              {seccion.parrafosFinales?.map((parrafo) => (
                <p key={parrafo} className="mt-4 text-base leading-relaxed text-muted">
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
