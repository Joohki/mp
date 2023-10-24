import Head from "next/head";
// import { Provider } from "next-auth/client";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Layout from "../components/layout/Layout";
import { Provider } from "react-redux";
import "@fortawesome/fontawesome-svg-core/styles.css";
import wrapper from "../redux/store";
import { config } from "@fortawesome/fontawesome-svg-core";
import { PersistGate } from "redux-persist/integration/react";
import {persistor} from '../redux/store'
function MyApp({ Component, pageProps }) {
  config.autoAddCss = false;
  const { session } = pageProps;
  const { store, props } = wrapper.useWrappedStore(pageProps);
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
            <ToastContainer/>
            <Component {...props} />
          </Layout>
        </SessionProvider>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
