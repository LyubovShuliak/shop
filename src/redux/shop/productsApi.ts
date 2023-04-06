const API_URL = "https://dummyjson.com/products";
export async function fetchAll() {
  let response = await fetch(`${API_URL}`, { method: "GET" });
  let result = await response.json();
  return result;
}
