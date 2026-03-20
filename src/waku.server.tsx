import { fsRouter } from 'waku';
import adapter from 'waku/adapters/cloudflare';

const pages = import.meta.glob('./**/*.{tsx,ts}', { base: './pages' });

export default adapter(fsRouter(pages), {
  handlers: {
    // Define additional Cloudflare Workers handlers here
    // https://developers.cloudflare.com/workers/runtime-apis/handlers/
    // async queue(
    //   batch: MessageBatch,
    //   _env: Env,
    //   _ctx: ExecutionContext,
    // ): Promise<void> {
    //   for (const message of batch.messages) {
    //     console.log('Received', message);
    //   }
    // },
  } satisfies ExportedHandler<Env>,
});
