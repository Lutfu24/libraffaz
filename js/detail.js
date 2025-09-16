import { getByIdData, update } from "./url.js";
import getAllData from "./url.js";
import { showPopUpElm, showPopUpElm2, showPopUp } from "./popupservice.js";
import { showBasket } from "./header.js";

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
const id = new URLSearchParams(query).get("id");

let data = [];
async function useFetch() {
  try {
    const res = await getByIdData(id);
    const resAll = await getAllData();

    if (!res) throw new Error("data bosdur!");
    data = resAll;
    showCard(res);
  } catch (err) {
    console.error(err.message);
  }
}
useFetch();

function showCard(res) {
  document.getElementById("card").innerHTML = "";
  document.getElementById(
    "card"
  ).innerHTML += `<div class="flex justify-between max-xl:flex-col">
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
            
            <button class="mr-3 cursor-pointer" id="like-btn" onclick="handleReactionLike(event,${
              res.id
            })"><i class="fa fa-thumbs-up text-gray-400 text-2xl" aria-hidden="true"></i></button>
            <button class="cursor-pointer" id="dislike-btn" onclick="handleReactionDisLike(event,${
              res.id
            })"><i class="fa fa-thumbs-down text-gray-400 text-2xl" aria-hidden="true"></i></button>
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
            <span onclick="openAbout(${
              res.comments.length
            })" class="text-2xl text-gray-500 hover:cursor-pointer hover:text-red-500">Təsvir</span
            ><span class="text-2xl text-gray-500 max-xl:hidden">Xüsusiyyəti</span
            ><span onclick="openComments(${
              res.comments.length
            })" class="text-2xl text-gray-500 hover:cursor-pointer hover:text-red-500 max-xl:hidden">İstifadəçi rəyləri</span>
          </div>
          <div id="description" class="w-[70%] ml-25 max-xl:ml-0 text-[20px]">${
            res.description
          }</div>
        </div>`;
  res.comments.forEach((comment, index) => {
    document.getElementById(
      "card"
    ).innerHTML += `<div id="comments${index}" class="flex justify-center w-full hidden">
                    <p class="w-[60%] max-xl:ml-0 text-[20px] py-10 my-2 border-2 border-gray-300 drop-shadow-2xl rounded-2xl px-5">
                    <i class="fa fa-user" aria-hidden="true"></i> user: <span class="text-gray-500">${comment}</span></p></div>`;
  });
  document.getElementById(
    "card"
  ).innerHTML += `<div id="comment-label" class="hidden mx-80">
                  <input id="comment-inp" type="text" placeholder="şərh yazın..." class="outline-none mx-10 placeholder:mx-5">
                  <button id="comment-btn" onclick="addComment(${res.id})" class="my-15 cursor-pointer hover:text-red-900 text-gray-500">Şərh əlavə et</button>
                  </div>
                  `;
}

document.addBasket = function (id) {
  const basketArr = JSON.parse(localStorage.getItem("basket")) || [];
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
  showBasket(data);
  toastr.success("Kitab səbətə əlavə olundu...");
};

document.addComment = async function (id) {
  const comment = document.getElementById("comment-inp");
  if (!comment.value) {
    swal({
      title: "Şərh boş olmaz!",
      icon: "error",
      button: "ok!",
    });
    return null;
  }
  let data = await getByIdData(id);
  data.comments.push(comment.value);
  await update(id, data);
  await useFetch();
  toastr.success("comment əlavə olundu...");
};

document.openComments = function (length) {
  for (let i = 0; i < length; i++) {
    document.getElementById(`comments${i}`).classList.remove("hidden");
  }
  document.getElementById("description").classList.add("hidden");
  document.getElementById("comment-label").classList.remove("hidden");
};

document.openAbout = function (length) {
  for (let i = 0; i < length; i++) {
    document.getElementById(`comments${i}`).classList.add("hidden");
  }
  document.getElementById("description").classList.remove("hidden");
  document.getElementById("comment-label").classList.add("hidden");
};

document.handleReactionLike = async function (e, id) {
  let response = await getByIdData(id);
  if (!response.isLike) {
    e.target.innerText = response.like = response.like + 1;
    e.target.classList.add("text-sky-700");
    response.isLike = true;
    if (response.isDisLike) {
      document.getElementById("dislike-btn").children[0].innerText =
        response.dislike = response.dislike - 1;
      document
        .getElementById("dislike-btn")
        .children[0].classList.remove("text-red-700");
      response.isDisLike = false;
    }
  } else {
    e.target.innerText = response.like = response.like - 1;
    e.target.classList.remove("text-sky-700");
    response.isLike = false;
  }
  update(response.id, response);
};

document.handleReactionDisLike = async function (e, id) {
  let response = await getByIdData(id);
  if (!response.isDisLike) {
    e.target.innerText = response.dislike = response.dislike + 1;
    e.target.classList.add("text-red-700");
    response.isDisLike = true;
    if (response.isLike) {
      document.getElementById("like-btn").children[0].innerText =
        response.like = response.like - 1;
      document
        .getElementById("like-btn")
        .children[0].classList.remove("text-sky-700");
      response.isLike = false;
    }
  } else {
    e.target.innerText = response.dislike = response.dislike - 1;
    e.target.classList.remove("text-red-700");
    response.isDisLike = false;
  }
  update(response.id, response);
};
