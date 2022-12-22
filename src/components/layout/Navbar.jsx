import React, { useState } from 'react'
// import styled from 'styled-components'
import { Link } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import { SidebarData } from './SidebarData'
import SubMenu from './SubMenu'
import { IconContext } from 'react-icons/lib'

// const Nav = styled.div`
//   background: #15171c;
//   height: 80px;
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
// `

// const SidebarNav = styled.nav`
//   background: #15171c;
//   width: 250px;
//   height: 100vh;
//   display: flex;
//   justify-content: center;
//   position: fixed;
//   top: 0;
//   left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
//   transition: 350ms;
//   z-index: 10;
// `

// const SidebarWrap = styled.div`
//   width: 100%;
// `
// const NavIcon = styled(Link)`
//   margin-left: 2rem;
//   font-size: 2rem;
//   height: 80px;
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
// `

export const Navbar = () => {
  const [sidebar, setSidebar] = useState(true)

  const showSidebar = () => setSidebar(!sidebar)

  return (
    <>
      <IconContext.Provider value={{ color: 'undefined' }}>
        <div className="h-[80px] flex flex-start items-center">
          <Link to="#" className="flex justify-start items-center text-black">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <div
          className={`${
            sidebar ? 'left-0' : '-left-full '
          }  bg-black text-white w-[250px] h-screen flex justify-center fixed top-0 duration-300 z-10`}
        >
          <div className="w-full">
            <Link to="#">
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </Link>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />
            })}
          </div>
        </div>
      </IconContext.Provider>
    </>
  )
}

export default Navbar
