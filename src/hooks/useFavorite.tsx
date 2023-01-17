import { useEffect, useState } from "react";
import { ref, onValue, off } from "firebase/database";
import { db } from "../firebase/firebase";
import { firebaseDbMovie } from "../models/show";

const useFavorite = (userId: string | null | undefined) => {
  const [favorite, setFavorite] = useState<firebaseDbMovie>();

  useEffect(() => {
    if (userId) {
      const userShow = ref(db, "users/" + userId + "/favorites");
      onValue(userShow, (snapshot) => {
        const data = snapshot.val();
        setFavorite(data);

        off(userShow);
      });
    } else return;
  }, [userId]);

  return favorite;
};

export default useFavorite;
