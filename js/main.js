// All Products
let all_products = [
  {
    id: 1,
    product_name: 'Amazfit T-Rex Pro',
    product_price: '3000',
    product_img: 'imgs/products/1.png',
    added_to_cart: false
  },
  {
    id: 2,
    product_name: 'Apple Series 7',
    product_price: '5000',
    product_img: 'imgs/products/2.png',
    added_to_cart: false
  },
  {
    id: 3,
    product_name: 'Samsung Watch 3',
    product_price: '4000',
    product_img: 'imgs/products/3.png',
    added_to_cart: false
  },
  {
    id: 4,
    product_name: 'Honor MW 2',
    product_price: '3300',
    product_img: 'imgs/products/4.png',
    added_to_cart: false
  },
  {
    id: 5,
    product_name: 'Amazfit GTS 2',
    product_price: '3500',
    product_img: 'imgs/products/5.png',
    added_to_cart: false
  },
  {
    id: 6,
    product_name: 'Huawei GT 2',
    product_price: '5000',
    product_img: 'imgs/products/6.png',
    added_to_cart: false
  }
]

// Handle products in LocalStorage
function handleStorage(products) {
  localStorage.setItem('products', JSON.stringify(products));
};

// Handle local storage after load
handleStorage(all_products);

// Get products from storage after load
let products = JSON.parse(localStorage.getItem('products'));

// Handle products in products section
function handleProducts() {
  const products_block = document.getElementById('products');

  products_block.innerHTML = products.map(
    product => (`
      <div>
        <div class="product">
          <img src="${product.product_img}" alt="Watch image"/>
          <h3>${product.product_name}</h3>
          <p>${product.product_price} <span>LE</span></p>
          <div class="actions">
            ${
              product.added_to_cart ?
              `
              <button class="btn-danger" onclick="handleRemove(${product.id})">
                <span class="material-symbols-rounded">
                  remove
                </span>
                Remove
              </button>
              `
              :
              `
              <button class="btn-primary" onclick="handleAdd(${product.id})">
                <span class="material-symbols-rounded">
                  add
                </span>
                Add to cart
              </button>
              `
            }
            <button class="btn-secondary" onclick="viewProduct(${product.id})">
              <span class="material-symbols-rounded">
                preview
              </span>
              Quick view
            </button>
          </div>
        </div>
      </div>
    `)
  ).join('');
};

// Handle cart items
function handleCart() {
  let cart = products.filter(product => product.added_to_cart === true) || [];
  const cart_dropdown = document.getElementById('dropdown');
  const items_count = document.getElementById('items-count');

  // Check if cart have data or empty
  cart.length ?
  cart_dropdown.innerHTML = cart.map(
    item => (
      `
      <li class="product">
        <img src="${item.product_img}" alt="Watch image"/>
        <h3>${item.product_name}</h3>
        <p>${item.product_price} <span>LE</span></p>
        <div class="actions">
          <button class="btn-danger" onclick="handleRemove(${item.id})">
            <span class="material-symbols-rounded">
              remove
            </span>
            Remove
          </button>
        </div>
      </li>
      `
    )
  ).join('')
  :
  cart_dropdown.innerHTML = `<li>No Items</li>`

  // Number of items in cart
  items_count.innerHTML = cart.length;
};

// Quick view for product
function handleView(id) {
  const modal_body = document.getElementById('modal-body')

  const item = products.find(product => product.id === id)
  modal_body.innerHTML = `
    <div class="product">
      <img src="${item.product_img}" alt="Watch image"/>
      <h3>${item.product_name}</h3>
      <p>${item.product_price} <span>LE</span></p>
      <div class="actions">
        ${
          item.added_to_cart ?
          `
          <button class="btn-danger" onclick="handleRemove(${item.id})">
            <span class="material-symbols-rounded">
              remove
            </span>
            Remove
          </button>
          `
          :
          `
          <button class="btn-primary" onclick="handleAdd(${item.id})">
            <span class="material-symbols-rounded">
              add
            </span>
            Add to cart
          </button>
          `
        }
      </div>
    </div>
  `
};

// View products in products page after load
handleProducts();

// Handle products in cart after load
handleCart();

// Remove product
const handleRemove = (id) => {
  products.find(item => item.id === id).added_to_cart = false;
  handleStorage(products);
  handleCart();
  handleProducts();
  handleView(id);
};

// Add product
const handleAdd = (id) => {
  products.find(item => item.id === id).added_to_cart = true;
  handleStorage(products);
  handleCart();
  handleProducts();
  handleView(id);
};

// Toggle Dropdown in navbar
function toggleDd() {
  const dd_menu = document.getElementById('dropdown');
  dd_menu.style.display === 'none' ?
  dd_menu.style.display = 'block'
  :
  dd_menu.style.display = 'none'

  // Show items in cart after open dropdown
  handleCart();
};

// Product quick view
function viewProduct(id) {
  const modal = document.getElementById('modal');

  modal.style.visibility = 'visible';
  modal.style.opacity = '1';

  // Show items in modal after open it
  handleView(id);
};

// Close Modal
function closeModal() {
  const modal = document.getElementById('modal');
  const modal_body = document.getElementById('modal-body')

  modal.style.visibility = 'hidden';
  modal.style.opacity = '0';


  modal_body.innerHTML = `<div></div>`
};