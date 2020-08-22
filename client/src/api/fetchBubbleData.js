import { axiosWithAuth } from '../utils/axiosWithAuth';

export const fetchBubbleData = () => {
    return axiosWithAuth()
        .get('/api/colors')
        .then(res => {
            console.log('SUCCESS fetching data from api',res);
            return res;
        })
        .catch(err => {
            console.log('ERROR fetching data from api, err:', err);
            return err;
        })
}