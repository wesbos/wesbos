import type { ReactNode } from "react";
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

type RootLayoutProps = { children: ReactNode };

export const getConfig = async () => {
  return {
    render: "dynamic",
  } as const;
};

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className={LayoutStyles}>
      <Nav />
      <div className={ContentStyles}>{children}</div>
      <Footer />
    </div>
  );
}

// const getData = async () => {
//   const data = {
//     description: 'An internet website!',
//     icon: '/images/favicon.png',
//   };

//   return data;
// };
