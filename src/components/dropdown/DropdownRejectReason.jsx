
const DropdownRejectReason = ({ callback, header }) => {

  return (
    <>
      <select
        className="ml-2 border text-sm border-gray-300 text-gray-500 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-pointer"
        name="status"
        // value={header}
        onChange={e => callback(e.target.value)}
      >
        <option value="แยกการให้สาเหตุแต่ละรายการ" selected={header == "แยกการให้สาเหตุแต่ละรายการ"}>แยกการให้สาเหตุแต่ละรายการ</option>
        <option value="สาเหตุแบบหลายรายการ" selected={header == "สาเหตุแบบหลายรายการ"}>สาเหตุแบบหลายรายการ</option>
      </select>
    </>
  )
}

export default DropdownRejectReason
