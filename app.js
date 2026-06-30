const STORAGE_KEY = "tamoli-products";

const defaultProducts = [
  { name: "沙棘原浆", category: "健康饮品", description: "精选绿洲沙棘鲜果，保留天然酸甜风味。" },
  { name: "沙棘籽油", category: "营养产品", description: "以沙棘籽为原料，适合健康营养产品线展示。" },
  { name: "沙棘冻干粉", category: "深加工产品", description: "采用冻干工艺，便于冲调与多场景应用。" }
];

function getStoredProducts() {
  const rawProducts = localStorage.getItem(STORAGE_KEY);

  if (!rawProducts) {
    return [];
  }

  try {
    const parsedProducts = JSON.parse(rawProducts);
    return Array.isArray(parsedProducts) ? parsedProducts : [];
  } catch (error) {
    console.warn("无法读取本地产品数据", error);
    return [];
  }
}

function saveStoredProducts(products) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

function getAllProducts() {
  return [...defaultProducts, ...getStoredProducts()];
}

function createProductCard(product) {
  const card = document.createElement("article");
  card.className = "card";

  const title = document.createElement("h3");
  title.textContent = product.name;

  const category = document.createElement("p");
  category.className = "product-category";
  category.textContent = product.category;

  const description = document.createElement("p");
  description.className = "product-description";
  description.textContent = product.description || "暂无简介";

  card.append(title, category, description);
  return card;
}

function renderProducts(keyword = "") {
  const productList = document.getElementById("product-list");

  if (!productList) {
    return;
  }

  const normalizedKeyword = keyword.trim().toLowerCase();
  const filteredProducts = getAllProducts().filter((product) => {
    const searchableText = `${product.name} ${product.category}`.toLowerCase();
    return searchableText.includes(normalizedKeyword);
  });

  productList.innerHTML = "";

  if (filteredProducts.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "empty-message";
    emptyMessage.textContent = "未找到匹配的产品，请尝试其他名称或分类。";
    productList.appendChild(emptyMessage);
    return;
  }

  filteredProducts.forEach((product) => {
    productList.appendChild(createProductCard(product));
  });
}

function setupProductSearch() {
  const searchInput = document.getElementById("product-search");

  if (!searchInput) {
    return;
  }

  renderProducts();
  searchInput.addEventListener("input", (event) => {
    renderProducts(event.target.value);
  });
}

function setupAdminForm() {
  const form = document.getElementById("product-form");

  if (!form) {
    return;
  }

  const message = document.getElementById("form-message");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const product = {
      name: formData.get("name").trim(),
      category: formData.get("category").trim(),
      description: formData.get("description").trim()
    };

    if (!product.name || !product.category || !product.description) {
      message.textContent = "请完整填写产品名称、分类和简介。";
      return;
    }

    const products = getStoredProducts();
    products.push(product);
    saveStoredProducts(products);

    form.reset();
    message.textContent = `已保存“${product.name}”，请返回首页查看。`;
  });
}

setupProductSearch();
setupAdminForm();
