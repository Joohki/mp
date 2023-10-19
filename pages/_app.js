import Head from "next/head";
// import { Provider } from "next-auth/client";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import Layout from "../components/layout/layout";
import { Provider } from "react-redux";
import "@fortawesome/fontawesome-svg-core/styles.css";
import wrapper from "../redux/store";
import { config } from "@fortawesome/fontawesome-svg-core";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

function MyApp({ Component, pageProps }) {
  config.autoAddCss = false;
  const { session } = pageProps;
  const { store, props } = wrapper.useWrappedStore(pageProps);
  const persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SessionProvider session={session}>
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
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
