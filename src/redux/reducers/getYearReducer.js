import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import apiCall from "../../api/apiCall";

const auth = JSON.parse(`${localStorage.getItem('token')}`);

export const fetchYear = createAsyncThunk(
    "fetch/year",
    () => {
        const LSToken = JSON.parse(`${localStorage.getItem('token')}`);
        let headers = {};
        if (LSToken) {
            headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${LSToken.token}`
            }
        }
        const payload = {
            "for": "year",
        }
        return apiCall .get(
            "/get-ibb-data",
            {
                params: payload,
                headers: headers
            }
        )
        .then((response) => {
            return response.data;
        })
        .catch((error) => error);
    }
);
const getYearSlice = createSlice({
    name: "fetchYearList",
    initialState: {
        status: "idle",
        data: [],
        error: {}
    },
    reducers: {
    },
    extraReducers: {
        [fetchYear.pending.type]: (state) => {
            state.status = "loading"
            state.data = []
            state.error = {}
        },
        [fetchYear.fulfilled.type]: (state, action) => {
            state.status = "success"
            state.data = action.payload.year;
            state.error = {}

        },
        [fetchYear.rejected.type]: (state, action) => {
            state.status = "error"
            state.data = []
            state.error = action.payload
        },
    },
});

export default getYearSlice.reducer;