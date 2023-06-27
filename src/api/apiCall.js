import axios from "axios"
export default axios.create({
    baseURL: `${process.env.REACT_APP_API_BASE_URL}`,
    headers: {
        Accept: "application/json",
        'Access-Control-Allow-Origin': '*'
    }
})


