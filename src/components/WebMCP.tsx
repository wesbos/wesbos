'use client';

import { useEffect } from 'react';

type NavigatorWithModelContext = Navigator & {
  modelContext?: {
    provideContext?: (context: {
      tools: Array<{
        name: string;
        description: string;
        inputSchema: Record<string, unknown>;
        execute: (input: Record<string, unknown>) => Promise<Record<string, unknown>>;
      }>;
    }) => void;
  };
};

export function WebMCP() {
  useEffect(() => {
    const typedNavigator = navigator as NavigatorWithModelContext;
    if (!typedNavigator.modelContext?.provideContext) {
      return;
    }

    typedNavigator.modelContext.provideContext({
      tools: [
        {
          name: 'find_blog_posts',
          description: 'Find posts by keyword on wesbos.com',
          inputSchema: {
            type: 'object',
            properties: {
              query: { type: 'string', description: 'Search phrase for posts' },
            },
            required: ['query'],
          },
          async execute({ query }) {
            const queryText = typeof query === 'string' ? query : '';
            const url = `/blog?search=${encodeURIComponent(queryText)}`;
            return { url, message: 'Open this URL to browse matching posts.' };
          },
        },
        {
          name: 'browse_hot_tips',
          description: 'Open the Hot Tips feed',
          inputSchema: {
            type: 'object',
            properties: {},
          },
          async execute() {
            return { url: '/tips', message: 'Open /tips for the latest tips.' };
          },
        },
      ],
    });
  }, []);

  return null;
}
