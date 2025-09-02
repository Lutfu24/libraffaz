import getAllData from "./url.js";

let basket = JSON.parse(localStorage.getItem("basket")) || [];
document.getElementById("basket-count").innerText = basket.length;
const wishArr = JSON.parse(localStorage.getItem("wishlist")) || [];
document.getElementById("wish-count").innerText = wishArr.length;

async function useFetch() {
  const res = await getAllData();
  showBasket(res);
  sum();
}
useFetch();

function showBasket(data) {
  let html = "";
  basket.forEach((obj) => {
    const inp = localStorage.getItem(`inp${obj.item}`);
    data.forEach((item) => {
      if (Number(item.id) === obj.item)
        html += `<div class="flex relative my-3 mx-2">
                  <img
                    class="w-[150px] h-[200px]"
                    src="${item.image}"
                    alt="img"
                  />
                  <p class="mx-15 text-red-500">${item.name}</p>
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
                    value=${inp === null ? 1 : inp}
                    id="input${item.id}"
                    oninput="sumTotal(event,${item.id})"
                  />
                  <p id="total${item.id}" class="absolute right-0 font-bold">${(
          item.price * obj.count
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
  console.log(findElem);
  basket.splice(id, 1);
  localStorage.setItem("basket", JSON.stringify(basket));
  localStorage.setItem(`inp${id}`, inp.value);
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
}
document.getElementById("delete-btn").addEventListener("click", deleteBasket);

function sum() {
  let summ = 0;
  basket.forEach((obj) => {
    const total = document.getElementById(`total${obj.item}`);
    summ += Number(total.innerText.split(" ")[0]);
  });
  document.getElementById("total").innerText = `${summ.toFixed(2)} ₼`;
}
