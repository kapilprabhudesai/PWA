import { CHANGE_PASSWORD } from '../constants';
import apiCall from './apiCall';

export const changePassword = (payload)=>{
        const res = apiCall
            .post(
                CHANGE_PASSWORD,
                payload,
            )
            .then((response) => response.data)
            .catch((error) => error)
        return res
    
}