import * as types from '../actionsTypes/authActionTypes';
import fire from '../../config/firebase';


const loginUser = (user) => ({
  type: types.SIGN_IN, 
  payload: user,
});

const logoutUser = () => ({
  type: types.SIGN_OUT,
});

export const signInUser = (email, password, setSuccess) => (dispatch) => {
  fire.auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      dispatch(
        loginUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        })
      );
      setSuccess(true);
    })
    .catch((error) => {
      alert('Invalid email or password. Please try again.');
      console.error('Error signing in:', error);
    });
};


export const signUpUser = (name, email, password, setSuccess) => (dispatch) => {
  fire.auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user.updateProfile({ displayName: name });
    })
    .then(() => {
      const user = fire.auth().currentUser;
      dispatch(
        loginUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        })
      );
      setSuccess(true);
    })
    .catch((error) => {
      let errorMessage;
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'This email address is already in use.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address.';
          break;
        case 'auth/weak-password':
          errorMessage = 'The password is too weak.';
          break;
        default:
          errorMessage = 'Error signing up.';
      }
      alert(errorMessage);
      console.error('Error signing up:', error);
    });
};


export const signOutUser = () => (dispatch) => {
  fire.auth()
    .signOut()
    .then(() => {
      dispatch(logoutUser());
    })
    .catch((error) => {
      console.error('Error signing out:', error);
    });
};


export const checkIsLoggedIn = () => dispatch => {
 fire.auth().onAuthStateChanged(user =>{

  if (user){
    dispatch(
      loginUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      })
    );
  }
 }) 
 


}
