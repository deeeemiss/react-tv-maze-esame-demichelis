import { useEffect, useState } from "react";
import { ref, onValue, off } from "firebase/database";
import { db } from "../firebase/firebase";
import { firebaseDbMovie } from "../models/show";

const useWatching = (userId: string | null | undefined) => {
  const [watch, setWatch] = useState<firebaseDbMovie>();

  useEffect(() => {
    if (userId) {
      const userShow = ref(db, "users/" + userId + "/watching");
      onValue(userShow, (snapshot) => {
        const data = snapshot.val();
        setWatch(data);

        off(userShow);
      });
    } else return;
  }, [userId]);

  return watch;
};

export default useWatching;
