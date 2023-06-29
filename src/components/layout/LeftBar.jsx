import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import { SidebarData } from '../../router/SidebarData'
import { IconContext } from 'react-icons/lib'
import SubMenu from './SubMenu'

const LeftBar = ({ menu }) => {
  const [showMenu, setShowMenu] = useState(true)
  const handleShowMenu = () => setShowMenu(!showMenu)
  const [showSubMenu, setShowSubMenu] = useState()

  useEffect(() => {
    const path = window.location.pathname
    let finding = false
    SidebarData.map(data => {
      if(finding) return
      if(data.subNav?.find(ele => ele.path == path)) finding = data.title
    })
    setShowSubMenu(finding)
  }, [])

  return (
    <>
      <IconContext.Provider value={{ color: 'undefined' }}>
        {/* menu */}
        <div className="flex">
          <div
            className={`${showMenu ? 'left-0 ' : '-left-full '
              } w-[250px] bg-white h-full duration-300 `}
          >
            <div>
              {SidebarData.map((item, index) => {
                if (menu.find(ele => ele.order == item.order)) {
                  return <SubMenu item={item} key={index} showSubMenu={showSubMenu} setShowSubMenu={setShowSubMenu} />
                }
              })}
            </div>
          </div>
          {/* <main className="">{children}</main> */}
        </div>
      </IconContext.Provider>
    </>
  )
}

export default LeftBar
