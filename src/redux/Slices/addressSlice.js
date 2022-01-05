import { createSlice } from '@reduxjs/toolkit'

const addressSlice = createSlice({
  name: 'address',
  initialState: {
    info:{ isSetAddress:false,detail:{} }
  },
  reducers: {
    setShopAddress: (state,action) => {
      state.info = action.payload;
    },
    emptyAddress:state=>{
      state.info={isSetAddress:false,detail:{}}
    }
  }
});

export const {setShopAddress,emptyAddress} = addressSlice.actions
export default addressSlice.reducer