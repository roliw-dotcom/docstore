// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GtagFunction = (command: string, ...args: any[]) => void;

interface Window {
  gtag: GtagFunction;
  dataLayer: unknown[];
}
