import { initializeApp } from "@firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "@firebase/auth";
import { collection, addDoc, getDocs, deleteDoc, orderBy, getFirestore, updateDoc, doc, query, where } from "firebase/firestore";
import { toast } from 'react-toastify';



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
        const checkQuery = query(trackRef, where("track.id", "==", track.id));
        let tracks = await getDocs(checkQuery);
        if (tracks.size === 0) {
            await addDoc(trackRef, { user, track, votes: [] });
            return true;
        } else {
            toast.warn('Bu kayıt daha önce eklenmiştir.');
        }
    } catch (e) {
        toast.error("Error adding document: " + e);
    }
    return false;

};

export const getTracks = async () => {
    var trackRef = collection(db, "tracks");
    var q = query(trackRef, orderBy("votes","desc"));
    let tracks = await getDocs(q);
    let data = [];
    tracks.forEach(x => data.push(x.data()));
    return data;
};

export const deleteTrack = async (track, user) => {
    try {
        var trackRef = collection(db, "tracks");
        const checkQuery = query(trackRef, where("user.uid", "==", user.uid), where("track.id", "==", track.id));
        let tracks = await getDocs(checkQuery);
        if (tracks.size === 0) {
            toast.error('Bu kaydı silmek için yetkiniz yok.');
            return false;
        }
        tracks.forEach(x => deleteDoc(doc(db, "tracks", x.id)));
        return true;
    } catch (e) {
        console.error("Error remove document: ", e);
    }
    return false;
};

export const voteTrack = async (track, user) => {
    try {

        if(Object.keys(user).length === 0){
            toast.info("Oy verebilmek için giriş yapmalısınız.");
            return false;
        }

        var trackRef = collection(db, "tracks");
        const checkQuery = query(trackRef, where("track.id", "==", track.id));
        let tracks = await getDocs(checkQuery);
        if (tracks.size === 0) {
            toast.error('Bu kaydı güncellemek için yetkiniz yok.');
            return false;
        }
        tracks.forEach(x => {
            var data = x.data();
            if (data.votes.some(s => s.user.uid == user.uid)) {
                toast.warn("Daha önce oy vermiştiniz.");
                return false;
            };
            data.votes.push({ user });
            updateDoc(doc(db, "tracks", x.id), data);
        });
        return true;
    } catch (e) {
        toast.error("Error update document: " + e);
    }
    return false;
};