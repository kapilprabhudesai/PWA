import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import apiCall from "../../api/apiCall";


const auth = JSON.parse(`${localStorage.getItem('token')}`);

export const fetchMake = createAsyncThunk(
    "fetch/make",
    () => {
        const payload = {
            "for": "make",
        }
        return apiCall .get(
            "/get-ibb-data",
            {
                params: payload,
                headers: headers
            }
        )
        .then((response) => {
            console.log("make", response.data)
            return response.data;
        })
        .catch((error) => error);
    }
);
const getMakeSlice = createSlice({
    name: "fetchMakeList",
    initialState: {
        status: "idle",
        data: [],
        error: {}
    },
    reducers: {
    },
    extraReducers: {
        [fetchMake.pending.type]: (state) => {
            state.status = "loading"
            state.data = []
            state.error = {}
        },
        [fetchMake.fulfilled.type]: (state, action) => {
            state.status = "success"
            state.data = action.payload.make
            state.error = {}

        },
        [fetchMake.rejected.type]: (state, action) => {
            state.status = "error"
            state.data = []
            state.error = action.payload
        },
    },
});

export default getMakeSlice.reducer;