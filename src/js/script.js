import obj from "./popupservice.js";

fetch("http://localhost:3000/books")
  .then((res) => res.json())
  .then((res) => {
    showCards(res);
  });

function showCards(res) {
  let html = "";
  res.forEach((element) => {
    html += `<div class="py-[10px] px-[20px]">
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
  document.getElementById("pop-up").classList.remove("hidden");
}

document.getElementById("catalog-btn").addEventListener("click", showPopUp);
document.getElementById("pop-up").addEventListener("click", function (e) {
  if (e.target.localName !== "div")
    document.getElementById("pop-up").classList.add("hidden");
});

Object.entries(obj).forEach(([key, value]) => {
  document.querySelector(
    ".first-ul"
  ).innerHTML += `<span class="absolute text-gray-400 right-0">⟩</span><li class="first-list cursor-pointer hover:text-red-600 w-full">${key}</li>`;
  if (key === "Kitab") {
    Object.entries(value).forEach(([key, value]) => {
      document.querySelector(
        ".second-ul"
      ).innerHTML += `<span class="absolute text-gray-400 right-0">⟩</span><li class="second-list cursor-pointer hover:text-red-600">${key}</li>`;
      if (key === "Bədii ədəbiyyat")
        value.forEach((item) => {
          document.querySelector(
            ".third-ul"
          ).innerHTML += `<li class="cursor-pointer hover:text-red-600">${item}</li>`;
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
        ).innerHTML += `<li  class="cursor-pointer hover:text-red-600">${item}</li>`;
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
        ).innerHTML += `<li  class="cursor-pointer hover:text-red-600">${item}</li>`;
      });
  });
}
