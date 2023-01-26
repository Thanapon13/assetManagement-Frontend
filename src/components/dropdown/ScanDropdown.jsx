import { Menu } from "@headlessui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import barcodeReader from "../../public/pics/barcodeReader.png";
import scanqrcode from "../../public/pics/scanqrcode.png";

function ScanDropdown({
  setScanBarcodeModal,
  setScanQRCodeModal,
}) {

  return (
    <>
      <Menu as="div" className="relative inline-block text-left ">
        <div>
          <Menu.Button className="inline-flex  justify-center items-center  font-medium rounded-md text-text-gray rouned-full p-1  hover:bg-gray-100 ">
            <button type="button" className="z-10">
              <BsThreeDotsVertical size={16} className="z-10" />
            </button>
          </Menu.Button>
        </div>
        <Menu.Items className="z-50 origin-top-right absolute right-4 mt-4 w-32  rounded-md shadow-lg text-xs bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="flex flex-col justify-around my-2 ">
            <Menu.Item>
              <button
                className="flex gap-2 items-center hover:bg-gray-100 px-5 py-2 "
                onClick={() => {setScanBarcodeModal(true)
                }}
              >
                <span className="flex items-center gap-2">
                  <img src={barcodeReader} />
                  Barcode
                </span>
              </button>
            </Menu.Item>
            <Menu.Item>
              <button
                className="flex gap-2 items-center hover:bg-gray-100 px-5 py-2"
                onClick={() => setScanQRCodeModal(true)}
              >
                <span className="flex items-center gap-2">
                  <img src={scanqrcode} />
                  QR Code
                </span>
              </button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Menu>
    </>
  );
}

export default ScanDropdown;
