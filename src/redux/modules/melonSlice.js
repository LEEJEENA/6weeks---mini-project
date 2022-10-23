import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// initial State
const initialState = {
    melon: [
      {
        
      }
    ]
  }


  export const __getmelon = createAsyncThunk(
    "melon/__getmelon",
    async (payload, thunkAPI) => {
    try {
    const data = await axios.get("http://localhost:3001/melon");
    return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
    }
    );


  export const __createmelon = createAsyncThunk(
    "melon/__createmelon",
    async (payload, thunkAPI) => {
    try {
    const data = await axios.post("http://localhost:3001/melon", payload);
    return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
    }
    );

    
const melonSlice = createSlice({
    name: "melon",
    initialState,
      extraReducers: 
      {
        [__getmelon.pending]: (state) => {
          state.isLoading = true; 
        },
        [__getmelon.fulfilled]: (state, action) => {
          state.isLoading = false; // 네트워크 요청이 끝나서 false
          state.melon = action.payload; 
        },
        [__getmelon.rejected]: (state, action) => {
          state.isLoading = false; 
          state.error = action.payload; 
        },



        [__createmelon.pending]: (state) => {
          state.isLoading = true;
        },
        [__createmelon.fulfilled]: (state, action) => {
          state.isLoading = false; // 네트워크 요청이 끝나서 false
          state.melon.push(action.payload); 
        },
        [__createmelon.rejected]: (state, action) => {
          state.isLoading = false; 
          state.error = action.payload; 
        },
    }
})

export const {} = melonSlice.actions;
export default melonSlice.reducer;
