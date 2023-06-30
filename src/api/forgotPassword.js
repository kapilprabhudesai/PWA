import { FORGOT_PASSWORD } from '../constants';
import apiCall from './apiCall';

export const forgotPassword = (payload)=>{
        const res = apiCall
            .post(
                FORGOT_PASSWORD,
                payload,
            )
            .then((response) => response.data)
            .catch((error) => error)
        return res
    
}