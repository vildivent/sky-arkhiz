import { Provider } from "react-redux";
import { store } from "../redux/features/store";
import "../styles/globals.css";
import type { AppProps } from "next/app";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
