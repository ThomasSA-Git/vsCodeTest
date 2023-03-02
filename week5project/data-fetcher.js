
document.getElementById("svg2").onclick = (evt) => {
  const countryTarget = evt.target;
  const countryCode = countryTarget.id;


  countryTarget.style.fill = "blue"


  fetch(`https://countries.plaul.dk/api/countries/${countryCode}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("info").style.display = "block"
      document.getElementById("name").innerText = data.name.common
      document.getElementById("un-member").innerText = data.unMember
      document.getElementById("capital").innerText = data.capital
      document.getElementById("borders").innerText = data.borders.join(",")
      document.getElementById("flag").setAttribute("src", data.flag)

    })
    .catch(e => console.log(e))


}