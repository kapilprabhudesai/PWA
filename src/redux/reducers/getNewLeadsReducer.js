import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import apiCall from "../../api/apiCall";
import { NEW_LEAD } from '../../constants'

const auth = JSON.parse(`${localStorage.getItem('token')}`);

export const fetchNewLeads = createAsyncThunk(
    "fetch/leads",
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
            .get(
                `${NEW_LEAD}`,
                {
                    params: payload,
                    headers: headers
                }
            )
            .then((response) => {   
                return response.data;
            })
            .catch((error) => error)
    }
);

const getnewLeadSlice = createSlice({
    name: "fetchleadList",
    initialState: {
        status: "idle",
        data: {},
        error: {}
    },
    reducers: {},
    extraReducers: {
        [fetchNewLeads.pending.type]: (state) => {
            state.status = "loading"
            state.data = {}
            state.error = {}
        },
        [fetchNewLeads.fulfilled.type]: (state, action) => {
            state.status = "success"
            state.data = action.payload;
            state.error = {}
        },
        [fetchNewLeads.rejected.type]: (state, action) => {
            state.status = "error"
            state.data = {}
            state.error = action.payload
        },
    },
});

export default getnewLeadSlice.reducer;
