/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SPLINE_HERO_SCENE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
