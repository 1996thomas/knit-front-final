const formatFrenchDate = (dateString) => {
  let date = new Date(dateString);

  let day = date.getDate();
  let month = date.toLocaleString("fr-FR", { month: "long" });
  let year = date.getFullYear();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  let formatedDate = `Publié le ${day} ${
    month.charAt(0).toUpperCase() + month.slice(1)
  } ${year} à ${hours}h${minutes}`;
  return formatedDate;
};

export default formatFrenchDate;
