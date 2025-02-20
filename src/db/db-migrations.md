# DB Migrations

Keepings notes as this is confusing AF

To migrate to the prod DB, use:

npx wrangler d1 migrations apply wes-bos-social-cache --remote

To get a local copy of local data:

TODO

To upload local SQL remote:

npx wrangler d1 execute wes-bos-social-cache --remote --file=db.sql
