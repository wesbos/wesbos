import { Suspense, type ReactNode } from "react";
import "@/components/styles/index.css";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
// import { operatorMono, radnika } from "@/lib/assets/fonts/Fonts";
import { LayoutStyles } from "@/styles/LayoutStyles.module.css";
import { ContentStyles } from "@/styles/ContentStyles.module.css";
import { Providers } from "@/components/Providers";

import RadnikaNextBlack from "../lib/assets/fonts/RadnikaNext/RadnikaNext-Black.woff2";
import OperatorMonoBook from "../lib/assets/fonts/operator/OperatorMono-Book_Web.woff2";
import OperatorMonoBold from "../lib/assets/fonts/operator/OperatorMono-Bold_Web.woff2";

type RootLayoutProps = { children: ReactNode };

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href={RadnikaNextBlack}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href={OperatorMonoBook}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href={OperatorMonoBold}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <Providers>
          <div className={LayoutStyles}>
            <Nav />
            <div className={ContentStyles}>{children}</div>
            <Suspense>
              <Footer />
            </Suspense>
          </div>
        </Providers>
      </body>
    </html>
  );
}

export const getConfig = async () => {
  return {
    render: "dynamic",
  } as const;
};
