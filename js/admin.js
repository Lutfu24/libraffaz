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
                      onclick="showUpdateModal(${Item.id})"
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
  document.getElementById("create-modal").classList.remove("hidden");
  document.getElementById("create-btn").innerText = "create book";
  document.getElementById("create-btn").style.backgroundColor = "green";
});

document.getElementById("create-modal").addEventListener("click", () => {
  document.getElementById("create-modal").classList.add("hidden");
});

document.getElementById("form").addEventListener("click", (e) => {
  e.stopPropagation();
});

function openModal(str) {
  let html = "";
  if (str === "create") {
    html = `<div class="col-span-full sm:col-span-3">
                <label for="name" class="text-sm">name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="name"
                  class="w-full rounded-md focus:ring focus:ring-opacity-75 text-black focus:ring-violet-600 border-gray-300"
                  fdprocessedid="xv1u4o"
                />
              </div>
              <div class="col-span-full sm:col-span-3">
                <label for="author" class="text-sm">author</label>
                <input
                  id="author"
                  type="text"
                  placeholder="author"
                  class="w-full rounded-md focus:ring focus:ring-opacity-75 text-black focus:ring-violet-600 border-gray-300"
                  fdprocessedid="jdxxpm"
                />
              </div>
              <div class="col-span-full sm:col-span-3">
                <label for="genre" class="text-sm">genre</label>
                <input
                  id="genre"
                  type="text"
                  placeholder="genre"
                  class="w-full rounded-md focus:ring focus:ring-opacity-75 text-black focus:ring-violet-600 border-gray-300"
                  fdprocessedid="62kbrf"
                />
              </div>
              <div class="col-span-full">
                <label for="image" class="text-sm">image</label>
                <input
                  id="image"
                  type="text"
                  placeholder="image"
                  class="w-full rounded-md focus:ring focus:ring-opacity-75 text-black focus:ring-violet-600 border-gray-300"
                  fdprocessedid="ihq3uq"
                />
              </div>
              <div class="col-span-full sm:col-span-2">
                <label for="price" class="text-sm">price</label>
                <input
                  id="price"
                  type="number"
                  placeholder="price"
                  class="w-full rounded-md focus:ring focus:ring-opacity-75 text-black focus:ring-violet-600 border-gray-300"
                  fdprocessedid="b6mk1c"
                />
              </div>
              <div class="col-span-full sm:col-span-2">
                <label for="sale" class="text-sm">sale</label>
                <input
                  id="sale"
                  type="number"
                  placeholder="sale"
                  class="w-full rounded-md focus:ring focus:ring-opacity-75 text-black focus:ring-violet-600 border-gray-300"
                  fdprocessedid="vhwfa"
                />
              </div>
              <div class="col-span-full sm:col-span-2">
                <label for="description" class="text-sm">description</label>
                <input
                  id="description"
                  type="text"
                  placeholder="description"
                  class="w-full rounded-md focus:ring focus:ring-opacity-75 text-black focus:ring-violet-600 border-gray-300"
                  fdprocessedid="ktkgi"
                />
              </div>
              <div class="col-span-full sm:col-span-3">
                <label for="language" class="text-sm">language</label>
                <input
                  id="language"
                  type="text"
                  placeholder="Azərbaycan dili Rus İngilis"
                  class="w-full rounded-md focus:ring focus:ring-opacity-75 text-black focus:ring-violet-600 border-gray-300"
                  fdprocessedid="xv1u4o"
                />
              </div>`;
  } else if (str === "update") {
    html = `<div class="col-span-full sm:col-span-3">
                <label for="name" class="text-sm">name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="name"
                  class="w-full rounded-md focus:ring focus:ring-opacity-75 text-black focus:ring-violet-600 border-gray-300"
                  fdprocessedid="xv1u4o"
                />
              </div>
              <div class="col-span-full sm:col-span-3">
                <label for="author" class="text-sm">author</label>
                <input
                  id="author"
                  type="text"
                  placeholder="author"
                  class="w-full rounded-md focus:ring focus:ring-opacity-75 text-black focus:ring-violet-600 border-gray-300"
                  fdprocessedid="jdxxpm"
                />
              </div>
              <div class="col-span-full sm:col-span-3">
                <label for="genre" class="text-sm">genre</label>
                <input
                  id="genre"
                  type="text"
                  placeholder="genre"
                  class="w-full rounded-md focus:ring focus:ring-opacity-75 text-black focus:ring-violet-600 border-gray-300"
                  fdprocessedid="62kbrf"
                />
              </div>
              <div class="col-span-full">
                <label for="image" class="text-sm">image</label>
                <input
                  id="image"
                  type="text"
                  placeholder="image"
                  class="w-full rounded-md focus:ring focus:ring-opacity-75 text-black focus:ring-violet-600 border-gray-300"
                  fdprocessedid="ihq3uq"
                />
              </div>
              <div class="col-span-full sm:col-span-2">
                <label for="price" class="text-sm">price</label>
                <input
                  id="price"
                  type="number"
                  placeholder="price"
                  class="w-full rounded-md focus:ring focus:ring-opacity-75 text-black focus:ring-violet-600 border-gray-300"
                  fdprocessedid="b6mk1c"
                />
              </div>
              <div class="col-span-full sm:col-span-2">
                <label for="sale" class="text-sm">sale</label>
                <input
                  id="sale"
                  type="number"
                  placeholder="sale"
                  class="w-full rounded-md focus:ring focus:ring-opacity-75 text-black focus:ring-violet-600 border-gray-300"
                  fdprocessedid="vhwfa"
                />
              </div>
              <div class="col-span-full sm:col-span-2">
                <label for="description" class="text-sm">description</label>
                <input
                  id="description"
                  type="text"
                  placeholder="description"
                  class="w-full rounded-md focus:ring focus:ring-opacity-75 text-black focus:ring-violet-600 border-gray-300"
                  fdprocessedid="ktkgi"
                />
              </div>
              <div class="col-span-full sm:col-span-3">
                <label for="language" class="text-sm">language</label>
                <input
                  id="language"
                  type="text"
                  placeholder="Azərbaycan dili Rus İngilis"
                  class="w-full rounded-md focus:ring focus:ring-opacity-75 text-black focus:ring-violet-600 border-gray-300"
                  fdprocessedid="xv1u4o"
                />
              </div>
              <div class="col-span-full sm:col-span-3">
                                              <label for="stock" class="text-sm">stock</label>
                                                  <input
                                                  id="stock"
                                                  type="text"
                                                  placeholder="stock"
                                                  class="w-full rounded-md focus:ring focus:ring-opacity-75 text-black focus:ring-violet-600 border-gray-300"
                                                  fdprocessedid="xv1u4o"
                                                />
                                              </div>
                                              <div class="col-span-full sm:col-span-3">
                                                <label for="sellCount" class="text-sm">sell count</label>
                                                <input
                                                  id="sellCount"
                                                  type="text"
                                                  placeholder="sell count"
                                                  class="w-full rounded-md focus:ring focus:ring-opacity-75 text-black focus:ring-violet-600 border-gray-300"
                                                  fdprocessedid="xv1u4o"
                                                />
                                              </div>`;
  }
  document.getElementById("modal").innerHTML = html;
}

async function createData() {
  let languages = document.getElementById("language").value.split(" ");
  const productObj = {
    author: document.getElementById("author").value,
    comments: [],
    description: document.getElementById("description").value,
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

document.getElementById("create-btn").addEventListener("click", function () {
  if (document.getElementById("create-btn").innerText === "create book") {
    createData();
  }
});

let bookObj = {};
document.showUpdateModal = function (id) {
  document.getElementById("create-modal").classList.remove("hidden");
  document.getElementById("create-btn").innerText = "update book";
  document.getElementById("create-btn").style.backgroundColor = "brown";
  let findData = data.find((item) => item.id === id);
  if (!findData) return null;

  openModal("update");
  const inputs = document.querySelectorAll("input");
  inputs[0].value = findData.name;
  inputs[1].value = findData.author;
  inputs[2].value = findData.genre;
  inputs[3].value = findData.image;
  inputs[4].value = findData.price;
  inputs[5].value = findData.sale;
  inputs[6].value = findData.description;
  inputs[7].value = findData.language.join(" ");
  inputs[8].value = findData.stock;
  inputs[9].value = findData.sellCount;

  inputs.forEach((input) => {
    input.addEventListener("change", function (event) {
      bookObj = { ...bookObj, [event.target.id]: event.target.value };
    });
  });

  document.getElementById("create-btn").addEventListener("click", function () {
    updateData(findData, id);
  });
};

async function updateData(findData, id) {
  const inputs = document.querySelectorAll("input");
  findData = {
    ...bookObj,
    comments: [],
    language: bookObj.language ? bookObj.language.split(" ") : "",
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
    !inputs[8].value ||
    !inputs[9].value
  ) {
    document.getElementById("create-modal").classList.add("hidden");
    return swal({
      title: "Xana boş olmaz!",
      icon: "error",
      button: "ok!",
    });
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
