const cartToggle = document.querySelector(".cart");
const cart = document.querySelector(".shopList");
const thumbnailContainer = document.querySelectorAll(".thumbnail_container");
const thumbnailImages = document.querySelectorAll(".thumbnail_container img");
const thumbnails = [...thumbnailImages];
const mainImg = document.querySelectorAll(".mainImg");
const overlay = document.querySelector(".overlay");
const biggerImg = document.querySelector(".imagesBigger");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".previous");
const closeBtn = document.querySelector(".closeBtn");
const plusBtn = document.querySelector(".plus");
const minusBtn = document.querySelector(".minus");
const cartContainer = document.querySelector(".shopList");
const addToCartBtn = document.querySelector(".addToCart");
const numberOfItems = document.querySelector(".orderNumber");
const nextBtnMobile = document.querySelector(".nextMobile");
const prevBtnMobile = document.querySelector(".previousMobile");
const menu = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobileMenu");
const closeBtnMobile = document.querySelector(".closeBtnMobile");

const toggleFnc = function (item) {
  item.classList.toggle("hidden");
};

cartToggle.addEventListener("click", function () {
  toggleFnc(cart);
});

const changeImgHelper = function (numberVar) {
  mainImg.forEach(
    (img) => (img.src = `./images/image-product-${numberVar}.jpg`)
  );
  thumbnailImages.forEach((image) => image.classList.remove("selectedImage"));
  thumbnails[numberVar - 1].classList.add("selectedImage");
  thumbnails[numberVar + 3].classList.add("selectedImage");
};

thumbnailContainer.forEach((container) =>
  container.addEventListener("click", function (e) {
    const target = e.target.closest("img");
    if (!target) return;
    const indexThumbnail = thumbnails.indexOf(target);
    const filter = indexThumbnail > 3 ? indexThumbnail - 3 : indexThumbnail + 1;

    changeImgHelper(filter);
  })
);

overlay.addEventListener("click", function () {
  toggleFnc(overlay);
  toggleFnc(mobileMenu);
  if (window.innerWidth < 800) return;
  toggleFnc(biggerImg);
});

mainImg[0].addEventListener("click", function () {
  if (window.innerWidth < 800) return;
  toggleFnc(overlay);
  toggleFnc(biggerImg);
});

const changeImg = function (btn) {
  let currentImg = +mainImg[0].src.slice(-5, -4);
  let change =
    btn.classList.contains("next") || btn.classList.contains("nextMobile")
      ? currentImg + 1
      : currentImg - 1;
  if (change > 4) change = 1;
  if (change < 1) change = 4;

  changeImgHelper(change);
};

nextBtn.addEventListener("click", function () {
  changeImg(this);
});

prevBtn.addEventListener("click", function () {
  changeImg(this);
});

closeBtn.addEventListener("click", function () {
  toggleFnc(overlay);
  toggleFnc(biggerImg);
});

const data = {
  price: 125,
  amount: 0,
  change: 0,
  final() {
    return (this.price * this.amount).toFixed(2);
  },
};

const changeAmount = function () {
  data.amount += data.change;
};

const changeDisplayAmount = function (btn) {
  const amount = data.change;
  const change = btn.classList.contains("plus") ? amount + 1 : amount - 1;
  if (change < 0) return;
  data.change = change;
  numberOfItems.innerHTML = data.change;
};

plusBtn.addEventListener("click", function () {
  changeDisplayAmount(this);
});

minusBtn.addEventListener("click", function () {
  changeDisplayAmount(this);
});

const deleteListener = function () {
  document.querySelector(".delete").addEventListener("click", function () {
    const markup = `
          <header>Cart</header>
          <div class="emptyContainer">
            <div class="empty">Your cart is empty.</div>
          </div>
            `;
    cartContainer.innerHTML = markup;
    data.amount = 0;
  });
};

const renderCart = function () {
  changeAmount();
  data.change = 0;
  numberOfItems.innerHTML = data.change;
  if (data.amount === 0) return;
  const markup = `
          <header>Cart</header>
          <div class="item">
            <div class="item_content">
              <img
                class="item_thumbnail"
                src="./images/image-product-1-thumbnail.jpg"
                alt="boots"
              />
              <div class="item_text">
                <p class="item_name">Fall limited Edition Sneakers</p>
                <p class="item_pay">
                  $125.00 x <span class="item_amount">${data.amount}</span>
                  <span class="item_total_pay">$${data.final()}</span>
                </p>
              </div>
              <img class="delete" src="./images/icon-delete.svg" alt="delete" />
            </div>
            <button class="checkout">Checkout</button>
          </div>
    `;
  cartContainer.innerHTML = markup;
  deleteListener();
};

addToCartBtn.addEventListener("click", renderCart);

nextBtnMobile.addEventListener("click", function () {
  changeImg(this);
});

prevBtnMobile.addEventListener("click", function () {
  changeImg(this);
});

menu.addEventListener("click", function () {
  toggleFnc(overlay);
  toggleFnc(mobileMenu);
});
closeBtnMobile.addEventListener("click", function () {
  toggleFnc(overlay);
  toggleFnc(mobileMenu);
});
