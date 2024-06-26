import { createSlice } from "@reduxjs/toolkit";

//type casting
type userSlice = {
    isCreateDialogOpen: boolean;
    isEditDialogOpen: boolean;
    isDeleteDialogOpen: boolean;
    currentUser: {
        id : number,
        name: string,
        password?: string,
        role: string[],
        
    };
};

const initialState : userSlice = {
    isCreateDialogOpen: false,
    isEditDialogOpen: false,
    isDeleteDialogOpen: false,
    currentUser: {
        id : 1,
        name : "",
        role : [""],
    },
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setCreateDialogOpen: (state, { payload }) => {
            state.isCreateDialogOpen = payload;
        },
        setEditDialogOpen: (state, { payload }) => {
            state.isEditDialogOpen = payload;
        },
        setDeleteDialogOpen: (state, { payload }) => {
            state.isDeleteDialogOpen = payload;
        },
        setCurrentUser: (state, { payload }) => {
            state.currentUser = payload;
        },
    },
});

export const {
    setCreateDialogOpen,
    setDeleteDialogOpen,
    setEditDialogOpen,
    setCurrentUser,
} = userSlice.actions;
export default userSlice.reducer;
