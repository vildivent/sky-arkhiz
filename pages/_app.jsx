import { Provider } from "react-redux";
import "../styles/globals.css";
import "react-slideshow-image/dist/styles.css";
import { store } from "../redux/features/store";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
