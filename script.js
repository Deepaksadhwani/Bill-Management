import axios from 'https://cdn.jsdelivr.net/npm/axios@1.5.1/+esm'

let count = 1;

let url = "https://crudcrud.com/api/60cc2f1057714b0b9d77509412bae724/orders"


const form = document.getElementById("orders");
const price = document.getElementById("add-price")
const dish = document.getElementById("add-dish")
const table = document.getElementById("table")


form.addEventListener("submit",(event)=>{
    event.preventDefault();
    let priceValue = price.value;
    let dishValue =  dish.value;
    let tableValue = table.value;

    const userDetail = {
        id:count,
        priceValue:priceValue,
        dishValue:dishValue,
        tableValue:tableValue,
    }
    count++;
    postData(userDetail)
    addOrder(userDetail);
    form.reset();
})

function addOrder(userDetail){
    let tableUl = "";
    if(userDetail.tableValue == "table1"){
        tableUl = document.getElementById("table1ul");
    }
    else if(userDetail.tableValue == "table2"){
        tableUl = document.getElementById("table2ul");
    }
    else if(userDetail.tableValue == "table3"){
        tableUl = document.getElementById("table3ul");
    }
    
    const orderList = document.createElement("li");
    orderList.setAttribute("user-data",JSON.stringify(userDetail));
    orderList.style.marginBottom = "11px";
    orderList.style.margin = "20px";

    const text = document.createTextNode("Id: " + userDetail.id + " Dish: "+ userDetail.dishValue +
    " Price: " + userDetail.priceValue)

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete";
    deleteButton.style.width = "70px"
    deleteButton.style.height = "30px"
    deleteButton.style.marginLeft = "20px"
    deleteButton.appendChild(document.createTextNode("Delete"));
    orderList.appendChild(text);
    orderList.appendChild(deleteButton);
    tableUl.appendChild(orderList)

}

const orderUl = document.getElementById("new-bills");
orderUl.addEventListener("click",(event)=>{
    if(event.target.classList.contains("delete")){
        let li = event.target.parentElement;
        let userDetail = JSON.parse(li.getAttribute("user-data"));
        let key = userDetail.id
        deleteData(key)
        li.remove();
    }
})

async function displayOrders(){
    const response = await axios.get(url);
    let length = Object.keys(response.data).length;
    
    for(let i = 0;i < length;i++){
        const data = response.data[i];
        addOrder(data);
        count = data.id;
    }
    if(length == 0){
        count = 1;
    }
    else{
        count++;
    }
}

async function postData(userDetail){
    const response = await axios.post(url,userDetail);
}

async function getId(key){
    const response = await axios.get(url);
    const selectingId = response.data.find(item => item.id == key);
    return selectingId._id;
}

async function deleteData(key){
    let id = await getId(key);
    const response =  await axios.delete(url+`/${id}`);
}

window.addEventListener('load',()=>{
    displayOrders();
})
