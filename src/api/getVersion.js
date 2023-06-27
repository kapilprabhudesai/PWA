import apiCall from "./apiCall"

export const getVersion = ()=>{
 
        const res = apiCall.get(`/check-version?app_name=audi-inspection-stage-ios`)
            .then((response) => 
            {
                return response.data}
                )
            .catch((error) => error)
            return res
}