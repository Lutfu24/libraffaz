async function getAllData() {
  try {
    const res = await fetch("https://libraff-data-rlzv.onrender.com/books");
    if (!res.ok) throw new Error("url sehvdir!");
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn(err.message);
  }
}

async function getByIdData(id) {
  try {
    const res = await fetch(
      `https://libraff-data-rlzv.onrender.com/books/${id}`
    );
    if (!res.ok) throw new Error("url sehvdir!");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err.message);
  }
}

export default getAllData;
export { getByIdData };
