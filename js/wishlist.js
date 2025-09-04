import getAllData from "./url.js";
import { showPopUpElm, showPopUpElm2, showPopUp } from "./popupservice.js";

document.querySelectorAll(".second-list").forEach((li) => {
  li.addEventListener("mouseenter", showPopUpElm2);
});
document.querySelectorAll(".first-list").forEach((li) => {
  li.addEventListener("mouseenter", showPopUpElm);
});
document.getElementById("catalog-btn").addEventListener("click", showPopUp);
document.getElementById("pop-up").addEventListener("click", function () {
  document.getElementById("pop-up").classList.add("hidden");
  document.getElementById(
    "catalog-btn"
  ).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" fill="currentColor" class="bi bi-grid" viewBox="0 0 16 16">
                   <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5z"/>
                   </svg><span>Kataloq</span>`;
});
document.getElementById("pop-up-item").addEventListener("click", (e) => {
  e.stopPropagation();
});

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
    html += `<div class="py-[10px] px-[20px] relative hover:border-2 hover:rounded-2xl hover:border-gray-300 hover:drop-shadow-xl/50">
              <button onclick="removeWish(${
                element.id
              })" class="absolute top-1 right-2" style="clip-path: polygon(51% 14%, 80% 0, 92% 29%, 85% 69%, 50% 100%, 16% 68%, 5% 28%, 20% 0);"><i id="wish-btn${
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
