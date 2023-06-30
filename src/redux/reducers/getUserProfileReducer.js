import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import apiCall from "../../api/apiCall";
import {USER_PROFILE} from '../../constants'


const auth = JSON.parse(`${localStorage.getItem('token')}`);

export const fetchUser = createAsyncThunk(
    "fetch/user",
    (payload) => {  
        const LSToken = JSON.parse(`${localStorage.getItem('token')}`);
        let headers = {};
        if (LSToken) {
            headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${LSToken.token}`
            }
        }
        return apiCall
            .post(
                `${USER_PROFILE}`,
               payload,
               {
                headers: headers
            }
            )
            .then((response) => {
                console.log("user",response.data);
                return response.data;
            })
            .catch((error) => error)
    }
);
const getUserSlice = createSlice({
    name: "fetchUserProfile",
    initialState: {
        status: "idle",
        data: [],
        error: {}
    },
    reducers: {
    },
    extraReducers: {
        [fetchUser.pending.type]: (state) => {
            state.status = "loading"
            state.data = []
            state.error = {}
        },
        [fetchUser.fulfilled.type]: (state, action) => {
            state.status = "success"
            console.log("payload",action.payload);
            state.data = action.payload;
            state.error = {}

        },
        [fetchUser.rejected.type]: (state, action) => {
            state.status = "error"
            state.data = []
            state.error = action.payload
        },
    },
});

export default getUserSlice.reducer;