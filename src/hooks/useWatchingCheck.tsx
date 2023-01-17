import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { CurrentUserConsumer } from "../context/UserContext";
import { db } from "../firebase/firebase";

const useWatchingCheck = (idShow: number) => {
  const { currentUser } = CurrentUserConsumer();
  const [watch, setWatch] = useState<boolean>(false);

  useEffect(() => {
    if (!currentUser) return;
    const userShowId = ref(
      db,
      "users/" + currentUser.uid + "/watching/" + idShow
    );
    onValue(userShowId, (snapshot) => {
      const data = snapshot.val();
      setWatch(!!data);
    });
  }, [currentUser]);
  return watch;
};

export default useWatchingCheck;
