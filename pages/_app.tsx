import "../styles/globals.css";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import DefaultLayout from "@/layouts/default";

import { Lobster } from "next/font/google";

const lobster = Lobster({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-lobster",
  display: 'swap'
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const MyLayout =
    Component.getLayout ??
    ((page: ReactElement) => <DefaultLayout>{page}</DefaultLayout>);

  return (
    <main className={`${lobster.variable} font-sans`}>
      {MyLayout(<Component {...pageProps} />)}
    </main>
  );
}
