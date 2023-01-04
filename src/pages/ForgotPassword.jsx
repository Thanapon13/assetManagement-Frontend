import backgroundPageLogin from "../public/pics/backgroundPageLogin.png";
import logo from "../public/pics/logo.png";

import { AiOutlineEyeInvisible } from "react-icons/ai";
import { BsFillEyeFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useState } from "react";

function ForgotPassword() {
  // main state
  const [toggle, setToggle] = useState(false);
  const [confirmToggle, setConfirmToggle] = useState(false);

  return (
    <div className="relative">
      <img
        src={backgroundPageLogin}
        className="w-[100vw] h-[100vh] object-cover"
      />
      <div className="absolute top-5  w-full px-5 sm:px-10 ">
        {/* left */}
        <div className="md:flex justify-between">
          <div className="flex items-center justify-center">
            <img
              src={logo}
              className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] "
            />
            <div className="ml-2 sm:ml-4 text-xl sm:text-2xl font-bold text-text-green">
              <span>DEDE </span>
              <span className="relative">
                Hospital
                <span className="absolute -top-3 -right-4 sm:-top-4 sm:-right-5 ">
                  +
                </span>
              </span>
            </div>
          </div>
          {/* top right */}
          <div>
            <div className="text-center mt-2   text-xl sm:text-2xl   text-text-green">
              ระบบบริหารงานทรัพย์สิน
            </div>
            <div className="text-center   sm:text-lg  text-text-green">
              Asset Management
            </div>
          </div>
        </div>

        {/* gray box */}
        <div className="mt-5 flex justify-center">
          <div className="bg-white bg-opacity-40  px-10 py-5 sm:py-10 md:py-16 rounded-lg w-[642px] ">
            <div className="text-xl sm:text-2xl lg:text-3xl  text-text-green font-bold tracking-widest text-center">
              ตั้งรหัสผ่านใหม่
            </div>
            {/* input */}
            <div className="text-left">
              <div className="text-xs text-text-gray mt-6 sm:mt-4 md:mt-6">รหัสผ่านใหม่</div>
              <div className="flex relative">
                <input
                  type={confirmToggle ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                  // onChange={handleChangeConfirmPassword}
                  // value={input.confirmPassword}
                  className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
                />
                <button
                  className=" absolute top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2"
                  onClick={() => setConfirmToggle(!confirmToggle)}
                >
                  {confirmToggle ? (
                    <AiOutlineEyeInvisible className="text-text-green" />
                  ) : (
                    <BsFillEyeFill className="w-[16px] h-[16px] text-text-green" />
                  )}
                </button>
              </div>

              <div className="text-xs text-text-gray mt-6">
                ยืนยันรหัสผ่านใหม่
              </div>
              <div className="flex relative">
                <input
                  type={toggle ? "text" : "password"}
                  name="password"
                  id="password"
                  // onChange={handleChangePassword}
                  // value={input.password}
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
              <div className="text-[10px] sm:text-xs text-text-gray mt-5 sm:mt-8 md:mt-10">
                <div>รหัสผ่านที่ท่านระบุทั้ง 2 ช่องต้องตรงกัน</div>
                <div className="mt-2">รหัสผ่านต้องมากกว่า 8 ตัว</div>
                <div className="flex flex-col ">
                  <div className="mt-2">
                    รหัสผ่านต้องประกอบด้วยตัวพิมพ์ใหญ่ A-Z , ตัวพิมพ์เล็ก a-z ,
                    ตัวเลข 0-9
                  </div>
                  <div className="mt-2">{`และอักขระพิเศษอย่างน้อย 1 ตัว (!@#$%^&*()_-,+=/><?)`}</div>
                </div>
              </div>

              <button
                // to="/assetInformation"
                type="button"
                className=" text-white w-full px-4 py-2 mt-8 sm:mt-12  rounded tracking-wider bg-text-green hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
              >
                ยืนยันรหัสผ่านใหม่
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
