import { createSlice } from "@reduxjs/toolkit";

const userSclice = createSlice({
    name:"user",
    initialState:{
        userData:null
    },
    reducers:{
        setUserData:(state,action)=>{
            state.userData = action.payload
        }
    }
})

export const {setUserData} = userSclice.actions

export default userSclice.reducer