PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_posts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`type` text,
	`url` text NOT NULL,
	`handle` text,
	`postId` text NOT NULL,
	`postData` text,
	`createdAt` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updatedAt` integer DEFAULT (unixepoch() * 1000) NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_posts`("id", "type", "url", "handle", "postId", "postData", "createdAt", "updatedAt") SELECT "id", "type", "url", "handle", "postId", "postData", "createdAt", "updatedAt" FROM `posts`;--> statement-breakpoint
DROP TABLE `posts`;--> statement-breakpoint
ALTER TABLE `__new_posts` RENAME TO `posts`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE INDEX `post_id_idx` ON `posts` (`postId`);