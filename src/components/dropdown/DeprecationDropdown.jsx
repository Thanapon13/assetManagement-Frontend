import { Menu } from "@headlessui/react";
import { useLocation } from "react-router-dom/dist";

function DeprecationDropdown({
  setDepreciationShowModal,
  setAccumulateDepreciationShowModal,
}) {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          {location.pathname === "/viewAssetInformation" ? (
            <Menu.Button className="inline-flex  justify-center items-center py-1 px-4 border-2 border-orange-400  shadow-sm font-medium rounded-md text-orange-400   hover:bg-orange-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-800 ">
              <button type="button" className="">
              ดูค่าเสื่อมราคา
              </button>
            </Menu.Button>
          ) : (
            <Menu.Button className="inline-flex  justify-center items-center py-1 px-4 border-2 border-text-green  shadow-sm font-medium rounded-md text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800 ">
              <button type="button" className="">
                + ค่าเสื่อมราคา
              </button>
            </Menu.Button>
          )}
        </div>
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg text-xs bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="flex flex-col justify-around my-2">
            <Menu.Item>
              <button
                className="flex gap-2 items-center hover:bg-gray-100 px-5 py-4"
                onClick={() => setDepreciationShowModal(true)}
              >
                <span>+ ค่าเสื่อมราคา</span>
              </button>
            </Menu.Item>
            <Menu.Item>
              <button
                className="flex gap-2 items-center hover:bg-gray-100 px-5 py-4"
                onClick={() => setAccumulateDepreciationShowModal(true)}
              >
                <span>+ ค่าเสื่อมราคา(ผลรวมจำนวนปี)</span>
              </button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Menu>
    </>
  );
}

export default DeprecationDropdown;
