import getAllData from "./url.js";
const basket = JSON.parse(localStorage.getItem("basket")) || [];

async function useFetch() {
  const res = await getAllData();
  showBasket(res);
}
useFetch();

function showBasket(data) {
  let html = "";
  basket.forEach((obj) => {
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
                    value=1
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
  let sum = Number(price.innerText.split(" ")[0]);
  sum *= e.target.value;
  total.innerText = `${sum.toFixed(2)} ₼`;
};
