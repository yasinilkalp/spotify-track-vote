import '@/styles/globals.scss';
import { Provider } from "react-redux";
import store from "../toolkit/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

let persistor = persistStore(store);

export default function App({ Component, pageProps }) {
  return (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ToastContainer />
      <Component {...pageProps} />
    </PersistGate>
  </Provider>)

}
