import getAllData from "./url.js";

let basket = JSON.parse(localStorage.getItem("basket")) || [];
document.getElementById("basket-count").innerText = basket.length;

async function useFetch() {
  const data = await getAllData();
  getCategory(data);
  getByCategData(data);
  checkWish();
}
useFetch();

function getCategory(data) {
  let html = "";
  let genres = [];
  let arr = [];
  data.forEach((item) => {
    arr.push(item.genre);
  });
  genres = [...new Set(arr)];
  genres.forEach((genre) => {
    html += `<li onclick="location.search = 'categ=${genre}'" class="text-[14px] mb-2 text-gray-500 hover:text-red-500 cursor-pointer">${genre}</li>`;
  });
  document.getElementById("categs").innerHTML = html;
}

function getByCategData(data) {
  let html = "";
  const query = location.search;
  const genre = new URLSearchParams(query).get("categ");
  const filteredData = data.filter((item) => item.genre === genre);
  filteredData.forEach((element) => {
    html += `<div class="py-[10px] px-[20px] relative">
                <button onclick="addWish(${
                  element.id
                })" class="absolute top-1 right-2"><i id="wish-btn${
      element.id
    }" class="fa-regular fa-heart bg-white text-2xl text-gray-500 hover:text-red-600 hover:cursor-pointer"></i></button>
                <a href="detail.html?id=${element.id}">
                <img src="${element.image}" alt="img">
                </a>
                <p class="my-2">${element.name}</p>
                <span class="font-bold">${(
                  element.price -
                  (element.price * element.sale) / 100
                ).toFixed(
                  2
                )} ₼</span><sup><del class="text-gray-500 text-[14px] ml-2">${element.price.toFixed(
      2
    )} ₼</del></sup>
              </div>`;
  });
  document.getElementById("cards").innerHTML = html;
}

let wishArr = JSON.parse(localStorage.getItem("wishlist")) || [];
function checkWish() {
  wishArr.forEach((id) => {
    document.getElementById(`wish-btn${id}`).style.color = "red";
  });
  document.getElementById("wish-count").innerText = wishArr.length;
}

document.addWish = (id) => {
  if (wishArr.includes(id)) {
    wishArr.splice(
      wishArr.findIndex((item) => item === id),
      1
    );
    document.getElementById(`wish-btn${id}`).style.color = "gray";
  } else {
    wishArr.push(id);
    document.getElementById(`wish-btn${id}`).style.color = "red";
  }
  localStorage.setItem("wishlist", JSON.stringify(wishArr));
  document.getElementById("wish-count").innerText = wishArr.length;
};
