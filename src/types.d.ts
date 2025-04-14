declare module '*.jpg?meta' {
  export default {
    width: number,
    height: number,
    src: string,
  };
}

declare module '*.png?meta' {
  export default {
    width: number,
    height: number,
    src: string,
  };
}

declare module '*.jpeg?meta' {
  export default {
    width: number,
    height: number,
    src: string,
  };
}

declare module '*.webp?meta' {
  export default {
    width: number,
    height: number,
    src: string,
  };
}

declare module '*.avif?meta' {
  export default {
    width: number,
    height: number,
    src: string,
  };
}

declare module '*.mdx' {
  import type { MDXContent } from 'mdx/types';
  const content: MDXContent;
  export default content;
}
