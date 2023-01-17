import { createContext, useState, useEffect, useContext } from "react";
import { auth } from "../firebase/firebase";

import { onAuthStateChanged, User } from "firebase/auth";

interface AuthContextType {
  currentUser?: User | null;
  logOut: () => void;
}

interface UserContextProps {
  children: React.ReactNode;
}

export const UserContext = createContext<AuthContextType>({
  currentUser: undefined,
  logOut: async () => {},
});

export const UserContextProvider = ({ children }: UserContextProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
      return () => unsubscribe();
    });
  }, []);

  const logOut = () => {
    auth
      .signOut()
      .then(() => {
        console.log("out");
      })
      .catch((err) => console.log(err));
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        logOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const CurrentUserConsumer = () => {
  return useContext(UserContext);
};
