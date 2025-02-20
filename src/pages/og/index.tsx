import { Suspense } from "react";
import { OG, OGProps } from "../../components/OG";

export default function OGPage({ query }: OGProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OG query={query} />
    </Suspense>
  );
}

export const getConfig = async () => {
  return {
    render: 'dynamic',
  } as const;
};
