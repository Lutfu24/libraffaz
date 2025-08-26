async function getAllData() {
  const res = await fetch("http://localhost:3000/books");
  const data = await res.json();
  return data;
}

async function getByIdData(id) {
  const res = await fetch(`http://localhost:3000/books/${id}`);
  const data = await res.json();
  return data;
}

export default getAllData;
export { getByIdData };
