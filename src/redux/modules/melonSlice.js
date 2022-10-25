import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  melon: [],
  user: [{ username: 1234 }, { username: 124555 }],
  nameCheck: false,
  idCheck: false,
};
const accessToken = localStorage.getItem("accessToken");
const refreshToken = localStorage.getItem("refreshToken");

// axios.defaults.baseURL = "https://api.example.com";
// axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
// axios.defaults.headers.post["Content-Type"] =
//   "application/x-www-form-urlencoded";

const instance = axios.create({
  baseURL: "/",
  headers: { Authorization: accessToken, "Refresh-Token": refreshToken },
});

// // 인스턴스가 생성 된 후 기본값 변경
// instance.defaults.headers.common["Authorization"] = AUTH_TOKEN;

export const __addMelon = createAsyncThunk(
  "melon/__addMelon",
  async (payload, thunkAPI) => {
    const frm = new FormData();
    const dataSet = {
      title: payload.title,
      singer: payload.singer,
      song: payload.song,
      content: payload.content,
      category: payload.category,
    };

    frm.append("data", JSON.stringify(dataSet));
    frm.append("file", payload.file);

    try {
      const data = await axios
        .post(`http://3.36.97.100/melon/`, frm, {
          headers: {
            Authorization: accessToken,
            "Refresh-Token": refreshToken,
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function a(response) {
          alert("게시되었습니다.");
          window.location.replace("/");
        })
        .catch(function (error) {
          console.log(error.response);
        });

      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// export const __Login = createAsyncThunk(
//   "melon/__Login",
//   async (payload, thunkAPI) => {
//     try {
//       const data = await axios.post("http://3.36.97.100/auth/login", payload);
//       return thunkAPI.fulfillWithValue(data.data);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );
export const __Login = createAsyncThunk(
  "melon/__Login",
  async (payload, thunkAPI) => {
    try {
      console.log(payload);
      const data = await axios.post("http://3.36.97.100/auth/login", payload);
      console.log(data);
      const Access_Token = data.headers.access_token;
      const Refresh_Token = data.headers.refresh_token;
      if (data.status === 200 || data.status === 201) {
        window.localStorage.setItem("Access_Token", Access_Token);
        window.localStorage.setItem("Refresh_Token", Refresh_Token);
        window.localStorage.setItem("nickname", data.data.data);
        // setCookie("Access_Token", Access_Token);
        // setCookie("Refresh_Token", Refresh_Token);
        // setCookie("nickname", data.data.data);
        alert("로그인 성공");
        window.location.replace("/");
      }
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      if (error.data.status > 400 && error.data.status < 500) {
        // window.location.reload();
        alert("로그인 실패");
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __SignUp = createAsyncThunk(
  "melon/__SignUp",
  async (payload, thunkAPI) => {
    try {
      console.log(payload);
      await axios
        .post("http://3.36.97.100/auth/signup", payload)

        .then((response) => {
          console.log(response);
          return thunkAPI.fulfillWithValue(response.data);
        });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// export const __getUser = createAsyncThunk(
//   "melon/__getUser",
//   async (payload, thunkAPI) => {
//     try {
//       const data = await axios.get("http://3.36.97.100/user");
//       return thunkAPI.fulfillWithValue(data.data);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

export const __nameCheck = createAsyncThunk(
  "melon/__nameCheck",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post(
        `http://3.36.97.100/user/nameCheck/`,
        payload
      );
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __idCheck = createAsyncThunk(
  "melon/__idCheck",
  async (payload, thunkAPI) => {
    try {
      // console.log(payload);
      const data = await axios.post(`http://3.36.97.100/auth/idCheck`, {
        username: payload,
      });
      // console.log(data.data);
      // console.log(payload);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getmelon = createAsyncThunk(
  "melon/__getmelon",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get("http://3.36.97.100/melon");
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
      const data = await axios.post("http://3.36.97.100/melon", payload);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const __deleteTodo = createAsyncThunk(
  "melon/__deleteTodo",
  async (payload, thunkAPI) => {
    console.log("payload", payload);
    try {
      const data = await axios.delete(`http://3.36.97.100/melon/${payload}`);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const __editTodo = createAsyncThunk(
  "melon/__editTodo",
  async (payload, thunkAPI) => {
    //console.log("payload",payload.id)
    try {
      await axios.patch(`http://3.36.97.100/melon/${payload.id}`, {
        id: payload.id,
        content: payload.target,
      });
      const data = await axios.get("http://3.36.97.100/melon");
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const melonSlice = createSlice({
  name: "melon",
  initialState,
  reducers: {},
  extraReducers: {
    //__addMelon
    [__addMelon.pending]: (state) => {
      state.isLoading = true;
    },
    [__addMelon.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    [__addMelon.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //__Login
    [__Login.pending]: (state) => {
      state.isLoading = true;
    },
    [__Login.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    [__Login.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //__SignUp
    [__SignUp.pending]: (state) => {
      state.isLoading = true;
    },
    [__SignUp.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    [__SignUp.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //__nameCheck
    [__nameCheck.pending]: (state) => {
      state.isLoading = true;
    },
    [__nameCheck.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.nameCheck = action.payload;
    },
    [__nameCheck.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //__idCheck
    [__idCheck.pending]: (state) => {
      state.isLoading = true;
    },
    [__idCheck.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.idCheck = action.payload;
    },
    [__idCheck.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // //__getUser
    // [__getUser.pending]: (state) => {
    //   state.isLoading = true;
    // },
    // [__getUser.fulfilled]: (state, action) => {
    //   state.isLoading = false;
    //   state.user = action.payload;
    // },
    // [__getUser.rejected]: (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },
    //__getmelon
    [__getmelon.pending]: (state) => {
      state.isLoading = true;
    },
    [__getmelon.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.melon = action.payload;
    },
    [__getmelon.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //
    [__createmelon.pending]: (state) => {
      state.isLoading = true;
    },
    [__createmelon.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.melon.push(action.payload);
    },
    [__createmelon.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__deleteTodo.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteTodo.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.melon = state.melon.filter((melon) => melon.id !== action.payload);
    },
    [__deleteTodo.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__editTodo.pending]: (state) => {
      state.isLoading = true;
    },
    [__editTodo.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.melon = action.payload;
    },
    [__editTodo.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
export const {} = melonSlice.actions;
export default melonSlice.reducer;
