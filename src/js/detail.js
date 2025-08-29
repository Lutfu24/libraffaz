import { getByIdData } from "./url.js";

const basket = JSON.parse(localStorage.getItem("basket")) || [];
document.getElementById("basket-count").innerText = basket.length;
const wishArr = JSON.parse(localStorage.getItem("wishlist")) || [];
document.getElementById("wish-count").innerText = wishArr.length;

const query = location.search;
const id = new URLSearchParams(query).get("id");

async function useFetch() {
  try {
    const res = await getByIdData(id);
    if (!res) throw new Error("data bosdur!");
    showCard(res);
  } catch (err) {
    console.error(err.message);
  }
}
useFetch();

function showCard(res) {
  let html = "";
  html += `<div class="flex justify-between max-xl:flex-col">
          <div class="w-full flex justify-center items-center">
            <img
              class="max-w-[600px] max-h-[600px]"
              src="${res.image}"
              alt="img"
            />
          </div>
          <div class="w-[900px] max-xl:w-full">
            <p class="text-3xl">${res.name}</p>
            <p class="py-2 text-gray-500 underline underline-offset-2">${
              res.author
            }</p>
            <p class="font-bold text-2xl pt-3">${(
              res.price -
              (res.price * res.sale) / 100
            ).toFixed(2)} ₼</p>
            <del class="text-gray-500">${res.price.toFixed(2)} ₼</del
            ><span
              class="bg-red-500 text-white text-[14px] rounded-md px-1 ml-2"
              >-${res.sale}%</span
            >
            <button
              onclick="addBasket(${res.id})"
              class="w-full py-3 mb-5 bg-red-500 rounded-3xl mt-10 text-white cursor-pointer"
            >
              Səbətə əlavə et
            </button>
            <div class="flex justify-between">
              <span>Seçilmiş</span>
              <span>Sizə necə kömək edə bilərik?</span>
            </div>
            <p class="my-5 font-bold">Çatdırılma haqqında</p>
            <p class="mt-2">Bakı şəhəri üçün təxmini müddət və qiymətlər.</p>
            <p class="my-2">
              Mağazadan təhvil alma — <span class="font-bold">pulsuz.</span>
            </p>
            <p class="mb-2 pb-2 border-b-1 border-dashed border-gray-600">
              Kuryer ilə — operator təsdiqindən sonra
              <span class="font-bold">24 saat ərzində.</span> 30 AZN və
              yuxarı<br />
              sifarişlərdə — <span class="font-bold">pulsuz.</span>
            </p>
            <p>
              Bölgələrə çatdırılma
              <span class="font-bold">3-5 iş günü</span> ərzində.
            </p>
          </div>
        </div>
        <div class="flex items-center flex-col">
          <div class="w-[80%] flex justify-around items-center mt-15 mb-10">
            <span class="text-2xl text-gray-500">Təsvir</span
            ><span class="text-2xl text-gray-500 max-xl:hidden">Xüsusiyyəti</span
            ><span class="text-2xl text-gray-500 max-xl:hidden">İstifadəçi rəyləri</span>
          </div>
          <p class="w-[70%] ml-25 max-xl:ml-0 text-[20px]">${
            res.description
          }</p>
        </div>`;
  document.getElementById("card").innerHTML = html;
}

const basketArr = JSON.parse(localStorage.getItem("basket")) || [];
document.addBasket = function (id) {
  let obj = {
    count: 1,
    item: id,
  };
  if (basketArr.some((element) => element.item === id)) {
    basketArr.find((item) => item.item === id).count++;
  } else {
    basketArr.push(obj);
  }
  localStorage.setItem("basket", JSON.stringify(basketArr));
  document.getElementById("basket-count").innerText = basketArr.length;
};
