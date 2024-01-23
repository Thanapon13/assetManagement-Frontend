import { createContext, useState } from "react";
import { JWT_SECRET } from "../config/env";
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken
} from "../services/localStorage";
import jwt_decode from "jwt-decode";
import { adminLogin, userLogin } from "../api/authApi";
import { useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  console.log("user:", user);
  const [auth, setAuth] = useState({});
  // const [persist, setPersist] = useState(
  //   JSON.parse(localStorage.getItem("persist")) || false
  // );

  useEffect(() => {
    const fetchMe = () => {
      try {
        const token = getAccessToken();
        console.log("token:", token);
        if (token) {
          const decoded = jwt_decode(token, JWT_SECRET);
          console.log("decoded", decoded);

          setUser(decoded?.id?.user);
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
    // console.log("token", token);
    // console.log("1111");
    setAccessToken(token);
    // console.log("2222");
    const decoded = jwt_decode(token, JWT_SECRET);
    // console.log("333");
    // console.log("decoded", decoded);
    // console.log("444");
    // console.log("res--", res.data);
    // console.log("555");
    // console.log("res--", res.data);
    setUser(decoded?.id?.user);
    // console.log("666");
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
    localStorage.removeItem("isLoggedIn");
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, login, auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
