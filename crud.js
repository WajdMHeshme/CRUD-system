let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let count = document.getElementById("count");
let discount = document.getElementById("discount");
let submit = document.getElementById("submit");
let category = document.getElementById("category");
let total = document.getElementById("total");

let mood = "create";
let tmp;
function getData() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.style.background = "#a00d02";
    total.innerHTML = "";
  }
}
let dataProducts;

if (localStorage.products != null) {
  dataProducts = JSON.parse(localStorage.products);
} else {
  dataProducts = [];
}
submit.onclick = function () {
  let product = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    count: count.value,
    discount: discount.value,
    category: category.value.toLowerCase(),
    total: total.innerHTML,
  };
  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    count.value < 100
  ) 
  {
    if (mood === "create") {
      if (product.count > 1) {
        for (let i = 0; i < product.count; i++) {
          dataProducts.push(product);
        }
      } else {
        dataProducts.push(product);
      }
    } else {
      dataProducts[tmp] = product;
      submit.innerHTML = "Create";
      mood = "create";
      count.style.display = "block";
    }
  }

  //

  // if (product.count > 1) {
  //   for (let i = 0; i < product.count; i++) {
  //     dataProducts.push(product);
  //   }
  // } else {
  //   dataProducts.push(product);
  // }
  // dataProducts.push(product);
  localStorage.setItem("products", JSON.stringify(dataProducts));
  cleanInputs();
  showData();
  // updateData(i);
};

function cleanInputs() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  count.value = "";
  discount.value = "";
  category.value = "";
  total.innerHTML = "";
}

function showData() {
  getData();
  let table = "";
  for (let i = 0; i < dataProducts.length; i++) {
    table += `
                    <tr>
                    <td>${i}</td>
                    <td>${dataProducts[i].title}</td>
                    <td>${dataProducts[i].price}</td>
                    <td>${dataProducts[i].taxes}</td>
                    <td>${dataProducts[i].ads}</td>
                    <td>${dataProducts[i].discount}</td>
                    <td>${dataProducts[i].total}</td>
                    <td>${dataProducts[i].category}</td>
                    <td><button onclick = updateData(${i})  class="update">update</button></td>
                    <td><button onclick = deleteData(${i})  class="delete">delete</button></td>
                </tr>
    `;
    // document.getElementById("tbody").innerHTML = table;
  }
  document.getElementById("tbody").innerHTML = table;
  let btnDeleteAll = document.getElementById("deleteAll");
  if (dataProducts.length > 0) {
    btnDeleteAll.innerHTML = `
  <button onclick ="DeleteAllData()" class="deleteAllBtn">Delete All</button>
  `;
  } else {
    btnDeleteAll.innerHTML = "";
  }
}
showData();

function deleteData(i) {
  dataProducts.splice(i, 1);
  localStorage.products = JSON.stringify(dataProducts);
  showData();
}
// if (dataProducts.length > 0) {
//   btnDeleteAll.innerHTML = `
// <button onclick ="DeleteAllData()" class="deleteAllBtn">Delete All</button>
// `;
// }
// else {
//   btnDeleteAll.innerHTML = '';
// }

function DeleteAllData() {
  localStorage.clear();
  dataProducts.splice(0);
  showData();
}

function updateData(i) {
  title.value = dataProducts[i].title;
  price.value = dataProducts[i].price;
  taxes.value = dataProducts[i].taxes;
  discount.value = dataProducts[i].discount;
  ads.value = dataProducts[i].ads;
  getData();
  category.value = dataProducts[i].category;
  count.style.display = "none";
  submit.innerHTML = "Update";
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

let searchMood = "title";

function getMood(id) {
  let search = document.getElementById("search");
  if (id === "serachByTitle") {
    searchMood = "title";
    search.placeholder = "Search By Title";
  } else {
    searchMood = "category";
    search.placeholder = "Search By Category";
  }
  search.focus();
  search.value = "";
  showData();
}

function searchData(value) {
  let table = "";
  if (searchMood === "title") {
    for (let i = 0; i < dataProducts.length; i++) {
      if (dataProducts[i].title.includes(value)) {
        table += `
        <tr>
        <td>${i}</td>
        <td>${dataProducts[i].title}</td>
        <td>${dataProducts[i].price}</td>
        <td>${dataProducts[i].taxes}</td>
        <td>${dataProducts[i].ads}</td>
        <td>${dataProducts[i].discount}</td>
        <td>${dataProducts[i].total}</td>
        <td>${dataProducts[i].category}</td>
        <td><button onclick = updateData(${i})  class="update">update</button></td>
        <td><button onclick = deleteData(${i})  class="delete">delete</button></td>
    </tr>
`;
      }
    }
  } else {
    for (let i = 0; i < dataProducts.length; i++) {
      if (dataProducts[i].category.includes(value)) {
        table += `
        <tr>
        <td>${i}</td>
        <td>${dataProducts[i].title}</td>
        <td>${dataProducts[i].price}</td>
        <td>${dataProducts[i].taxes}</td>
        <td>${dataProducts[i].ads}</td>
        <td>${dataProducts[i].discount}</td>
        <td>${dataProducts[i].total}</td>
        <td>${dataProducts[i].category}</td>
        <td><button onclick = updateData(${i})  class="update">update</button></td>
        <td><button onclick = deleteData(${i})  class="delete">delete</button></td>
    </tr>
`;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
