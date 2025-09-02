import getAllData from "./url.js";

const basket = JSON.parse(localStorage.getItem("basket")) || [];
document.getElementById("basket-count").innerText = basket.length;
const wishArr = JSON.parse(localStorage.getItem("wishlist")) || [];
document.getElementById("wish-count").innerText = wishArr.length;

let data = [];

async function useFetch() {
  data = await getAllData();
  showWish();
  checkWish();
}
useFetch();

function showWish() {
  let filteredArr = [];
  let html = "";
  wishArr.forEach((id) => {
    filteredArr.push(...data.filter((item) => Number(item.id) === id));
  });
  filteredArr.forEach((element) => {
    element.price = Number(element.price);
    element.sale = Number(element.sale);
    html += `<div class="py-[10px] px-[20px] relative">
              <button onclick="removeWish(${
                element.id
              })" class="absolute top-1 right-2"><i id="wish-btn${
      element.id
    }" class="fa-regular fa-heart bg-white text-2xl text-gray-500 hover:text-red-600 hover:cursor-pointer"></i></button>
              <a href="./pages/detail.html?id=${element.id}">
              <img class="rounded-2xl" src="${element.image}" alt="img">
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
  if (wishArr.length === 0)
    document.getElementById("cards").innerHTML =
      "<p class='text-3xl text-black'>Heçnə seçilməyib...</p>";
}
function checkWish() {
  wishArr.forEach((id) => {
    document.getElementById(`wish-btn${id}`).style.color = "red";
  });
  document.getElementById("wish-count").innerText = wishArr.length;
}

document.removeWish = (id) => {
  wishArr.splice(
    wishArr.findIndex((item) => item === id),
    1
  );
  localStorage.setItem("wishlist", JSON.stringify(wishArr));
  document.getElementById("wish-count").innerText = wishArr.length;
  showWish();
  checkWish();
};
