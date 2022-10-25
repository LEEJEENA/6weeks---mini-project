import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// initial State
const initialState = {
  melon: [{}],
  comment: [],
  nameCheck: false,
  idCheck: false,
};
const accessToken = localStorage.getItem("accessToken");
const refreshToken = localStorage.getItem("refreshToken");

const instance = axios.create({
  baseURL: "/",
  headers: { Authorization: accessToken, "Refresh-Token": refreshToken },
});

const register = (payload) => {
  const frm = new FormData();
  frm.append("title", payload.title);
  frm.append("singer", payload.singer);
  frm.append("song", payload.song);
  frm.append("content", payload.content);
  frm.append("selected", payload.selected);
  frm.append("image", payload.file);

  //title, singer, song, content, selected, image

  axios
    .post("http://3.36.97.100/api/article", frm, {
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
};

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

export const __deleteTodo = createAsyncThunk(
  "melon/__deleteTodo",
  async (payload, thunkAPI) => {
    console.log("payload", payload);
    try {
      const data = await axios.delete(`http://localhost:3001/melon/${payload}`);
      return thunkAPI.fulfillWithValue(data.data);
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
      await axios.patch(`http://localhost:3001/melon/${payload.id}`, {
        id: payload.id,
        content: payload.target,
      });
      const data = await axios.get("http://localhost:3001/melon");
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

///comment 부분

export const __getComment = createAsyncThunk(
  "comment/__getComment",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get("http://localhost:3001/comment");
      // console.log(data);
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
      // payload를 데이터를 넣어줄때까지 실행하지 하지않겠다. //비동기
      const data = await axios.post("http://localhost:3001/comment", payload);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteComment = createAsyncThunk(
  "commentdelete/ __deleteComment",
  // async 는 프로미스에 새로운 신문법이다. // 언제끝나는지 알려준다.
  async (payload, thunkAPI) => {
    try {
      // payload를 데이터를 넣어줄때까지 실행하지 하지않겠다. //비동기
      const data = await axios.delete(
        `http://localhost:3001/comment/${payload}`
      );
      // console.log("페이로드",payload);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __editComment = createAsyncThunk(
  "melon/__editComment",
  async (payload, thunkAPI) => {
    //console.log("payload",payload.id)
    try {
      await axios.patch(`http://localhost:3001/comment/${payload.id}`, {
        id: payload.id,
        content: payload.target,
      });
      const data = await axios.get("http://localhost:3001/comment");
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

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

const melonSlice = createSlice({
  name: "melon",
  initialState,

  reducers: {
    // addMelon : (state, action) => {
    // state.melon = action.payload
    // register(action.payload)
    // }
  },
  extraReducers: {
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

    [__deleteTodo.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteTodo.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝나서 falses
      state.melon = state.melon.filter((melon) => melon.id !== action.payload); // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
    },

    [__deleteTodo.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },

    [__editTodo.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__editTodo.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝나서 false
      state.melon = action.payload;
    },
    [__editTodo.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },

    //comment 부분

    [__getComment.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__getComment.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.comment = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
    },
    [__getComment.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },

    [__addComment.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__addComment.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.comment.push(action.payload); // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
      //추가로 넣어야하니까 푸쉬를 이용해 맨뒤에 쌓아주려고
    },
    [__addComment.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },

    [__deleteComment.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__deleteComment.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.comment = state.comment.filter(
        (comment) => comment.id !== action.payload
      ); // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
    },
    [__deleteComment.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },

    [__editComment.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__editComment.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝나서 false
      state.comment = action.payload;
    },
    [__editComment.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
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
  },
});

export const { addMelon } = melonSlice.actions;
export default melonSlice.reducer;
