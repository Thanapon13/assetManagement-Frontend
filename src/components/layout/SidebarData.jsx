import React, { useState } from 'react'
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
    name: 'เบิกครุภัณฑ์',
    icon: <TfiPackage />,
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
