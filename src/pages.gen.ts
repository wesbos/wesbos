// deno-fmt-ignore-file
// biome-ignore format: generated types do not need formatting
// prettier-ignore
import type { PathsForPages, GetConfigResponse } from 'waku/router';

// prettier-ignore
import type { getConfig as File_404_getConfig } from './pages/404';
// prettier-ignore
import type { getConfig as File_SlugIndex_getConfig } from './pages/[slug]/index';
// prettier-ignore
import type { getConfig as File_Root_getConfig } from './pages/_root';
// prettier-ignore
import type { getConfig as File_About_getConfig } from './pages/about';
// prettier-ignore
import type { getConfig as File_BlogPageIndex_getConfig } from './pages/blog/[page]/index';
// prettier-ignore
import type { getConfig as File_BlogIndex_getConfig } from './pages/blog/index';
// prettier-ignore
import type { getConfig as File_ContactIndex_getConfig } from './pages/contact/index';
// prettier-ignore
import type { getConfig as File_Courses_getConfig } from './pages/courses';
// prettier-ignore
import type { getConfig as File_Index_getConfig } from './pages/index';
// prettier-ignore
import type { getConfig as File_JavascriptSectionSlug_getConfig } from './pages/javascript/[section]/[slug]';
// prettier-ignore
import type { getConfig as File_JavascriptIndex_getConfig } from './pages/javascript/index';
// prettier-ignore
import type { getConfig as File_OgIndex_getConfig } from './pages/og/index';
// prettier-ignore
import type { getConfig as File_PrivacyIndex_getConfig } from './pages/privacy/index';
// prettier-ignore
import type { getConfig as File_SpeakingAndTrainingIndex_getConfig } from './pages/speaking-and-training/index';
// prettier-ignore
import type { getConfig as File_TempIndex_getConfig } from './pages/temp/index';
// prettier-ignore
import type { getConfig as File_TermsIndex_getConfig } from './pages/terms/index';
// prettier-ignore
import type { getConfig as File_TipSlug_getConfig } from './pages/tip/[slug]';
// prettier-ignore
import type { getConfig as File_TipsPageIndex_getConfig } from './pages/tips/[page]/index';
// prettier-ignore
import type { getConfig as File_TipsIndex_getConfig } from './pages/tips/index';

// prettier-ignore
type Page =
| ({ path: '/404' } & GetConfigResponse<typeof File_404_getConfig>)
| ({ path: '/[slug]' } & GetConfigResponse<typeof File_SlugIndex_getConfig>)
| ({ path: '/_root' } & GetConfigResponse<typeof File_Root_getConfig>)
| ({ path: '/about' } & GetConfigResponse<typeof File_About_getConfig>)
| ({ path: '/blog/[page]' } & GetConfigResponse<typeof File_BlogPageIndex_getConfig>)
| ({ path: '/blog' } & GetConfigResponse<typeof File_BlogIndex_getConfig>)
| ({ path: '/contact' } & GetConfigResponse<typeof File_ContactIndex_getConfig>)
| ({ path: '/courses' } & GetConfigResponse<typeof File_Courses_getConfig>)
| ({ path: '/' } & GetConfigResponse<typeof File_Index_getConfig>)
| ({ path: '/javascript/[section]/[slug]' } & GetConfigResponse<typeof File_JavascriptSectionSlug_getConfig>)
| ({ path: '/javascript' } & GetConfigResponse<typeof File_JavascriptIndex_getConfig>)
| ({ path: '/og' } & GetConfigResponse<typeof File_OgIndex_getConfig>)
| ({ path: '/privacy' } & GetConfigResponse<typeof File_PrivacyIndex_getConfig>)
| ({ path: '/speaking-and-training' } & GetConfigResponse<typeof File_SpeakingAndTrainingIndex_getConfig>)
| ({ path: '/temp' } & GetConfigResponse<typeof File_TempIndex_getConfig>)
| ({ path: '/terms' } & GetConfigResponse<typeof File_TermsIndex_getConfig>)
| ({ path: '/tip/[slug]' } & GetConfigResponse<typeof File_TipSlug_getConfig>)
| ({ path: '/tips/[page]' } & GetConfigResponse<typeof File_TipsPageIndex_getConfig>)
| ({ path: '/tips' } & GetConfigResponse<typeof File_TipsIndex_getConfig>);

// prettier-ignore
declare module 'waku/router' {
  interface RouteConfig {
    paths: PathsForPages<Page>;
  }
  interface CreatePagesConfig {
    pages: Page;
  }
}
