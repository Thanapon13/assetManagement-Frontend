import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import InputAddress from "react-thailand-address-autocomplete";

function RowOfTableAddressMerchant({
  index,
  arrayAddress,
  errorAddress,
  setArrayAddress,
  // address
}) {
  const address = arrayAddress[index]
  // const [address, setAddress] = useState(arrayAddress[index])
  const [onInput, setOnInput] = useState("")

  const delAddress = (index) => {
    let clone = [...arrayAddress];
    clone.splice(index, 1);
    setArrayAddress(clone);
  }

  const handleChangeAddress = (e) => {
    // setArrayAddress(prevInput => {
    //   console.log(prevInput)
    //   // return {
    //   //   ...prevInput,
    //   //   [e.target.name]: e.target.value
    //   // }
    // })
  };

  const onSelectAddress = ({ subdistrict, district, province, zipcode }, x) => {
    // console.log(subdistrict, district, province, zipcode)
    const clone = [...arrayAddress];
    clone[index].subDistrict = subdistrict
    clone[index].district = district
    clone[index].province = province
    clone[index].postalCode = zipcode
    setArrayAddress(clone)
  };

  const onChange = (e) => {
    const clone = [...arrayAddress];
    setOnInput(e.target.name)
    switch (e.target.name) {
      case "subdistrict":
        clone[index].subDistrict = e.target.value;
        break;
      case "district":
        clone[index].district = e.target.value;
        break;
      case "province":
        clone[index].province = e.target.value;
        break;
      case "zipcode":
        clone[index].postalCode = e.target.value;
        break;
      default:
        break;
    }
    setArrayAddress(clone)
  };

  function onChangeInput(e) {
    const clone = [...arrayAddress];
    clone[index][e.target.name] = e.target.value
    setArrayAddress(clone)
  }

  const inputClassname = "w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
  const addressClass = {
    outline: "none",
    width: "100%",
    height: "38px"
  }
  return (
    <>
      <div className='col-span-2 border border-gray-300 rounded-md p-2'>
        <div className="flex">
          <div className="mt-2 mr-2 flex justify-center items-center bg-gray-200 rounded-full w-6 h-6 p-2">
            {index + 1}
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1  gap-x-4 gap-y-3 mt-3 text-xs">
            <div className='grid grid-cols-3 gap-x-4'>
              <div className='col-span-2'>
                บ้านเลขที่
                <input
                  className={`${inputClassname} ${errorAddress && !address.address && "border-red-500"}`}
                  value={address.address}
                  name="address"
                  onChange={onChangeInput}
                />
              </div>
              <div>
                หมู่ที่
                <input
                  className={`${inputClassname} ${errorAddress && !address.group && "border-red-500"}`}
                  value={address.group}
                  name="group"
                  onChange={onChangeInput}
                />
              </div>
            </div>

            <div>
              หมู่บ้าน
              <input
                className={`${inputClassname} ${errorAddress && !address.village && "border-red-500"}`}
                value={address.village}
                name="village"
                onChange={onChangeInput}
              />
            </div>
            <div>
              ซอย
              <input
                className={`${inputClassname} ${errorAddress && !address.alley && "border-red-500"}`}
                value={address.alley}
                name="alley"
                onChange={onChangeInput}
              />
            </div>

            <div>
              ถนน
              <input
                name="street"
                // onChange={handleChangeAddress}
                onChange={onChangeInput}
                value={address.street}
                className={`${inputClassname} ${errorAddress && !address.street && "border-red-500"}`}
              />
            </div>

            <div >
              <p>ตำบล</p>
              <div >
                <InputAddress
                  address="subdistrict"
                  value={address?.subDistrict}
                  onChange={onChange}
                  onSelect={onSelectAddress}
                  filter={(items) => {
                    if (onInput == "subdistrict") return
                    items.filter(
                      (item) =>
                        (!district || item.district.includes(address.district)) &&
                        (!subdistrict ||
                          item.subdistrict.includes(address.subdistrict)) &&
                        (!province || item.province.includes(address.province)) &&
                        (!zipcode || item.zipcode.includes(address.zipcode))
                    )
                  }}
                  style={addressClass}
                // maxWidth: "100%"
                // display: "block"
                // marginRight: "15px"
                />
              </div>
            </div>
            <div>
              อำเภอ
              <InputAddress
                address="district"
                value={address.district}
                onChange={onChange}
                onSelect={onSelectAddress}
                filter={(items) => {
                  if (onInput == "district") return
                  items.filter(
                    (item) =>
                      (!district || item.district.includes(address.district)) &&
                      (!subdistrict ||
                        item.subdistrict.includes(address.subdistrict)) &&
                      (!province || item.province.includes(address.province)) &&
                      (!zipcode || item.zipcode.includes(address.zipcode))
                  )
                }}
                style={addressClass}
              />
            </div>

            <div>
              จังหวัด
              <InputAddress
                address="province"
                value={address?.province}
                onChange={onChange}
                onSelect={onSelectAddress}
                filter={(items) => {
                  if (onInput == "province") return
                  (item) =>
                    (!address?.district ||
                      item?.district?.includes(address?.district)) &&
                    (!address?.subdistrict ||
                      item?.subdistrict?.includes(address?.subdistrict)) &&
                    (!address?.province ||
                      item?.province?.includes(address?.province)) &&
                    (!address?.zipcode || item?.zipcode?.includes(address?.zipcode))
                }}
                style={addressClass}
              />
            </div>
            <div>
              รหัสไปรษณีย์
              <InputAddress
                address="zipcode"
                value={address.postalCode}
                onChange={onChange}
                onSelect={onSelectAddress}
                filter={(items) => {
                  if (onInput == "zipcode") return
                  items.filter(
                    (item) =>
                      (!address?.district ||
                        item?.district?.includes(address?.district)) &&
                      (!address?.subdistrict ||
                        item?.subdistrict?.includes(address?.subdistrict)) &&
                      (!address?.province ||
                        item?.province?.includes(address?.province)) &&
                      (!address?.zipcode || item?.zipcode?.includes(address?.zipcode))
                  )
                }}
                style={addressClass}
              />
            </div>

          </div>

          <div className='mt-1 mx-1 hover:bg-gray-200 rounded-full h-fit cursor-pointer p-1'
            onClick={() => delAddress(index)}>
            <IoIosClose className="text-2xl" />
          </div>
        </div>
      </div>

    </>
  );
}

export default RowOfTableAddressMerchant;
