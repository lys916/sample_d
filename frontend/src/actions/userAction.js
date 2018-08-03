import axios from 'axios';
export const SIGN_UP = 'SIGN_UP';
export const LOGGED_IN = 'LOGGED_IN';
export const LOGGED_OUT = 'LOGGED_OUT';
export const USER_AUTHENTICATED = 'USER_AUTHENTICATED';
export const USER_UNAUTHENTICATED = 'USER_UNAUTHENTICATED';
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';
export const CHECK_IF_AUTHENTICATED = 'CHECK_IF_AUTHENTICATED';


export const signOut = (history) => {
  localStorage.removeItem('token');
  localStorage.removeItem('userName');
  localStorage.removeItem('userId');
  localStorage.removeItem('confirmed');
  console.log('token after removed: ', localStorage.getItem('token'));
  return ({ type: LOGGED_OUT });
}

export const toggleModal = (modalData) => {
  console.log('toggling modal');
  return ({ type: 'TOGGLE_MODAL', payload: modalData });
}

export const signUp = (newUser) => {
  console.log('action signing up');
  if(newUser.name !== '' || newUser.loginType !== '' || newUser.password !== ''){
    return (dispatch) => {
      axios.post('http://localhost:5000/userSignup', newUser)
      .then(res => {
        console.log('signup - got res from server');
        if(res.status === 200){
            console.log('user successfuly signed up.', res.data);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('confirmed', res.data.confirmed);
            localStorage.setItem('username', res.data.username);
            localStorage.setItem('userId', res.data.userId);
            dispatch({
              type: 'USER_SIGNEDUP',
              payload: res.data
            });
        }
      });
    }
  }
}

export const confirm = (user) => {
  console.log('action confirming user', user);
  if(user.code !== '' && user.userId !== ''){
    return (dispatch) => {
      axios.post('http://localhost:5000/userConfirmation', user)
      .then(res => {
       if(res.status === 200 && !res.data.error){
            console.log('user is confirmed');
          const token = res.data.token;
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('confirmed', res.data.confirmed);
            localStorage.setItem('userName', res.data.userName);
            localStorage.setItem('userId', res.data.userId);
          dispatch({
            type: LOGGED_IN,
            payload: res.data
          });      
        }
      });
    }
  }
}

export const signIn = (user, history, nextRoute) => {
  if(user.loginType !== '' || user.password !== ''){
    return (dispatch) => {
      axios.post('http://localhost:5000/userLogin', user)
      .then(res => {
        if(res.status === 200 && !res.data.error){
          console.log('action - user signed in successfuly', res.data);
          const token = res.data.token;
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('confirmed', res.data.confirmed);
            localStorage.setItem('userName', res.data.userName);
            localStorage.setItem('userId', res.data.userId);
          dispatch({
            type: LOGGED_IN,
            payload: res.data
          });
          if(nextRoute){
            history.push(`/${nextRoute}`);
          }  
        }
        if(res.data.error === 'needConfirm'){
          dispatch({
            type: 'NEED_CONFIRM',
            payload: res.data.userId
          });
        }
      });
    }
  }
}
