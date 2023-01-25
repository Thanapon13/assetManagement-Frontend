import React, { useState } from "react";
import Scanner from "./Scanner";
import { Fab, TextareaAutosize, Paper } from "@material-ui/core";

const BarcodeScanner = ({
  state,
  setState,
  index,
  setIndex,
  barcode,
  setBarcode,
  qr,
  setQr,
}) => {
  const [results, setResults] = useState([]);
  const [scanning, setScanning] = useState(false);

  const _scan = () => {
    setScanning(!scanning);
  };

  const _onDetected = (result) => {
    setResults([]);
    setResults([...results, result]);
    // console.log([...results, result]);
    handleChangeSerialNumber();
  };

  const handleChangeSerialNumber = () => {
    const clone = [...state];
    clone[index].serialNumber = results[results.length - 1].codeResult.code;
    // console.log(clone);
    setState(clone);
    setBarcode(e.target.value);
    setQr(e.target.value);
  };

  return (
    <div>
      <Paper
        variant="outlined"
        style={{ marginTop: 30, width: 640, height: 320 }}
      >
        <Scanner onDetected={_onDetected} />
      </Paper>

      <TextareaAutosize
        style={{ fontSize: 32, width: 320, height: 100, marginTop: 30 }}
        rowsMax={4}
        defaultValue={"No data scanned"}
        value={
          results[0]
            ? results[results.length - 1].codeResult.code
            : "No data scanned"
        }
      />
    </div>
  );
};

export default BarcodeScanner;
