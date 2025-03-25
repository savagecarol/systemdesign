import {firestore,auth} from '../utils/Firebase'; 
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

const fetchDataFromKey = async ( collectionName , key , data ) => {
  try {
      const collectionRef = firestore.collection(collectionName);
      const snapshot = await collectionRef.where(key, '==', data).get();
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


const getDocumentsBySubjectAndChapter = async (subject, chapter) => {
  try {
    const collectionRef = firestore.collection(StaticData.collectionName.topicDb);
    const querySnapshot = await collectionRef
      .where("subject", "==", subject)
      .where("chapter", "==", chapter)
      .orderBy("createdAt")  
      .get();

    if (!querySnapshot.empty) {
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } else {
      console.log('No matching topics found');
      return [];
    }
  } catch (error) {
    console.error('Error getting documents from TopicDb: ', error);
    return [];
  }
};

  
export { fetchAllDataFromCollection, fetchData, getDocumentById  , login , logOut , addDocumentToCollection , fetchAllDataFromStoryDbThatArePending , fetchDataFromKey  , getDocumentsBySubjectAndChapter};
