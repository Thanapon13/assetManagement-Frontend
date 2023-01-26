import React, { useState } from "react";
import { Fab, TextareaAutosize } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { Link } from "react-router-dom";
import QrScan from "react-qr-reader";

function QRscanner({
  state,
  setState,
  index,
  setIndex,
  barcode,
  setBarcode,
  qr,
  setQr,
}) {
  const handleScan = (data) => {
    if (data) {
        const clone = [...state];
        clone[index].serialNumber = data;
        setState(clone);
      setQr(data);
      setBarcode(data)
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div>
      {/* <center> */}
      <div style={{ marginTop: 30 }}>
        <QrScan
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ height: 240, width: 320 }}
        />
      </div>
      {/* </center> */}

      <TextareaAutosize
        style={{ fontSize: 18, width: 320, height: 100, marginTop: 100 }}
        rowsMax={4}
        defaultValue={qr}
        value={qr}
      />
    </div>
  );
}

export default QRscanner;
