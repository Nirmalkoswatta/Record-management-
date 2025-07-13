import * as types from "../actionsTypes/fileFolderActionTypes";
import { db } from "../../config/firebase"; // Import Firestore modular instance
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { toast } from 'react-toastify';

const addFolder = (payload) => ({
  type: types.CREATE_FOLDER,
  payload,
});

const addFolders = (payload) => ({
  type: types.ADD_FOLDER,
  payload,
});

const setLoading = (payload) => ({
  type: types.SET_LOADING,
  payload,
});

export const createFolder = (data) => async (dispatch) => {
  try {
    const sanitizedData = {};
    Object.keys(data).forEach((key) => {
      if (typeof data[key] !== "undefined") {
        sanitizedData[key] = data[key];
      }
    });

    const docRef = await addDoc(collection(db, "folders"), sanitizedData);
    const folderSnapshot = await getDocs(
      query(collection(db, "folders"), where("__name__", "==", docRef.id))
    );
    const folderData = folderSnapshot.docs[0].data();

    dispatch(addFolder(folderData));
    toast.success("Folder added successfully");
  } catch (error) {
    console.error("Error adding folder: ", error);
    toast.error("Failed to add folder");
  }
};

export const getFolders = (userId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const q = query(collection(db, "folders"), where("userId", "==", userId));
    const foldersSnapshot = await getDocs(q);
    const folderData = foldersSnapshot.docs.map((doc) => doc.data());
    dispatch(addFolders(folderData));
  } catch (error) {
    console.error("Error fetching folders: ", error);
  } finally {
    dispatch(setLoading(false));
  }
};
