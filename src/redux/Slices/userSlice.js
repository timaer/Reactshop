import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
export const doLoginAction = createAsyncThunk('user/doLoginAction', async params => {
  const response = await window.$post('/login/doLogin',{username:params.username,password:params.password})
  return response
})

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    mobile:'',
    token:''
  },
  reducers: {
    setUserName: (state,action) => {
      state.username = action.payload;
    },
    setMobile: (state,action) => {
      state.mobile = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    doLogout:state=>{
      state.username=''
      state.mobile=''
      state.token=''
    }
  },
  extraReducers:{
    [doLoginAction.fulfilled]:(state,action)=>{
       const data=action.payload
       state.username=data.result.info.username
       state.mobile=data.result.info.mobile
       state.token=data.result.info.token
    }
  }
});


export const getSecretMobile = state => state.substring(0,5)+"******"


export const { setUserName,setMobile,setToken,doLogout } = userSlice.actions
export default userSlice.reducer