import { Plugin } from 'vite';
import { execSync } from 'child_process';

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
        },
      };
    },
  };
}
