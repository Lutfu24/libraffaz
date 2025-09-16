import getAllData, { create, remove, update } from "./url.js";

let data = [];
async function useFetch() {
  const res = await getAllData();
  data = res;
  showData(res);
}
useFetch();

function showData(res) {
  let html = "";
  res.forEach((Item) => {
    html += `<tr
                  class="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50"
                >
                  <td class="p-3">
                    <img class="w-[50px] h-[50px]" src="${Item.image}" />
                  </td>
                  <td class="p-3">
                    <p>${Item.name}</p>
                  </td>
                  <td class="p-3">
                    <p>${Item.price}</p>
                  </td>
                  <td class="p-3">
                    <p>${Item.sale}</p>
                  </td>
                  <td>
                    <button
                    onclick="deleteDataById(${Item.id})"
                      class="px-3 py-1 font-semibold cursor-pointer rounded-md bg-red-600 text-gray-50"
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <button
                      id="${Item.id}"
                      onclick="showUpdateModal(event)"
                      class="px-3 py-1 font-semibold rounded-md cursor-pointer bg-yellow-600 text-gray-50"
                    >
                      Update
                    </button>
                  </td>
                </tr>`;
  });
  document.querySelector("tbody").innerHTML = html;
}

document.deleteDataById = async function (id) {
  await remove(id);
  await useFetch();
  swal({
    title: "deleted book!",
    icon: "success",
    button: "ok!",
  });
};

document.getElementById("show-btn").addEventListener("click", function () {
  openModal("create");
});

document.getElementById("create-modal").addEventListener("click", () => {
  document.getElementById("create-modal").classList.add("hidden");
});

document.getElementById("form").addEventListener("click", (e) => {
  e.stopPropagation();
});

function openModal(str) {
  if (str === "create") {
    document.getElementById("create-modal").classList.remove("hidden");
    document.getElementById("create-btn").innerText = "create book";
    document.getElementById("stock-div").classList.add("hidden");
    document.getElementById("sell-div").classList.add("hidden");
    document.getElementById("create-btn").style.backgroundColor = "green";
    document.querySelectorAll("input").forEach((input) => {
      input.value = "";
    });
    tinymce.get("myArea").setContent("Təsvir yazın...");
  }
  if (str === "update") {
    document.getElementById("create-modal").classList.remove("hidden");
    document.getElementById("stock-div").classList.remove("hidden");
    document.getElementById("sell-div").classList.remove("hidden");
    document.getElementById("create-btn").innerText = "update book";
    document.getElementById("create-btn").style.backgroundColor = "brown";
  }
}
document.getElementById("create-btn").addEventListener("click", function () {
  if (document.getElementById("create-btn").innerText === "create book") {
    createData();
  }
  if (document.getElementById("create-btn").innerText === "update book") {
    updateData();
  }
});

async function createData() {
  let languages = document.getElementById("language").value.split(" ");
  const productObj = {
    author: document.getElementById("author").value,
    comments: [],
    description: tinymce.get("myArea").getContent(),
    genre: document.getElementById("genre").value,
    image: document.getElementById("image").value,
    language: languages,
    name: document.getElementById("name").value,
    price: Number(document.getElementById("price").value),
    sale: Number(document.getElementById("sale").value),
    sellCount: 0,
    stock: 0,
  };
  if (
    productObj.author &&
    productObj.description &&
    productObj.genre &&
    productObj.image &&
    productObj.language &&
    productObj.name &&
    productObj.price &&
    productObj.sale
  ) {
    await create(productObj);
    document.querySelectorAll("input").forEach((input) => {
      input.value = "";
    });
    document.getElementById("create-modal").classList.add("hidden");
    await useFetch();
    swal({
      title: "Created book!",
      icon: "success",
      button: "ok!",
    });
  } else {
    swal({
      title: "Xanalar boş olmaz!",
      icon: "error",
      button: "ok!",
    });
  }
}

let bookObj = {};
let findData = [];
let id = 0;
document.showUpdateModal = function (e) {
  id = Number(e.target.id);
  findData = data.find((item) => item.id === id);
  if (!findData) return null;

  openModal("update");
  const inputs = document.querySelectorAll("input");
  inputs[0].value = findData.name;
  inputs[1].value = findData.author;
  inputs[2].value = findData.genre;
  inputs[3].value = findData.image;
  inputs[4].value = findData.price;
  inputs[5].value = findData.sale;
  tinymce.get("myArea").setContent(findData.description);
  inputs[6].value = findData.language.join(" ");
  inputs[7].value = findData.stock;
  inputs[8].value = findData.sellCount;

  inputs.forEach((input) => {
    input.addEventListener("change", function (event) {
      bookObj = { ...bookObj, [event.target.id]: event.target.value };
    });
  });
};

async function updateData() {
  const inputs = document.querySelectorAll("input");
  let languages = document.getElementById("language").value.split(" ");

  findData = {
    ...bookObj,
    comments: [],
    price: Number(bookObj.price),
    description: tinymce.get("myArea").getContent(),
    language: bookObj.language ? bookObj.language.split(" ") : languages,
  };

  if (
    !inputs[0].value ||
    !inputs[1].value ||
    !inputs[2].value ||
    !inputs[3].value ||
    !inputs[4].value ||
    !inputs[5].value ||
    !inputs[6].value ||
    !inputs[7].value ||
    !inputs[8].value
  ) {
    document.getElementById("create-modal").classList.add("hidden");
    swal({
      title: "Xana boş olmaz!",
      icon: "error",
      button: "ok!",
    });
    return null;
  }

  await update(id, findData);
  document.querySelectorAll("input").forEach((input) => {
    input.value = "";
  });
  document.getElementById("create-modal").classList.add("hidden");
  await useFetch();
  swal({
    title: "Updated book!",
    icon: "success",
    button: "ok!",
  });
}
