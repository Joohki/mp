export async function getAllProducts() {
  const response = await fetch(
    "https://product-e33d6-default-rtdb.firebaseio.com/product.json"
  );

  if (!response.ok) {
    throw new Error("something went wrong");
  }

  const responseData = await response.json();
  const loadedProducts = [];
  for (let key in responseData) {
    loadedProducts.push({
      id: key,
      name: responseData[key].name,
      description: responseData[key].description,
      price: responseData[key].price,
    });
  }
  return loadedProducts;
}
