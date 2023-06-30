import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import apiCall from "../../api/apiCall";
import { DASHBOARD } from '../../constants'

const auth = JSON.parse(`${localStorage.getItem('token')}`);

export const fetchDashBoard = createAsyncThunk(
    "fetch/dashboard",
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
                `${DASHBOARD}`,
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

const getDashboardSlice = createSlice({
    name: "fetchdashboardList",
    initialState: {
        status: "idle",
        data: [],
        error: {}
    },
    reducers: {},
    extraReducers: {
        [fetchDashBoard.pending.type]: (state) => {
            state.status = "loading"
            state.data = []
            state.error = {}
        },
        [fetchDashBoard.fulfilled.type]: (state, action) => {
            state.status = "success"
            state.data = action.payload.data
            state.error = {}
        },
        [fetchDashBoard.rejected.type]: (state, action) => {
            state.status = "error"
            state.data = []
            state.error = action.payload
        },
    },
});

export default getDashboardSlice.reducer;
