import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDfeYIHvHfkFAeaQE7Ma-ekbr6gpkdgSOE",
  authDomain: "react-tvmaze-demichelis.firebaseapp.com",
  databaseURL:
    "https://react-tvmaze-demichelis-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "react-tvmaze-demichelis",
  storageBucket: "react-tvmaze-demichelis.appspot.com",
  messagingSenderId: "722868754770",
  appId: "1:722868754770:web:dd8e4ef504e7ec6cedc28b",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
export const db = getDatabase(app);

export const user = {
  uid: "",
  email: "",
};

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    user.uid = res.user.uid;
    user.email = res.user.email!;
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    user.uid = res.user.uid;
    user.email = res.user.email!;
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  app,
};
