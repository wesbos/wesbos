import { execSync } from 'node:child_process';
import type { Plugin } from 'vite';

/** The full commit SHA. Workers Builds provides it, and git covers local builds. */
export function getSentryRelease() {
  if (process.env.WORKERS_CI_COMMIT_SHA) return process.env.WORKERS_CI_COMMIT_SHA;
  try {
    return execSync('git rev-parse HEAD').toString().trim();
  } catch {
    return 'unknown';
  }
}

function getSentryEnvironment() {
  const branch = process.env.WORKERS_CI_BRANCH;
  if (!branch) return 'local';
  return branch === 'master' ? 'production' : 'preview';
}

export function gitHashPlugin(): Plugin {
  // Get the current Git commit hash
  const getCommitHash = () => {
    try {
      // Get the short version of the commit hash (7 characters)
      return execSync('git rev-parse --short HEAD').toString().trim();
    } catch (error) {
      console.error('Error getting Git commit hash:', error);
      return 'unknown';
    }
  };

  return {
    name: 'vite-plugin-git-hash',
    config: () => {
      const commitHash = getCommitHash();

      return {
        define: {
          'import.meta.env.WAKU_GIT_COMMIT_HASH': JSON.stringify(commitHash),
          'import.meta.env.SENTRY_RELEASE': JSON.stringify(getSentryRelease()),
          'import.meta.env.SENTRY_ENVIRONMENT': JSON.stringify(getSentryEnvironment()),
        },
      };
    },
  };
}
