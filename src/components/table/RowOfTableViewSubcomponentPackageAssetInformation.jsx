import Selector from "../selector/Selector";
import ScanDropdown from "../dropdown/ScanDropdown";
import { useBarcode } from "@createnextapp/react-barcode";
import QRcode from "qrcode.react";
import ReactToPrint from "react-to-print";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { useLocation } from "react-router-dom";

function RowOfTableViewSubcomponentPackageAssetInformation({
  index,
  bottomSubComponentData,
  setBottomSubComponentData,
  // genData,
  // setGenData,
  setScanBarcodeModal,
  setScanQRCodeModal,
  setIndexGenData,
  indexGenData,
  barcode,
  setBarcode,
  qr,
  setQr,
  // disabled,
  packageAssetId
}) {
  const locaiton = useLocation();
  const { inputRef } = useBarcode({
    value: bottomSubComponentData[indexGenData]?.serialNumber || null,
    options: { background: "#ffffff" },
  });

  const printRef = useRef();
  const noPrintRef = useRef();

  const onChange = (e) => {
    setBottomSubComponentData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChangeSerialNumber = (e) => {
    const clone = [...bottomSubComponentData];
    // console.log(clone);
    clone[index].serialNumber = e.target.value;
    setBottomSubComponentData(clone);
    setBarcode(e.target.value);
    setQr(e.target.value);
  };
  const handleChangePricePerUnit = (e) => {
    const clone = [...bottomSubComponentData];
    clone[index].pricePerUnit = e.target.value;
    setBottomSubComponentData(clone);
  };
  const handleChangeAsset01 = (e) => {
    const clone = [...bottomSubComponentData];
    clone[index].asset01 = e.target.value;
    setBottomSubComponentData(clone);
  };

  // useEffect(() => {
  //   setBarcode(bottomSubComponentData[indexGenData]?.serialNumber);
  //   setQr(bottomSubComponentData[indexGenData]?.serialNumber);
  // }, [indexGenData]);

  return (
    <div>
      <div
        className={`grid grid-cols-19 justify-center items-center gap-4 h-16  text-xs bg-white border-b-[1px]`}
      >
        <div className="ml-2 text-center flex justify-center items-center ">
          <div className=" flex justify-center items-center text-gray-500">
            {index + 1}
          </div>
        </div>
        <input
          type="text"
          name="assetNumber"
          id="assetNumber"
          disabled
          value={bottomSubComponentData[index]?.assetNumber}
          className="col-span-4 w-full h-[38px] bg-gray-200 border-[1px] pl-2 text-xs  border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
        />
        <input
          type="text"
          name="productName"
          id="productName"
          disabled
          value={bottomSubComponentData[index]?.productName}
          className="col-span-4 w-full h-[38px] disabled:bg-gray-200 border-[1px] pl-2 text-xs border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
        />
        <div className="flex relative col-span-4">
          <input
            type="text"
            name="serialNumber"
            disabled={
              locaiton.pathname === `/viewPackageAssetInformation/${packageAssetId}`
                ? true
                : false
            }
            className={`w-full text-left text-xs pl-3 ${locaiton.pathname === `/viewPackageAssetInformation/${packageAssetId}`
                ? "bg-gray-200"
                : ""
              }  flex justify-center items-center py-2 border-[1px] border-gray-300 rounded focus:border-2 focus:outline-none  focus:border-focus-blue`}
            onChange={handleChangeSerialNumber}
            value={bottomSubComponentData[index]?.serialNumber}
          />
          {location.pathname === "/viewPackageAssetInformation" ? (
            <></>
          ) : (
            <div
              className="z-20 absolute top-1/2 right-0  transform -translate-x-1/2 -translate-y-1/2"
              onClick={() => setIndexGenData(index)}
            >
              <ScanDropdown
                setScanBarcodeModal={setScanBarcodeModal}
                setScanQRCodeModal={setScanQRCodeModal}
              />
            </div>
          )}
        </div>
        <input
          type="text"
          name="pricePerUnit"
          id="pricePerUnit"
          disabled={
            locaiton.pathname === `/viewPackageAssetInformation/${packageAssetId}` ? true : false
          }
          onChange={handleChangePricePerUnit}
          value={bottomSubComponentData[index]?.pricePerUnit.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          className={`col-span-2 w-full h-[38px] ${locaiton.pathname === `/viewPackageAssetInformation/${packageAssetId}`
              ? "bg-gray-200"
              : ""
            } border-[1px] pl-2 text-xs border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
        />
        <input
          type="text"
          name="asset01"
          id="asset01"
          disabled={
            locaiton.pathname === `/viewPackageAssetInformation/${packageAssetId}` ? true : false
          }
          onChange={handleChangeAsset01}
          value={bottomSubComponentData[index]?.asset01}
          className={`col-span-2 w-full h-[38px] ${locaiton.pathname === `/viewPackageAssetInformation/${packageAssetId}`
              ? "bg-gray-200"
              : ""
            }  border-[1px] pl-2 text-xs border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
        />

        <div
          className="col-span-2 flex justify-center relative"
          onClick={() => {
            setIndexGenData(index);
            // setShowPrintModal(true)
            // console.log(index)
          }}
        >
          <ReactToPrint
            trigger={() => {
              return (
                <button
                  type="button"
                  className="-ml-2 flex justify-center items-center text-white bg-blue-500 hover:bg-focus-blue rounded-lg focus:border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-focus-blue focus:border-focus-blue w-8 h-8 px-2 py-2 "
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.4 4H3.6V1C3.6 0.716667 3.6861 0.479 3.8583 0.287C4.0311 0.0956666 4.245 0 4.5 0H13.5C13.755 0 13.9686 0.0956666 14.1408 0.287C14.3136 0.479 14.4 0.716667 14.4 1V4ZM14.4 9.5C14.655 9.5 14.8686 9.404 15.0408 9.212C15.2136 9.02067 15.3 8.78333 15.3 8.5C15.3 8.21667 15.2136 7.979 15.0408 7.787C14.8686 7.59567 14.655 7.5 14.4 7.5C14.145 7.5 13.9314 7.59567 13.7592 7.787C13.5864 7.979 13.5 8.21667 13.5 8.5C13.5 8.78333 13.5864 9.02067 13.7592 9.212C13.9314 9.404 14.145 9.5 14.4 9.5ZM5.4 16H12.6V12H5.4V16ZM5.4 18C4.905 18 4.4814 17.8043 4.1292 17.413C3.7764 17.021 3.6 16.55 3.6 16V14H0.9C0.645 14 0.4314 13.904 0.2592 13.712C0.0864001 13.5207 0 13.2833 0 13V8C0 7.15 0.2625 6.43767 0.7875 5.863C1.3125 5.28767 1.95 5 2.7 5H15.3C16.065 5 16.7064 5.28767 17.2242 5.863C17.7414 6.43767 18 7.15 18 8V13C18 13.2833 17.9136 13.5207 17.7408 13.712C17.5686 13.904 17.355 14 17.1 14H14.4V16C14.4 16.55 14.2239 17.021 13.8717 17.413C13.5189 17.8043 13.095 18 12.6 18H5.4Z"
                      fill="white"
                    />
                  </svg>
                </button>
              );
            }}
            content={() => bottomSubComponentData[indexGenData]?.serialNumber ? printRef.current : noPrintRef.current}
            onBeforeGetContent={async () => { await setIndexGenData(index) }}
          />
        </div>

        <div ref={printRef} className="absolute -z-10">
          <canvas id="mybarcode" ref={inputRef} className="w-full" />
          <QRcode id="myqr" value={bottomSubComponentData[indexGenData]?.serialNumber} size={320} includeMargin={true} />
        </div>
        <div ref={noPrintRef} className="absolute -z-10">
          <div>
            <p>No barcode preview</p>
            <p>No QR code preview</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default RowOfTableViewSubcomponentPackageAssetInformation;
