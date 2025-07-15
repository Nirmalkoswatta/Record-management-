import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";
import { auth } from '../../config/firebase';
import { SIGN_IN, SIGN_OUT } from '../actionsTypes/authActionTypes';
import { toast } from 'react-toastify';

export const signInUser = (email, password, setSuccess) => async (dispatch) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        dispatch({ type: SIGN_IN, payload: userCredential.user });
      setSuccess(true);
    } catch (error) {
        toast.error('Invalid email or password. Please try again.');
    }
};

export const signUpUser = (name, email, password, setSuccess) => async (dispatch) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
        dispatch({ type: SIGN_IN, payload: userCredential.user });
      setSuccess(true);
    } catch (error) {
        toast.error(error.message);
    }
};

export const signOutUser = () => async (dispatch) => {
    await signOut(auth);
    dispatch({ type: SIGN_OUT });
};

export const checkIsLoggedIn = () => (dispatch) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      dispatch({
        type: SIGN_IN,
        payload: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        }
      });
    }
  });
};
