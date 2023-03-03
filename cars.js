
const btnCars = document.getElementById("btn-get-all-cars")
btnCars.onclick = getAllCars

const btnSingleCar = document.getElementById("find-car")
btnSingleCar.onclick = getCar

const btnAddCar = document.getElementById("add-car")
btnAddCar.onclick = prepData

const btnShowEdit = document.getElementById("btn-show-edit")
btnShowEdit.onclick = showEditCar

const btnEdit = document.getElementById("btn-edit")
btnEdit.onclick = prepPutData

const URLcar = "http://localhost:9090/api/cars"


function getAllCars(evt){

fetch(URLcar)
.then(res=> res.json())
   .then(cars => makeCarTable(cars))
   .catch((error)=>alert(error))
}

function makeCarTable(list){
    const tableRows = list.map(car => 
        `<tr>
        <td>${car.id}</td>
        <td>${car.brand}</td>
        <td>${car.pricePrDay}</td>
      </tr>`).join("")
      document.getElementById("tablebody").innerHTML = tableRows
}

function getCar(evt){
    const id = document.getElementById("text-for-id").value
    if(!id){
        alert("Enter id")
    }

    fetch(URLcar+"/"+id)
       .then(res=>{
        if(!res.ok){
            return Promise.reject("car Not Found")
        }
        return res.json()})
       .then(data=>{
        document.getElementById("c-id").innerText = "ID: " + data.id
        document.getElementById("c-brand").innerText = "Brand: " + data.brand
        document.getElementById("c-pricePrDay").innerText = "PricePrDay: " + data.pricePrDay
       })
       .catch((error)=>alert(error))
      
    }


    function prepData(evt){
        const brand = document.getElementById("input-brand").value
        const model = document.getElementById("input-model").value
        const price = document.getElementById("input-price").value
        const discount = document.getElementById("input-discount").value

    const postData = {
      brand: brand,
      model: model,
      pricePrDay: price,
      bestDiscount: discount
    };
    postCar(postData)
}

function postCar(data){
    fetch(URLcar, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
      console.log('Success:', result);
      document.getElementById("succes-add").innerText = data.brand + " "+ data.model +" has been add to list"
    })
    .catch(error => {
      console.error('Error:', error);
    });

 
}

function showEditCar(){
    
    /* Below finds car to edit and puts the values in the input field for inspection */
    const id = document.getElementById("text-for-id2").value
    if(!id){
        alert("Enter id")
    }

    fetch(URLcar+"/"+id)
       .then(res=>{
        if(!res.ok){
            return Promise.reject("car Not Found")
        }
        return res.json()})
       .then(car=>{
        document.getElementById("edit-brand").value = car.brand
        document.getElementById("edit-model").value = car.model
        document.getElementById("edit-pricePrDay").value = car.pricePrDay
   /*      document.getElementById("edit-discount").value = data.bestDiscount */
       })
       .catch((error)=>alert(error))

   }

   function prepPutData(evt){
    const brand = document.getElementById("edit-brand").value
    const model = document.getElementById("edit-model").value
    const price = document.getElementById("edit-price").value
    const discount = document.getElementById("edit-discount").value

const putData = {
  brand: brand,
  model: model,
  pricePrDay: price,
  bestDiscount: discount
};
putCar(putData)
}

function putCar(data){
    fetch(URLcar + "/" + document.getElementById("text-for-id2").value, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
      console.log('Success:', result);
    })
 /*    .catch(error => {
      console.error('Error:', error);
    });
 */
 
}