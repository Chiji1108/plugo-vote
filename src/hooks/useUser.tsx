import { getAnalytics, logEvent, setUserId } from "firebase/analytics";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../utils/firebase";

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
        console.log(u);
        if (process.env.NODE_ENV === "production") {
          const analytics = getAnalytics();
          logEvent(analytics, "login");
          setUserId(analytics, u.uid);
        }
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return user;
};
