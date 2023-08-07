import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { getRepairById, updateStatusForCheckJobRepair } from "../api/repairApi";
import { Spinner } from "flowbite-react";
import ModalSuccess from "../components/modal/ModalSuccess";
import ModalConfirmSave from "../components/modal/ModalConfirmSave";

export default function UpdateStatusForCheckJobRepair() {
  let { id } = useParams();
  console.log("id:", id);

  const [isLoading, setIsLoading] = useState(true);
  const [item, setItem] = useState([]);
  console.log("item:", item);

  const [error, setError] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState();
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [arrayCostRepair, setArrayCostRepair] = useState([
    {
      stuffName: "",
      quantity: "",
      unit: "",
      pricePerPiece: ""
    }
  ]);

  useEffect(() => {
    const getData = async () => {
      const res = await getRepairById(id);
      console.log("res:", res.data.repair);

      const resRepair = res.data.repair;
      setArrayCostRepair(resRepair.costOfRepairArray);
      setItem({
        ...resRepair,

        arriveAtPlaceDate: new Date(resRepair.arriveAtPlaceDate),
        workDate: new Date(resRepair.workDate),
        repairedDate: new Date(resRepair.repairedDate),
        // approveDateOfDelivery: new Date(),
        // deliverDate: new Date(),
        // approveHireDate: new Date(),
        // checkJobDate: new Date(),
        // sendWithDrawMoneyDate: new Date(),
        // receiveWorkOrderDate: new Date(),
        // checkJobInsuranceEndDate: new Date(),
        repairResult: resRepair.repairResult,
        mechinicComment: resRepair.mechinicComment,
        statusCheckJob: resRepair.statusCheckJob,
        outSourceRepairNumber: resRepair.outSourceRepairNumber,

        repairSectorRefNumber: resRepair.repairSectorRefNumber,

        repairDateCreateOutsourceRepair:
          resRepair.repairDateCreateOutsourceRepair
            ? new Date(resRepair.repairDateCreateOutsourceRepair)
            : new Date(),

        descriptionCreateOutsourceRepair:
          resRepair.descriptionCreateOutsourceRepair,

        responsibleName: resRepair.responsibleName,

        approveDate: resRepair.approveDate
          ? new Date(resRepair.approveDate)
          : new Date(),

        bookNumber: resRepair.bookNumber,

        approveDateOfDelivery: resRepair.approveDateOfDelivery
          ? new Date(resRepair.approveDateOfDelivery)
          : new Date(),

        deliverDate: resRepair.deliverDate
          ? new Date(resRepair.deliverDate)
          : new Date(),

        contractorName: resRepair.contractorName,
        responsibleAddress: resRepair.responsibleAddress,
        responsiblePhone: resRepair.responsiblePhone,
        price: resRepair.price,
        contactName: resRepair.contactName,
        tax: resRepair.tax,
        resposibleRemark: resRepair.resposibleRemark,
        // totalPrice: +resRepair.price* +resRepair.tax,
        totalPrice: resRepair.totalPrice || 0,

        checkJobReceiptNumber: resRepair.checkJobReceiptNumber,
        statusCheckJob: resRepair.statusCheckJob,

        approveHireDate: resRepair.approveHireDate
          ? new Date(resRepair.approveHireDate)
          : new Date(),

        checkJobDate: resRepair.checkJobDate
          ? new Date(resRepair.checkJobDate)
          : new Date(),

        hireNumber: resRepair.hireNumber,

        sendWithDrawMoneyDate: resRepair.sendWithDrawMoneyDate
          ? new Date(resRepair.sendWithDrawMoneyDate)
          : new Date(),

        receiveWorkOrderDate: resRepair.receiveWorkOrderDate
          ? new Date(resRepair.receiveWorkOrderDate)
          : new Date(),

        checkJobInsuranceEndDate: resRepair.checkJobInsuranceEndDate
          ? new Date(resRepair.checkJobInsuranceEndDate)
          : new Date(),

        checkJobWarrantyPeriod: resRepair.checkJobWarrantyPeriod,
        purchaseAmount: resRepair.purchaseAmount,
        outsoutceFlag: resRepair.outsoutceFlag || false,
        statusOutsourceRepair: resRepair.statusOutsourceRepair
      });
      setIsLoading(false);
    };
    getData();
  }, []);

  const handleSubmit = async () => {
    try {
      await updateStatusForCheckJobRepair(id);
      window.location.reload();
      setShowModalSuccess(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-background-page pt-5 p-3">
      <div>
        <div className="text-xl text-text-green flex items-center">
          <Link
            to={`/repairTechnicianIndex`}
            className="flex justify-center items-center hover:bg-gray-200 rounded-full w-8 h-8 px-2 py-2 mr-2"
          >
            <BsArrowLeft className="text-lg" />
          </Link>
          <h1>รายละเอียดการแจ้งซ่อม</h1>
        </div>

        <div className="flex pt-3">
          <div className="flex text-xs">
            <Link
              to="/"
              className=" text-text-green underline text-xs focus:text-sky-700 focus:underline mr-2"
            >
              Home
            </Link>

            <div className="text-text-gray">/</div>

            <p>&nbsp;</p>
            <h1> รายละเอียดการแจ้งซ่อม</h1>
          </div>
        </div>

        {/* status */}
        <div className="flex justify-end gap-5 mr-5">
          <div className="flex items-center gap-2">
            <h1>สถานะใบแจ้งซ่อม</h1>

            <div
              className={`text-sm p-2 rounded-full px-3 
              ${
                item?.status == "waitingForCheck"
                  ? "bg-[#9B51E0] text-white"
                  : item?.status == "waitingForCheck"
              }`}
            >
              {item?.status == "waitingForCheck"
                ? "รอตรวจรับ"
                : item?.status == "waitingForCheck"}
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="mt-5 py-10 w-full text-center">
          <Spinner size="xl" />
        </div>
      ) : (
        <>
          <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-2">
            <div>
              <div className="text-xl">ข้อมูลครุภัณฑ์</div>
              {/* row 1 */}
              <div className="grid grid-cols-2 gap-2 md:grid-cols-6 p-2">
                <div className="text-text-gray flex items-center">
                  เลขที่ใบแจ้งซ่อม
                </div>
                <div className="flex items-center col-span-2">
                  {item.informRepairIdDoc}
                </div>
                <div className="text-text-gray flex items-center ">
                  สถานะความเร่งด่วน
                </div>
                <div
                  className={`flex justify-center items-end -mt-3 py-2 w-fit px-3.5 rounded-full h-fit col-span-2
              ${
                item.urgentStatus === "ปกติ"
                  ? "bg-blue-600 text-white "
                  : item.urgentStatus === "เร่งด่วน"
                  ? "bg-[#F2994A] text-white "
                  : item.urgentStatus === "ฉุกเฉิน"
                  ? "bg-red-700 text-white "
                  : "border-0"
              }`}
                >
                  {item.urgentStatus}
                </div>
              </div>
              {/* row 2 */}
              <div className="grid grid-cols-2 gap-2 md:grid-cols-6 p-2">
                <div className="text-text-gray flex items-center">
                  เวลาที่แจ้งซ่อม
                </div>
                <div className="flex items-center col-span-2">
                  {item.informRepairDate &&
                    `${new Date(item.informRepairDate).toLocaleString("th", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false
                    })} น.`}
                </div>
                <div className="text-text-gray flex items-center">
                  รหัสครุภัณฑ์
                </div>
                <div className="flex items-center col-span-2">
                  {item.assetGroupNumber}
                </div>
              </div>
              {/* row 3 */}
              <div className="grid grid-cols-2 gap-2 md:grid-cols-6 p-2">
                <div className="text-text-gray flex items-center">
                  อยู่ในประกัน
                </div>
                <div
                  className={`flex items-center ${
                    item.isInsurance ? "text-text-green" : "text-red-500"
                  } col-span-2`}
                >
                  {item.isInsurance ? "อยู่ในประกัน" : "ไม่อยู่ในประกัน"}
                </div>
                <div className="text-text-gray flex items-center">
                  เลขครุภัณฑ์
                </div>
                <div className="flex items-center col-span-2">
                  {item.assetNumber}
                </div>
              </div>
              {/* row 4 */}
              <div className="grid grid-cols-2 gap-2 md:grid-cols-6 p-2">
                <div className="text-text-gray flex items-center">
                  เจ้าของครุภัณฑ์
                </div>
                <div className="flex items-center col-span-2">
                  {item.hostSector}
                </div>
                <div className="text-text-gray flex items-center">
                  ชื่อครุภัณฑ์
                </div>
                <div className="flex items-center col-span-2">
                  {item.productName}
                </div>
              </div>
              {/* row 5 */}
              <div className="grid grid-cols-2 gap-2 md:grid-cols-6 p-2">
                <div className="text-text-gray flex items-center">
                  วันที่เริ่มรับประกัน
                </div>
                <div className="flex items-center col-span-2">
                  {item.insuranceStartDate
                    ? `${new Date(item.insuranceStartDate).toLocaleString(
                        "th",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false
                        }
                      )} น.`
                    : "-"}
                </div>
                <div className="text-text-gray flex items-center">
                  ส่วนที่ชำรุด เสียหาย
                  <h1 className="text-red-500">*</h1>
                </div>
                <div className="flex items-center col-span-2">
                  {item.problemDetail}
                </div>
              </div>
              {/* row 6 */}
              <div className="grid grid-cols-2 gap-2 md:grid-cols-6 p-2">
                <div className="text-text-gray flex items-center">
                  วันที่สิ้นสุดการรับประกัน
                </div>
                <div className="flex items-center col-span-2">
                  {item.insuranceEndDate
                    ? `${new Date(item.insuranceEndDate).toLocaleString("th", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false
                      })} น.`
                    : "-"}
                </div>
                <div className="text-text-gray flex items-center">สท.01</div>
                <div className="flex items-center col-span-2">
                  {item.asset01 || "-"}
                </div>
              </div>
              {/* row 7 */}
              <div className="grid grid-cols-2 gap-2 md:grid-cols-6 p-2">
                <div className="text-text-gray flex items-center">
                  รหัส cost center
                </div>
                <div className="flex items-center col-span-2">
                  {item.costCenterCode || "-"}
                </div>
              </div>
            </div>

            <div className="pt-5">
              <div className="text-xl">ข้อมูลสถานที่ซ่อม</div>

              <div className="grid grid-cols-2  md:grid-cols-6 p-2">
                <div className="text-text-gray flex items-center ">
                  ที่ตั้ง/อาคาร
                </div>
                <div className="flex items-center  col-span-2">
                  {item.building}
                </div>
                <div className="text-text-gray flex items-center ">ชั้น</div>
                <div className="flex items-center col-span-2 ">
                  {item.floor}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-6 p-2">
                <div className="text-text-gray flex items-center">ห้อง</div>
                <div className="flex items-center col-span-2">{item.room}</div>
              </div>
            </div>

            <div className="pt-5">
              <div className="text-xl">ข้อมูลผู้เกี่ยวข้อง</div>

              <div className="grid grid-cols-2  md:grid-cols-6 p-2">
                <div className="text-text-gray flex items-center ">
                  ผู้ส่งซ่อม
                </div>
                <div className="flex items-center col-span-2 ">
                  {item.name_courier}
                </div>
                <div className="text-text-gray flex items-center ">
                  เบอร์โทรศัพท์
                </div>
                <div className="flex items-center col-span-2 ">
                  {item.phoneNumber}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-6 p-2">
                <div className="text-text-gray flex items-center">
                  ผู้ประสานงาน
                </div>
                <div className="flex items-center col-span-2">
                  {item.name_recorder}
                </div>
                <div className="text-text-gray flex items-center">หน่วยงาน</div>
                <div className="flex items-center col-span-2">
                  {item.courierSector}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3">
            <div>
              <div className="text-xl">รายละเอียดการซ่อม</div>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-5 p-2">
                <div className="text-text-gray flex items-center ">
                  ประเภทการซ่อม
                </div>
                <div className="flex items-center ">{item.typeOfRepair}</div>
              </div>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-5 p-2">
                <div className="text-text-gray flex items-center">
                  หน่วยงานซ่อม
                </div>
                <div className="flex items-center">{item.repairSector}</div>
              </div>
              <div className="grid grid-cols-3 gap-2 md:grid-cols-5 p-2">
                <div className="text-text-gray flex items-center">
                  ส่วนที่ชำรุดหรือเหตุขัดข้อง
                </div>
                <div className="flex items-center col-span-2">
                  {item.problemDetail}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3 grid">
            <div className="text-xl">ค่าใช้จ่ายในการซ่อม</div>
            <div className="overflow-x-auto scrollbar pt-4">
              <div className="w-[1000px] lg:w-full p-2 ">
                <div className="bg-background-gray-table text-xs py-5 items-center justify-center rounded-lg">
                  <div className="grid grid-cols-9 gap-2 text-center">
                    <div className="col-span-1">ลำดับ</div>
                    <div className="col-span-3">รายการ</div>
                    <div className="col-span-1">จำนวน</div>
                    <div className="col-span-1">หน่วย</div>
                    <div className="col-span-1">ราคา/หน่วย (บาท)</div>
                    <div className="col-span-1">รวมทั้งหมด(บาท)</div>
                    <div className="col-span-1"></div>
                  </div>
                </div>

                {arrayCostRepair?.map((el, idx) => {
                  return (
                    <TableTechnicianRepairCost key={idx} index={idx} ele={el} />
                  );
                })}

                <div className="p-4 rounded-md bg-background-gray-table mt-10 flex justify-between">
                  <h1>รวมจำนวนเงินทั้งหมด</h1>
                  <div>{item?.totalPrice || "0"} บาท</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3 grid">
            <div className="text-xl mt-3">ผลการซ่อม</div>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-6 p-2">
              <div className="text-text-gray flex items-center ">ผลการซ่อม</div>
              <div className="flex items-center col-span-2 ">
                <h1>{item.repairResult}</h1>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-6 p-2">
              <div className="text-text-gray flex items-center ">
                ความเห็นช่าง
              </div>
              <div className="flex items-center col-span-2 ">
                <h1>{item.mechinicComment}</h1>
              </div>
            </div>{" "}
          </div>

          <div className="bg-white border-[1px] rounded-lg shadow-sm text-sm mt-3 flex justify-between items-center gap-10 p-5 text-sm mr-">
            <Link to="/repairIndex">
              <button
                type="button"
                className=" hover:bg-gray-100 text-text-gray text-sm rounded-md py-2 px-4"
              >
                ยกเลิก
              </button>
            </Link>
            <div className="flex justify-end gap-4">
              <button
                id="form"
                type="submit"
                className="bg-[#2F80ED] hover:bg-[#2973d6] text-white text-sm text-white rounded-md py-2 px-4"
                onClick={handleSubmit}
              >
                ตรวจรับ
              </button>

              <ModalConfirmSave
                isVisible={showModalConfirm}
                onClose={() => setShowModalConfirm(false)}
                onSave={() => handleSubmit()}
              />
              {showModalSuccess && <ModalSuccess urlPath="/repairIndex" />}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const TableTechnicianRepairCost = ({ index, ele }) => {
  return (
    <div className="p-2 grid grid-cols-9 justify-center items-center gap-5 text-xs bg-white">
      <div className="col-span-1 ml-2 text-center flex justify-center items-center ">
        <div className=" flex justify-center items-center bg-gray-200 rounded-full w-6 h-6 px-2 py-2">
          {index + 1}
        </div>
      </div>
      <div className="col-span-3">
        <input
          type="text"
          className="py-2 w-full border-[1px] border-block-green rounded-md focus:border-1 focus:outline-none  focus:border-black focus:ring-transparent bg-[#F0F0F0]"
          name="stuffName"
          defaultValue={ele.stuffName}
          readOnly
        />
      </div>
      <div className="col-span-1">
        <input
          type="text"
          className="text-center py-2 w-full border-[1px] border-block-green rounded-md focus:border-1 focus:outline-none  focus:border-black focus:ring-transparent bg-[#F0F0F0]"
          name="quantity"
          defaultValue={ele.quantity}
          readOnly
        />
      </div>
      <div className="col-span-1">
        <input
          type="text"
          className="text-center py-2 w-full border-[1px] border-block-green rounded-md focus:border-1 focus:outline-none  focus:border-black focus:ring-transparent bg-[#F0F0F0]"
          name="unit"
          defaultValue={ele.unit}
          readOnly
        />
      </div>
      <div className="col-span-1">
        <input
          type="text"
          className="text-center py-2 w-full border-[1px] border-block-green rounded-md focus:border-1 focus:outline-none  focus:border-black focus:ring-transparent bg-[#F0F0F0]"
          name="pricePerPiece"
          defaultValue={ele.pricePerPiece}
          readOnly
        />
      </div>
      <div className="col-span-1">
        <input
          type="text"
          className="text-center py-2 w-full border-[1px] border-block-green rounded-md focus:border-1 focus:outline-none  focus:border-black focus:ring-transparent bg-[#F0F0F0]"
          name="total"
          defaultValue={ele.quantity * ele.pricePerPiece || 0}
          readOnly
        />
      </div>
    </div>
  );
};
