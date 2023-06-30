import { NEW_LEAD } from '../constants';
import apiCall from './apiCall';

export const fetchNewLeads = (payload) => {
    const LSToken = JSON.parse(`${localStorage.getItem('token')}`);
    let headers = {};
    if (LSToken) {
        headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${LSToken.token}`
        }
    }
    return apiCall
        .get(
            `${NEW_LEAD}`,
            {
                params: payload,
                headers: headers
            }
        )
        .then((response) => {
            return response.data;
        })
        .catch((error) => error)

}
