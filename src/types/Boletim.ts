/** Estrutura dos itens */
export type Boletim = {
  year: 2025 | 2024;
  /** número do boletim, ex: "04", "21" */
  number: string;
  /** data exibida (BR), ex: "04/07/2025" */
  dateBR: string;
  title?: string; // opcional, se quiser customizar o texto
  href: string;
};