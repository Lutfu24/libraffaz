import getAllData from "./url.js";

async function useFetch() {
  const res = await getAllData();
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
  await fetch(`https://libraff-data-rlzv.onrender.com/books/${id}`, {
    method: "DELETE",
  });
  await useFetch();
  swal({
    title: "deleted book!",
    icon: "success",
    button: "ok!",
  });
};

document.getElementById("show-btn").addEventListener("click", function () {
  document.getElementById("create-modal").classList.remove("hidden");
});

async function createData() {
  const productObj = {
    author: document.getElementById("author").value,
    comments: [],
    description: document.getElementById("description").value,
    genre: document.getElementById("genre").value,
    image: document.getElementById("image").value,
    language: ["Azərbaycan dili", "İngilis"],
    name: document.getElementById("name").value,
    price: Number(document.getElementById("price").value),
    sale: Number(document.getElementById("sale").value),
    sellCount: 0,
    stock: 10,
  };
  console.log(productObj);
  await fetch("https://libraff-data-rlzv.onrender.com/books", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productObj),
  });
  document.getElementById("create-modal").classList.add("hidden");
  await useFetch();
  swal({
    title: "Created book!",
    icon: "success",
    button: "ok!",
  });
}

document.getElementById("create-btn").addEventListener("click", createData);
