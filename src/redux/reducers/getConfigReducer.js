
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import apiCall from "../../api/apiCall";
import {CONFIG} from '../../constants'

export const fetchConfigDetails = createAsyncThunk(
    "lead/getConfig",
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
        "variables": {
          "enquiry_sources": true,
          "lead_type": true,
          "procurement_status": true,
          "procurement_lead_status_list": true,
          "s3_config": true
        }
      }
      return apiCall .get(
          `${CONFIG}`,
          {
              params: payload,
              headers: headers
          }
      )
      .then((response) => {
          return response;
      })
      .catch((error) => error);
    }
  );

const configDetailsSlice = createSlice({
    name: "config",
    initialState: {
        status: "idle",
        data: {
            enquiry_sources: [],
            lead_type: [],
            procurement_status: {},
            procurement_lead_status_list:[]
        },
        error: {},
    },
    reducers: {
    },
    extraReducers: {
        [fetchConfigDetails.pending.type]: (state) => {
            state.status = "loading"
            state.data.enquiry_sources = []
            state.data.lead_type=[]
            state.data.procurement_status={}
            state.data.procurement_lead_status_list=[]
            state.error = {}
        },
        [fetchConfigDetails.fulfilled.type]: (state, action) => {
            state.status = "success"
            state.data.enquiry_sources = action.payload.data.variables.enquiry_sources;
            state.data.lead_type=action.payload.data.variables.lead_type;
            state.data.procurement_status=action.payload.data.variables.procurement_status;
            state.data.procurement_lead_status_list=action.payload.data.variables.procurement_lead_status_list;
            state.error = {}
        },
        [fetchConfigDetails.rejected.type]: (state, action) => {
            state.status = "error"
            state.data.enquiry_sources = []
            state.data.lead_type=[]
            state.data.procurement_status={}
            state.data.procurement_lead_status_list=[]
            state.error = action.payload
        },
 
    },
});

export default configDetailsSlice.reducer;