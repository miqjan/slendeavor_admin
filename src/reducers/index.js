import {
    combineReducers
} from 'redux';
import {
    routerReducer
} from 'react-router-redux'
import {
    userReducer
} from './user';
import {
    userlistReducer
} from './userlist';
import {
    teamReducer
} from './team';
export default combineReducers({
    router: routerReducer,
    userinfo: userReducer,
    userlist: userlistReducer,
    team: teamReducer
});