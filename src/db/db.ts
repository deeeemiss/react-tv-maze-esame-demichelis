import { getDatabase, ref, remove, set, update } from "firebase/database";
import { Show } from "../api";
import { CurrentUserConsumer, UserContext } from "../context/UserContext";

export const writeUserData = (email: any, uid: any) => {
  const db = getDatabase();
  set(ref(db, "users/" + uid), {
    email: email,
  });
};

export const addFavourite = (show: Show, uid: string) => {
  const db = getDatabase();
  update(ref(db, "users/" + uid + "/favorites"), { [show.id]: show });
};

export const removeFavourite = (show: Show, uid: string) => {
  const db = getDatabase();
  remove(ref(db, "users/" + uid + "/favorites/" + show.id));
};

export const addToWatch = (show: Show, uid: string) => {
  const db = getDatabase();
  update(ref(db, "users/" + uid + "/watching"), { [show.id]: show });
};

export const removeFromWatch = (uid: string) => {
  const db = getDatabase();
  remove(ref(db, "users/" + uid + "/watching/"));
};
