import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth, db } from "../config/firebaseConfig";

export const UserDetailContext = createContext(null);

export default function UserDetailProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setLoadingUser(false);
        return;
      }

      try {
        const cleanEmail = firebaseUser.email
          ? firebaseUser.email.trim().toLowerCase()
          : null;

        if (!cleanEmail) {
          setUser(null);
          setLoadingUser(false);
          return;
        }

        const snap = await getDoc(doc(db, "users", cleanEmail));

        if (snap.exists()) {
          setUser(snap.data());
        } else {
          const baseName =
            firebaseUser.displayName ||
            cleanEmail.split("@")[0].toUpperCase();

          setUser({
            name: baseName,
            email: cleanEmail,
            uid: firebaseUser.uid,
          });
        }
      } catch (err) {
        console.log("Erro ao carregar perfil do usuário:", err);
        setUser(null);
      } finally {
        setLoadingUser(false);
      }
    });

    return () => unsub();
  }, []);

  const value = {
    user,
    setUser,
    loadingUser,

    userDetail: user,
    setUserDetail: setUser,
  };

  return (
    <UserDetailContext.Provider value={value}>
      {children}
    </UserDetailContext.Provider>
  );
}


export const useUserDetail = () => {
  const ctx = useContext(UserDetailContext);
  if (!ctx) {
    throw new Error("useUserDetail deve ser usado dentro de UserDetailProvider");
  }
  return ctx;
};
