import React from 'react'
import { MdSpaceDashboard, MdHomeRepairService } from 'react-icons/md'
import { GoFileDirectory, GoFileSubmodule } from 'react-icons/go'
import { TfiPackage, TfiExchangeVertical } from 'react-icons/tfi'
import { TbTransferIn } from 'react-icons/tb'

export const menuItem = [
  {
    path: '/',
    name: 'แดชบอร์ด',
    icon: <MdSpaceDashboard />,
  },
  {
    path: '/assetInformation',
    name: 'ข้อมูลครุภัณฑ์',
    icon: <GoFileDirectory />,
  },
  {
    path: '/assetGroup',
    name: 'ข้อมูลครุภัณฑ์เป็นชุด',
    icon: <GoFileSubmodule />,
  },
  {
    path: '/assetWithdraw',
    name: 'เบิก-จ่าย ครุภัณฑ์',
    icon: <TfiPackage />,
    submenu: [
      {
        path: '/',
        name: 'รายการเบิกจ่าย',
        icom: '',
      },
      {
        path: '/1',
        name: 'บันทึกเบิกจ่าย',
        icom: '',
      },
      {
        path: '/2',
        name: 'อนุมัติเบิกจ่าย',
        icom: '',
      },
    ],
  },
  {
    path: '/borrowList',
    name: 'ยืม-คืน ครุภัณฑ์',
    icon: <TfiExchangeVertical />,
  },
  {
    path: '/transferAsset',
    name: 'โอน-ย้าย ครุภัณฑ์',
    icon: <TbTransferIn />,
  },
  {
    path: '/repairDashboard',
    name: 'งานซ่อม',
    icon: <MdHomeRepairService />,
  },
]
