import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null
    //Here we create initial State which store some property's like {status & userData} which false and null as default
}

const authSlice = createSlice({
    name: "auth", //identification of all slice
    initialState, //Structure of data we will store
    reducers:{    // Our all methods which will use in our application every where
        Login: (state, action) => {
            state.status = true,
            state.userData = action.payload.userData;
        },

        Logout: (state) => {
            state.status = false,
            state.userData = null;
        },

        /*Here we create two methods
        1)Login:- In this we gate access of state & action.
        i)state give us value/row data inside it  
        ii)action give us changed value by user
        Result:-
        Using state & action we change our initial state's data which we change in our methods
        status value change in true and userDate change in action.payload.userData whenever user will execute this method data will change in this form
        
        2)Logout:- Same thing happens here whenever user will execute this function initial state data will changed*/

    }
}) 

export const {Login, Logout} = authSlice.actions

export default authSlice.reducer

