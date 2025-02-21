import { Suspense, type ReactNode } from "react";
import "@/components/styles/index.css";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
// import { operatorMono, radnika } from "@/lib/assets/fonts/Fonts";
import { LayoutStyles } from "@/styles/LayoutStyles.module.css";
import { ContentStyles } from "@/styles/ContentStyles.module.css";
import { getPostBySlug } from "@/lib/getPosts";
import { baseUrl } from "@/lib/meta";
import { slugToTitle } from "@/utils/slugToTitle";
import { Providers } from "@/components/Providers";
import { MetaTags } from "@/components/MetaTags";

type RootLayoutProps = { children: ReactNode };

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <Providers>
      <div className={LayoutStyles}>
        <Nav />
        <div className={ContentStyles}>{children}</div>
        <Suspense>
          <Footer />
        </Suspense>
      </div>
    </Providers>
  );
}

export const getConfig = async () => {
  return {
    render: "dynamic",
  } as const;
};
