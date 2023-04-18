import { useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import InputAddress from "react-thailand-address-autocomplete";

function RowOfTableAddressMerchant({
  index,
  arrayAddress,
  errorAddress,
  setArrayAddress,
  address
}) {

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
    console.log(arrayAddress[0])
  };

  const onSelectAddress = ({ subdistrict, district, province, zipcode }) => {
    console.log(subdistrict, district, province, zipcode)
    // setInput({
    //   subdistrict,
    //   district,
    //   province,
    //   zipcode,
    // });
    // const clone = [...arrayAddress];
    // clone[index].subDistrict = subDistrict
    // clone[index].district = district
    // clone[index].province = province
    // clone[index].postalCode = postalCode
    // setArrayAddress(clone)
  };

  const onChange = (e) => {
    const clone = [...arrayAddress];

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
    console.log(e.target.value, index)
    console.log(clone)
    setArrayAddress(clone)
  };

  const inputClassname = "w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"

  return (
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
                className={`${inputClassname} ${errorAddress && "border-red-500"}`}
              />
            </div>
            <div>
              หมู่ที่
              <input
                className={`${inputClassname}`}
              />
            </div>
          </div>

          <div>
            หมู่บ้าน
            <input
              className={`${inputClassname}`}
            />
          </div>
          <div>
            ซอย
            <input
              className={`${inputClassname}`}
            />
          </div>

          <div>
            ถนน
            <input
              name="road"
              onChange={handleChangeAddress}
              value={address.road}
              className={`${inputClassname}`}
            />
          </div>

          <div>
            ตำบล
            <InputAddress
              address="subdistrict"
              value={address?.subDistrict}
              onChange={onChange}
              onSelect={onSelectAddress}
              filter={(items) =>
                console.log(items)
                // items.filter(
                //   (item) =>
                //     console.log(item)
                //       (!address?.subDistrict ||
                //         item?.subDistrict?.includes(address?.subDistrict)) &&
                //     (!address?.province ||
                //       item.province.includes(address?.province)) &&
                //     (!address?.zipcode || item?.zipcode?.includes(address?.zipcode))
                // )
              }
            />
          </div>
          <div>
            อำเภอ
            <InputAddress
                  address="district"
                 value={address.district}
                  onChange={onChange}
                  onSelect={onSelectAddress}
                  filter={(items) =>
                    items.filter(
                      (item) =>
                        (!district || item.district.includes(district)) &&
                        (!subdistrict ||
                          item.subdistrict.includes(subdistrict)) &&
                        (!province || item.province.includes(province)) &&
                        (!zipcode || item.zipcode.includes(zipcode))
                    )
                  }
                />
          </div>

          <div>
            จังหวัด
            <InputAddress
                address="province"
                value={address?.province}
                onChange={onChange}
                onSelect={onSelectAddress}
                filter={(items) =>
                  items.filter(
                    // (item) =>
                    //   (!address?.district ||
                    //     item?.district?.includes(address?.district)) &&
                    //   (!address?.subdistrict ||
                    //     item?.subdistrict?.includes(address?.subdistrict)) &&
                    //   (!address?.province ||
                    //     item?.province?.includes(address?.province)) &&
                    //   (!address?.zipcode || item?.zipcode?.includes(address?.zipcode))
                  )
                }
              />
          </div>
          <div>
            รหัสไปรษณีย์
            <InputAddress
              address="zipcode"
              value={address.postalCode}
              onChange={onChange}
              onSelect={onSelectAddress}
              filter={(items) =>
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
              }
            />
          </div>

        </div>

        <div className='mt-1 mx-1 hover:bg-gray-200 rounded-full h-fit cursor-pointer p-1'
          onClick={() => delAddress(index)}>
          <IoIosClose className="text-2xl" />
        </div>
      </div>
    </div>
  );
}

export default RowOfTableAddressMerchant;
