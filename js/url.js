const url = "https://libraff-data-rlzv.onrender.com/books";

async function getAllData() {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("url sehvdir!");
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn(err.message);
  }
}

async function getByIdData(id) {
  try {
    const res = await fetch(`${url}/${id}`);
    if (!res.ok) throw new Error("url sehvdir!");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err.message);
  }
}

async function remove(id) {
  try {
    const res = await fetch(`${url}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("url sehvdir!");
  } catch (error) {
    console.error(error.message);
  }
}

async function create(productObj) {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productObj),
    });
    if (!res.ok) throw new Error("url sehvdir!");
  } catch (error) {
    console.error(error.message);
  }
}

async function update(id, findData) {
  try {
    const res = await fetch(`${url}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(findData),
    });
    if (!res.ok) throw new Error("url sehvdir!");
  } catch (error) {
    console.error(error.message);
  }
}

export default getAllData;
export { getByIdData, update, create, remove };
