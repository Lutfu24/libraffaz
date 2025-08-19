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
