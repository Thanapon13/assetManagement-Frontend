import backgroundPageLogin from "../public/pics/backgroundPageLogin.png";
import logo from "../public/pics/logo.png";

import { AiOutlineEyeInvisible } from "react-icons/ai";
import { BsFillEyeFill } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import { adminLogin } from "../api/authApi";

function LoginPage() {
  const { login, setAuth, persist, setPersist } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  // console.log("username:", username);
  const [password, setPassword] = useState("");
  // console.log("password:", password);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  // main state
  const [toggle, setToggle] = useState(false);

  const togglePersist = () => {
    setPersist(prev => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   try {
  //     const response = await axios.post(
  //       '/api/auth',
  //       {
  //         username: user,
  //         password: password,
  //       },
  //       {
  //         withCredentials: true,
  //       }
  //     )
  //     // console.log(response?.data)
  //     const { accessToken, roles } = response?.data
  //     // localStorage.setItem('userProfile', JSON.stringify(apiResponse.data))
  //     setAuth({ user, password, roles, accessToken })
  //     setUser('')
  //     setPassword('')
  //     navigate(from, { replace: true })
  //     // navigate('/dashboard')
  //   } catch (error) {
  //     !error?.response
  //       ? setErrMsg('No Server Response')
  //       : error.response?.staus === 400
  //       ? setErrMsg('Missing Username or Password')
  //       : error.response?.state === 401
  //       ? setErrMsg('Unauthorized')
  //       : setErrMsg('Login Fail')

  //     errRef.current.focus()
  //   }
  // }

  const handleSubmitLogin = async e => {
    try {
      e.preventDefault();
      const res = await login(username, password);
      console.log("res:", res);
    } catch (err) {
      console.log(err);
      // setError(err.response.data.message);
    }
  };

  return (
    <div className="relative">
      <img
        src={backgroundPageLogin}
        className="w-[100vw] h-[100vh] object-cover"
      />
      <div className="absolute top-5 lg:top-20 w-full px-5 pb-20 sm:px-16 md:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-7 gap-y-5 text-center">
          {/* left */}
          <div>
            <div className="flex items-center justify-center">
              <img
                src={logo}
                className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px]  lg:w-[140px] lg:h-[140px]"
              />
              <div className="ml-2 sm:ml-4 text-2xl sm:text-3xl lg:text-5xl font-bold text-text-green">
                <span>DEDE </span>
                <span className="relative">
                  Hospital
                  <span className="absolute -top-3 -right-4 sm:-top-4 sm:-right-5 lg:-top-6 lg:-right-6">
                    +
                  </span>
                </span>
              </div>
            </div>
            <div className="mt-2  lg:mt-10 text-2xl sm:text-3xl lg:text-5xl  text-text-green">
              ระบบบริหารงานทรัพย์สิน
            </div>
            <div className="sm:mt-2 lg:mt-5 sm:text-xl lg:text-3xl  text-text-green">
              Asset Management
            </div>
          </div>
          {/* right */}
          <div className="bg-white bg-opacity-40 px-10 py-10 lg:py-16 rounded-lg xl:w-[642px]">
            <div className="text-xl sm:text-2xl lg:text-3xl  text-text-green font-bold tracking-widest">
              เข้าสู่ระบบ / Login
            </div>
            {/* input */}
            <form className="text-left" onSubmit={handleSubmitLogin}>
              <div className="text-xs text-text-gray mt-12">Username</div>
              <p ref={errRef} className={errMsg ? "bg-red-500 " : " block "}>
                {errMsg}
              </p>
              <input
                type="text"
                ref={userRef}
                name="username"
                id="username"
                onChange={e => setUsername(e.target.value)}
                value={username}
                className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
              <div className="text-xs text-text-gray mt-6">Password</div>
              <div className="flex relative">
                <input
                  type={toggle ? "text" : "password"}
                  name="password"
                  id="password"
                  onChange={e => setPassword(e.target.value)}
                  value={password}
                  className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
                />
                <button
                  className=" absolute top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2"
                  onClick={() => setToggle(!toggle)}
                >
                  {toggle ? (
                    <AiOutlineEyeInvisible className="text-text-green" />
                  ) : (
                    <BsFillEyeFill className="w-[16px] h-[16px] text-text-green" />
                  )}
                </button>
              </div>
              <div className="">
                <input
                  type="checkbox"
                  id="persist"
                  onChange={togglePersist}
                  checked={persist}
                />
              </div>
              <div className="flex justify-end mt-4  lg:mt-10">
                <Link
                  to="/emailConfirmation"
                  className="underline text-text-blue text-xs "
                >
                  Forgot Password
                </Link>
              </div>

              <button
                // to="/assetInformation"
                type="submit"
                className=" text-white w-full px-4 py-2 mt-12 lg:mt-20 rounded tracking-wider bg-text-green hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
