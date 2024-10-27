const form= document.querySelector("#form");
const incomeamount = document.querySelector("#income-amount");
const incomeSource = document.querySelector("#income-name");
const incomedate= document.querySelector("#income-date");



let users=JSON.parse(localStorage.getItem("users")) || [];

const currentUser= JSON.parse(localStorage.getItem("currentUser"));
let allIncomeData= JSON.parse(localStorage.getItem("allIncomeData")) || {};

console.log(form)
let userCurent = document.querySelector("#userCurent");
console.log("currentUser");
    userCurent.textContent =`User: ${currentUser.fullname}` 

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if(incomeSource.value ==='' || incomeamount.value === '' || incomedate.value === ''){
       // alert("");
       Swal.fire({
        title: "Error!",
        text: "Please fill all fields!",
        icon: "error",
        confirmButtonText: "Try again"
      });
        return;
    }

if (!currentUser || !currentUser.fullname) {
    alert("No user is currently logged in");
    return;
}


const newIncome = {
    amount: incomeamount.value,
    source: incomeSource.value,
    date: incomedate.value
};


const allIncomeData = JSON.parse(localStorage.getItem("allIncomeData")) || {};
const userIncomeData = allIncomeData[currentUser.fullname] || [];
console.log("waa usericome",userIncomeData)


userIncomeData.push(newIncome);

console.log("waaa all icomedata", allIncomeData[currentUser.fullname])
allIncomeData[currentUser.fullname] = userIncomeData;



localStorage.setItem("allIncomeData", JSON.stringify(allIncomeData));
incomeamount.value = "";
     incomeSource.value = "";
    incomedate.value = "";


    AddDom(allIncomeData);



 });





 function AddDom(allIncomeData) {
  
    let tbody= document.querySelector("#tbody")
    let userIncomeArray = allIncomeData[currentUser.fullname];
    console.log(userIncomeArray)

  
  
    tbody.innerHTML = '';

    if (!allIncomeData || Object.keys(allIncomeData).length === 0 || !allIncomeData[currentUser.fullname]) {
        tbody.innerHTML = '<tr><td colspan="4">No income data</td></tr>';
        return;
    }
 
  

    if (!userIncomeArray || userIncomeArray.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4">No income data</td></tr>';
        return;
    }
    userIncomeArray.forEach((income, index) => {
        tbody.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${income.source}</td>
            <td>${income.date}</td>
            <td>$${income.amount}</td>
        </tr>`;
    });

   

   

 }

 document.addEventListener("DOMContentLoaded", () => {
    
    AddDom(allIncomeData)
 });


const logouts = document.querySelectorAll("#logout");
console.log(logouts);
logouts.forEach(logout => {
    logout.addEventListener("click", () => {
         localStorage.removeItem("currentUser");
         window.location.href="../html/login.html"
    })
})









