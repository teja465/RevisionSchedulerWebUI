import { createSlice } from "@reduxjs/toolkit";
export const initialState = {
    isLoggedIn:false,
    jwtToken:'',
    userName:'',
    userEmail:''
}
export const userSlice = createSlice({
    name:'user',
    initialState:initialState,
    reducers :{
        logInUser :(state , action) => {
            console.log("user loggging in" , action["payload"])
            if ( action["payload"]["isLoggedIn"]){
                state.isLoggedIn=true;
                state.userEmail = action["payload"]["userEmail"]
                state.jwtToken =action["payload"]["jwtToken"]
            }

        },
        logOutUser :(state,action) => {
            console.log("user logging out", action["payload"])
            state.isLoggedIn=false;
            state.isLoggedIn = action.payload.isLoggedIn
            state.userEmail= action.payload.userEmail
            state.jwtToken= action.payload.jwtToken

        }
    }
})
export  const { logInUser , logOutUser } = userSlice.actions
export default userSlice.reducer

