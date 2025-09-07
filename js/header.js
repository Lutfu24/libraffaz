import getAllData from "./url.js";

let response = [];
async function useFetch() {
  const res = await getAllData();
  response = res;
  showBasket(res);
}
useFetch();

function showBasket(data) {
  let basket = JSON.parse(localStorage.getItem("basket")) || [];
  let html = "";
  if (basket.length === 0) {
    document.getElementById("basket-modal-content").innerHTML = "Səbət boşdur";
    return;
  }
  basket.forEach((obj) => {
    data
      .filter((item) => item.id === obj.item)
      .forEach((item) => {
        html += `<div class="flex justify-between items-center w-[350px]">
            <img class="w-20 ml-2" src="${item.image}"/>
            <p class="font-bold absolute right-40">${item.name.slice(
              0,
              17
            )}<br/>${item.name.slice(17, 32)}<br/>${item.name.slice(32)}</p>
            <p class="absolute right-25"><del class="text-red-500">${(
              item.price * obj.count
            ).toFixed(2)} ₼</del><br/>${(
          (item.price - (item.price * item.sale) / 100) *
          obj.count
        ).toFixed(2)} ₼</p>
            <input oninput="changeValueInp(event,${obj.item})" value=${
          obj.count
        } class="absolute right-10 border-1 rounded-md border-red-500 outline-none w-[30px] text-center" type="number" />
            <button onclick="deleteItem(${
              item.id
            })" class="absolute cursor-pointer right-3 text-red-500 font-bold">✕</button>
           </div>`;
      });
    document.getElementById("basket-modal-content").innerHTML = html;
  });
}

document.deleteItem = function (id) {
  let basket = JSON.parse(localStorage.getItem("basket")) || [];
  const findData = basket.find((i) => i.item === id);
  if (!findData) return null;
  const newBasket = basket.filter((i) => i.item !== findData.item);
  localStorage.setItem("basket", JSON.stringify(newBasket));
  let baskett = JSON.parse(localStorage.getItem("basket")) || [];
  document.getElementById("basket-count").innerText = baskett.length;
  showBasket(response);
  toastr.success("kitab səbətdən silindi...");
};

document.changeValueInp = function (e, id) {
  let basket = JSON.parse(localStorage.getItem("basket")) || [];
  let findData = basket.find((obj) => obj.item === id);
  const findData2 = findData;
  findData.count = Number(e.target.value);
  basket.splice(basket.indexOf(findData2), 1, findData);
  localStorage.setItem("basket", JSON.stringify(basket));
  showBasket(response);
};

export default function showHeader() {
  return `<header class="w-full flex justify-center">
      <div class="w-[70%] h-[100px] flex justify-between items-center">
        <div class="w-[170px] flex items-center gap-2">
          <i class="fa fa-bars !hidden max-xl:!flex" aria-hidden="true"></i>
          <a href="index.html"><img src="../images/logo/logo_b1x3-5c.png" alt="logo" /></a>
        </div>
        <div class="max-lg:hidden flex items-center">
          <button
            id="catalog-btn"
            class="relative mr-5 z-1001 rounded-3xl flex items-center gap-2 py-2 px-8 cursor-pointer bg-red-500 text-white max-xl:hidden"
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" fill="currentColor" class="bi bi-grid" viewBox="0 0 16 16">
            <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5z"/>
            </svg><span>Kataloq</span>
          </button>
          <div
            id="pop-up"
            class="w-full z-1000 bg-black/50 fixed inset-0 hidden"
          >
            <div
              id="pop-up-item"
              class="w-[70%] h-[60%] bg-white flex rounded-md absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-60%]"
            >
              <div>
                <ul
                  class="pop-up-ul first-ul mx-5 my-5 w-[200px] relative"
                ></ul>
              </div>
              <div>
                <ul
                  class="pop-up-ul second-ul my-5 mr-5 w-[300px] relative"
                ></ul>
              </div>
              <div class="overflow-auto">
                <ul
                  class="pop-up-ul third-ul grid grid-cols-3 max-2xl:grid-cols-2 max-xl:grid-cols-1 gap-2 max-2xl:gap-1 max-2xl:text-[12px] max-xl:text-[10px] my-5"
                ></ul>
              </div>
            </div>
          </div>
          <label class="relative max-xl:hidden">
            <input
              class="w-[500px] outline-none py-2 rounded-3xl pl-4 max-2xl:w-[400px] placeholder:text-black placeholder:text-[14px] border-1 border-solid border-sky-300"
              type="search"
              placeholder="Növbəti kitabınızı axtarın"
            />
            <i
              class="fa fa-search absolute right-3 top-3 hover:text-red-600 hover:cursor-pointer"
              aria-hidden="true"
            ></i>
          </label>
        </div>
        <div class="flex items-center gap-2">
          <select name="" id="">
            <option value="">AZ</option>
          </select>
          <button>Hesabım</button>
          <a href="wishlist.html"
          class="relative"
            ><i class="fa-regular fa-heart"></i
            ><div class="text-[16px] bg-red-500 text-white rounded-full w-4 h-4 absolute bottom-3 left-4 flex items-center justify-center" id="wish-count">0</div></a
          >
          <button class="flex relative cursor-pointer" onclick="openBasketModal()">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" fill="currentColor" class="bi bi-handbag" viewBox="0 0 16 16">
            <path d="M8 1a2 2 0 0 1 2 2v2H6V3a2 2 0 0 1 2-2m3 4V3a3 3 0 1 0-6 0v2H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5zm-1 1v1.5a.5.5 0 0 0 1 0V6h1.639a.5.5 0 0 1 .494.426l1.028 6.851A1.5 1.5 0 0 1 12.678 15H3.322a1.5 1.5 0 0 1-1.483-1.723l1.028-6.851A.5.5 0 0 1 3.36 6H5v1.5a.5.5 0 1 0 1 0V6z"/>
            </svg><div class="text-[16px] bg-red-500 text-white rounded-full w-4 h-4 absolute bottom-2 left-4 flex items-center justify-center" id="basket-count">0</div></a
          </button>
        </div>
        <div id="basket-modal" class="w-[400px] z-50 rounded-2xl bg-gray-200 absolute right-[280px] max-2xl:right-[200px] max-xl:right-[150px] max-md:right-[100px] max-sm:right-[50px] max-sm:w-[300px] top-18 hidden animate__animated animate__fadeIn animate__fast">
          <h1 class="font-bold inline text-[14px] ml-2">Səbətdəki məhsullar:</h1><span class="absolute right-3 cursor-pointer" onclick="closeModal()">✕</span>
          <div id="basket-modal-content" class="flex-col relative border-t-1 border-b-1 border-gray-400 bg-white text-[14px] flex justify-center items-center gap-3 py-2 px-3 min-h-[100px] max-h-[420px] overflow-y-auto">Səbət boşdur</div>
          <a href="basket.html" class="px-26 mx-17 max-sm:mx-6 my-3 inline-block py-1 rounded-3xl border-2 border-red-500 font-bold cursor-pointer">Səbət</a>
        </div>
      </div>
    </header>
    <header class="w-full flex justify-center max-lg:hidden">
      <div class="w-[70%] h-[20px] flex justify-between items-center">
        <ul class="flex gap-3 text-[14px] font-semibold">
          <li>Bestseller-iyul</li>
          <li>Endirimlər</li>
          <a href="authors.html" class="hover:text-red-600"><li>Müəlliflər</li></a>
          <a href="book.html?categ=Klassiklər" class="hover:text-red-600"><li>Klassiklər</li></a>
        </ul>
        <ul class="flex gap-3 text-[14px] text-gray-600">
          <li>Ödəniş və çatdırılma</li>
          <li>Loyallıq kartı</li>
          <li>FAQ</li>
          <li>Əlaqə</li>
        </ul>
      </div>
    </header>`;
}

document.openBasketModal = function () {
  document.getElementById("basket-modal").classList.toggle("hidden");
};

document.closeModal = function () {
  document.getElementById("basket-modal").classList.add("hidden");
};

export { showBasket };
