/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Default Vite env variables
  readonly MODE: string;
  readonly BASE_URL: string;
  readonly PROD: boolean;
  readonly DEV: boolean;

  // Custom env variables
  readonly VITE_GIT_COMMIT_HASH: string;
  /** Injected by `vite-plugin-git-hash` for cache keys in production */
  readonly WAKU_GIT_COMMIT_HASH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
