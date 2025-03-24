import {firestore,auth , storage} from '../utils/Firebase'; 
import { v4 as uuidv4 } from 'uuid'; 
import StaticData from '../utils/Global';



const fetchAllDataFromCollection = async ( collectionName ) => {
    try {
        const collectionRef = firestore.collection(collectionName);
        const snapshot = await collectionRef.get();
        const documents = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return documents;
    } catch (error) {
        console.error('Error fetching data: ', error);
        return null;
    }
};

const fetchData = async () => {
    try {
        const collectionRef = firestore.collection('BANNER');
        const snapshot = await collectionRef.get();
        const documents = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return documents;
    } catch (error) {
        console.error('Error fetching data: ', error);
        return []
    }
};

const getDocumentById = async (collectionName , documentId) => {
    try {
        const collectionRef = firestore.collection(collectionName);
        const documentSnapshot = await collectionRef.doc(documentId).get();
        if (documentSnapshot.exists) {
            return {
                id: documentSnapshot.id,
                ...documentSnapshot.data()
            };
        } else {
            console.log('Document does not exist');
            return null;
        }
    } catch (error) {
        console.error('Error getting document: ', error);
        return null;
    }
};


const updateSiteCounter = async (collectionName, documentId) => {
  try {
      const collectionRef = firestore.collection(collectionName);
      const documentRef = collectionRef.doc(documentId);
      const documentSnapshot = await documentRef.get();
      if (!documentSnapshot.exists) {
          console.log('Document does not exist');
          return null;
      }

      var newData  = documentSnapshot.data()
      newData.webSiteCount = newData.webSiteCount + 1
      await documentRef.update(newData);
      console.log('Document updated ');
      return null;
  } catch (error) {
      console.error('Error updating document: ', error);
      return null;
  }
};


const login = async(email , password) => {
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        if (user) {
          const uid = user.uid;
          return uid; 
        } else {
          return null;
        }
      } catch (error) {
        return null;
      }
}


const logOut = async () => {
    try {
        await auth.signOut();
        localStorage.removeItem('uuid')
        return true;
      } catch (error) {
        return false;
      }
}

const uploadImageToStorage = async (imageDataUrl, collectionName) => {
    try {
        // Extract the data URL from the imageDataUrl object
        const dataUrl = imageDataUrl.data_url;

        // Extract the MIME type from the file object
        const mimeType = imageDataUrl.file.type;

        // Determine the file extension based on the MIME type
        let extension = '';
        switch (mimeType) {
            case 'image/jpeg':
                extension = '.jpg';
                break;
            case 'image/png':
                extension = '.png';
                break;
            // Add cases for other supported image types if needed
            default:
                console.error('Unsupported MIME type:', mimeType);
                throw new Error('Unsupported MIME type');
        }

        // Convert DataURL to Blob
        const blob = await fetch(dataUrl)
            .then(res => res.blob())
            .then(blob => {
                console.log('Blob:', blob);
                return new Blob([blob], { type: mimeType });
            });

        // Generate unique file name with the dynamically picked extension
        const fileName = `${uuidv4()}_${new Date().getTime()}${extension}`;
        console.log('File Name:', fileName);
        
        // Reference to the storage location
        const storageRef = storage.ref(`${collectionName}/${fileName}`);
        console.log('Storage Ref:', storageRef);

        // Upload Blob to Firebase Storage
        const uploadTask = storageRef.put(blob);
        console.log('Upload Task:', uploadTask);

        // Get the snapshot after upload completes
        const snapshot = await uploadTask;
        console.log('Snapshot:', snapshot);

        // Get download URL of the uploaded image
        const downloadURL = await snapshot.ref.getDownloadURL();
        console.log('Download URL:', downloadURL);

        return downloadURL;
    } catch (error) {
        console.error('Error uploading image to storage:', error);
        throw error;
    }
};


  const addDocumentToCollection = async (collectionName, data) => {
    try {
      const collectionRef = firestore.collection(collectionName);
      await collectionRef.add(data);
      console.log('Document added to collection:', collectionName);
    } catch (error) {
      console.error('Error adding document to collection:', error);
      throw error;
    }
  };


  const fetchAllDataFromStoryDbThatArePending = async ( collectionName ) => {
    try {
        const collectionRef = firestore.collection(collectionName);
        const snapshot = await collectionRef.where('status', '==', 0).get();
        const documents = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return documents;
    } catch (error) {
        console.error('Error fetching data: ', error);
        return null;
    }
};


const fetchAllDataFromStoryDbThatAreAccept = async ( collectionName ) => {
  try {
      const collectionRef = firestore.collection(collectionName);
      const snapshot = await collectionRef.where('status', '==', 1).get();
      const documents = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
      }));
      return documents;
  } catch (error) {
      console.error('Error fetching data: ', error);
      return null;
  }
};



const fetchAllDataFromStoryDbThatAreAcceptWithMaxCount = async (collectionName) => {
  try {
    const collectionRef = firestore.collection(collectionName);
    const snapshot = await collectionRef
      .where('status', '==', 1)
      .orderBy('count', 'desc') 
      .limit(4)
      .get();
    const documents = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log("Sssssssss")
    console.log(documents);
    console.log("Sssssssss")
    return documents;
  } catch (error) {
    console.error('Error fetching data: ', error);
    return null;
  }
};




const updateDocumentById = async (collectionName , documentId , updatedDoc) => {
    try {
      // Reference to the Firestore document by its ID
      const docRef = firestore.collection(collectionName).doc(documentId);
      // Update the document with the new status
      await docRef.update(
        updatedDoc
          
      );
      
      console.log('Document updated successfully.');
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };


  const updateImageDocumentById = async (collectionName, documentId, imageList, firstImage) => {
    try {
        console.log(documentId);
      // Upload all images to Firebase Storage and retrieve their download URLs
      const downloadURLs = await Promise.all(imageList.map(imageDataUrl => uploadImageToStorage(imageDataUrl, collectionName)));
  
      // Reference to the Firestore document by its ID
      const docRef = firestore.collection(collectionName).doc(documentId);
  
      // Update the document with the new imageList and firstImage
      await docRef.update({
        images: [firstImage , ...downloadURLs]
      });
      console.log('Document updated successfully.');
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };


  const deleteFileByUrl = async (fileUrl) => {
    try {
      const filename = decodeURIComponent(fileUrl.split('/').pop().split('?')[0]);
      const fileRef = storage.ref().child(filename);
      await fileRef.delete();
      
      console.log('File deleted successfully:', fileUrl);
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  };
  


  const deleteDocument = async (collectionName, document) => {
    try {
      // Extract the document ID
      const documentId = document.id;
  
      // Check if the document has images
      if (document.images && document.images.length > 0) {
        // Delete each image from Firebase Storage
        const deleteImagePromises = document.images.map(async (imageUrl) => {
          // Delete the file from Firebase Storage using its URL
          await deleteFileByUrl(imageUrl);
        });
  
        // Wait for all image deletions to complete
        await Promise.all(deleteImagePromises);
      }
  
      // Reference to the Firestore document by its ID
      const docRef = firestore.collection(collectionName).doc(documentId);
  
      // Delete the document from Firestore
      await docRef.delete();
  
      console.log('Document deleted successfully');
    } catch (error) {
      console.error('Error deleting document:', error);
      throw error;
    }
  };
  

  
export { fetchAllDataFromCollection, fetchData, getDocumentById  , updateSiteCounter , login , logOut , addDocumentToCollection , fetchAllDataFromStoryDbThatArePending , updateDocumentById , updateImageDocumentById , deleteDocument , fetchAllDataFromStoryDbThatAreAccept  , fetchAllDataFromStoryDbThatAreAcceptWithMaxCount};
