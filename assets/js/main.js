const addToCartBtns = document.querySelectorAll(".add-to-cart-btn")
const productAmounts = document.querySelectorAll(".product-quantity .num")
const productsBoxs = document.querySelectorAll(".products-content .box")
let orders = []

addToCartBtns.forEach((e, i) => {
  e.addEventListener("click", () => {
    e.classList.add("active")
    let productId = i
    let productImg = productsBoxs[i].querySelector("img").src
    let productName = productsBoxs[i].querySelector(".name").innerText
    let productPrice = productsBoxs[i].querySelector(".price").innerText
    let productAmount = productsBoxs[i].querySelector(".product-quantity .num").innerText
    let found = orders.some(order => order.id === productId)
    if (found) {
      let currentProduct = orders.find(e => e.id === productId)
      currentProduct.amount = productsBoxs[i].querySelector(".product-quantity .num").innerText
    } else {
      orders.push({ id: productId, img: productImg, name: productName, price: productPrice, amount: productAmount })
    }
    checkOrders()
  })
})
document.querySelectorAll(".plusIcon").forEach((e, i) => {
  e.addEventListener("click", () => {
    productAmounts[i].innerHTML = +productAmounts[i].innerHTML + 1
  })
})
document.querySelectorAll(".minusIcon").forEach((e, i) => {
  e.addEventListener("click", () => {
    if (+productAmounts[i].innerHTML > 1) {
      productAmounts[i].innerHTML = +productAmounts[i].innerHTML - 1
    }
  })
})


const orderContent = document.getElementById("orderContent")
function checkOrders() {
  if (orders.length != 0) {
    let ordersHtml = "";
    orders.forEach(e => {
      ordersHtml += `<div class="order-product-box flex justify-between items-center mb-2 border-b-2 pb-3">
  <div class="order-info">
    <h5 class="font-bold text-secondary">${e.name}</h5>
    <p class="amount-price text-sm">
      <span class="amount text-secondary mr-4">${e.amount}x</span
      ><span class="price mr-2 text-gray-300">${e.price}</span
      ><span class="total-price text-gray-600">$${(+e.amount * +e.price.slice(1)).toFixed(2)}</span>
    </p>
  </div>
  <div
    class="remove-order flex justify-center items-center font-bold w-[20px] h-[20px] text-sm rounded-full border-2 border-secondary cursor-pointer"
    onclick="removeFromOrders(${e.id})"
  >
    x
  </div>
</div>`
    })
    let total = 0;
    orders.forEach((e) => {
      total += +(+e.amount * +e.price.slice(1)).toFixed(2)
    })
    let totalHtml = `
    <div class="total flex justify-between items-center py-2">
      <h4 class="text-secondary font-bold">Total : </h4>
      <span class="total-value">${total}$</span>
    </div>
    `
    let confirmOrderBtn = `
    <button class="confirmOrderBtn bg-secondary py-2 relative left-[50%] translate-x-[-50%] rounded-full w-[90%] mt-2 text-white border-none outline-none" onclick="showConfirmedMessage()">Confirm Order</button>
    `
    orderContent.innerHTML = ordersHtml + totalHtml + confirmOrderBtn
  } else {
    orderContent.innerHTML = `
                  <img
            src="assets/images/illustration-empty-cart.svg"
            alt="empty img"
            width="130"
            class="my-4 relative start-[50%] translate-x-[-50%]"
          />
          <p class="text-sm text-thirdColor text-center">
            Your added items will appear here
          </p>
          `
  }
}

function removeFromOrders(productId) {
  orders = orders.filter(e => e.id != productId)
  productsBoxs[productId].querySelector(".add-to-cart-btn").classList.remove("active")
  checkOrders()
}

function showConfirmedMessage() {
  document.querySelector(".confirmed-massage").style.cssText = "visibility: visible !important;transform: scale(1)"
}
document.querySelector(".startNewOrderBtn").addEventListener("click", () => {
  window.location.reload()
})