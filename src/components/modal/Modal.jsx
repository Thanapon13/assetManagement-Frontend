import { useLocation } from "react-router-dom";

function Modal({
  id,
  isVisible,
  width,
  onClose,
  header,
  children,

  //Modal + row ย่อยของส่วนประกอบย่อย
  setShowAddSubComponentShowModal,
  showAddSubComponentShowModal,
  handleClickIncrease,

  //Modal Upload File
  //ให้กดupload ปุ๊ป ยิงapiเลย
}) {
  let location = useLocation();
  // console.log(location.pathname)

  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };

  // console.log(onClose())

  const handleDepreciation = () => {};
  // console.log(id);
  return (
    <div
      id="wrapper"
      className="fixed inset-0 bg-black bg-opacity-25 blackdrop-blur-sm flex justify-center items-center"
      onClick={handleClose}
    >
      <div className="overflow-y-auto scrollbar ">
        <div
          className={`md:w-${
            width ? width : "[700px]"
          } w-[100%] h-[700px] mx-auto`}
        >
          <div className="bg-white  rounded">
            <div className="flex justify-between border-b-2 border-grey-300  p-4">
              <p className="text-text-green text-xl font-bold">{header}</p>
              <div className="flex">
                {id === "เพิ่มข้อมูลของส่วนประกอบย่อย" ? (
                  <button
                    type="button"
                    className="flex justify-center items-center py-1 px-6 mr-5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-text-green hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
                    onClick={handleClickIncrease}
                  >
                    + เพิ่มใบเบิกครุภัณฑ์
                  </button>
                ) : null}
                {id === "ค่าเสื่อมราคา" || id === "ค่าเสื่อมราคา(รายปี)" ? (
                  <div className="flex justify-center items-center text-xs mr-3">
                    <div className="mr-3">สถานะครุภัณฑ์</div>
                    <div className="text-text-green font-bold bg-sidebar-green px-8 py-2 rounded-full">
                      ใช้งานปกติ
                    </div>
                  </div>
                ) : null}
                <button
                  className="text-gray-500 font-semibold h-8 w-8 rounded-full hover:bg-gray-300 hover:text-black flex justify-center items-center text-xl"
                  onClick={() => onClose()}
                >
                  X
                </button>
              </div>
            </div>
            <div className="p-4">{children}</div>
            {id !== "showViewImageModal" ? (
              <div className="flex justify-center items-center border-t-2 border-grey-300 p-4">
                <button
                  className="inline-flex justify-center items-center h-full py-2 px-8 border border-transparent shadow-sm text-xs font-medium rounded-md text-gray-700 bg-gray-300 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
                  onClick={() => onClose()}
                >
                  ยกเลิก
                </button>
                <button
                  className="ml-5 inline-flex justify-center items-center h-full py-2 px-8 border border-transparent shadow-sm text-xs font-medium rounded-md text-white bg-text-green hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
                  onClick={() =>
                    id === "เพิ่มรุปภาพ"
                      ? console.log("เพิ่มรุปภาพ")
                      : id === "ส่วนประกอบย่อย"
                      ? (onClose(), setShowAddSubComponentShowModal(true))
                      : id === "คู่มือ/เอกสารแนบ"
                      ? console.log("คู่มือ/เอกสารแนบ")
                      : id === "ค่าเสื่อมราคา"
                      ? console.log("ค่าเสื่อมราคา")
                      : null
                  }
                >
                  {id === "ส่วนประกอบย่อย" ? "+ เพิ่มข้อมูล" : "บันทึก"}
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
