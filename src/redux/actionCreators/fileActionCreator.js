import * as types from '../actionsTypes/fileActionTypes';
import { db } from '../../config/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc, query, where } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { toast } from 'react-toastify';

const setFileLoading = (payload) => ({ type: types.SET_FILE_LOADING, payload });
const setFiles = (payload) => ({ type: types.SET_FILES, payload });

export const createFile = (data, file) => async (dispatch) => {
  try {
    dispatch(setFileLoading(true));
    let storageUrl = '';
    let type = data.type || 'text';
    if (file) {
      // Upload to Firebase Storage
      const storage = getStorage();
      const storageRef = ref(storage, `files/${data.userId}/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      storageUrl = await getDownloadURL(storageRef);
      type = file.type.startsWith('image') ? 'image' : file.type.startsWith('video') ? 'video' : 'other';
    }
    const fileDoc = {
      name: data.name,
      type,
      content: data.content || '',
      storageUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: data.userId,
    };
    const docRef = await addDoc(collection(db, 'files'), fileDoc);
    const newFile = { ...fileDoc, id: docRef.id };
    dispatch({ type: types.CREATE_FILE, payload: newFile });
    toast.success('File created successfully');
  } catch (error) {
    console.error('Error creating file:', error);
    toast.error('Failed to create file');
  } finally {
    dispatch(setFileLoading(false));
  }
};

export const updateFile = (id, updates) => async (dispatch) => {
  try {
    const fileRef = doc(db, 'files', id);
    await updateDoc(fileRef, { ...updates, updatedAt: new Date() });
    dispatch({ type: types.UPDATE_FILE, payload: { id, updates } });
    toast.success('File updated');
  } catch (error) {
    console.error('Error updating file:', error);
    toast.error('Failed to update file');
  }
};

export const deleteFiles = (ids) => async (dispatch, getState) => {
  try {
    const storage = getStorage();
    const userId = getState().auth.user?.uid;
    for (const id of ids) {
      const fileRef = doc(db, 'files', id);
      // Get file data for storageUrl
      const fileSnap = await getDoc(fileRef);
      const fileData = fileSnap.data();
      if (fileData && fileData.storageUrl) {
        // Delete from storage
        const fileStorageRef = ref(storage, fileData.storageUrl);
        await deleteObject(fileStorageRef);
      }
      await deleteDoc(fileRef);
    }
    dispatch({ type: types.DELETE_FILE, payload: ids });
    toast.success('File(s) deleted');
    // Re-fetch files to update UI
    if (userId) {
      dispatch(getFiles(userId));
    }
  } catch (error) {
    console.error('Error deleting file(s):', error);
    toast.error('Failed to delete file(s)');
  }
};

export const getFiles = (userId) => async (dispatch) => {
  try {
    dispatch(setFileLoading(true));
    const q = query(collection(db, 'files'), where('userId', '==', userId));
    const filesSnapshot = await getDocs(q);
    const files = filesSnapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
    dispatch(setFiles(files));
  } catch (error) {
    console.error('Error fetching files:', error);
    toast.error('Failed to fetch files');
  } finally {
    dispatch(setFileLoading(false));
  }
}; 