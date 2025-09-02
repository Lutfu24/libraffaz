import obj from "./popupservice.js";
import getAllData from "./url.js";

async function useFetch() {
  try {
    const data = await getAllData();
    console.log(data);
    if (!data) throw new Error("data bosdur!");
    showCards(data);
    checkWish();
  } catch (err) {
    console.warn(err.message);
  }
}
useFetch();

function showCards(data) {
  let html = "";
  data.forEach((element) => {
    element.price = Number(element.price);
    element.sale = Number(element.sale);
    html += `<div class="py-[10px] px-[20px] relative">
              <button onclick="addWish(${
                element.id
              })" class="absolute top-1 right-2"><i id="wish-btn${
      element.id
    }" class="fa-regular fa-heart bg-white text-2xl text-gray-500 hover:text-red-600 hover:cursor-pointer"></i></button>
              <a href="detail.html?id=${element.id}">
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
}

function showPopUp() {
  document.getElementById("pop-up").classList.toggle("hidden");
}

document.getElementById("catalog-btn").addEventListener("click", showPopUp);
document.getElementById("pop-up").addEventListener("click", function () {
  document.getElementById("pop-up").classList.add("hidden");
});
document.getElementById("pop-up-item").addEventListener("click", (e) => {
  e.stopPropagation();
});

Object.entries(obj).forEach(([key, value]) => {
  document.querySelector(
    ".first-ul"
  ).innerHTML += `<span class="absolute text-gray-400 right-0">⟩</span><a href="book.html"><li class="first-list hover:text-red-600 w-full">${key}</li></a>`;
  if (key === "Kitab") {
    Object.entries(value).forEach(([key, value]) => {
      document.querySelector(
        ".second-ul"
      ).innerHTML += `<span class="absolute text-gray-400 right-0">⟩</span><li class="second-list cursor-pointer hover:text-red-600">${key}</li>`;
      if (key === "Bədii ədəbiyyat")
        value.forEach((item) => {
          document.querySelector(
            ".third-ul"
          ).innerHTML += `<a href="book.html?categ=${item}"><li class="cursor-pointer hover:text-red-600">${item}</li></a>`;
        });
    });
  }
});

document.querySelectorAll(".first-list").forEach((li) => {
  li.addEventListener("mouseenter", showPopUpElm);
});

function showPopUpElm(e) {
  console.log(e.target.innerHTML);
  document.querySelector(".second-ul").innerHTML = "";
  document.querySelector(".third-ul").innerHTML = "";
  const elm = Object.keys(obj).find((item) => item === e.target.innerText);
  Object.entries(obj[elm]).forEach(([key, value]) => {
    document.querySelector(
      ".second-ul"
    ).innerHTML += `<span class="absolute text-gray-400 right-0">⟩</span><li class="second-list cursor-pointer hover:text-red-600">${key}</li>`;
    if (key === "Bədii ədəbiyyat")
      value.forEach((item) => {
        document.querySelector(
          ".third-ul"
        ).innerHTML += `<a href="book.html?categ=${item}"><li  class="cursor-pointer hover:text-red-600">${item}</li></a>`;
      });
  });
  document.querySelectorAll(".second-list").forEach((li) => {
    li.addEventListener("mouseenter", showPopUpElm2);
  });
}

document.querySelectorAll(".second-list").forEach((li) => {
  li.addEventListener("mouseenter", showPopUpElm2);
});

function showPopUpElm2(e) {
  document.querySelector(".third-ul").innerHTML = "";
  Object.entries(obj).forEach(([key, value]) => {
    const elm = Object.keys(obj[key]).find(
      (item) => item === e.target.innerText
    );
    if (elm)
      value[elm].forEach((item) => {
        document.querySelector(
          ".third-ul"
        ).innerHTML += `<a href="book.html?categ=${item}"><li  class="cursor-pointer hover:text-red-600">${item}</li></a>`;
      });
  });
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

const basket = JSON.parse(localStorage.getItem("basket")) || [];
document.getElementById("basket-count").innerText = basket.length;
