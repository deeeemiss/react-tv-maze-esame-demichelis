import {
  getDatabase,
  onValue,
  ref,
  remove,
  set,
  update,
} from "firebase/database";
import { ShowType } from "../api";
import { app } from "../firebase";

export const writeUserData = (email: string, uid: string) => {
  const db = getDatabase(app);
  set(ref(db, "users/" + uid), {
    email: email,
  });
  console.log("User data written!");
  console.log("User ID: " + uid);
  console.log("User email: " + email);
};

export const addFavourite = (show: ShowType, uid: string) => {
  const db = getDatabase(app);
  update(ref(db, "users/" + uid + "/favorites"), { [show.id]: show });
};

export const removeFavourite = (show: ShowType, uid: string) => {
  const db = getDatabase(app);
  remove(ref(db, "users/" + uid + "/favorites" + show.id));
};

export const getUserFavorites = (uid: string) => {
  const db = getDatabase(app);
  onValue(ref(db, "users/" + uid + "/favorites"), (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    return data;
  });
};

/* export const addToWatchlist = (show: ShowType, uid: string) => {
  const db = getDatabase();
  update(ref(db, "users/" + uid + "/watchlist"), { [show.id]: show });
};

export const removeFromWatchlist = (show: ShowType, uid: string) => {
  const db = getDatabase();
  remove(ref(db, "users/" + uid + "watchlist" + show.id));
};

export const getWatchlist = (uid: string) => {
  const db = getDatabase();
  onValue(ref(db, "users/" + uid + "/watchlist"), (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    return data;
  });
}; */
