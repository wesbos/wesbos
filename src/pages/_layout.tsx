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

type RootLayoutProps = { children: ReactNode };

const ServerMessage = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return <p>Hello from server!</p>;
};

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <Providers>
      <div className={LayoutStyles}>
        <Nav />
        <div className={ContentStyles}>{children}</div>
        <Footer />
        {/*  */}
      </div>
    </Providers>
  );
}

// const getData = async () => {
//   const data = {
//     description: 'An internet website!',
//     icon: '/images/favicon.png',
//   };

//   return data;
// };
