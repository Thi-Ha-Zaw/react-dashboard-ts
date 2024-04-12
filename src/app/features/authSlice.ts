import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isChangePwDialog : false,
    user : {}
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userInfo: (state,{payload}) => {
            state.user = payload
        },
        setChangePwDialog: (state,{payload}) => {
            state.isChangePwDialog = payload
        }
    }
})


export const {userInfo,setChangePwDialog} = authSlice.actions
export default authSlice.reducer