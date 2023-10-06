import Head from "next/head";
// import { Provider } from "next-auth/client";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import Layout from "../components/layout/layout";
import { Provider } from "react-redux";
import "@fortawesome/fontawesome-svg-core/styles.css";
import wrapper from '../redux/store'
import { config } from "@fortawesome/fontawesome-svg-core";

function MyApp({ Component, pageProps }) {
  config.autoAddCss = false;
  const { store, props } = wrapper.useWrappedStore(pageProps);
  return (
    <Provider store={store}>
      <SessionProvider session={pageProps.session}>
        <Layout>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </Head>
          <Component {...props} />
        </Layout>
      </SessionProvider>
    </Provider>
  );
}

export default MyApp;
