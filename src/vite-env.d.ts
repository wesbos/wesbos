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
  /** Injected by `vite-plugin-git-hash`; shown in the footer */
  readonly WAKU_GIT_COMMIT_HASH: string;
  /** Injected by Waku; different on every build. Used in response cache keys */
  readonly WAKU_BUILD_ID: string;
  /** Injected by `waku.config.ts`: 'true' when Cloudflare image resizing should be used */
  readonly IMAGE_CDN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
