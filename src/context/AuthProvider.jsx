import { createContext, useState } from "react";
import { JWT_SECRET } from "../config/env";
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from "../services/localStorage";
import jwt_decode from "jwt-decode";
import { adminLogin, userLogin } from "../api/authApi";
import { useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState({});
  // const [persist, setPersist] = useState(
  //   JSON.parse(localStorage.getItem("persist")) || false
  // );

  useEffect(() => {
    const fetchMe = () => {
      try {
        const token = getAccessToken();
        if (token) {
          const decoded = jwt_decode(token, JWT_SECRET);
          // console.log("decoded", decoded);
          // console.log(decoded.id.user);
          setUser(decoded.id.user);
        }
      } catch (err) {
        removeAccessToken();
        navigate("/login");
      }
    };
    fetchMe();
  }, []);

  const login = async (username, password) => {
    // const res = await axios.post("/auth/users/login", { username, password });
    const res = await userLogin({ username, password });
    const token = res.data.token;
    setAccessToken(token);
    const decoded = jwt_decode(token, JWT_SECRET);
    console.log("decoded", decoded);
    console.log(decoded.id.user);
    setUser(decoded.id.user);
    JSON.parse(localStorage.setItem("isLoggedIn", true));
  };

  const loginAdmin = async (username, password) => {
    const res = await axios.post("/auth/admins/login", { username, password });
    setAccessToken(res.data.token);
    const resMe = await axios.get("/customers/me");
    JSON.parse(localStorage.setItem("isLoggedIn", true));
    // setUser(resMe.datKta)
  };

  const logout = () => {
    removeAccessToken();
    localStorage.removeItem("isLoggedIn")
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, login, auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
