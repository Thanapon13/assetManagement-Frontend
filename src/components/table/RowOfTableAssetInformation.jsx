import Selector from "../selector/Selector";
import ScanDropdown from "../dropdown/ScanDropdown";
import Modal from "../../components/modal/Modal";
import { useBarcode } from "@createnextapp/react-barcode";
import QRcode from "qrcode.react";
import ReactToPrint from "react-to-print";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import Select from "react-select";

function RowOfTableAssetInformation({
  index,
  genData,
  setGenData,
  setScanBarcodeModal,
  setScanQRCodeModal,
  setIndexGenData,
  indexGenData,
  barcode,
  setBarcode,
  qr,
  setQr,
}) {
  // console.log(barcode, "barcode");

  const { inputRef } = useBarcode({
    value: genData[indexGenData]?.serialNumber || null,
    options: {
      background: "#ffffff",
    },
  });

  const printRef = useRef();
  const noPrintRef = useRef();

  //Show Modal
  const [showPrintModal, setShowPrintModal] = useState(false);

  const handleChangeSerialNumber = (e) => {
    const clone = [...genData];
    // console.log(clone);
    clone[index].serialNumber = e.target.value;
    setGenData(clone);
    setBarcode(e.target.value);
  };
  const handleChangeAsset01 = (e) => {
    const clone = [...genData];
    // console.log(clone);
    clone[index].asset01 = e.target.value;
    setGenData(clone);
  };

  // useEffect(() => {
  //   setBarcode(genData[indexGenData]?.serialNumber);
  //   setQr(genData[indexGenData]?.serialNumber);
  // }, [indexGenData]);

  return (
    <div>
      <div
        className={`grid grid-cols-12 justify-center items-center gap-4 h-16 py-1 text-xs bg-white`}
      >
        <div className="ml-2 text-center flex justify-center items-center ">
          <div className=" flex justify-center items-center bg-gray-200 rounded-full w-6 h-6 px-2 py-2">
            {index + 1}
          </div>
        </div>

        <input
          className="col-span-2 bg-gray-200 text-center flex justify-center items-center  py-2 border-[1px] border-block-green rounded focus:border-2 focus:outline-none  focus:border-focus-blue"
          disabled
          value={genData && genData[index]?.assetNumber}
        />

        <div className="flex relative col-span-2">
          <input
            className="w-full text-left  pl-3 flex justify-center items-center py-2 border-[1px] border-block-green rounded focus:border-2 focus:outline-none  focus:border-focus-blue"
            onChange={handleChangeSerialNumber}
            value={genData && genData[index]?.serialNumber}
          />
          <div
            className="z-20 absolute top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2"
            onClick={() => setIndexGenData(index)}
          >
            <ScanDropdown
              setScanBarcodeModal={setScanBarcodeModal}
              setScanQRCodeModal={setScanQRCodeModal}
            />
          </div>
        </div>

        <div className="col-span-2">
          <div className="flex h-[38px] ">

            <Select
              options={[
                { label: "Admin", value: "Admin" },
                { label: "Operator", value: "Operator" },
                { label: "superAdmin", value: "Auper admin" }
              ]}
              // onChange={handleChange}
              name="role"
              // value={role}
              // menuPlacement="auto"
              menuPortalTarget={document.body}
              menuPosition={'fixed'}
            />
            {/* <Selector
              placeholder={"Select"}
              index={index}
              state={genData}
              setState={setGenData}
              id={"หน่วยงาน"}
            /> */}
          </div>
        </div>

        <input
          className="col-span-2 text-center flex justify-center items-center  py-2 border-[1px] border-block-green rounded focus:border-2 focus:outline-none  focus:border-focus-blue"
          onChange={handleChangeAsset01}
          value={genData && genData[index]?.asset01}
        />
        {/* <input
          className="col-span-2 text-center flex justify-center items-center py-2 border-[1px] border-block-green rounded focus:border-2 focus:outline-none  focus:border-focus-blue"
          value={genData && genData[index]?.productName}
        /> */}
        <div className="col-span-2">
          <div className="flex h-[38px] ">
            <Selector
              placeholder={"Select"}
              index={index}
              state={genData}
              setState={setGenData}
              id={"แทนครุภัณฑ์ที่ถูกแทงจำหน่าย"}
            />
          </div>
        </div>


        <div className="flex justify-center relative">
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
            onBeforeGetContent={async () => { await setIndexGenData(index) }}
            content={() => genData[indexGenData]?.serialNumber ? printRef.current : noPrintRef.current}
            // documentTitle="kiminoto doc"
            // pageStyle="print"
            onAfterPrint={() => console.log("print")}
          />
        </div>

        {/* <div ref={printRef} className="absolute -z-10">
          {barcode !== "" ? (
            <canvas id="mybarcode" ref={inputRef} className="w-full" />
          ) : (
            <p>No barcode preview</p>
          )}
          <div>
            {qr ? (
              <QRcode id="myqr" value={qr} size={320} includeMargin={true} />
            ) : (
              <p>No QR code preview</p>
            )}
          </div>
        </div> */}

        <div ref={printRef} className="absolute -z-10">
          <canvas id="mybarcode" ref={inputRef} className="w-full" />
          <QRcode id="myqr" value={genData[indexGenData]?.serialNumber} size={320} includeMargin={true} />
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

export default RowOfTableAssetInformation;
