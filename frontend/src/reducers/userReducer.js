
import { SIGN_UP, LOGGED_IN, LOGGED_OUT, SEARCH } from '../actions/userAction';
// initial user state
const userInit = {
	logged_in: false,
	userName: '',
	showConfirmModal: false,
	showJoinModal: false,
	showSigninModal: false,
	userId: null,
	confirmed: false,
	alertMessage: '',
	nextRoute: null,
	prevRoute: null
}
// if user exists in local storage, assign username to user initial name
const userName = localStorage.getItem('userName');
const userId = localStorage.getItem('userId');
const confirmed = localStorage.getItem('userId');
if(userName){
	userInit.logged_in = true;
	userInit.userName = userName;
	userInit.confirmed = confirmed;
}

export const userReducer = (state = userInit, action) => {
	switch (action.type) {
		case LOGGED_IN:
		console.log('reducer', action.payload);
		const {userName, userId, confirmed } = action.payload;
		return { ...state, logged_in: true, userName, userId, confirmed, showConfirmModal: false, showSigninModal: false, nextRoute: null, prevRoute: null}

		case LOGGED_OUT:
		return { ...state, logged_in: false, name: null, confirmed: false, userName: '', userId: null}

		case 'USER_SIGNEDUP': 
			return { ...state, showConfirmModal: true, showJoinModal: false, userId: action.payload.userId }

		case 'NEED_CONFIRM':
			return { ...state, showConfirmModal: true, showSigninModal: false, userId: action.payload }

		case 'USER_CONFIRMED':
			return { ...state, showConfirmModal: false, userName: action.payload.name, userId: action.payload.userId, logged_in: true}

		case 'TOGGLE_MODAL':
			console.log('reducer toggling modal', action.payload);
			return { ...state, [action.payload.modalName]:!state[action.payload.modalName], nextRoute: action.payload.nextRoute, prevRoute: action.payload.prevRoute, alertMessage: action.payload.alertMessage}

		default:
		return state;
	}
};