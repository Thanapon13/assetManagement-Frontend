import React from 'react'
import * as RiIcons from 'react-icons/ri'

export const SidebarData = [
  {
    title: 'แดชบอร์ด',
    path: '/dashboard',
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 18H2C0.9 18 0 17.1 0 16V2C0 0.9 0.9 0 2 0H8V18ZM10 18H16C17.1 18 18 17.1 18 16V9H10V18ZM18 7V2C18 0.9 17.1 0 16 0H10V7H18Z"
          fill="#999999"
        />
      </svg>
    ),
  },
  {
    title: 'ข้อมูลครุภัณฑ์',
    path: '/assetInformationIndex',
    icon: (
      <svg
        width="20"
        height="16"
        viewBox="0 0 20 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 16V13.75H2.15V1.5C2.15 1.08333 2.29583 0.729167 2.5875 0.4375C2.87917 0.145833 3.23333 0 3.65 0H19.15V1.5H3.65V13.75H9.5V16H0ZM11.975 16C11.6917 16 11.4583 15.8875 11.275 15.6625C11.0917 15.4375 11 15.1833 11 14.9V3.975C11 3.69167 11.0917 3.45833 11.275 3.275C11.4583 3.09167 11.6917 3 11.975 3H18.775C19.0917 3 19.375 3.0875 19.625 3.2625C19.875 3.4375 20 3.675 20 3.975V14.9C20 15.2167 19.8792 15.4792 19.6375 15.6875C19.3958 15.8958 19.1083 16 18.775 16H11.975ZM12.5 13.75H18.5V4.5H12.5V13.75Z"
          fill="#999999"
        />
      </svg>
    ),
  },
  {
    title: 'ข้อมูลครุภัณฑ์เป็นชุด',
    path: '/packageAssetInformation',
    icon: (
      <svg
        width="18"
        height="16"
        viewBox="0 0 18 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 16V12.3H18V16H0ZM1.5 15.05H3.3V13.25H1.5V15.05ZM0 3.7V0H18V3.7H0ZM1.5 2.75H3.3V0.95H1.5V2.75ZM0 9.85V6.15H18V9.85H0ZM1.5 8.9H3.3V7.1H1.5V8.9Z"
          fill="#999999"
        />
      </svg>
    ),
  },
  {
    title: 'เบิกจ่ายครุภัณฑ์',
    path: '/',
    icon: (
      <svg
        width="21"
        height="21"
        viewBox="0 0 21 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.925 8.72502L7.825 4.62502L8.9 3.55002L11.925 6.60002L17.775 0.775024L18.825 1.80002L11.925 8.72502ZM13.15 20.45L5.375 18.225V9.80002H7.725L14.1 12.2C14.55 12.3667 14.9292 12.6375 15.2375 13.0125C15.5458 13.3875 15.7 13.925 15.7 14.625H14.1C13.2833 14.625 12.6875 14.6 12.3125 14.55C11.9375 14.5 11.5417 14.4084 11.125 14.275L9.3 13.675L9.05 14.375L10.925 15.025C11.3083 15.1584 11.7375 15.25 12.2125 15.3C12.6875 15.35 13.175 15.375 13.675 15.375H18.55C19.5 15.375 20.1458 15.5584 20.4875 15.925C20.8292 16.2917 21 16.7834 21 17.4V18.05L13.15 20.45ZM0 19.65V9.80002H3.85V19.65H0Z"
          fill="#999999"
        />
      </svg>
    ),
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: 'รายการเบิกจ่าย',
        path: '/assetWithdraw',
        icon: (
          <svg
            width="18"
            height="10"
            viewBox="0 0 18 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.75 10C0.533333 10 0.354167 9.92917 0.2125 9.7875C0.0708334 9.64583 0 9.46667 0 9.25C0 9.03333 0.0708334 8.85417 0.2125 8.7125C0.354167 8.57083 0.533333 8.5 0.75 8.5C0.966667 8.5 1.14583 8.57083 1.2875 8.7125C1.42917 8.85417 1.5 9.03333 1.5 9.25C1.5 9.46667 1.42917 9.64583 1.2875 9.7875C1.14583 9.92917 0.966667 10 0.75 10ZM0.75 5.75C0.533333 5.75 0.354167 5.67917 0.2125 5.5375C0.0708334 5.39583 0 5.21667 0 5C0 4.78333 0.0708334 4.60417 0.2125 4.4625C0.354167 4.32083 0.533333 4.25 0.75 4.25C0.966667 4.25 1.14583 4.32083 1.2875 4.4625C1.42917 4.60417 1.5 4.78333 1.5 5C1.5 5.21667 1.42917 5.39583 1.2875 5.5375C1.14583 5.67917 0.966667 5.75 0.75 5.75ZM0.75 1.5C0.533333 1.5 0.354167 1.42917 0.2125 1.2875C0.0708334 1.14583 0 0.966667 0 0.75C0 0.533333 0.0708334 0.354167 0.2125 0.2125C0.354167 0.0708334 0.533333 0 0.75 0C0.966667 0 1.14583 0.0708334 1.2875 0.2125C1.42917 0.354167 1.5 0.533333 1.5 0.75C1.5 0.966667 1.42917 1.14583 1.2875 1.2875C1.14583 1.42917 0.966667 1.5 0.75 1.5ZM4.25 10V8.5H18V10H4.25ZM4.25 5.75V4.25H18V5.75H4.25ZM4.25 1.5V0H18V1.5H4.25Z"
              fill="#999999"
            />
          </svg>
        ),
        cName: 'sub-nav',
      },
      {
        title: 'บันทึกเบิกจ่าย',
        path: '/saveAssetWithdraw',
        icon: (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.5 20C1.1 20 0.75 19.85 0.45 19.55C0.15 19.25 0 18.9 0 18.5V3H1.5V18.5H17V20H1.5ZM4.5 17C4.1 17 3.75 16.85 3.45 16.55C3.15 16.25 3 15.9 3 15.5V1.5C3 1.1 3.15 0.75 3.45 0.45C3.75 0.15 4.1 0 4.5 0H18.5C18.9 0 19.25 0.15 19.55 0.45C19.85 0.75 20 1.1 20 1.5V15.5C20 15.9 19.85 16.25 19.55 16.55C19.25 16.85 18.9 17 18.5 17H4.5ZM11.675 8.45L14 7.025L16.325 8.45V1.5H11.675V8.45Z"
              fill="#999999"
            />
          </svg>
        ),
        cName: 'sub-nav',
      },
      {
        title: 'อนุมัติเบิกจ่าย',
        path: '/approvalAssetWithdraw',
        icon: (
          <svg
            width="22"
            height="18"
            viewBox="0 0 22 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.29999 18C1.89999 18 1.54999 17.85 1.24999 17.55C0.949988 17.25 0.799988 16.9 0.799988 16.5V1.5C0.799988 1.1 0.949988 0.75 1.24999 0.45C1.54999 0.15 1.89999 0 2.29999 0H19.7C20.1 0 20.45 0.15 20.75 0.45C21.05 0.75 21.2 1.1 21.2 1.5V16.5C21.2 16.9 21.05 17.25 20.75 17.55C20.45 17.85 20.1 18 19.7 18H2.29999ZM3.99999 14H8.99999V12H3.99999V14ZM13.55 12L18.5 7.05L17.075 5.625L13.55 9.175L12.125 7.75L10.725 9.175L13.55 12ZM3.99999 10H8.99999V8H3.99999V10ZM3.99999 6H8.99999V4H3.99999V6Z"
              fill="#999999"
            />
          </svg>
        ),
      },
    ],
  },
  {
    title: 'ยืม-คืน ครุภัณฑ์',
    path: '/borrowList',
    // path: '',
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.6 20C7.75 20 7.10417 19.7458 6.6625 19.2375C6.22083 18.7292 6 18.15 6 17.5C6 17.0667 6.09583 16.6458 6.2875 16.2375C6.47917 15.8292 6.775 15.4917 7.175 15.225C7.54167 14.9917 7.84583 14.6792 8.0875 14.2875C8.32917 13.8958 8.50833 13.3583 8.625 12.675C8.60833 12.675 8.6 12.6708 8.6 12.6625C8.6 12.6542 8.58333 12.6417 8.55 12.625L5.65 13.65C5.36667 13.75 5.09167 13.8333 4.825 13.9C4.55833 13.9667 4.28333 14 4 14C2.95 14 2.02083 13.5417 1.2125 12.625C0.404167 11.7083 0 10.3667 0 8.6C0 7.75 0.254167 7.10417 0.7625 6.6625C1.27083 6.22083 1.84167 6 2.475 6C2.90833 6 3.33333 6.09583 3.75 6.2875C4.16667 6.47917 4.50833 6.775 4.775 7.175C5.00833 7.54167 5.3375 7.85417 5.7625 8.1125C6.1875 8.37083 6.70833 8.54167 7.325 8.625C7.34167 8.60833 7.35417 8.59167 7.3625 8.575C7.37083 8.55833 7.375 8.54167 7.375 8.525L6.35 5.65C6.25 5.36667 6.16667 5.09167 6.1 4.825C6.03333 4.55833 6 4.29167 6 4.025C6 2.95833 6.45833 2.02083 7.375 1.2125C8.29167 0.404167 9.63333 0 11.4 0C12.25 0 12.8958 0.254167 13.3375 0.7625C13.7792 1.27083 14 1.84167 14 2.475C14 2.90833 13.9042 3.33333 13.7125 3.75C13.5208 4.16667 13.225 4.50833 12.825 4.775C12.3917 5.05833 12.0542 5.43333 11.8125 5.9C11.5708 6.36667 11.4333 6.85 11.4 7.35C11.4167 7.36667 11.4292 7.37083 11.4375 7.3625C11.4458 7.35417 11.4583 7.36667 11.475 7.4L14.35 6.325C14.6333 6.225 14.9042 6.14583 15.1625 6.0875C15.4208 6.02917 15.6917 6 15.975 6C17.325 6 18.3333 6.55833 19 7.675C19.6667 8.79167 20 10.0333 20 11.4C20 12.25 19.7333 12.8958 19.2 13.3375C18.6667 13.7792 18.075 14 17.425 14C17.0083 14 16.6042 13.9042 16.2125 13.7125C15.8208 13.5208 15.4917 13.225 15.225 12.825C14.9917 12.4583 14.6792 12.1542 14.2875 11.9125C13.8958 11.6708 13.3583 11.4833 12.675 11.35L12.6375 11.425C12.6292 11.4417 12.6167 11.4583 12.6 11.475L13.65 14.35C13.75 14.6167 13.8333 14.8708 13.9 15.1125C13.9667 15.3542 14 15.6083 14 15.875C14.0167 16.9583 13.5667 17.9167 12.65 18.75C11.7333 19.5833 10.3833 20 8.6 20ZM10 11.5C10.4167 11.5 10.7708 11.3542 11.0625 11.0625C11.3542 10.7708 11.5 10.4167 11.5 10C11.5 9.58333 11.3542 9.22917 11.0625 8.9375C10.7708 8.64583 10.4167 8.5 10 8.5C9.58333 8.5 9.22917 8.64583 8.9375 8.9375C8.64583 9.22917 8.5 9.58333 8.5 10C8.5 10.4167 8.64583 10.7708 8.9375 11.0625C9.22917 11.3542 9.58333 11.5 10 11.5Z"
          fill="#999999"
        />
      </svg>
    ),
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: 'รายงาน ยืม-คืน',
        path: '/borrowList',
        icon: (
          <svg
            width="18"
            height="10"
            viewBox="0 0 18 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.75 10C0.533333 10 0.354167 9.92917 0.2125 9.7875C0.0708334 9.64583 0 9.46667 0 9.25C0 9.03333 0.0708334 8.85417 0.2125 8.7125C0.354167 8.57083 0.533333 8.5 0.75 8.5C0.966667 8.5 1.14583 8.57083 1.2875 8.7125C1.42917 8.85417 1.5 9.03333 1.5 9.25C1.5 9.46667 1.42917 9.64583 1.2875 9.7875C1.14583 9.92917 0.966667 10 0.75 10ZM0.75 5.75C0.533333 5.75 0.354167 5.67917 0.2125 5.5375C0.0708334 5.39583 0 5.21667 0 5C0 4.78333 0.0708334 4.60417 0.2125 4.4625C0.354167 4.32083 0.533333 4.25 0.75 4.25C0.966667 4.25 1.14583 4.32083 1.2875 4.4625C1.42917 4.60417 1.5 4.78333 1.5 5C1.5 5.21667 1.42917 5.39583 1.2875 5.5375C1.14583 5.67917 0.966667 5.75 0.75 5.75ZM0.75 1.5C0.533333 1.5 0.354167 1.42917 0.2125 1.2875C0.0708334 1.14583 0 0.966667 0 0.75C0 0.533333 0.0708334 0.354167 0.2125 0.2125C0.354167 0.0708334 0.533333 0 0.75 0C0.966667 0 1.14583 0.0708334 1.2875 0.2125C1.42917 0.354167 1.5 0.533333 1.5 0.75C1.5 0.966667 1.42917 1.14583 1.2875 1.2875C1.14583 1.42917 0.966667 1.5 0.75 1.5ZM4.25 10V8.5H18V10H4.25ZM4.25 5.75V4.25H18V5.75H4.25ZM4.25 1.5V0H18V1.5H4.25Z"
              fill="#999999"
            />
          </svg>
        ),
      },
      {
        title: 'ตรวจรับคืน',
        path: '/borrowCheckReturn',
        icon: (
          <svg
            width="20"
            height="16"
            viewBox="0 0 20 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.575 5.5326C11.2917 5.5326 11.0543 5.4366 10.863 5.2446C10.671 5.05327 10.575 4.81594 10.575 4.5326C10.575 4.24927 10.671 4.0116 10.863 3.8196C11.0543 3.62827 11.2917 3.5326 11.575 3.5326H18.575C18.8583 3.5326 19.0957 3.62827 19.287 3.8196C19.479 4.0116 19.575 4.24927 19.575 4.5326C19.575 4.81594 19.479 5.05327 19.287 5.2446C19.0957 5.4366 18.8583 5.5326 18.575 5.5326H11.575ZM11.575 13.5326C11.2917 13.5326 11.0543 13.4366 10.863 13.2446C10.671 13.0533 10.575 12.8159 10.575 12.5326C10.575 12.2493 10.671 12.0116 10.863 11.8196C11.0543 11.6283 11.2917 11.5326 11.575 11.5326H18.575C18.8583 11.5326 19.0957 11.6283 19.287 11.8196C19.479 12.0116 19.575 12.2493 19.575 12.5326C19.575 12.8159 19.479 13.0533 19.287 13.2446C19.0957 13.4366 18.8583 13.5326 18.575 13.5326H11.575ZM2.425 6.8326L0.275 4.6826C0.0916668 4.49927 0 4.26594 0 3.9826C0 3.69927 0.0916668 3.46594 0.275 3.2826C0.458333 3.09927 0.691667 3.0076 0.975 3.0076C1.25833 3.0076 1.49167 3.09927 1.675 3.2826L3.1 4.7076L6.65 1.1576C6.85 0.957602 7.08333 0.861602 7.35 0.869602C7.61667 0.878269 7.85 0.982602 8.05 1.1826C8.23333 1.3826 8.325 1.61594 8.325 1.8826C8.325 2.14927 8.23333 2.3826 8.05 2.5826L3.825 6.8326C3.625 7.0326 3.39167 7.1326 3.125 7.1326C2.85833 7.1326 2.625 7.0326 2.425 6.8326ZM2.425 14.8326L0.275 12.6826C0.0916668 12.4993 0 12.2659 0 11.9826C0 11.6993 0.0916668 11.4659 0.275 11.2826C0.458333 11.0993 0.691667 11.0076 0.975 11.0076C1.25833 11.0076 1.49167 11.0993 1.675 11.2826L3.1 12.7076L6.65 9.1576C6.85 8.9576 7.08333 8.8616 7.35 8.8696C7.61667 8.87827 7.85 8.9826 8.05 9.1826C8.23333 9.3826 8.325 9.61594 8.325 9.8826C8.325 10.1493 8.23333 10.3826 8.05 10.5826L3.825 14.8326C3.625 15.0326 3.39167 15.1326 3.125 15.1326C2.85833 15.1326 2.625 15.0326 2.425 14.8326Z"
              fill="#999999"
            />
          </svg>
        ),
      },
      {
        title: 'บันทึกยืม',
        path: '/borrowRecord',
        icon: (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.5 20C1.1 20 0.75 19.85 0.45 19.55C0.15 19.25 0 18.9 0 18.5V3H1.5V18.5H17V20H1.5ZM4.5 17C4.1 17 3.75 16.85 3.45 16.55C3.15 16.25 3 15.9 3 15.5V1.5C3 1.1 3.15 0.75 3.45 0.45C3.75 0.15 4.1 0 4.5 0H18.5C18.9 0 19.25 0.15 19.55 0.45C19.85 0.75 20 1.1 20 1.5V15.5C20 15.9 19.85 16.25 19.55 16.55C19.25 16.85 18.9 17 18.5 17H4.5ZM11.675 8.45L14 7.025L16.325 8.45V1.5H11.675V8.45Z"
              fill="#999999"
            />
          </svg>
        ),
      },
      {
        title: 'อนุมัติยืม',
        path: '/borrowApprove',
        icon: (
          <svg
            width="22"
            height="18"
            viewBox="0 0 22 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.29999 18C1.89999 18 1.54999 17.85 1.24999 17.55C0.949988 17.25 0.799988 16.9 0.799988 16.5V1.5C0.799988 1.1 0.949988 0.75 1.24999 0.45C1.54999 0.15 1.89999 0 2.29999 0H19.7C20.1 0 20.45 0.15 20.75 0.45C21.05 0.75 21.2 1.1 21.2 1.5V16.5C21.2 16.9 21.05 17.25 20.75 17.55C20.45 17.85 20.1 18 19.7 18H2.29999ZM3.99999 14H8.99999V12H3.99999V14ZM13.55 12L18.5 7.05L17.075 5.625L13.55 9.175L12.125 7.75L10.725 9.175L13.55 12ZM3.99999 10H8.99999V8H3.99999V10ZM3.99999 6H8.99999V4H3.99999V6Z"
              fill="#999999"
            />
          </svg>
        ),
      },
    ],
  },
  {
    title: 'โอน-ย้าย ครุภัณฑ์',
    path: '/',
    icon: (
      <svg
        width="21"
        height="18"
        viewBox="0 0 21 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 17.275C5.05 17.275 3.39583 16.5959 2.0375 15.2375C0.679167 13.8792 0 12.225 0 10.275C0 8.22502 0.729167 6.55419 2.1875 5.26252C3.64583 3.97086 5.275 3.38336 7.075 3.50002L4.925 1.35002L6 0.275024L10 4.27502L6 8.27502L4.925 7.20002L7.15 4.97502C5.56667 4.94169 4.22917 5.42502 3.1375 6.42502C2.04583 7.42502 1.5 8.70836 1.5 10.275C1.5 11.7917 2.0375 13.0875 3.1125 14.1625C4.1875 15.2375 5.48333 15.775 7 15.775H10V17.275H7ZM12 8.27502V1.27502H21V8.27502H12ZM12 17.275V10.275H21V17.275H12ZM13.5 15.775H19.5V11.775H13.5V15.775Z"
          fill="#999999"
        />
      </svg>
    ),
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: 'รายงานโอน-ย้าย',
        path: '/',
        icon: (
          <svg
            width="18"
            height="10"
            viewBox="0 0 18 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.75 10C0.533333 10 0.354167 9.92917 0.2125 9.7875C0.0708334 9.64583 0 9.46667 0 9.25C0 9.03333 0.0708334 8.85417 0.2125 8.7125C0.354167 8.57083 0.533333 8.5 0.75 8.5C0.966667 8.5 1.14583 8.57083 1.2875 8.7125C1.42917 8.85417 1.5 9.03333 1.5 9.25C1.5 9.46667 1.42917 9.64583 1.2875 9.7875C1.14583 9.92917 0.966667 10 0.75 10ZM0.75 5.75C0.533333 5.75 0.354167 5.67917 0.2125 5.5375C0.0708334 5.39583 0 5.21667 0 5C0 4.78333 0.0708334 4.60417 0.2125 4.4625C0.354167 4.32083 0.533333 4.25 0.75 4.25C0.966667 4.25 1.14583 4.32083 1.2875 4.4625C1.42917 4.60417 1.5 4.78333 1.5 5C1.5 5.21667 1.42917 5.39583 1.2875 5.5375C1.14583 5.67917 0.966667 5.75 0.75 5.75ZM0.75 1.5C0.533333 1.5 0.354167 1.42917 0.2125 1.2875C0.0708334 1.14583 0 0.966667 0 0.75C0 0.533333 0.0708334 0.354167 0.2125 0.2125C0.354167 0.0708334 0.533333 0 0.75 0C0.966667 0 1.14583 0.0708334 1.2875 0.2125C1.42917 0.354167 1.5 0.533333 1.5 0.75C1.5 0.966667 1.42917 1.14583 1.2875 1.2875C1.14583 1.42917 0.966667 1.5 0.75 1.5ZM4.25 10V8.5H18V10H4.25ZM4.25 5.75V4.25H18V5.75H4.25ZM4.25 1.5V0H18V1.5H4.25Z"
              fill="#999999"
            />
          </svg>
        ),
      },
      {
        title: 'บันทึกโอน-ย้าย',
        path: '/',
        icon: (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.5 20C1.1 20 0.75 19.85 0.45 19.55C0.15 19.25 0 18.9 0 18.5V3H1.5V18.5H17V20H1.5ZM4.5 17C4.1 17 3.75 16.85 3.45 16.55C3.15 16.25 3 15.9 3 15.5V1.5C3 1.1 3.15 0.75 3.45 0.45C3.75 0.15 4.1 0 4.5 0H18.5C18.9 0 19.25 0.15 19.55 0.45C19.85 0.75 20 1.1 20 1.5V15.5C20 15.9 19.85 16.25 19.55 16.55C19.25 16.85 18.9 17 18.5 17H4.5ZM11.675 8.45L14 7.025L16.325 8.45V1.5H11.675V8.45Z"
              fill="#999999"
            />
          </svg>
        ),
      },
      {
        title: 'อนุมัติโอน-ย้าย',
        path: '/',
        icon: (
          <svg
            width="22"
            height="18"
            viewBox="0 0 22 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.29999 18C1.89999 18 1.54999 17.85 1.24999 17.55C0.949988 17.25 0.799988 16.9 0.799988 16.5V1.5C0.799988 1.1 0.949988 0.75 1.24999 0.45C1.54999 0.15 1.89999 0 2.29999 0H19.7C20.1 0 20.45 0.15 20.75 0.45C21.05 0.75 21.2 1.1 21.2 1.5V16.5C21.2 16.9 21.05 17.25 20.75 17.55C20.45 17.85 20.1 18 19.7 18H2.29999ZM3.99999 14H8.99999V12H3.99999V14ZM13.55 12L18.5 7.05L17.075 5.625L13.55 9.175L12.125 7.75L10.725 9.175L13.55 12ZM3.99999 10H8.99999V8H3.99999V10ZM3.99999 6H8.99999V4H3.99999V6Z"
              fill="#999999"
            />
          </svg>
        ),
      },
    ],
  },
  {
    title: 'งานซ่อม',
    path: '/',
    icon: (
      <svg
        width="20"
        height="19"
        viewBox="0 0 20 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.2 19L10.925 12.725L12.35 11.3L18.625 17.575L17.2 19ZM2.675 19L1.25 17.575L8.5 10.325L5.825 7.64998L5.25 8.22498L4.15 7.12498V9.24998L3.55 9.84998L0.5 6.79998L1.1 6.19998H3.25L2.05 4.99998L5.325 1.72498C5.60833 1.44164 5.91667 1.24998 6.25 1.14998C6.58333 1.04998 6.95 0.999976 7.35 0.999976C7.75 0.999976 8.11667 1.07081 8.45 1.21248C8.78333 1.35414 9.09167 1.56664 9.375 1.84998L6.7 4.52498L7.9 5.72498L7.3 6.32498L9.9 8.92498L12.95 5.87498C12.8167 5.65831 12.7125 5.40831 12.6375 5.12498C12.5625 4.84164 12.525 4.54164 12.525 4.22498C12.525 3.34164 12.8458 2.57914 13.4875 1.93748C14.1292 1.29581 14.8917 0.974976 15.775 0.974976C16.025 0.974976 16.2375 0.999976 16.4125 1.04998C16.5875 1.09998 16.7333 1.16664 16.85 1.24998L14.725 3.37498L16.6 5.24998L18.725 3.12498C18.8083 3.25831 18.8792 3.42081 18.9375 3.61248C18.9958 3.80414 19.025 4.02498 19.025 4.27498C19.025 5.15831 18.7042 5.92081 18.0625 6.56248C17.4208 7.20414 16.6583 7.52498 15.775 7.52498C15.475 7.52498 15.2167 7.50414 15 7.46248C14.7833 7.42081 14.5833 7.35831 14.4 7.27498L2.675 19Z"
          fill="#999999"
        />
      </svg>
    ),
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: 'แดชบอร์ดงานซ่อม',
        path: '/',
        icon: (
          <svg
            width="20"
            height="20"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 18H2C0.9 18 0 17.1 0 16V2C0 0.9 0.9 0 2 0H8V18ZM10 18H16C17.1 18 18 17.1 18 16V9H10V18ZM18 7V2C18 0.9 17.1 0 16 0H10V7H18Z"
              fill="#999999"
            />
          </svg>
        ),
      },
      {
        title: 'เพิ่มการซ่อมบำรุง',
        path: '/',
        icon: (
          <svg
            width="20"
            height="20"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.5 18C1.1 18 0.75 17.85 0.45 17.55C0.15 17.25 0 16.9 0 16.5V1.5C0 1.1 0.15 0.75 0.45 0.45C0.75 0.15 1.1 0 1.5 0H11.375V1.5H1.5V16.5H16.5V6.625H18V16.5C18 16.9 17.85 17.25 17.55 17.55C17.25 17.85 16.9 18 16.5 18H1.5ZM5.025 14.075V12.575H13V14.075H5.025ZM5.025 10.9V9.4H13V10.9H5.025ZM5.025 7.725V6.225H13V7.725H5.025ZM14.325 5.875V3.7H12.125V2.2H14.325V0H15.825V2.2H18V3.7H15.825V5.875H14.325Z"
              fill="#999999"
            />
          </svg>
        ),
      },
      {
        title: 'ลงบันทึกรายละเอียด',
        path: '/',
        icon: (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.5 20C1.1 20 0.75 19.85 0.45 19.55C0.15 19.25 0 18.9 0 18.5V3H1.5V18.5H17V20H1.5ZM4.5 17C4.1 17 3.75 16.85 3.45 16.55C3.15 16.25 3 15.9 3 15.5V1.5C3 1.1 3.15 0.75 3.45 0.45C3.75 0.15 4.1 0 4.5 0H18.5C18.9 0 19.25 0.15 19.55 0.45C19.85 0.75 20 1.1 20 1.5V15.5C20 15.9 19.85 16.25 19.55 16.55C19.25 16.85 18.9 17 18.5 17H4.5ZM11.675 8.45L14 7.025L16.325 8.45V1.5H11.675V8.45Z"
              fill="#999999"
            />
          </svg>
        ),
      },
      {
        title: 'บันทึกจ้างซ่อม',
        path: '/',
        icon: (
          <svg
            width="20"
            height="20"
            viewBox="0 0 14 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 19V2.375C0 1.975 0.15 1.625 0.45 1.325C0.75 1.025 1.1 0.875 1.5 0.875H12.5C12.9 0.875 13.25 1.025 13.55 1.325C13.85 1.625 14 1.975 14 2.375V19L7 16L0 19Z"
              fill="#999999"
            />
          </svg>
        ),
      },
      {
        title: 'ตรวจสอบการจ้างซ่อม',
        path: '/',
        icon: (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.45 11.5C8.86667 11.9167 9.39167 12.1125 10.025 12.0875C10.6583 12.0625 11.1167 11.8333 11.4 11.4L16.925 3.075L8.6 8.6C8.16667 8.9 7.92917 9.35417 7.8875 9.9625C7.84583 10.5708 8.03333 11.0833 8.45 11.5ZM2.8 16C2.5 16 2.21667 15.9292 1.95 15.7875C1.68333 15.6458 1.48333 15.4417 1.35 15.175C0.916667 14.375 0.583333 13.5417 0.35 12.675C0.116667 11.8083 0 10.925 0 10.025C0 8.64167 0.2625 7.34167 0.7875 6.125C1.3125 4.90833 2.025 3.84583 2.925 2.9375C3.825 2.02917 4.87917 1.3125 6.0875 0.7875C7.29583 0.2625 8.58333 0 9.95 0C11.3333 0 12.6375 0.2625 13.8625 0.7875C15.0875 1.3125 16.1542 2.02917 17.0625 2.9375C17.9708 3.84583 18.6875 4.90833 19.2125 6.125C19.7375 7.34167 20 8.64167 20 10.025C20 10.925 19.8917 11.8125 19.675 12.6875C19.4583 13.5625 19.125 14.3917 18.675 15.175C18.525 15.4417 18.3167 15.6458 18.05 15.7875C17.7833 15.9292 17.5 16 17.2 16H2.8Z"
              fill="#999999"
            />
          </svg>
        ),
      },
      {
        title: 'ประวัติการซ่อม',
        path: '/',
        icon: (
          <svg
            width="20"
            height="20"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.925 18C6.44167 18 4.33333 17.1208 2.6 15.3625C0.866667 13.6042 0 11.475 0 8.975H1.5C1.5 11.0583 2.21667 12.8333 3.65 14.3C5.08333 15.7667 6.84167 16.5 8.925 16.5C11.0417 16.5 12.8333 15.7583 14.3 14.275C15.7667 12.7917 16.5 10.9917 16.5 8.875C16.5 6.80833 15.7583 5.0625 14.275 3.6375C12.7917 2.2125 11.0083 1.5 8.925 1.5C7.79167 1.5 6.72917 1.75833 5.7375 2.275C4.74583 2.79167 3.88333 3.475 3.15 4.325H5.775V5.825H0.55V0.625H2.05V3.275C2.91667 2.25833 3.94583 1.45833 5.1375 0.875C6.32917 0.291667 7.59167 0 8.925 0C10.175 0 11.35 0.233333 12.45 0.7C13.55 1.16667 14.5125 1.80417 15.3375 2.6125C16.1625 3.42083 16.8125 4.36667 17.2875 5.45C17.7625 6.53333 18 7.7 18 8.95C18 10.2 17.7625 11.375 17.2875 12.475C16.8125 13.575 16.1625 14.5333 15.3375 15.35C14.5125 16.1667 13.55 16.8125 12.45 17.2875C11.35 17.7625 10.175 18 8.925 18ZM12.125 13.075L8.275 9.275V3.925H9.775V8.65L13.2 12L12.125 13.075Z"
              fill="#999999"
            />
          </svg>
        ),
      },
    ],
  },
]
