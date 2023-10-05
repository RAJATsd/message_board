function padZero(number) {
  return (number < 10 ? "0" : "") + number;
}

export const convertTime = (timestampString) => {
  const timestamp = new Date(timestampString);

  var hours = timestamp.getHours();
  var minutes = timestamp.getMinutes();
  var seconds = timestamp.getSeconds();
  var ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;

  var formattedTime =
    hours + ":" + padZero(minutes) + ":" + padZero(seconds) + " " + ampm;

  return formattedTime;
};
