import { getByIdData, update } from "./url.js";
import getAllData from "./url.js";
import { showPopUpElm, showPopUpElm2, showPopUp } from "./popupservice.js";

toastr.options = {
  positionClass: "toast-bottom-right",
};

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

const query = location.search;
const author = new URLSearchParams(query).get("author");

async function useFetch() {
  try {
    const res = await getAllData();

    if (!res) throw new Error("data bosdur!");
    showCard(res);
  } catch (err) {
    console.error(err.message);
  }
}
useFetch();

function showCard(res) {
  const filRes = res.filter((book) => book.author === author);
  if (!filRes) return null;

  let html = "";
  document.getElementById("card-title").innerText = `${filRes[0].author}`;
  filRes.forEach((book) => {
    html += `<div onmouseover="showHeart(${book.id})" onmouseout="hideHeart(${
      book.id
    })" class="py-[10px] px-[20px] relative hover:border-2 hover:rounded-2xl hover:border-gray-300 hover:drop-shadow-xl/50">
              <button onclick="addWish(${
                book.id
              })" class="absolute hidden top-1 right-2" id="wish${
      book.id
    }"><i id="wish-btn${
      book.id
    }" class="fa-regular fa-heart bg-white text-2xl text-gray-500 hover:text-red-600 hover:cursor-pointer" style="clip-path: polygon(51% 14%, 80% 0, 92% 29%, 85% 69%, 50% 100%, 16% 68%, 5% 28%, 20% 0);"></i></button>
              <a href="detail.html?id=${book.id}">
              <img class="rounded-2xl" src="${book.image}" alt="img">
              </a>
              <p class="my-2">${book.name}</p>
              <span class="font-bold">${(
                book.price -
                (book.price * book.sale) / 100
              ).toFixed(
                2
              )} ₼</span><sup><del class="text-gray-500 text-[14px] ml-2">${book.price.toFixed(
      2
    )} ₼</del></sup>
            </div>`;
  });
  document.getElementById("cards").innerHTML = html;
}

document.showHeart = (id) => {
  document.getElementById(`wish${id}`).classList.remove("hidden");
};

document.hideHeart = (id) => {
  document.getElementById(`wish${id}`).classList.add("hidden");
};

document.addWish = (id) => {
  if (wishArr.includes(id)) {
    wishArr.splice(
      wishArr.findIndex((item) => item === id),
      1
    );
    document.getElementById(`wish-btn${id}`).style.color = "gray";
    toastr.success("kitab seçilmişlərdən silindi...");
  } else {
    wishArr.push(id);
    document.getElementById(`wish-btn${id}`).style.color = "red";
    toastr.success("kitab seçilmişlərə əlavə olundu...");
  }
  localStorage.setItem("wishlist", JSON.stringify(wishArr));
  document.getElementById("wish-count").innerText = wishArr.length;
};
