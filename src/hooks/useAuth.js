import { useEffect, useState } from "react";
import API from "../services/api";

const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const verify = async () => {
      try {
        await API.get("/auth/verify");
        setIsAuth(true);
      } catch {
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, []);

  return { loading, isAuth };
};

export default useAuth;