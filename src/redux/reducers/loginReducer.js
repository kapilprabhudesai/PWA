import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import apiCall from "../../api/apiCall";
import {LOGIN} from "../../constants";

export const fetchToken = createAsyncThunk(
    "login/fetchToken",
     (payload) => {
        return apiCall
            .post(
                LOGIN,
                payload,
            )
            .then((response) => 
            {
                return response.data;
            })
            .catch((error) => error)
       
    }
);

const LSToken = JSON.parse(`${localStorage.getItem('token')}`);
const hasLSToken = (LSToken !== null)

const loginSlice = createSlice({
    name: "fetchTokenForLogin",
    initialState: {
        status: "idle",
        token: hasLSToken ? LSToken.token : null,
        name: hasLSToken ? LSToken.name : null,
        userId:hasLSToken ? LSToken.userId : null,
        userName:hasLSToken ? LSToken.userName : null,
        userType:hasLSToken ? LSToken.userType : null,
        email:hasLSToken ? LSToken.email : null,
        emNo:hasLSToken ? LSToken.emNo : null,
        trackId:hasLSToken ? LSToken.trackId : null,
        error: {}
    },
    reducers: {
    },
    extraReducers: {
        [fetchToken.pending.type]: (state) => {
            state.status = "loading"
            state.token = ""
            state.error = {}
        },
        [fetchToken.fulfilled.type]: (state, action) => {
                state.status = "success"
                state.token = action.payload.access_token
             
                state.error = {}
                const tokenArr = {
                    "token": action.payload.access_token,
                    "name": action.payload.name,
                    "userId":action.payload.user_id,
                    "userName":action.payload.username,
                    "userType":action.payload.user_type,    
                    "email":action.payload.email,
                    "emNo":action.payload.emp_no,
                    "trackId":action.payload.track_id,
                }
                localStorage.setItem('token', JSON.stringify(tokenArr))
        },
        [fetchToken.rejected.type]: (state, action) => {
            state.status = "error"
            state.token = ""
            state.error = action.payload
        },
    },
});

export default loginSlice.reducer;




