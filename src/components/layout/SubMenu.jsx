import React, { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

const SubMenu = ({ item, showSubMenu, setShowSubMenu, setSidebar }) => {
  const [subnav, setSubnav] = useState(showSubMenu);

  // const showSubnav = () => {
  //   setSubnav(!subnav)
  // }
  // const handleClick = () => {
  //   if (!showSubMenu || showSubMenu != item.title) {
  //     setShowSubMenu(item.title)
  //   } else {
  //     setShowSubMenu(false)
  //   }
  // }
  const handleClick = () => {
    if (item.subNav) {
      if (!showSubMenu || showSubMenu != item.title) {
        setShowSubMenu(item.title);
      } else {
        setShowSubMenu(false);
      }
    } else if (item.path) {
      setSidebar(false);
    }
  };

  useEffect(() => {
    setSubnav(showSubMenu == item.title);
  }, [showSubMenu]);

  return (
    <>
      {/* main menu */}
      <NavLink
        to={item.path}
        // onClick={item.subNav && handleClick}
        onClick={handleClick}
        className={({ isActive }) =>
          [
            "flex items-center p-4 h-[60px] rounded-3xl hover:bg-sidebar-green group",
            // isActive ? 'bg-sidebar-green text-text-green' : 'text-text-gray',
            subnav
              ? " text-text-green"
              : item.path == window.location.pathname
              ? " text-text-green bg-sidebar-green"
              : "text-text-gray"
          ]
            .filter(Boolean)
            .join(" ")
        }
      >
        <div className="flex w-full group-hover:text-text-green gap-5">
          <div className="">{item.icon}</div>
          <div className="">{item.title}</div>
        </div>
        <div className="">
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </NavLink>
      {/* sub menu */}
      {
        // subnav &&
        item.subNav?.map((item, index) => {
          return (
            <NavLink
              to={item.path}
              key={index}
              className={({ isActive }) =>
                [
                  "flex items-center gap-2 px-6 rounded-3xl hover:bg-sidebar-green group",
                  isActive
                    ? "bg-sidebar-green text-text-green"
                    : "text-text-gray",
                  "overflow-hidden",
                  !subnav
                    ? "max-h-0 p-0 ease-out duration-400"
                    : "max-h-fit p-3 ease-in duration-300 "
                ]
                  .filter(Boolean)
                  .join(" ")
              }
              onClick={() => setSidebar(false)}
            >
              <div className="flex w-full group-hover:text-text-green gap-5">
                <div className="flex items-center">{item.icon}</div>
                <div className="">{item.title}</div>
              </div>
            </NavLink>
          );
        })
      }
    </>
  );
};

export default SubMenu;
