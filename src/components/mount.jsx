import { createRoot, hydrateRoot } from 'react-dom/client';
export function mount(node) {
  const root = document.getElementById('root');
  if (root.hasChildNodes()) hydrateRoot(root, node);
  else createRoot(root).render(node);
}
