
const ChangeDateToBuddhist = (date) => {
  // const spaceArray = dateStr.split(" ");
  // const splitOnlyDate = spaceArray[0].split("/");
  // const changeFormat =
  //   splitOnlyDate[2] + "/" + splitOnlyDate[1] + "/" + splitOnlyDate[0];
  // return new Date(changeFormat + " " + spaceArray[1]);

  // let dateStr = date
  // if(typeof(dateStr) == "object") {
  //   dateStr = new Date(date).toLocaleString()
  // }
  const dateBuddhist = new Date(new Date(date).setFullYear(new Date(date).getFullYear() + 543)).toLocaleString([], { hour12: false , year: "numeric", day: "2-digit", month: "2-digit" })
  const spaceArray = dateBuddhist.split(" ");
  const splitDate = spaceArray[0].split("/")
  // const dateFormat = splitDate[1]?.padStart(2, "0") + "/" + splitDate[0].padStart(2, "0") + "/"  + splitDate[2]?.slice(0,-1)
  const dateFormat = splitDate[1]+ "/" + splitDate[0] + "/"  + splitDate[2]
  
  return dateFormat
};

export default ChangeDateToBuddhist;
