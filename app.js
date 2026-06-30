const products = [
  { name: "沙棘原浆", category: "健康饮品" },
  { name: "沙棘籽油", category: "营养产品" },
  { name: "沙棘冻干粉", category: "深加工产品" }
];

const productList = document.getElementById("product-list");

products.forEach(product => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `<h3>${product.name}</h3><p>${product.category}</p>`;
  productList.appendChild(card);
});
