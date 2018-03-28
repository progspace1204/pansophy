import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
const initialState = { data: {question:"",answer:"",isChatting:false}};

 

const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
   
    getQuestion(state, action) {
       state.data.isChatting=true
     state.data.question=action.payload 
    },
    getAnswer(state, action) {
     state.data.answer=action.payload 
    },
    setChat(state,action){
        state.data={question:"",answer:"",isChatting:false}
    }

    
  },
});

export const {getQuestion,getAnswer,setChat} = chatSlice.actions;

export default chatSlice.reducer;
