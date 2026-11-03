/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Default Vite env variables
  readonly MODE: string;
  readonly BASE_URL: string;
  readonly PROD: boolean;
  readonly DEV: boolean;

  // Custom env variables
  /** Injected by `vite-plugin-git-hash` */
  readonly SENTRY_RELEASE: string;
  /** Injected by `vite-plugin-git-hash` */
  readonly SENTRY_ENVIRONMENT: string;
  readonly VITE_GIT_COMMIT_HASH: string;
  /** Injected by `vite-plugin-git-hash` for cache keys in production */
  readonly WAKU_GIT_COMMIT_HASH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
