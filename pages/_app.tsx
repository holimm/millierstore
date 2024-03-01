import "../styles/globals.css";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import DefaultLayout from "@/layouts/default";

import { Lobster } from "next/font/google";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

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
    <main className={`font-sans`}>
      <Provider store={store}>
        {MyLayout(<Component {...pageProps} />)}
      </Provider>
    </main>
  );
}
