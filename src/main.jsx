import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store/store.js";
import { PersistGate } from "redux-persist/integration/react";
import LoadingView from "./pages/LoadingView.jsx";
import { injectStore } from "./api/api.js";
injectStore(store);
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <App />
      </PersistGate>
    </Provider>
  // </React.StrictMode>
);
