// deno-fmt-ignore-file
// biome-ignore format: generated types do not need formatting
// prettier-ignore
import type { PathsForPages, GetConfigResponse } from 'waku/router';

// prettier-ignore
import type { getConfig as SlugIndex_getConfig } from './pages/[slug]/index';
// prettier-ignore
import type { getConfig as About_getConfig } from './pages/about';
// prettier-ignore
import type { getConfig as ContactIndex_getConfig } from './pages/contact/index';
// prettier-ignore
import type { getConfig as Courses_getConfig } from './pages/courses';
// prettier-ignore
import type { getConfig as Index_getConfig } from './pages/index';
// prettier-ignore
import type { getConfig as JavascriptSectionSlug_getConfig } from './pages/javascript/[section]/[slug]';
// prettier-ignore
import type { getConfig as JavascriptIndex_getConfig } from './pages/javascript/index';
// prettier-ignore
import type { getConfig as OgIndex_getConfig } from './pages/og/index';
// prettier-ignore
import type { getConfig as PrivacyIndex_getConfig } from './pages/privacy/index';
// prettier-ignore
import type { getConfig as SpeakingAndTrainingIndex_getConfig } from './pages/speaking-and-training/index';
// prettier-ignore
import type { getConfig as TermsIndex_getConfig } from './pages/terms/index';
// prettier-ignore
import type { getConfig as TipSlug_getConfig } from './pages/tip/[slug]';
// prettier-ignore
import type { getConfig as TipsIndex_getConfig } from './pages/tips/index';

// prettier-ignore
type Page =
| ({ path: '/[slug]' } & GetConfigResponse<typeof SlugIndex_getConfig>)
| { path: '/_root'; render: 'dynamic' }
| ({ path: '/about' } & GetConfigResponse<typeof About_getConfig>)
| { path: '/blog/[page]'; render: 'dynamic' }
| { path: '/blog'; render: 'dynamic' }
| ({ path: '/contact' } & GetConfigResponse<typeof ContactIndex_getConfig>)
| ({ path: '/courses' } & GetConfigResponse<typeof Courses_getConfig>)
| ({ path: '/' } & GetConfigResponse<typeof Index_getConfig>)
| ({ path: '/javascript/[section]/[slug]' } & GetConfigResponse<typeof JavascriptSectionSlug_getConfig>)
| ({ path: '/javascript' } & GetConfigResponse<typeof JavascriptIndex_getConfig>)
| ({ path: '/og' } & GetConfigResponse<typeof OgIndex_getConfig>)
| ({ path: '/privacy' } & GetConfigResponse<typeof PrivacyIndex_getConfig>)
| ({ path: '/speaking-and-training' } & GetConfigResponse<typeof SpeakingAndTrainingIndex_getConfig>)
| ({ path: '/terms' } & GetConfigResponse<typeof TermsIndex_getConfig>)
| ({ path: '/tip/[slug]' } & GetConfigResponse<typeof TipSlug_getConfig>)
| { path: '/tips/[page]'; render: 'dynamic' }
| ({ path: '/tips' } & GetConfigResponse<typeof TipsIndex_getConfig>);

// prettier-ignore
declare module 'waku/router' {
  interface RouteConfig {
    paths: PathsForPages<Page>;
  }
  interface CreatePagesConfig {
    pages: Page;
  }
}
  