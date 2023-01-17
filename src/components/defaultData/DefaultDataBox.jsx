import { useState } from "react";
import RowOfTableDefaultDataBox from "../table/RowOfTableDefaultDataBox";

function DefaultDataBox({header}) {
  const [rowArray, setRowArray] = useState([
    {
      index: 0,
      name: "",
    },
  ]);

  const handleClickIncrease = (e) => {
    e.preventDefault()

    let clone = [...rowArray]
    const newCloneArray ={
      // index: 0,
      name: "",
    }
    setRowArray([...clone, newCloneArray])
  }

  const deleteRow = (index) => {

    let clone = [...rowArray];
    clone.splice(index, 1);
    setRowArray(clone);
  };

  return (
    <div className="bg-white rounded-lg">
      <div className="overflow-y-auto scrollbar ">
        <div className="px-2 py-4 h-[400px] mx-auto">
          <div className="font-semibold ml-3 mb-3">{header}</div>
          <div className="bg-background-gray-table rounded-lg p-5">
            <div className="grid grid-cols-10">
              <div className="col-span-2 text-center">ลำดับ</div>
              <div className="col-span-6 text-center">ชื่อ</div>
              <div className="col-span-2 text-center"></div>
            </div>
          </div>
          {/* row */}
          {rowArray?.map((el, idx) => {
            return (
              <RowOfTableDefaultDataBox
                key={idx}
                index={idx}
                rowArray={rowArray}
                setRowArray={setRowArray}
                deleteRow={deleteRow}
              />
            );
          })}
           <button
                type="button"
                className="w-full h-[38px] text-white px-4 py-2 rounded  bg-text-green hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
                onClick={handleClickIncrease}
              >
                + เพิ่มข้อมูล
              </button>
              <div className="h-[14px]"></div>
        </div>
      </div>
    </div>
  );
}

export default DefaultDataBox;
