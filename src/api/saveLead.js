import { SAVE_LEAD } from '../constants';
import apiCall from './apiCall';


const saveLead = (params) => {
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
            `${SAVE_LEAD}`,
            params,
            {
                headers: headers
            }
        )
        .then((response) => {
            return response.data
        })
        .catch((error) => error)
    return res;
};
export default saveLead