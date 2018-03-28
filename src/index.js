import App from "./App";
import { render } from '@wordpress/element';
import './style/main.css';
import 'react-tooltip/dist/react-tooltip.css'
import AppSettings from "./AppSettings";
import { Provider } from "react-redux";
import  store from './store'
import { PersistGate } from 'redux-persist/integration/react';
import { persistReducer, persistStore } from 'redux-persist';
const pansophy_settings = document.getElementById('pansophy-settings');
 const persistor = persistStore(store)
if (pansophy_settings) {
    render(
        <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppSettings />
        </PersistGate>
      </Provider>, pansophy_settings);
}
const $pansophy_app = document.getElementById('pansophy-app');
if ($pansophy_app) {
    render(<Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>, $pansophy_app);
}


// import App from "./App";
// import { render } from '@wordpress/element';
// import './style/main.css';
// import 'react-tooltip/dist/react-tooltip.css'
// import AppSettings from "./AppSettings";
// import { Provider } from "react-redux";
// import { store } from './store'
// import { PersistGate } from 'redux-persist/integration/react';
// import {persistor} from './store'
// // Render the App component into the DOM
// const pansophy_settings = document.getElementById('pansophy-settings');
// if (pansophy_settings) {
//     render(
//         <Provider store={store}>
//         <PersistGate loading={null} persistor={persistor}>
//           <AppSettings />
//         </PersistGate>
//       </Provider>, pansophy_settings);
// }
// const $pansophy_app = document.getElementById('pansophy-app');
// if ($pansophy_app) {
//     render(<Provider store={store}>
//         <PersistGate loading={null} persistor={persistor}>
//           <App />
//         </PersistGate>
//       </Provider>, $pansophy_app);
// }
