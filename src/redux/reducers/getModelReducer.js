import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import apiCall from "../../api/apiCall";


const auth = JSON.parse(`${localStorage.getItem('token')}`);

export const fetchModel = createAsyncThunk(
    "fetch/model",
    (value) => {
        const payload = {
            "for": "model",
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
const getModelSlice = createSlice({
    name: "fetchModelList",
    initialState: {
        status: "idle",
        data: [],
        error: {}
    },
    reducers: {
    },
    extraReducers: {
        [fetchModel.pending.type]: (state) => {
            state.status = "loading"
            state.data = []
            state.error = {}
        },
        [fetchModel.fulfilled.type]: (state, action) => {
            state.status = "success"
            state.data = action.payload.model
            state.error = {}

        },
        [fetchModel.rejected.type]: (state, action) => {
            state.status = "error"
            state.data = []
            state.error = action.payload
        },
    },
});

export default getModelSlice.reducer;