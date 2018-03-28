import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = { data: [] };

const url = `${pansophy_data.api_url}wprk/v1/settings`;

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    userAdded(state, action) {
      try {
        axios.post(url, action.payload, {
          headers: {
            "content-type": "application/json",
            "X-WP-NONCE": pansophy_data.nonce,
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
    //  state.data.push(action.payload);
    userDeleted(state, action) {
      const { id } = action.payload;
      try {
        axios.delete(url, id);
        console.log("Success");
      } catch (error) {
        console.log(error);
      }
      // console.log("state", id);
      // const deletedData = state.data.filter((user) => user.id !== id);
      // state.data = deletedData;
    },
    getHistory(state, action) {
     state.data=action.payload
    }

    
  },
});

export const { userAdded, userDeleted, getHistory} = usersSlice.actions;

export default usersSlice.reducer;
