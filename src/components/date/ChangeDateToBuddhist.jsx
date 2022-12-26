
const ChangeDateToBuddhist = (dateStr) => {
  const spaceArray = dateStr.split(" ");
  const splitOnlyDate = spaceArray[0].split("/");
  const changeFormat =
    splitOnlyDate[2] + "/" + splitOnlyDate[1] + "/" + splitOnlyDate[0];
  return new Date(changeFormat + " " + spaceArray[1]);
};

export default ChangeDateToBuddhist;
