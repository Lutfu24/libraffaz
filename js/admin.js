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
  useFetch();
};
