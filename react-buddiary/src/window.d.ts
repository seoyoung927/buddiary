export {};

declare global {
  interface Window {
    google: any; // 👈️ turn off type checking
  }
}
