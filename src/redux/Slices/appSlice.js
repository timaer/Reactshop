import { createSlice } from '@reduxjs/toolkit'

const appSlice = createSlice({
  name: 'app',
  initialState: {
    loading:false
  },
  reducers: {
    showLoading: state => {
      state.loading = true;
    },
    hideLoading: state => {
      state.loading = false;
    }
  }
});

export const { showLoading,hideLoading} = appSlice.actions
export default appSlice.reducer