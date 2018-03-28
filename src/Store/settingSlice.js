import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {data:null };

const url = `${pansophy_data.api_url}wprk/v1/settings`;

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {  
    getSettings(state, action) {  
     state.data=action.payload
    },
  },
});

export const { getSettings} = settingsSlice.actions;

export default settingsSlice.reducer;