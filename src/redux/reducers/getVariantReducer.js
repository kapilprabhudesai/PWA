import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import apiCall from "../../api/apiCall";

const auth = JSON.parse(`${localStorage.getItem('token')}`);

export const fetchVariant = createAsyncThunk(
    "fetch/variant",
    (value) => {
        const payload = {
            "for": "variant",
            "model":value.model,
            "make":value.make,
            "year":value.year? value.year: ""
        }
        return apiCall
            .post(
            "/get-ibb-data",
               payload
            )
            .then((response) => {
                return response.data
            })
            .catch((error) => error)
    }
);
const getVariantSlice = createSlice({
    name: "fetchVariantList",
    initialState: {
        status: "idle",
        data: [],
        error: {}
    },
    reducers: {
    },
    extraReducers: {
        [fetchVariant.pending.type]: (state) => {
            state.status = "loading"
            state.data = []
            state.error = {}
        },
        [fetchVariant.fulfilled.type]: (state, action) => {
            state.status = "success"
            state.data = action.payload.variant
            state.error = {}

        },
        [fetchVariant.rejected.type]: (state, action) => {
            state.status = "error"
            state.data = []
            state.error = action.payload
        },
    },
});

export default getVariantSlice.reducer;