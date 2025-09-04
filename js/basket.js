import getAllData from "./url.js";
import { showPopUpElm, showPopUpElm2, showPopUp } from "./popupservice.js";
import { showBasket } from "./header.js";

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

let basket = JSON.parse(localStorage.getItem("basket")) || [];
document.getElementById("basket-count").innerText = basket.length;
const wishArr = JSON.parse(localStorage.getItem("wishlist")) || [];
document.getElementById("wish-count").innerText = wishArr.length;

let data = [];
async function useFetch() {
  const res = await getAllData();
  data = res;
  showBasketData(res);
  sum();
}
useFetch();

function showBasketData(data) {
  let basket = JSON.parse(localStorage.getItem("basket")) || [];
  let html = "";
  basket.forEach((obj) => {
    const inp = obj.count;
    if (!obj.count) obj.count = 1;
    data.forEach((item) => {
      if (Number(item.id) === obj.item)
        html += `<div class="flex relative my-3 mx-2">
                  <img
                    class="w-[150px] h-[200px]"
                    src="${item.image}"
                    alt="img"
                  />
                  <p class="mx-15 text-red-500">${
                    item.name
                  } <button class="cursor-pointer" onclick="deleteById(${
          item.id
        })"><i class="fa-solid fa-circle-xmark"></i></button></p>
                  <p id="price${
                    item.id
                  }" class="absolute right-93 text-red-500 text-[14px]"><del>${item.price.toFixed(
          2
        )} ₼</del></p>
                  <p class="absolute right-80">${(
                    item.price -
                    (item.price * item.sale) / 100
                  ).toFixed(2)}₼</p>
                  <input
                    class="absolute right-40 w-[100px] h-[40px] rounded-md outline-none pl-2 hover:border border-solid border-red-500"
                    type="text"
                    value=${!inp ? 1 : inp}
                    id="input${item.id}"
                    oninput="sumTotal(event,${item.id})"
                  />
                  <p id="total${item.id}" class="absolute right-0 font-bold">${(
          (item.price - (item.price * item.sale) / 100) *
          obj.count
        ).toFixed(2)} ₼</p>
                </div>`;
    });
  });
  document.getElementById("basket").innerHTML = html;
}

document.sumTotal = function (e, id) {
  const price = document.getElementById(`price${id}`);
  const total = document.getElementById(`total${id}`);
  const inp = document.getElementById(`input${id}`);
  let summ = Number(price.innerText.split(" ")[0]);
  summ *= e.target.value;
  total.innerText = `${summ.toFixed(2)} ₼`;
  const findElem = basket.find((obj) => obj.item === id);
  if (findElem) findElem.count = inp.value;
  basket.splice(id, 1);
  localStorage.setItem("basket", JSON.stringify(basket));
  sum();
};

function deleteBasket() {
  basket.forEach((i) => {
    localStorage.removeItem(`inp${i.item}`);
  });
  basket = [];
  localStorage.setItem("basket", JSON.stringify(basket));
  document.getElementById("basket-count").innerText = basket.length;
  document.getElementById("basket").innerHTML = "";
  sum();
  showBasket(data);
}
document.getElementById("delete-btn").addEventListener("click", deleteBasket);

document.deleteById = function (id) {
  let basket = JSON.parse(localStorage.getItem("basket")) || [];
  const findData = basket.find((i) => i.item === id);
  if (!findData) return null;
  const newBasket = basket.filter((i) => i.item !== findData.item);
  localStorage.setItem("basket", JSON.stringify(newBasket));
  const inp = localStorage.getItem(`inp${id}`);
  if (inp) localStorage.removeItem(`inp${id}`);
  let baskett = JSON.parse(localStorage.getItem("basket")) || [];
  document.getElementById("basket-count").innerText = baskett.length;
  useFetch();
  showBasket(data);
};

function sum() {
  let basket = JSON.parse(localStorage.getItem("basket")) || [];
  let summ = 0;
  basket.forEach((obj) => {
    const total = document.getElementById(`total${obj.item}`);
    summ += Number(total.innerText.split(" ")[0]);
  });
  document.getElementById("total").innerText = `${summ.toFixed(2)} ₼`;
}
