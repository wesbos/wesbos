import { Link } from "waku";
import { ErrorBoundaryFallback } from "@/components/ErrorBoundary";
export default function NotFound() {
  return (
    <div>
      <ErrorBoundaryFallback title="4 OH CANADA 4" error={"404 not found"} />
      <p>
        <Link to="/">Back</Link>
      </p>
    </div>
  );
}

export const getConfig = async () => {
  return {
    render: "static",
  };
};
