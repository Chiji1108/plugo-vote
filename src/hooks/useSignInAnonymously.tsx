import {
  getAuth,
  signInAnonymously,
  getAdditionalUserInfo,
} from "firebase/auth";
import { useAsync } from "react-use";
import { auth } from "../utils/firebase";

export const useSignInAnonymously = () => {
  const { loading, error, value } = useAsync(() => signInAnonymously(auth), []);
  // console.log(value);
  let isNewUser;
  if (value) {
    isNewUser = getAdditionalUserInfo(value)?.isNewUser;
    if (isNewUser) {
      console.log("new user!!!");
    }
  }

  return { loading, error, userCredential: value, isNewUser };
};
