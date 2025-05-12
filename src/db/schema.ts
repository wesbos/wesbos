import type { BlueSkyPost } from '@/lib/socials/blueSkyFetcher';
import type { InstagramPost } from '@/lib/socials/instagramTypes';
import type { LinkedInPost } from '@/lib/socials/linkedInFetcher';
import type { TiktokDetails } from '@/lib/socials/tiktokFetcherTypes';
import type { TweetDetails } from '@/lib/socials/twitter-fetcher';
import type { SocialLinkType } from '@/utils/parseSocialLinks';
import { sql } from 'drizzle-orm';
import { index, int, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

type PostData = TweetDetails | TiktokDetails | LinkedInPost | BlueSkyPost | InstagramPost;
export const postsTable = sqliteTable(
  'posts',
  {
    id: int().primaryKey({ autoIncrement: true }),
    type: text().$type<SocialLinkType>(),
    url: text().notNull(),
    handle: text(),
    postId: text().notNull(),
    postData: text({ mode: 'json' }).$type<PostData>(),
    createdAt: integer({ mode: 'timestamp_ms' }).notNull().default(sql`(unixepoch() * 1000)`),
    updatedAt: integer({ mode: 'timestamp_ms' })
      .notNull()
      .default(sql`(unixepoch() * 1000)`)
      .$onUpdate(() => new Date()),
  },
  (table) => ({
    postIdIdx: index('post_id_idx').on(table.postId),
  }),
);

export type Post = typeof postsTable.$inferSelect;
