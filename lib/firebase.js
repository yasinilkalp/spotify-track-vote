import { initializeApp } from "@firebase/app";
import { deleteDoc, getFirestore } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "@firebase/auth";
import { collection, addDoc, getDocs, doc, query, where } from "firebase/firestore";


const app = initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
});
const db = getFirestore(app);

export const signIn = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    let result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    const user = result.user;
    return {
        token,
        user: {
            uid: user.uid,
            accessToken: user.accessToken,
            displayName: user.displayName,
            photoURL: user.photoURL,
            email: user.email,
        },
    };

}

export const addTrack = async (track, user) => {

    try {
        var trackRef = collection(db, "tracks");
        const checkQuery = query(trackRef, where("user.uid", "==", user.uid), where("track.id", "==", track.id));
        let tracks = await getDocs(checkQuery);
        if (tracks.size === 0) {
            await addDoc(trackRef, { user, track, votes: [] });
            return true;
        } else {
            console.log('Bu kayıt daha önce eklenmiş')
        }
    } catch (e) {
        console.error("Error adding document: ", e);
    }
    return false;

};

export const getTracks = async () => {
    var trackRef = collection(db, "tracks");
    let tracks = await getDocs(trackRef);
    let data = [];
    tracks.forEach(x => data.push(x.data()));
    return data;
};

export const deleteTrack = async (track, user) => {
    try {
        var trackRef = collection(db, "tracks");
        const checkQuery = query(trackRef, where("user.uid", "==", user.uid), where("track.id", "==", track.id));
        let tracks = await getDocs(checkQuery);
        tracks.forEach(x => deleteDoc(doc(db, "tracks", x.id)));
        return true;
    } catch (e) {
        console.error("Error adding document: ", e);
    }
    return false;
};