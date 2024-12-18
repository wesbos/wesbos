import { TweetDetails } from '@/lib/twitter-fetcher';
import { sql } from 'drizzle-orm';
import { index, int, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
export const postsTable = sqliteTable("posts", {
  id: int().primaryKey({ autoIncrement: true }),
  type: text().notNull(),
  url: text().notNull(),
  handle: text(),
  postId: text().notNull(),
  postData: text({ mode: 'json' }).$type<TweetDetails>(),
  createdAt: integer({ mode: 'timestamp_ms' }).notNull().default(sql`(unixepoch() * 1000)`),
  updatedAt: integer({ mode: 'timestamp_ms' }).notNull().default(sql`(unixepoch() * 1000)`).$onUpdate(() => sql`(unixepoch() * 1000)`),
}, (table) => ({
    postIdIdx: index('post_id_idx').on(table.postId),
  })
);
