import { useState } from 'React'

const DropdownModalBorrowApprove = () => {
  const [isOpen, setOpen] = useState(false)

  const handleDropDown = () => {
    setOpen(!isOpen)
  }

  return (
    <div className="relative">
      <button
        className=" text-text-gray border-[1px] rounded-md text-xs px-6 py-2.5 text-center inline-flex items-center"
        onClick={handleDropDown}
      >
        แยกการให้สาเหตุแต่ละรายการ
        <svg
          className="ml-2 w-4 h-4"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      {/* menu */}
      <div
        className={
          isOpen
            ? 'absolute z-10 w-[225px] inset-x-0 top-10 border border-gray-100 rounded-md shadow-lg'
            : 'hidden'
        }
      >
        <ul className="bg-white rounded divide-y divide-gray-100 shadow text-text-gray ">
          <li>
            <div className="block py-2 px-4 hover:bg-gray-100">
              แยกการให้สาเหตุแต่ละรายการ
            </div>
          </li>
          <li>
            <div className="block py-2 px-4 hover:bg-gray-100">
              สาเหตุแบบหลายรายการ
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default DropdownModalBorrowApprove
