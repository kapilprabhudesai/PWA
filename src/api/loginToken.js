
import apiCall from './apiCall';
import { LOGIN } from '../constants';

export const fetchToken = (payload)=>{
        const res = apiCall
            .post(
                LOGIN,
                payload,          
            )
            .then((response) => response.data)
            .catch((error) => error)
        return res   
}

