import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "./loginReducer";
import getYearReducer from "./getYearReducer";
import getMakeReducer from "./getMakeReducer";
import getModelReducer from "./getModelReducer";
import getVariantReducer from "./getVariantReducer";
import getConfigReducer from "./getConfigReducer";
import getDashboardReducer from "./getDashboardReducer";
import getUserProfileReducer from "./getUserProfileReducer";


export const rootReducer = combineReducers(
    {
    // commonData:commonReducer,
   loginDetails: loginReducer,
   yearList:getYearReducer,
   makeList:getMakeReducer,
   modelList:getModelReducer,
   variantList:getVariantReducer,
   configList:getConfigReducer,
   dashboardList:getDashboardReducer,
   user:getUserProfileReducer
//     ticketList:ticketListReducer,
//     ticketType:ticketTypeReducer,
//     ticketSubType:ticketSubTypeReducer,
//     ticketView:viewTicketReducer,
//     getUsers:getUserseducer,
//     userType:userTypeReducer,
//     reportingUser:reportingUserReducer,
//     states:stateByRegionReducer,
//     city:cityByStateReducer
}
)