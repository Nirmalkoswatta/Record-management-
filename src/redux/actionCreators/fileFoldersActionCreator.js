import * as types from "../actionsTypes/fileFolderActionTypes";
import fire from "../../config/firebase";

const addFolder = (payload) => ({
    type: types.CREATE_FOLDER,
    payload
});

const addFolders = (payload) => ({
    type: types.ADD_FOLDER,
    payload
});

const setLoading = (payload) => ({
    type: types.SET_LOADING,
    payload,
});

export const createFolder = (data) => (dispatch) => {
    const sanitizedData = {};
    Object.keys(data).forEach((key) => {
        if (typeof data[key] !== 'undefined') {
            sanitizedData[key] = data[key];
        }
    });

    fire.firestore()
        .collection("folders")
        .add(sanitizedData)
        .then((folderRef) => folderRef.get())
        .then((folderSnapshot) => {
            const folderData = folderSnapshot.data();
            dispatch(addFolder(folderData));
            alert("Folder added successfully");
        })
        .catch((error) => {
            console.error("Error adding folder: ", error);
            alert("Failed to add folder");
        });
};

export const getFolders = (userId) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const foldersSnapshot = await fire.firestore().collection("folders").where("userId", "==", userId).get();
        const folderData = foldersSnapshot.docs.map((folder) => folder.data());
        dispatch(addFolders(folderData));
    } catch (error) {
        console.error("Error fetching folders: ", error);
    } finally {
        dispatch(setLoading(false));
    }
};
