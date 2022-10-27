import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// initial State
const initialState = {
  melon: [{}],
  comment: [],
  nameCheck: false,
  idCheck: false,
};
const accessToken = localStorage.getItem("Access_Token");
const refreshToken = localStorage.getItem("Refresh_Token");

// const instance = axios.create({
//   baseURL: "/",
//   headers: { Authorization: accessToken, "Refresh-Token": refreshToken },
// });

// export const __createmelon = createAsyncThunk(
//   "melon/__createmelon",
//   async (payload, thunkAPI) => {
//     try {
//       const data = await axios.post("http://localhost:3001/melon", payload);
//       return thunkAPI.fulfillWithValue(data.data);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

export const __getmelon = createAsyncThunk(
  "melon/__getmelon",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/articles`
      );
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __addMelon = createAsyncThunk(
  "melon/__addMelon",
  async (payload, thunkAPI) => {
    try {
      await axios
        .post(`${process.env.REACT_APP_SERVER}/api/article`, payload, {
          headers: {
            enctype: "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
            RefreshToken: refreshToken,
            "Cache-Control": "no-cache",
          },
        })
        .then((response) => {
          console.log("response", response.data);
        });
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteMelon = createAsyncThunk(
  "melon/__deleteMelon",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.delete(
        `${process.env.REACT_APP_SERVER}/api/article/${payload}`,
        {
          headers: {
            enctype: "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
            RefreshToken: refreshToken,
            "Cache-Control": "no-cache",
          },
        }
      );
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __editMelon = createAsyncThunk(
  "melon/__editMelon",
  async (payload, thunkAPI) => {
    console.log("payload", payload);
    try {
      const data = await axios.put(
        `${process.env.REACT_APP_SERVER}/api/article/${payload.id}`,
        payload.formData,
        {
          headers: {
            enctype: "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
            RefreshToken: refreshToken,
            "Cache-Control": "no-cache",
          },
        }
      );
      console.log("data", data.data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//comment 부분
export const __getComment = createAsyncThunk(
  "comment/__getComment",
  async (payload, thunkAPI) => {
    try {
      console.log(payload);
      const data = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/comments/${payload}`
      );
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __addComment = createAsyncThunk(
  "comment/__addComment",
  // async 는 프로미스에 새로운 신문법이다. // 언제끝나는지 알려준다.
  async (payload, thunkAPI) => {
    try {
      //console.log(payload)
      // payload를 데이터를 넣어줄때까지 실행하지 하지않겠다. //비동기
      const data = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/comment/${payload.id}`,
        JSON.stringify(payload.comment),
        {
          headers: {
            "Content-Type": `application/json`,
            Authorization: `Bearer ${accessToken}`,
            RefreshToken: refreshToken,
            "Cache-Control": "no-cache",
          },
        }
      );
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteComment = createAsyncThunk(
  "comment/__deleteComment",
  // async 는 프로미스에 새로운 신문법이다. // 언제끝나는지 알려준다.
  async (payload, thunkAPI) => {
    try {
      console.log(payload);
      // payload를 데이터를 넣어줄때까지 실행하지 하지않겠다. //비동기
      const data = await axios.delete(
        `${process.env.REACT_APP_SERVER}/api/comment/${payload}`,
        {
          headers: {
            enctype: "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
            RefreshToken: refreshToken,
            "Cache-Control": "no-cache",
          },
        }
      );
      // console.log("페이로드",payload);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __editComment = createAsyncThunk(
  "comment/__editComment",
  async (payload, thunkAPI) => {
    //console.log("payload",payload.id)
    try {
      console.log(payload);
      const data = await axios.put(
        `${process.env.REACT_APP_SERVER}/api/comment/${payload.id}`,
        JSON.stringify(payload.comment),
        {
          headers: {
            "Content-Type": `application/json`,
            Authorization: `Bearer ${accessToken}`,
            RefreshToken: refreshToken,
            "Cache-Control": "no-cache",
          },
        }
      );
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __Login = createAsyncThunk(
  "melon/__Login",
  async (payload, thunkAPI) => {
    try {
      console.log(payload);
      const data = await axios.post(
        `${process.env.REACT_APP_SERVER}/auth/login`,
        payload
      );

      if (data.status === 200 || data.status === 201) {
        window.localStorage.setItem("Access_Token", data.data.accessToken);
        window.localStorage.setItem("Refresh_Token", data.data.refreshToken);
        window.localStorage.setItem("nickname", data.data.nickname);
        // setCookie("Access_Token", Access_Token);
        // setCookie("Refresh_Token", Refresh_Token);
        // setCookie("nickname", data.data.data);
        alert("로그인 성공");
        // console.log(accessToken);
        // console.log(refreshToken);
        // console.log(data.data.nickname);
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
        .post(`${process.env.REACT_APP_SERVER}/auth/signup`, payload)

        .then((response) => {
          console.log(response);
          return thunkAPI.fulfillWithValue(response.data);
        });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __nameCheck = createAsyncThunk(
  "melon/__nameCheck",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post(
        `${process.env.REACT_APP_SERVER}/user/nameCheck/`,
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
      const data = await axios.post(
        `${process.env.REACT_APP_SERVER}/auth/idCheck`,
        {
          username: payload,
        }
      );
      // console.log(data.data);
      // console.log(payload);
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
    //__createmelon
    // [__createmelon.pending]: (state) => {
    //   state.isLoading = true;
    // },
    // [__createmelon.fulfilled]: (state, action) => {
    //   state.isLoading = false;
    //   state.melon.push(action.payload);
    // },
    // [__createmelon.rejected]: (state, action) => {
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
    //__addMelon
    [__addMelon.pending]: (state) => {
      state.isLoading = true;
    },
    [__addMelon.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.melon = action.payload;
    },
    [__addMelon.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //__deleteMelon
    [__deleteMelon.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteMelon.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.melon = state.melon.filter((melon) => melon.id !== action.payload);
    },

    [__deleteMelon.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //__editMelon
    [__editMelon.pending]: (state) => {
      state.isLoading = true;
    },
    [__editMelon.fulfilled]: (state, action) => {
      state.isLoading = false;

      const indexId = state.melon.findIndex((melon) => {
        if (melon.id == action.payload.id) {
          return true;
        }
        return false;
      });
      state.melon[indexId] = action.payload;

      state.melon = [...state.melon];
    },
    [__editMelon.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //comment 부분
    //__getComment
    [__getComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__getComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comment = action.payload;
    },
    [__getComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //__addComment
    [__addComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__addComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comment.push(action.payload);
    },
    [__addComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //__deleteComment
    [__deleteComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comment = state.comment.filter(
        (comment) => comment.id !== action.payload
      );
    },
    [__deleteComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //__editComment
    [__editComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__editComment.fulfilled]: (state, action) => {
      state.isLoading = false;

      const indexId = state.comment.findIndex((comment) => {
        if (comment.id == action.payload.id) {
          return true;
        }
        return false;
      });
      state.comment[indexId] = action.payload.comment;

      state.comment = [...state.comment];
    },
    [__editComment.rejected]: (state, action) => {
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
      if (action.payload) {
        return window.alert("사용할 수 없는 아이디입니다.");
      } else {
        return window.alert("사용 가능한 아이디입니다.");
      }
      state.idCheck = action.payload;
    },
    [__idCheck.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { addMelon } = melonSlice.actions;
export default melonSlice.reducer;
