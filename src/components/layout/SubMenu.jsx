import React from 'react'
import * as RiIcons from 'react-icons/ri'

export const SubMenu = ({ children }) => {
  return (
    <div>
      <RiIcons.RiArrowDropDownFill />
      {/* {console.log(children)} */}
      {/* <span>{children.name}</span> */}
    </div>
  )
}
