import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isCreateDialogOpen : false,
    isEditDialogOpen : false,
    isDeleteDialogOpen: false,
    currentUser: {}
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCreateDialogOpen: (state,{payload}) => {
            state.isCreateDialogOpen = payload
        },
        setEditDialogOpen: (state,{payload}) => {
            state.isEditDialogOpen = payload
        },
        setDeleteDialogOpen: (state,{payload}) => {
            state.isDeleteDialogOpen = payload
        },
        setCurrentUser: (state,{payload}) => {
            state.currentUser = payload
        },
    }
})


export const {setCreateDialogOpen,setDeleteDialogOpen,setEditDialogOpen,setCurrentUser} = userSlice.actions
export default userSlice.reducer