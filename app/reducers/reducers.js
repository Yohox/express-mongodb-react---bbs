
// Object.assign is not yet fully supported in all browsers, so we fallback to
// a polyfill
const assign = Object.assign || require('object.assign');
import auth from '../utils/auth';

// The initial application state
const initialState = {
    formState: {
        username: '',
        password: ''
    },
    currentlySending: false,
    loggedIn: false,
    errorMessage: '',
    ThreadId:'',
};

// Takes care of changing the application state
export function homeReducer(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_FORM':
            return assign({}, state, {
                formState: action.newState
            });
            break;
        case 'SET_AUTH':
            return assign({}, state, {
                loggedIn: action.newState
            });
            break;
        case 'SET_THREAD_ID':

            return assign({}, state, {
                ThreadId: action.newState
            });
            break;
        case 'SENDING_REQUEST':
            return assign({}, state, {
                currentlySending: action.sending
            });
            break;
        case 'SET_ERROR_MESSAGE':
            return assign({}, state, {
                errorMessage: action.message
            });
        default:
            return state;
    }
}