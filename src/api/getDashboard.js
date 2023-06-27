import { DASHBOARD } from '../constants';
import apiCall from './apiCall';

export const getDashBoard = (payload)=>{
    const LSToken = JSON.parse(`${localStorage.getItem('token')}`);
    let headers = {};
    if (LSToken) {
        headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${LSToken.token}`
        }
    }
        const res = apiCall
            .post(
                DASHBOARD,
                payload,
                {
                    headers: headers
                }
            )
            .then((response) => response.data)
            .catch((error) => error)
        return res
    
}




