import {
    TEAM_HAS_ERROR,
    TEAM_GET_SUCCESS,
} from '../constants/team';
import axios from 'axios';
import config from '../../config/index.json';

axios.defaults.baseURL = config.api_url;

export function getTeamHasError(error) {
    return {
        type: TEAM_HAS_ERROR,
        error
    };
}



export function getTeamSuccess(teams) {
    return {
        type: TEAM_GET_SUCCESS,
        teams
    };
}


export function teamFetchData(url) {
    return async(dispatch) => {
        try {
            let res = await axios.get(url, {
                headers: {
                    'Authorization': window.localStorage.getItem('token')
                }
            });
            dispatch(getTeamSuccess(res.data));
        } catch (error) {

            dispatch(getTeamHasError({
                status_text: error.response.statusText,
                data: error.response.data.error,
                status: error.response.status
            }));
        } 
    };
}
export function teamAddData(url,data) {
    
    return async(dispatch) => {
        try {
            delete data._id;
            let res = await axios.post(url, data,{
                headers: {
                    'Authorization': window.localStorage.getItem('token')
                }
            });
            dispatch(getTeamSuccess(res.data));
        } catch (error) {

            dispatch(getTeamHasError({
                status_text: error.response.statusText,
                data: error.response.data.error,
                status: error.response.status
            }));
        } 
    };
}
export function teamEditData(url,data) {
    
    return async(dispatch) => {
        try {
            let res = await axios.post(url, data,{
                headers: {
                    'Authorization': window.localStorage.getItem('token')
                }
            });
            dispatch(getTeamSuccess(res.data));
        } catch (error) {

            dispatch(getTeamHasError({
                status_text: error.response.statusText,
                data: error.response.data.error,
                status: error.response.status
            }));
        } 
    };
}
export function teamDelateDatas(url,data_arr) {
    
    return async(dispatch) => {
        try {
            let res = await axios.post(url,{row_arr: data_arr},{
                headers: {
                    'Authorization': window.localStorage.getItem('token')
                }
            });
            dispatch(getTeamSuccess(res.data));
        } catch (error) {

            dispatch(getTeamHasError({
                status_text: error.response.statusText,
                data: error.response.data.error,
                status: error.response.status
            }));
        } 
    };
}
