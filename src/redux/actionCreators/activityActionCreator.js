import * as types from '../actionsTypes/activityActionTypes';
import { db } from '../../config/firebase';
import { collection, addDoc, getDocs, query, where, orderBy, limit, doc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const setActivityLoading = (payload) => ({ type: types.SET_ACTIVITY_LOADING, payload });
const setActivities = (payload) => ({ type: types.SET_ACTIVITIES, payload });

export const addActivity = (userId, actionType, itemType, itemName) => async (dispatch) => {
  try {
    const activity = {
      userId,
      actionType, // e.g., 'create', 'edit', 'delete', 'upload', 'share'
      itemType,   // 'file' or 'folder'
      itemName,
      read: false,
      timestamp: new Date(),
    };
    await addDoc(collection(db, 'activities'), activity);
    dispatch({ type: types.ADD_ACTIVITY, payload: activity });
  } catch (error) {
    toast.error('Failed to log activity');
  }
};

export const getActivities = (userId, max = 20) => async (dispatch) => {
  try {
    dispatch(setActivityLoading(true));
    const q = query(
      collection(db, 'activities'),
      where('userId', '==', userId),
      orderBy('timestamp', 'desc'),
      limit(max)
    );
    const snap = await getDocs(q);
    const activities = snap.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
    dispatch(setActivities(activities));
  } catch (error) {
    toast.error('Failed to fetch activity log');
  } finally {
    dispatch(setActivityLoading(false));
  }
};

export const markActivityRead = (activityId) => async (dispatch, getState) => {
  try {
    const activityRef = doc(db, 'activities', activityId);
    await updateDoc(activityRef, { read: true });
    // Optionally, re-fetch activities or update state
    const userId = getState().auth.user?.uid;
    if (userId) dispatch(getActivities(userId, 20));
  } catch (error) {
    toast.error('Failed to mark as read');
  }
};

export const markAllActivitiesRead = () => async (dispatch, getState) => {
  try {
    const userId = getState().auth.user?.uid;
    if (!userId) return;
    const q = query(collection(db, 'activities'), where('userId', '==', userId), where('read', '==', false));
    const snap = await getDocs(q);
    const batch = [];
    snap.docs.forEach(docSnap => {
      batch.push(updateDoc(doc(db, 'activities', docSnap.id), { read: true }));
    });
    await Promise.all(batch);
    dispatch(getActivities(userId, 20));
  } catch (error) {
    toast.error('Failed to mark all as read');
  }
}; 