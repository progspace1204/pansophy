// import { configureStore } from "@reduxjs/toolkit";
// import usersReducer from "./Store/userSlice";
// export default configureStore({
//   reducer: {
//     users: usersReducer,
//   },
// });
import storage from 'reduxjs-toolkit-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { configureStore } from "@reduxjs/toolkit";

import usersReducer from "./Store/userSlice";

import settingsReducer from "./Store/settingSlice";
import chatReducer from "./Store/chatSlice";
const persistConfig = {
    key: 'root',
    storage,
  }
  
  const persistConfigSettings = {
    key: 'settings',
    storage,
  }
  const persistedReducer = persistReducer(persistConfig, usersReducer)
  const SettingsReducer = persistReducer(persistConfigSettings, settingsReducer)
  // export default const store = configureStore({
  //   reducer: {users:persistedReducer},
  //   middleware: [thunk]
  // })
  export default configureStore({
    reducer: {users:persistedReducer,
      settings:SettingsReducer,
      chats:chatReducer
    
    
    },
    middleware: [thunk]
});
  // export const persistor = persistStore(configureStore)
  // console.log("store",persistor)

// import { configureStore } from "@reduxjs/toolkit";
// import usersReducer from "./Store/userSlice";
// import storage from 'reduxjs-toolkit-persist/lib/storage'
// import { persistReducer, persistStore } from 'redux-persist';
// import thunk from 'redux-thunk';

// const persistConfig = {
//     key: 'root',
//     storage,
//   }
  
//   const persistedReducer = persistReducer(persistConfig, usersReducer)
  
//   export const store = configureStore({
//     reducer: {users:persistedReducer},
//     middleware: [thunk]
//   })
  
//   export const persistor = persistStore(store)
//   console.log("store",persistor)