import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { CurrentUserConsumer } from "../context/UserContext";
import { db } from "../firebase/firebase";

const useFavouriteCheck = (idShow: number) => {
  const { currentUser } = CurrentUserConsumer();
  const [favourite, setFavourite] = useState<boolean>(false);

  useEffect(() => {
    if (!currentUser) return;
    const userShowId = ref(
      db,
      "users/" + currentUser.uid + "/favorites/" + idShow
    );
    onValue(userShowId, (snapshot) => {
      const data = snapshot.val();
      setFavourite(!!data);
    });
  }, [currentUser]);
  return favourite;
};

export default useFavouriteCheck;
