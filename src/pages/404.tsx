
import { ErrorBoundaryFallback } from '@/components/ErrorBoundary';
export default function NotFound() {
  return <ErrorBoundaryFallback error={'Not Found'} />;
}

export const getConfig = async () => {
  return {
    render: 'static',
  };
};
