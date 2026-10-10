import React, { useEffect, useMemo, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";

/* =========================================================
   SPORT HEALTH STORE
   ONE FILE APP.JSX
   ========================================================= */

const PRODUCTS = [
  {
    id: 1,
    name: "Nike Air Max Pro",
    category: "Krossovka",
    price: 899000,
    oldPrice: 1099000,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    rating: 4.9,
    stock: 15,
    badge: "TOP",
    description:
      "Yugurish va kundalik mashg‘ulotlar uchun zamonaviy va qulay sport krossovka.",
  },
  {
    id: 2,
    name: "Adidas Running X",
    category: "Krossovka",
    price: 749000,
    oldPrice: 899000,
    image:
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=900&q=80",
    rating: 4.8,
    stock: 20,
    badge: "SALE",
    description:
      "Yengil konstruksiya va yumshoq taglikka ega yugurish krossovkasi.",
  },
  {
    id: 3,
    name: "Pro Sport Hoodie",
    category: "Kiyim",
    price: 399000,
    oldPrice: 499000,
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80",
    rating: 4.7,
    stock: 30,
    badge: "NEW",
    description:
      "Sport mashg‘ulotlari va kundalik kiyim uchun premium hoodie.",
  },
  {
    id: 4,
    name: "Premium Gym T-Shirt",
    category: "Kiyim",
    price: 199000,
    oldPrice: 249000,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
    rating: 4.6,
    stock: 50,
    badge: "NEW",
    description:
      "Nafas oluvchi materialdan tayyorlangan professional sport futbolkasi.",
  },
  {
    id: 5,
    name: "Power Dumbbell Set",
    category: "Fitness",
    price: 699000,
    oldPrice: 799000,
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=900&q=80",
    rating: 4.9,
    stock: 12,
    badge: "TOP",
    description:
      "Uy va professional zal mashg‘ulotlari uchun gantel to‘plami.",
  },
  {
    id: 6,
    name: "Yoga Mat Pro",
    category: "Fitness",
    price: 259000,
    oldPrice: 329000,
    image:
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=900&q=80",
    rating: 4.8,
    stock: 25,
    badge: "SALE",
    description:
      "Yoga, fitness va stretching uchun sirpanmaydigan professional mat.",
  },
  {
    id: 7,
    name: "Smart Fitness Watch",
    category: "Gadjet",
    price: 1199000,
    oldPrice: 1499000,
    image:
      "https://images.unsplash.com/photo-1544117519-31a4b719223d?auto=format&fit=crop&w=900&q=80",
    rating: 4.9,
    stock: 10,
    badge: "TOP",
    description:
      "Yurak urishi, qadam, kaloriya va sport rejimlarini kuzatuvchi aqlli soat.",
  },
  {
    id: 8,
    name: "Sport Backpack",
    category: "Aksessuar",
    price: 329000,
    oldPrice: 399000,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80",
    rating: 4.7,
    stock: 18,
    badge: "NEW",
    description:
      "Sport kiyimlari va aksessuarlar uchun katta hajmli ryukzak.",
  },
  {
    id: 9,
    name: "Training Gloves",
    category: "Aksessuar",
    price: 149000,
    oldPrice: 199000,
    image:
      "https://images.unsplash.com/photo-1586401100295-7a8096fd231a?auto=format&fit=crop&w=900&q=80",
    rating: 4.6,
    stock: 35,
    badge: "SALE",
    description:
      "Fitness va og‘irlik bilan mashg‘ulotlar uchun himoyalovchi qo‘lqop.",
  },
  {
    id: 10,
    name: "Protein Shaker",
    category: "Sport",
    price: 99000,
    oldPrice: 129000,
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=900&q=80",
    rating: 4.5,
    stock: 60,
    badge: "HOT",
    description:
      "Protein va boshqa sport ichimliklari uchun mustahkam shaker.",
  },
  {
    id: 11,
    name: "Basketball Pro",
    category: "Sport",
    price: 289000,
    oldPrice: 349000,
    image:
      "https://images.unsplash.com/photo-1518065896235-a4c93e088e7b?auto=format&fit=crop&w=900&q=80",
    rating: 4.8,
    stock: 14,
    badge: "TOP",
    description:
      "Professional basketbol mashg‘ulotlari va o‘yinlari uchun to‘p.",
  },
  {
    id: 12,
    name: "Football Elite",
    category: "Sport",
    price: 319000,
    oldPrice: 389000,
    image:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=900&q=80",
    rating: 4.8,
    stock: 17,
    badge: "NEW",
    description:
      "Yuqori sifatli futbol to‘pi, mashg‘ulot va musobaqalar uchun.",
  },
];

const TRANSLATIONS = {
  uz: {
    home: "Bosh sahifa",
    catalog: "Katalog",
    favorites: "Sevimlilar",
    cart: "Savat",
    login: "Kirish",
    profile: "Profil",
    admin: "Admin",
    search: "Mahsulot qidirish...",
    all: "Barchasi",
    add: "Savatga",
    buy: "Sotib olish",
    details: "Batafsil",
    new: "Yangi",
    sale: "Chegirma",
    top: "TOP",
    dark: "Tungi rejim",
    light: "Yorug‘ rejim",
    products: "Mahsulotlar",
    price: "Narx",
    category: "Kategoriya",
    sort: "Saralash",
    cheap: "Arzonidan",
    expensive: "Qimmatidan",
    rating: "Reyting",
    popular: "Mashhurlik",
    empty: "Hozircha hech narsa yo‘q",
    total: "Jami",
    checkout: "Buyurtma berish",
    promo: "Promo kod",
    apply: "Qo‘llash",
    contact: "Aloqa",
    faq: "FAQ",
    map: "Xarita",
    reviews: "Sharhlar",
    logout: "Chiqish",
    username: "Login",
    password: "Parol",
    phone: "Telefon",
    dashboard: "Dashboard",
    addProduct: "Mahsulot qo‘shish",
    orders: "Buyurtmalar",
    finance: "Moliya",
    save: "Saqlash",
    cancel: "Bekor qilish",
    delete: "O‘chirish",
    edit: "Tahrirlash",
    quantity: "Miqdor",
    address: "Manzil",
    orderSuccess: "Buyurtma muvaffaqiyatli qabul qilindi!",
  },

  ru: {
    home: "Главная",
    catalog: "Каталог",
    favorites: "Избранное",
    cart: "Корзина",
    login: "Войти",
    profile: "Профиль",
    admin: "Админ",
    search: "Поиск товара...",
    all: "Все",
    add: "В корзину",
    buy: "Купить",
    details: "Подробнее",
    new: "Новинка",
    sale: "Скидка",
    top: "TOP",
    dark: "Темная тема",
    light: "Светлая тема",
    products: "Товары",
    price: "Цена",
    category: "Категория",
    sort: "Сортировка",
    cheap: "Сначала дешевые",
    expensive: "Сначала дорогие",
    rating: "Рейтинг",
    popular: "Популярные",
    empty: "Здесь пока ничего нет",
    total: "Итого",
    checkout: "Оформить заказ",
    promo: "Промокод",
    apply: "Применить",
    contact: "Контакты",
    faq: "FAQ",
    map: "Карта",
    reviews: "Отзывы",
    logout: "Выйти",
    username: "Логин",
    password: "Пароль",
    phone: "Телефон",
    dashboard: "Dashboard",
    addProduct: "Добавить товар",
    orders: "Заказы",
    finance: "Финансы",
    save: "Сохранить",
    cancel: "Отмена",
    delete: "Удалить",
    edit: "Изменить",
    quantity: "Количество",
    address: "Адрес",
    orderSuccess: "Заказ успешно принят!",
  },

  en: {
    home: "Home",
    catalog: "Catalog",
    favorites: "Favorites",
    cart: "Cart",
    login: "Login",
    profile: "Profile",
    admin: "Admin",
    search: "Search products...",
    all: "All",
    add: "Add to cart",
    buy: "Buy now",
    details: "Details",
    new: "New",
    sale: "Sale",
    top: "TOP",
    dark: "Dark mode",
    light: "Light mode",
    products: "Products",
    price: "Price",
    category: "Category",
    sort: "Sort",
    cheap: "Cheapest",
    expensive: "Most expensive",
    rating: "Rating",
    popular: "Popular",
    empty: "Nothing here yet",
    total: "Total",
    checkout: "Checkout",
    promo: "Promo code",
    apply: "Apply",
    contact: "Contact",
    faq: "FAQ",
    map: "Map",
    reviews: "Reviews",
    logout: "Logout",
    username: "Username",
    password: "Password",
    phone: "Phone",
    dashboard: "Dashboard",
    addProduct: "Add product",
    orders: "Orders",
    finance: "Finance",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    quantity: "Quantity",
    address: "Address",
    orderSuccess: "Order successfully accepted!",
  },
};

function load(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

function money(value) {
  return `${Number(value || 0).toLocaleString("uz-UZ")} so'm`;
}

function App() {
  const [lang, setLang] = useState(load("sport_lang", "uz"));
  const [dark, setDark] = useState(load("sport_dark", true));
  const [products, setProducts] = useState(
    load("sport_products", PRODUCTS)
  );
  const [cart, setCart] = useState(load("sport_cart", []));
  const [favorites, setFavorites] = useState(
    load("sport_favorites", [])
  );
  const [user, setUser] = useState(load("sport_user", null));
  const [orders, setOrders] = useState(load("sport_orders", []));

  const t = (key) => TRANSLATIONS[lang]?.[key] || TRANSLATIONS.uz[key] || key;

  useEffect(() => save("sport_lang", lang), [lang]);
  useEffect(() => save("sport_dark", dark), [dark]);
  useEffect(() => save("sport_products", products), [products]);
  useEffect(() => save("sport_cart", cart), [cart]);
  useEffect(() => save("sport_favorites", favorites), [favorites]);
  useEffect(() => save("sport_user", user), [user]);
  useEffect(() => save("sport_orders", orders), [orders]);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  function addToCart(product) {
    setCart((old) => {
      const found = old.find((item) => item.id === product.id);

      if (found) {
        return old.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...old, { ...product, qty: 1 }];
    });
  }

  function removeCart(id) {
    setCart((old) => old.filter((item) => item.id !== id));
  }

  function changeQty(id, qty) {
    if (qty <= 0) {
      removeCart(id);
      return;
    }

    setCart((old) =>
      old.map((item) =>
        item.id === id ? { ...item, qty } : item
      )
    );
  }

  function toggleFav(id) {
    setFavorites((old) =>
      old.includes(id)
        ? old.filter((x) => x !== id)
        : [...old, id]
    );
  }

  function login(data) {
    setUser(data);
  }

  function logout() {
    setUser(null);
  }

  function addProduct(product) {
    setProducts((old) => [
      ...old,
      {
        ...product,
        id: Date.now(),
        rating: Number(product.rating || 5),
        stock: Number(product.stock || 0),
        price: Number(product.price || 0),
        oldPrice: Number(product.oldPrice || product.price || 0),
      },
    ]);
  }

  function updateProduct(id, product) {
    setProducts((old) =>
      old.map((item) =>
        item.id === id
          ? {
              ...item,
              ...product,
              price: Number(product.price),
              oldPrice: Number(product.oldPrice),
              stock: Number(product.stock),
            }
          : item
      )
    );
  }

  function deleteProduct(id) {
    setProducts((old) => old.filter((item) => item.id !== id));
    setFavorites((old) => old.filter((x) => x !== id));
    setCart((old) => old.filter((x) => x.id !== id));
  }

  function order(data) {
    const newOrder = {
      id: Date.now(),
      user: user?.name || "Guest",
      items: cart,
      total: data.total,
      address: data.address,
      phone: data.phone,
      status: "Yangi",
      date: new Date().toLocaleString(),
    };

    setOrders((old) => [newOrder, ...old]);
    setCart([]);
  }

  return (
    <BrowserRouter>
      <div className={dark ? "app dark" : "app"}>
        <GlobalStyle />

        {/* PUBLIC HEADER — ADMINDA KO‘RINMAYDI */}
        {user?.role !== "admin" && (
          <Header
            t={t}
            lang={lang}
            setLang={setLang}
            dark={dark}
            setDark={setDark}
            cartCount={cartCount}
            favCount={favorites.length}
            user={user}
            logout={logout}
          />
        )}

        <Routes>
          <Route
            path="/"
            element={
              <Home
                products={products}
                t={t}
                favorites={favorites}
                toggleFav={toggleFav}
                addToCart={addToCart}
              />
            }
          />

          <Route
            path="/catalog"
            element={
              <Catalog
                products={products}
                t={t}
                favorites={favorites}
                toggleFav={toggleFav}
                addToCart={addToCart}
              />
            }
          />

          <Route
            path="/product/:id"
            element={
              <ProductPage
                products={products}
                t={t}
                addToCart={addToCart}
                favorites={favorites}
                toggleFav={toggleFav}
              />
            }
          />

          <Route
            path="/favorites"
            element={
              <Favorites
                products={products}
                favorites={favorites}
                toggleFav={toggleFav}
                addToCart={addToCart}
                t={t}
              />
            }
          />

          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                removeCart={removeCart}
                changeQty={changeQty}
                order={order}
                user={user}
                t={t}
              />
            }
          />

          <Route
            path="/login"
            element={<Login login={login} user={user} t={t} />}
          />

          <Route
            path="/profile"
            element={
              user ? (
                <Profile user={user} orders={orders} t={t} logout={logout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route path="/map" element={<MapPage t={t} />} />
          <Route path="/reviews" element={<Reviews t={t} />} />
          <Route path="/faq" element={<FAQ t={t} />} />
          <Route path="/contact" element={<Contact t={t} />} />

          <Route
            path="/admin"
            element={
              user?.role === "admin" ? (
                <Admin
                  products={products}
                  orders={orders}
                  addProduct={addProduct}
                  updateProduct={updateProduct}
                  deleteProduct={deleteProduct}
                  t={t}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        {/* PUBLIC FOOTER — ADMINDA KO‘RINMAYDI */}
        {user?.role !== "admin" && <Footer t={t} />}
      </div>
    </BrowserRouter>
  );
}

/* =========================================================
   HEADER
   ========================================================= */

function Header({
  t,
  lang,
  setLang,
  dark,
  setDark,
  cartCount,
  favCount,
  user,
  logout,
}) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  function submitSearch(e) {
    e.preventDefault();

    if (!search.trim()) {
      navigate("/catalog");
      return;
    }

    navigate(`/catalog?search=${encodeURIComponent(search)}`);
  }

  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="logo">
          <span>SPORT</span>
          <b>NEON</b>
        </Link>

        <nav className="nav">
          <Link to="/">{t("home")}</Link>
          <Link to="/catalog">{t("catalog")}</Link>
          <Link to="/favorites">
            ❤️ {t("favorites")}
            {favCount > 0 && <i>{favCount}</i>}
          </Link>
          <Link to="/cart">
            🛒 {t("cart")}
            {cartCount > 0 && <i>{cartCount}</i>}
          </Link>
        </nav>

        <form className="search-box" onSubmit={submitSearch}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("search")}
          />
          <button>⌕</button>
        </form>

        <div className="header-actions">
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
          >
            <option value="uz">UZ</option>
            <option value="ru">RU</option>
            <option value="en">EN</option>
          </select>

          <button
            className="icon-button"
            onClick={() => setDark(!dark)}
          >
            {dark ? "☀️" : "🌙"}
          </button>

          {user ? (
            <button className="profile-mini" onClick={logout}>
              👤 {user.name}
            </button>
          ) : (
            <Link className="login-button" to="/login">
              {t("login")}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

/* =========================================================
   HOME
   ========================================================= */

function Home({
  products,
  t,
  favorites,
  toggleFav,
  addToCart,
}) {
  return (
    <>
      <section className="hero">
        <div className="hero-glow glow-one" />
        <div className="hero-glow glow-two" />

        <div className="container hero-content">
          <div className="hero-text">
            <span className="hero-label">⚡ PREMIUM SPORT STORE</span>

            <h1>
              SPORT
              <span> WITHOUT </span>
              LIMITS
            </h1>

            <p>
              Sport, fitness va sog‘lom hayot uchun zamonaviy
              mahsulotlar. Sifat, tezlik va neon energiya.
            </p>

            <div className="hero-buttons">
              <Link to="/catalog" className="neon-button">
                {t("catalog")} →
              </Link>

              <Link to="/map" className="ghost-button">
                📍 {t("map")}
              </Link>
            </div>

            <div className="hero-stats">
              <div>
                <strong>500+</strong>
                <span>Mahsulot</span>
              </div>
              <div>
                <strong>15K+</strong>
                <span>Mijoz</span>
              </div>
              <div>
                <strong>4.9</strong>
                <span>Reyting</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-circle" />

            <img
              src={products[0]?.image}
              alt="Sport"
            />

            <div className="floating-card floating-top">
              ⚡
              <span>ENERGY</span>
            </div>

            <div className="floating-card floating-bottom">
              ★ 4.9
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container feature-grid">
          <Feature icon="🚚" title="Tez yetkazib berish" text="24/7 xizmat" />
          <Feature icon="🛡️" title="100% sifat" text="Original mahsulot" />
          <Feature icon="💳" title="Xavfsiz to‘lov" text="Online to‘lov" />
          <Feature icon="⚡" title="Tez xizmat" text="Professional jamoa" />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="section-label">TRENDING NOW</span>
              <h2>Eng mashhur mahsulotlar</h2>
            </div>

            <Link to="/catalog" className="outline-button">
              Barchasini ko‘rish →
            </Link>
          </div>

          <div className="product-grid">
            {products.slice(0, 8).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                t={t}
                favorites={favorites}
                toggleFav={toggleFav}
                addToCart={addToCart}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="banner">
        <div className="container banner-inner">
          <div>
            <span>NEON SALE</span>
            <h2>SPORTGA 30% GACHA CHEGIRMA</h2>
            <p>Promo kod: NEON30</p>
          </div>

          <Link to="/catalog" className="neon-button">
            Xarid qilish →
          </Link>
        </div>
      </section>
    </>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="feature">
      <div className="feature-icon">{icon}</div>
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
}

/* =========================================================
   PRODUCT CARD
   ========================================================= */

function ProductCard({
  product,
  t,
  favorites,
  toggleFav,
  addToCart,
}) {
  const navigate = useNavigate();

  const isFav = favorites.includes(product.id);

  return (
    <article className="product-card">
      <div
        className="product-image"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <img src={product.image} alt={product.name} />

        {product.badge && (
          <span className="product-badge">
            {product.badge}
          </span>
        )}

        <button
          className={`favorite ${isFav ? "active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleFav(product.id);
          }}
        >
          {isFav ? "♥" : "♡"}
        </button>
      </div>

      <div className="product-info">
        <span className="product-category">
          {product.category}
        </span>

        <h3>{product.name}</h3>

        <div className="rating">
          ★ {product.rating}
        </div>

        <div className="price-row">
          <strong>{money(product.price)}</strong>
          {product.oldPrice > product.price && (
            <del>{money(product.oldPrice)}</del>
          )}
        </div>

        <div className="card-buttons">
          <button
            className="add-button"
            onClick={() => addToCart(product)}
          >
            + {t("add")}
          </button>

          <Link
            className="details-button"
            to={`/product/${product.id}`}
          >
            →
          </Link>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   CATALOG
   ========================================================= */

function Catalog({
  products,
  t,
  favorites,
  toggleFav,
  addToCart,
}) {
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const initialSearch = params.get("search") || "";

  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("popular");

  const categories = [
    "all",
    ...new Set(products.map((item) => item.category)),
  ];

  const filtered = useMemo(() => {
    let list = [...products];

    if (search.trim()) {
      list = list.filter((item) =>
        `${item.name} ${item.category}`
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (category !== "all") {
      list = list.filter((item) => item.category === category);
    }

    if (sort === "cheap") {
      list.sort((a, b) => a.price - b.price);
    }

    if (sort === "expensive") {
      list.sort((a, b) => b.price - a.price);
    }

    if (sort === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [products, search, category, sort]);

  return (
    <main className="page">
      <div className="container">
        <div className="page-heading">
          <span className="section-label">STORE</span>
          <h1>{t("catalog")}</h1>
          <p>
            Sport va sog‘lom hayot uchun eng yaxshi mahsulotlar.
          </p>
        </div>

        <div className="catalog-toolbar">
          <input
            className="big-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("search")}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item === "all" ? t("all") : item}
              </option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="popular">{t("popular")}</option>
            <option value="cheap">{t("cheap")}</option>
            <option value="expensive">{t("expensive")}</option>
            <option value="rating">{t("rating")}</option>
          </select>
        </div>

        <div className="catalog-result">
          {filtered.length} ta mahsulot
        </div>

        <div className="product-grid">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              t={t}
              favorites={favorites}
              toggleFav={toggleFav}
              addToCart={addToCart}
            />
          ))}
        </div>

        {!filtered.length && (
          <div className="empty-state">
            <div>🔎</div>
            <h2>{t("empty")}</h2>
          </div>
        )}
      </div>
    </main>
  );
}

/* =========================================================
   PRODUCT PAGE
   ========================================================= */

function ProductPage({
  products,
  addToCart,
  favorites,
  toggleFav,
  t,
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <main className="page">
        <div className="container empty-state">
          <h2>Mahsulot topilmadi</h2>
          <Link to="/catalog" className="neon-button">
            Katalog
          </Link>
        </div>
      </main>
    );
  }

  const isFav = favorites.includes(product.id);

  return (
    <main className="page">
      <div className="container product-detail">
        <div className="detail-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="detail-content">
          <span className="section-label">
            {product.category}
          </span>

          <h1>{product.name}</h1>

          <div className="detail-rating">
            ★ {product.rating} / 5
          </div>

          <div className="detail-price">
            <strong>{money(product.price)}</strong>

            {product.oldPrice > product.price && (
              <del>{money(product.oldPrice)}</del>
            )}
          </div>

          <p className="detail-description">
            {product.description}
          </p>

          <div className="stock">
            ✓ Omborda: {product.stock} dona
          </div>

          <div className="detail-actions">
            <button
              className="neon-button"
              onClick={() => {
                addToCart(product);
                navigate("/cart");
              }}
            >
              🛒 {t("buy")}
            </button>

            <button
              className={`heart-big ${
                isFav ? "active" : ""
              }`}
              onClick={() => toggleFav(product.id)}
            >
              {isFav ? "♥" : "♡"}
            </button>
          </div>

          <div className="product-benefits">
            <div>🚚 Tez yetkazib berish</div>
            <div>🛡️ Original mahsulot</div>
            <div>↩️ 14 kunlik qaytarish</div>
          </div>
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   FAVORITES
   ========================================================= */

function Favorites({
  products,
  favorites,
  toggleFav,
  addToCart,
  t,
}) {
  const list = products.filter((item) =>
    favorites.includes(item.id)
  );

  return (
    <main className="page">
      <div className="container">
        <div className="page-heading">
          <span className="section-label">MY LIST</span>
          <h1>{t("favorites")}</h1>
        </div>

        {list.length ? (
          <div className="product-grid">
            {list.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                t={t}
                favorites={favorites}
                toggleFav={toggleFav}
                addToCart={addToCart}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div>♡</div>
            <h2>{t("empty")}</h2>
            <Link to="/catalog" className="neon-button">
              {t("catalog")}
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}

/* =========================================================
   CART
   ========================================================= */

function Cart({
  cart,
  removeCart,
  changeQty,
  order,
  user,
  t,
}) {
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);
  const [message, setMessage] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const delivery = subtotal > 500000 || subtotal === 0 ? 0 : 30000;

  const total = Math.max(
    0,
    subtotal + delivery - discount
  );

  function applyPromo() {
    const code = promo.trim().toUpperCase();

    if (code === "NEON30") {
      setDiscount(Math.round(subtotal * 0.3));
      setMessage("30% chegirma qo‘llandi!");
      return;
    }

    if (code === "SPORT10") {
      setDiscount(Math.round(subtotal * 0.1));
      setMessage("10% chegirma qo‘llandi!");
      return;
    }

    setDiscount(0);
    setMessage("Promo kod noto‘g‘ri");
  }

  function submitOrder(e) {
    e.preventDefault();

    if (!cart.length) return;

    if (!address || !phone) {
      alert("Manzil va telefonni kiriting");
      return;
    }

    order({
      total,
      address,
      phone,
    });

    setMessage(t("orderSuccess"));
    setPromo("");
    setDiscount(0);
  }

  return (
    <main className="page">
      <div className="container">
        <div className="page-heading">
          <span className="section-label">CHECKOUT</span>
          <h1>{t("cart")}</h1>
        </div>

        {!cart.length ? (
          <div className="empty-state">
            <div>🛒</div>
            <h2>{t("empty")}</h2>
            <Link to="/catalog" className="neon-button">
              {t("catalog")}
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items">
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} />

                  <div className="cart-item-info">
                    <span>{item.category}</span>
                    <h3>{item.name}</h3>
                    <strong>{money(item.price)}</strong>
                  </div>

                  <div className="quantity">
                    <button
                      onClick={() =>
                        changeQty(item.id, item.qty - 1)
                      }
                    >
                      −
                    </button>

                    <b>{item.qty}</b>

                    <button
                      onClick={() =>
                        changeQty(item.id, item.qty + 1)
                      }
                    >
                      +
                    </button>
                  </div>

                  <strong className="cart-line-total">
                    {money(item.price * item.qty)}
                  </strong>

                  <button
                    className="delete-small"
                    onClick={() => removeCart(item.id)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <form className="checkout-card" onSubmit={submitOrder}>
              <h2>{t("checkout")}</h2>

              <label>{t("promo")}</label>

              <div className="promo-row">
                <input
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                  placeholder="NEON30"
                />

                <button
                  type="button"
                  onClick={applyPromo}
                >
                  {t("apply")}
                </button>
              </div>

              {message && (
                <div className="success-message">
                  {message}
                </div>
              )}

              <label>{t("address")}</label>

              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Toshkent shahri..."
              />

              <label>{t("phone")}</label>

              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+998 90 000 00 00"
              />

              <div className="summary">
                <div>
                  <span>Mahsulotlar</span>
                  <strong>{money(subtotal)}</strong>
                </div>

                <div>
                  <span>Yetkazib berish</span>
                  <strong>
                    {delivery === 0
                      ? "Bepul"
                      : money(delivery)}
                  </strong>
                </div>

                <div>
                  <span>Chegirma</span>
                  <strong>- {money(discount)}</strong>
                </div>

                <div className="summary-total">
                  <span>{t("total")}</span>
                  <strong>{money(total)}</strong>
                </div>
              </div>

              <button className="neon-button full">
                {t("checkout")} →
              </button>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}

/* =========================================================
   LOGIN
   ========================================================= */

function Login({ login, user, t }) {
  const navigate = useNavigate();

  const [mode, setMode] = useState("username");
  const [value, setValue] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function submit(e) {
    e.preventDefault();

    if (!value || !password) {
      setError("Barcha maydonlarni to‘ldiring");
      return;
    }

    /* ADMIN */
    if (
      mode === "username" &&
      value === "admin" &&
      password === "admin123"
    ) {
      login({
        name: "Administrator",
        username: "admin",
        role: "admin",
      });

      navigate("/admin");
      return;
    }

    /* NORMAL USER */
    login({
      name: value,
      username: mode === "username" ? value : "",
      phone: mode === "phone" ? value : "",
      role: "user",
    });

    navigate("/");
  }

  if (user?.role === "admin") {
    return <Navigate to="/admin" />;
  }

  return (
    <main className="page login-page">
      <div className="login-card">
        <div className="login-logo">
          SPORT<span>NEON</span>
        </div>

        <h1>{t("login")}</h1>
        <p>Sport olamiga xush kelibsiz</p>

        <div className="login-tabs">
          <button
            className={mode === "username" ? "active" : ""}
            onClick={() => setMode("username")}
            type="button"
          >
            {t("username")}
          </button>

          <button
            className={mode === "phone" ? "active" : ""}
            onClick={() => setMode("phone")}
            type="button"
          >
            {t("phone")}
          </button>
        </div>

        <form onSubmit={submit}>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={
              mode === "username"
                ? "username"
                : "+998 90 000 00 00"
            }
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t("password")}
          />

          {mode === "username" && (
            <small className="admin-hint">
              Admin: admin / admin123
            </small>
          )}

          {error && <div className="error-message">{error}</div>}

          <button className="neon-button full">
            {t("login")} →
          </button>
        </form>
      </div>
    </main>
  );
}

/* =========================================================
   PROFILE
   ========================================================= */

function Profile({
  user,
  orders,
  t,
  logout,
}) {
  const navigate = useNavigate();

  return (
    <main className="page">
      <div className="container">
        <div className="profile-head">
          <div className="avatar">
            {user.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <span className="section-label">ACCOUNT</span>
            <h1>{user.name}</h1>
            <p>
              {user.phone ||
                user.username ||
                "Sport Neon user"}
            </p>
          </div>

          <button
            className="danger-button"
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            {t("logout")}
          </button>
        </div>

        <div className="profile-grid">
          <div className="profile-stat">
            <span>Buyurtmalar</span>
            <strong>
              {orders.filter(
                (order) => order.user === user.name
              ).length}
            </strong>
          </div>

          <div className="profile-stat">
            <span>Sevimlilar</span>
            <strong>∞</strong>
          </div>

          <div className="profile-stat">
            <span>Status</span>
            <strong>PRO</strong>
          </div>
        </div>

        <section className="section-small">
          <h2>Buyurtmalar tarixi</h2>

          {orders.length ? (
            <div className="order-list">
              {orders
                .filter(
                  (item) => item.user === user.name
                )
                .map((item) => (
                  <div className="order-card" key={item.id}>
                    <div>
                      <strong>#{item.id}</strong>
                      <span>{item.date}</span>
                    </div>

                    <strong>{money(item.total)}</strong>

                    <span className="status">
                      {item.status}
                    </span>
                  </div>
                ))}
            </div>
          ) : (
            <div className="empty-state compact">
              Buyurtmalar yo‘q
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

/* =========================================================
   MAP
   ========================================================= */

function MapPage({ t }) {
  return (
    <main className="page">
      <div className="container">
        <div className="page-heading">
          <span className="section-label">LOCATION</span>
          <h1>{t("map")}</h1>
          <p>
            SPORT NEON do‘konimizga tashrif buyuring.
          </p>
        </div>

        <div className="map-wrapper">
          <iframe
            title="Sport Neon Map"
            src="https://www.openstreetmap.org/export/embed.html?bbox=69.20%2C41.27%2C69.30%2C41.35&layer=mapnik&marker=41.3111%2C69.2797"
          />

          <div className="map-card">
            <div className="map-pin">📍</div>
            <h3>SPORT NEON</h3>
            <p>Toshkent shahri</p>
            <p>Amir Temur Avenue</p>
            <span>Har kuni 09:00 — 22:00</span>
          </div>
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   REVIEWS
   ========================================================= */

function Reviews() {
  const reviews = [
    {
      name: "Azizbek",
      text: "Krossovka sifati juda yaxshi. Yetkazib berish ham tez.",
      rating: 5,
    },
    {
      name: "Madina",
      text: "Sayt dizayni juda chiroyli va buyurtma berish oson.",
      rating: 5,
    },
    {
      name: "Jasur",
      text: "Fitness mahsulotlari juda ko‘p ekan.",
      rating: 4,
    },
  ];

  return (
    <main className="page">
      <div className="container">
        <div className="page-heading">
          <span className="section-label">COMMUNITY</span>
          <h1>Sharhlar</h1>
        </div>

        <div className="review-grid">
          {reviews.map((review) => (
            <div className="review-card" key={review.name}>
              <div className="review-avatar">
                {review.name.charAt(0)}
              </div>

              <h3>{review.name}</h3>

              <div className="rating">
                {"★".repeat(review.rating)}
              </div>

              <p>{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   FAQ
   ========================================================= */

function FAQ() {
  const [open, setOpen] = useState(null);

  const items = [
    [
      "Yetkazib berish qancha vaqt oladi?",
      "Toshkent bo‘yicha odatda 1 kun ichida, viloyatlarga 2-5 kun ichida yetkaziladi.",
    ],
    [
      "Mahsulotni qaytarish mumkinmi?",
      "Ha. Mahsulot foydalanilmagan bo‘lsa 14 kun ichida qaytarish mumkin.",
    ],
    [
      "Promo kodlar bormi?",
      "Ha. Masalan NEON30 promo kodi bilan 30% chegirma olishingiz mumkin.",
    ],
    [
      "Qanday to‘lov qilish mumkin?",
      "Naqd, karta va online to‘lov usullari mavjud.",
    ],
  ];

  return (
    <main className="page">
      <div className="container faq-container">
        <div className="page-heading">
          <span className="section-label">HELP CENTER</span>
          <h1>FAQ</h1>
        </div>

        <div className="faq-list">
          {items.map(([question, answer], index) => (
            <div
              className={`faq-item ${
                open === index ? "open" : ""
              }`}
              key={question}
            >
              <button
                onClick={() =>
                  setOpen(open === index ? null : index)
                }
              >
                <span>{question}</span>
                <b>{open === index ? "−" : "+"}</b>
              </button>

              {open === index && (
                <p>{answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   CONTACT
   ========================================================= */

function Contact() {
  const [sent, setSent] = useState(false);

  function submit(e) {
    e.preventDefault();
    setSent(true);
    e.target.reset();
  }

  return (
    <main className="page">
      <div className="container contact-grid">
        <div className="contact-info">
          <span className="section-label">GET IN TOUCH</span>
          <h1>Aloqa</h1>

          <p>
            Savolingiz bormi? Biz bilan bog‘laning.
          </p>

          <div className="contact-item">
            <span>📞</span>
            <div>
              <small>Telefon</small>
              <strong>+998 90 123 45 67</strong>
            </div>
          </div>

          <div className="contact-item">
            <span>✉️</span>
            <div>
              <small>Email</small>
              <strong>hello@sportneon.uz</strong>
            </div>
          </div>

          <div className="contact-item">
            <span>📍</span>
            <div>
              <small>Manzil</small>
              <strong>Toshkent shahri</strong>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={submit}>
          <h2>Xabar yuborish</h2>

          <input placeholder="Ismingiz" required />
          <input
            type="email"
            placeholder="Email"
            required
          />
          <textarea
            placeholder="Xabaringiz..."
            required
          />

          <button className="neon-button">
            Yuborish →
          </button>

          {sent && (
            <div className="success-message">
              Xabaringiz yuborildi!
            </div>
          )}
        </form>
      </div>
    </main>
  );
}

/* =========================================================
   ADMIN
   ========================================================= */

function Admin({
  products,
  orders,
  addProduct,
  updateProduct,
  deleteProduct,
  t,
}) {
  const [tab, setTab] = useState("dashboard");
  const [editing, setEditing] = useState(null);

  const revenue = orders.reduce(
    (sum, order) => sum + Number(order.total || 0),
    0
  );

  const menu = [
    ["dashboard", "📊", t("dashboard")],
    ["products", "📦", t("products")],
    ["add", "➕", t("addProduct")],
    ["orders", "🛒", t("orders")],
    ["finance", "💰", t("finance")],
  ];

  return (
    <main className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          SPORT<span>NEON</span>
        </div>

        <div className="admin-user">
          <div className="admin-avatar">A</div>
          <div>
            <strong>Administrator</strong>
            <span>Online</span>
          </div>
        </div>

        <nav className="admin-menu">
          {menu.map(([key, icon, label]) => (
            <button
              key={key}
              className={tab === key ? "active" : ""}
              onClick={() => {
                setTab(key);
                setEditing(null);
              }}
            >
              <span>{icon}</span>
              {label}
            </button>
          ))}
        </nav>

        <div className="admin-sidebar-bottom">
          <Link to="/">
            ← Saytga qaytish
          </Link>
        </div>
      </aside>

      <section className="admin-main">
        {tab === "dashboard" && (
          <AdminDashboard
            products={products}
            orders={orders}
            revenue={revenue}
          />
        )}

        {tab === "products" && (
          <AdminProducts
            products={products}
            deleteProduct={deleteProduct}
            setEditing={setEditing}
            setTab={setTab}
          />
        )}

        {tab === "add" && (
          <AdminProductForm
            t={t}
            editing={editing}
            addProduct={addProduct}
            updateProduct={updateProduct}
            setEditing={setEditing}
            setTab={setTab}
          />
        )}

        {tab === "orders" && (
          <AdminOrders orders={orders} />
        )}

        {tab === "finance" && (
          <AdminFinance
            products={products}
            orders={orders}
            revenue={revenue}
          />
        )}
      </section>
    </main>
  );
}

/* =========================================================
   ADMIN DASHBOARD
   ========================================================= */

function AdminDashboard({
  products,
  orders,
  revenue,
}) {
  return (
    <>
      <AdminTitle
        eyebrow="ADMIN PANEL"
        title="Dashboard"
        text="Sport Neon do‘koningiz statistikasi."
      />

      <div className="admin-metrics">
        <Metric
          icon="📦"
          title="Mahsulotlar"
          value={products.length}
          change="+12%"
        />

        <Metric
          icon="🛒"
          title="Buyurtmalar"
          value={orders.length}
          change="+18%"
        />

        <Metric
          icon="💰"
          title="Daromad"
          value={money(revenue)}
          change="+24%"
        />

        <Metric
          icon="👥"
          title="Mijozlar"
          value="1,248"
          change="+31%"
        />
      </div>

      <div className="admin-grid-two">
        <div className="admin-panel">
          <div className="panel-heading">
            <h2>Sotuv statistikasi</h2>
            <span>2026</span>
          </div>

          <div className="chart">
            {[45, 70, 55, 82, 65, 90, 75, 95, 80, 100, 88, 92].map(
              (height, index) => (
                <div className="bar-wrap" key={index}>
                  <div
                    className="bar"
                    style={{ height: `${height}%` }}
                  />
                  <small>{index + 1}</small>
                </div>
              )
            )}
          </div>
        </div>

        <div className="admin-panel">
          <div className="panel-heading">
            <h2>Top kategoriyalar</h2>
          </div>

          <FinanceLine
            title="Krossovka"
            value="42%"
          />

          <FinanceLine
            title="Kiyim"
            value="26%"
          />

          <FinanceLine
            title="Fitness"
            value="18%"
          />

          <FinanceLine
            title="Aksessuar"
            value="14%"
          />
        </div>
      </div>

      <div className="admin-panel recent-orders">
        <div className="panel-heading">
          <h2>Oxirgi buyurtmalar</h2>
        </div>

        {orders.length ? (
          orders.slice(0, 5).map((order) => (
            <div className="admin-order-row" key={order.id}>
              <span>#{order.id}</span>
              <strong>{order.user}</strong>
              <span>{order.date}</span>
              <b>{money(order.total)}</b>
            </div>
          ))
        ) : (
          <div className="empty-admin">
            Hozircha buyurtmalar yo‘q
          </div>
        )}
      </div>
    </>
  );
}

function Metric({
  icon,
  title,
  value,
  change,
}) {
  return (
    <div className="metric">
      <div className="metric-icon">{icon}</div>
      <div className="metric-content">
        <span>{title}</span>
        <strong>{value}</strong>
        <small>{change} this month</small>
      </div>
    </div>
  );
}

function AdminTitle({
  eyebrow,
  title,
  text,
}) {
  return (
    <div className="admin-title">
      <div>
        <span>{eyebrow}</span>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
    </div>
  );
}

function FinanceLine({ title, value }) {
  return (
    <div className="finance-line">
      <div>
        <span>{title}</span>
        <strong>{value}</strong>
      </div>

      <div className="progress">
        <span
          style={{
            width: value,
          }}
        />
      </div>
    </div>
  );
}

/* =========================================================
   ADMIN PRODUCTS
   ========================================================= */

function AdminProducts({
  products,
  deleteProduct,
  setEditing,
  setTab,
}) {
  return (
    <>
      <AdminTitle
        eyebrow="PRODUCT MANAGEMENT"
        title="Mahsulotlar"
        text="Mahsulotlarni boshqaring."
      />

      <div className="admin-panel">
        <div className="panel-heading">
          <h2>{products.length} ta mahsulot</h2>

          <button
            className="neon-button small"
            onClick={() => {
              setEditing(null);
              setTab("add");
            }}
          >
            + Mahsulot qo‘shish
          </button>
        </div>

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Mahsulot</th>
                <th>Kategoriya</th>
                <th>Narx</th>
                <th>Stock</th>
                <th>Rating</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className="table-product">
                      <img
                        src={product.image}
                        alt={product.name}
                      />
                      <span>{product.name}</span>
                    </div>
                  </td>

                  <td>{product.category}</td>
                  <td>{money(product.price)}</td>
                  <td>{product.stock}</td>
                  <td>★ {product.rating}</td>

                  <td>
                    <div className="table-actions">
                      <button
                        className="edit-btn"
                        onClick={() => {
                          setEditing(product);
                          setTab("add");
                        }}
                      >
                        ✏️
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => {
                          if (
                            window.confirm(
                              "Mahsulotni o‘chirasizmi?"
                            )
                          ) {
                            deleteProduct(product.id);
                          }
                        }}
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

/* =========================================================
   ADMIN PRODUCT FORM
   ========================================================= */

function AdminProductForm({
  t,
  editing,
  addProduct,
  updateProduct,
  setEditing,
  setTab,
}) {
  const [form, setForm] = useState({
    name: "",
    category: "Krossovka",
    price: "",
    oldPrice: "",
    stock: "",
    rating: "5",
    badge: "NEW",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    description: "",
  });

  useEffect(() => {
    if (editing) {
      setForm({
        name: editing.name || "",
        category: editing.category || "Krossovka",
        price: editing.price || "",
        oldPrice: editing.oldPrice || "",
        stock: editing.stock || "",
        rating: editing.rating || "5",
        badge: editing.badge || "NEW",
        image: editing.image || "",
        description: editing.description || "",
      });
    } else {
      setForm({
        name: "",
        category: "Krossovka",
        price: "",
        oldPrice: "",
        stock: "",
        rating: "5",
        badge: "NEW",
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
        description: "",
      });
    }
  }, [editing]);

  function change(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function submit(e) {
    e.preventDefault();

    if (!form.name || !form.price || !form.image) {
      alert("Nom, narx va rasmni kiriting");
      return;
    }

    if (editing) {
      updateProduct(editing.id, form);
    } else {
      addProduct(form);
    }

    setEditing(null);
    setTab("products");
  }

  return (
    <>
      <AdminTitle
        eyebrow="PRODUCT"
        title={editing ? "Mahsulotni tahrirlash" : t("addProduct")}
        text="Mahsulot ma'lumotlarini kiriting."
      />

      <form className="admin-form" onSubmit={submit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Nomi</label>
            <input
              name="name"
              value={form.name}
              onChange={change}
              placeholder="Nike Air Max"
            />
          </div>

          <div className="form-group">
            <label>Kategoriya</label>
            <select
              name="category"
              value={form.category}
              onChange={change}
            >
              <option>Krossovka</option>
              <option>Kiyim</option>
              <option>Fitness</option>
              <option>Gadjet</option>
              <option>Aksessuar</option>
              <option>Sport</option>
            </select>
          </div>

          <div className="form-group">
            <label>Narx</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={change}
            />
          </div>

          <div className="form-group">
            <label>Eski narx</label>
            <input
              type="number"
              name="oldPrice"
              value={form.oldPrice}
              onChange={change}
            />
          </div>

          <div className="form-group">
            <label>Stock</label>
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={change}
            />
          </div>

          <div className="form-group">
            <label>Rating</label>
            <input
              type="number"
              min="1"
              max="5"
              step="0.1"
              name="rating"
              value={form.rating}
              onChange={change}
            />
          </div>

          <div className="form-group">
            <label>Badge</label>
            <select
              name="badge"
              value={form.badge}
              onChange={change}
            >
              <option>NEW</option>
              <option>SALE</option>
              <option>TOP</option>
              <option>HOT</option>
            </select>
          </div>

          <div className="form-group">
            <label>Rasm URL</label>
            <input
              name="image"
              value={form.image}
              onChange={change}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Tavsif</label>
          <textarea
            name="description"
            value={form.description}
            onChange={change}
            rows="5"
          />
        </div>

        <div className="form-buttons">
          <button
            type="button"
            className="ghost-button"
            onClick={() => {
              setEditing(null);
              setTab("products");
            }}
          >
            {t("cancel")}
          </button>

          <button className="neon-button">
            {t("save")} ✓
          </button>
        </div>
      </form>
    </>
  );
}

/* =========================================================
   ADMIN ORDERS
   ========================================================= */

function AdminOrders({ orders }) {
  return (
    <>
      <AdminTitle
        eyebrow="ORDERS"
        title="Buyurtmalar"
        text="Mijozlarning barcha buyurtmalari."
      />

      <div className="admin-panel">
        {orders.length ? (
          <div className="admin-order-list">
            {orders.map((order) => (
              <div className="admin-order-card" key={order.id}>
                <div className="order-number">
                  #{order.id}
                </div>

                <div>
                  <strong>{order.user}</strong>
                  <span>{order.phone}</span>
                </div>

                <div>
                  <span>Manzil</span>
                  <strong>{order.address}</strong>
                </div>

                <div>
                  <span>Summa</span>
                  <strong>{money(order.total)}</strong>
                </div>

                <span className="status">{order.status}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-admin">
            Buyurtmalar mavjud emas.
          </div>
        )}
      </div>
    </>
  );
}

/* =========================================================
   ADMIN FINANCE
   ========================================================= */

function AdminFinance({
  products,
  orders,
  revenue,
}) {
  const inventoryValue = products.reduce(
    (sum, product) =>
      sum + product.price * product.stock,
    0
  );

  return (
    <>
      <AdminTitle
        eyebrow="FINANCE"
        title="Moliya"
        text="Do‘kon moliyaviy ko‘rsatkichlari."
      />

      <div className="admin-metrics">
        <Metric
          icon="💰"
          title="Daromad"
          value={money(revenue)}
          change="+24%"
        />

        <Metric
          icon="📦"
          title="Ombor qiymati"
          value={money(inventoryValue)}
          change="+9%"
        />

        <Metric
          icon="🛒"
          title="Buyurtmalar"
          value={orders.length}
          change="+18%"
        />

        <Metric
          icon="📈"
          title="O‘rtacha chek"
          value={
            orders.length
              ? money(revenue / orders.length)
              : money(0)
          }
          change="+11%"
        />
      </div>

      <div className="admin-grid-two">
        <div className="admin-panel">
          <div className="panel-heading">
            <h2>Daromad</h2>
          </div>

          <div className="finance-big">
            {money(revenue)}
          </div>

          <div className="finance-description">
            Umumiy buyurtmalar asosida hisoblangan
            daromad.
          </div>
        </div>

        <div className="admin-panel">
          <div className="panel-heading">
            <h2>Ombor</h2>
          </div>

          <div className="finance-big">
            {products.reduce(
              (sum, item) => sum + Number(item.stock || 0),
              0
            )}
          </div>

          <div className="finance-description">
            Ombordagi jami mahsulotlar soni.
          </div>
        </div>
      </div>
    </>
  );
}

/* =========================================================
   FOOTER
   ========================================================= */

function Footer({ t }) {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link to="/" className="logo footer-logo">
            SPORT <b>NEON</b>
          </Link>

          <p>
            Sport va sog‘lom hayot uchun zamonaviy
            online store.
          </p>

          <div className="socials">
            <a href="#instagram">◎</a>
            <a href="#telegram">✈</a>
            <a href="#youtube">▶</a>
            <a href="#facebook">f</a>
          </div>
        </div>

        <div>
          <h3>Store</h3>
          <Link to="/catalog">{t("catalog")}</Link>
          <Link to="/favorites">{t("favorites")}</Link>
          <Link to="/cart">{t("cart")}</Link>
          <Link to="/map">{t("map")}</Link>
        </div>

        <div>
          <h3>Help</h3>
          <Link to="/faq">{t("faq")}</Link>
          <Link to="/contact">{t("contact")}</Link>
          <Link to="/reviews">{t("reviews")}</Link>
          <Link to="/login">{t("login")}</Link>
        </div>

        <div>
          <h3>Manzil</h3>
          <p>📍 Toshkent, Uzbekistan</p>
          <p>📞 +998 90 123 45 67</p>
          <p>✉️ hello@sportneon.uz</p>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 SPORT NEON. All rights reserved.
      </div>
    </footer>
  );
}

/* =========================================================
   GLOBAL STYLE
   ========================================================= */

function GlobalStyle() {
  return (
    <style>{`
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      html {
        scroll-behavior: smooth;
      }

      body {
        font-family:
          Inter,
          ui-sans-serif,
          system-ui,
          -apple-system,
          BlinkMacSystemFont,
          "Segoe UI",
          sans-serif;
        background: #05070b;
        color: #f7f7f7;
      }

      button,
      input,
      select,
      textarea {
        font: inherit;
      }

      button {
        cursor: pointer;
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      .app {
        min-height: 100vh;
        background:
          radial-gradient(
            circle at 20% 10%,
            rgba(0, 255, 180, .08),
            transparent 28%
          ),
          radial-gradient(
            circle at 80% 30%,
            rgba(0, 150, 255, .08),
            transparent 28%
          ),
          #f5f7fa;
        color: #10151c;
      }

      .app.dark {
        background:
          radial-gradient(
            circle at 15% 10%,
            rgba(0, 255, 170, .07),
            transparent 28%
          ),
          radial-gradient(
            circle at 85% 20%,
            rgba(0, 140, 255, .08),
            transparent 28%
          ),
          #05070b;
        color: #f5f7fa;
      }

      .container {
        width: min(1380px, calc(100% - 40px));
        margin: 0 auto;
      }

      .header {
        position: sticky;
        top: 0;
        z-index: 1000;
        backdrop-filter: blur(22px);
        background: rgba(5, 7, 11, .78);
        border-bottom: 1px solid rgba(255,255,255,.08);
      }

      .header-inner {
        min-height: 78px;
        display: flex;
        align-items: center;
        gap: 22px;
      }

      .logo {
        font-size: 22px;
        font-weight: 1000;
        letter-spacing: -1px;
        white-space: nowrap;
      }

      .logo b,
      .logo span {
        color: #00ffb3;
      }

      .nav {
        display: flex;
        gap: 17px;
        align-items: center;
        white-space: nowrap;
      }

      .nav a {
        color: #b9c1ca;
        font-size: 13px;
        font-weight: 800;
        transition: .2s;
      }

      .nav a:hover {
        color: #00ffb3;
      }

      .nav i {
        background: #00ffb3;
        color: #001a12;
        border-radius: 100px;
        padding: 2px 6px;
        font-size: 10px;
        font-style: normal;
        margin-left: 4px;
      }

      .search-box {
        margin-left: auto;
        display: flex;
        border: 1px solid rgba(255,255,255,.1);
        border-radius: 13px;
        overflow: hidden;
        background: rgba(255,255,255,.04);
      }

      .search-box input {
        width: 170px;
        border: 0;
        outline: none;
        padding: 11px 13px;
        background: transparent;
        color: white;
      }

      .search-box button {
        border: 0;
        width: 42px;
        background: #00ffb3;
        color: #00130d;
        font-weight: 900;
      }

      .header-actions {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .header-actions select,
      .icon-button,
      .login-button,
      .profile-mini {
        border: 1px solid rgba(255,255,255,.12);
        background: rgba(255,255,255,.04);
        color: white;
        padding: 9px 11px;
        border-radius: 10px;
      }

      .icon-button {
        font-size: 15px;
      }

      .login-button {
        background: #00ffb3;
        color: #00130d;
        font-weight: 900;
      }

      .profile-mini {
        max-width: 130px;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .hero {
        position: relative;
        overflow: hidden;
        min-height: 720px;
        display: flex;
        align-items: center;
        background:
          linear-gradient(
            120deg,
            #030609,
            #07130f 48%,
            #031015
          );
      }

      .hero-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: center;
        gap: 50px;
        position: relative;
        z-index: 2;
      }

      .hero-label,
      .section-label {
        display: inline-block;
        color: #00ffb3;
        font-size: 12px;
        font-weight: 1000;
        letter-spacing: 3px;
      }

      .hero h1 {
        margin-top: 18px;
        font-size: clamp(55px, 7vw, 110px);
        line-height: .9;
        letter-spacing: -6px;
        font-weight: 1000;
      }

      .hero h1 span {
        color: #00ffb3;
        text-shadow:
          0 0 20px rgba(0,255,179,.7),
          0 0 60px rgba(0,255,179,.25);
      }

      .hero-text > p {
        margin-top: 30px;
        max-width: 600px;
        color: #a7b1bc;
        font-size: 18px;
        line-height: 1.7;
      }

      .hero-buttons {
        display: flex;
        gap: 12px;
        margin-top: 32px;
      }

      .neon-button {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        gap: 8px;
        border: 0;
        border-radius: 12px;
        padding: 14px 21px;
        background: #00ffb3;
        color: #00150e;
        font-weight: 1000;
        box-shadow:
          0 0 18px rgba(0,255,179,.35),
          inset 0 -2px 0 rgba(0,0,0,.1);
        transition: .2s;
      }

      .neon-button:hover {
        transform: translateY(-2px);
        box-shadow:
          0 0 30px rgba(0,255,179,.55);
      }

      .neon-button.small {
        padding: 10px 14px;
        font-size: 13px;
      }

      .neon-button.full {
        width: 100%;
      }

      .ghost-button,
      .outline-button {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        border: 1px solid rgba(255,255,255,.15);
        background: rgba(255,255,255,.04);
        color: inherit;
        padding: 13px 19px;
        border-radius: 12px;
        font-weight: 900;
      }

      .hero-stats {
        display: flex;
        gap: 35px;
        margin-top: 50px;
      }

      .hero-stats div {
        display: flex;
        flex-direction: column;
        gap: 5px;
      }

      .hero-stats strong {
        font-size: 25px;
        color: #00ffb3;
      }

      .hero-stats span {
        color: #7f8b96;
        font-size: 12px;
      }

      .hero-visual {
        min-height: 560px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
      }

      .hero-visual img {
        width: 78%;
        height: 500px;
        object-fit: cover;
        border-radius: 45% 45% 30% 30%;
        transform: rotate(-7deg);
        filter:
          saturate(1.2)
          contrast(1.08)
          drop-shadow(0 30px 50px rgba(0,255,179,.18));
        position: relative;
        z-index: 2;
      }

      .hero-circle {
        width: 480px;
        height: 480px;
        position: absolute;
        border-radius: 50%;
        border: 1px solid rgba(0,255,179,.35);
        box-shadow:
          0 0 100px rgba(0,255,179,.12),
          inset 0 0 100px rgba(0,255,179,.08);
      }

      .floating-card {
        position: absolute;
        z-index: 4;
        padding: 13px 18px;
        border-radius: 15px;
        background: rgba(8,14,17,.85);
        border: 1px solid rgba(0,255,179,.35);
        box-shadow: 0 15px 50px rgba(0,0,0,.35);
        backdrop-filter: blur(15px);
      }

      .floating-top {
        top: 100px;
        right: 0;
        color: #00ffb3;
      }

      .floating-bottom {
        bottom: 100px;
        left: 10px;
      }

      .hero-glow {
        position: absolute;
        width: 450px;
        height: 450px;
        border-radius: 50%;
        filter: blur(100px);
        opacity: .2;
      }

      .glow-one {
        background: #00ffb3;
        left: -200px;
        top: 100px;
      }

      .glow-two {
        background: #0066ff;
        right: -200px;
        bottom: -100px;
      }

      .features {
        padding: 25px 0;
        background: rgba(0,0,0,.18);
        border-top: 1px solid rgba(255,255,255,.05);
        border-bottom: 1px solid rgba(255,255,255,.05);
      }

      .feature-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 15px;
      }

      .feature {
        display: flex;
        gap: 15px;
        align-items: center;
        padding: 17px;
        border: 1px solid rgba(255,255,255,.06);
        border-radius: 15px;
        background: rgba(255,255,255,.025);
      }

      .feature-icon {
        width: 44px;
        height: 44px;
        display: grid;
        place-items: center;
        border-radius: 12px;
        background: rgba(0,255,179,.08);
        font-size: 20px;
      }

      .feature h3 {
        font-size: 14px;
      }

      .feature p {
        color: #82909c;
        font-size: 12px;
        margin-top: 3px;
      }

      .section {
        padding: 100px 0;
      }

      .section-small {
        padding-top: 50px;
      }

      .section-head {
        display: flex;
        align-items: end;
        justify-content: space-between;
        margin-bottom: 30px;
      }

      .section-head h2,
      .page-heading h1 {
        font-size: clamp(35px, 5vw, 62px);
        letter-spacing: -3px;
        margin-top: 8px;
      }

      .product-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 18px;
      }

      .product-card {
        border: 1px solid rgba(255,255,255,.08);
        border-radius: 20px;
        overflow: hidden;
        background: rgba(255,255,255,.035);
        transition: .25s;
      }

      .product-card:hover {
        transform: translateY(-7px);
        border-color: rgba(0,255,179,.4);
        box-shadow: 0 25px 70px rgba(0,0,0,.3);
      }

      .product-image {
        height: 270px;
        position: relative;
        cursor: pointer;
        overflow: hidden;
        background: #101419;
      }

      .product-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: .35s;
      }

      .product-card:hover .product-image img {
        transform: scale(1.06);
      }

      .product-badge {
        position: absolute;
        top: 13px;
        left: 13px;
        background: #00ffb3;
        color: #00140e;
        border-radius: 8px;
        padding: 5px 8px;
        font-size: 10px;
        font-weight: 1000;
      }

      .favorite {
        position: absolute;
        right: 12px;
        top: 12px;
        width: 38px;
        height: 38px;
        border-radius: 50%;
        border: 1px solid rgba(255,255,255,.15);
        background: rgba(0,0,0,.55);
        color: white;
        font-size: 20px;
      }

      .favorite.active {
        color: #00ffb3;
        box-shadow: 0 0 20px rgba(0,255,179,.3);
      }

      .product-info {
        padding: 18px;
      }

      .product-category {
        color: #00ffb3;
        font-size: 11px;
        font-weight: 900;
        text-transform: uppercase;
      }

      .product-info h3 {
        margin-top: 8px;
        min-height: 42px;
        font-size: 17px;
      }

      .rating {
        color: #ffd54a;
        margin-top: 9px;
        font-size: 13px;
      }

      .price-row {
        display: flex;
        align-items: center;
        gap: 9px;
        margin-top: 12px;
      }

      .price-row strong {
        color: #00ffb3;
        font-size: 17px;
      }

      .price-row del {
        color: #66727e;
        font-size: 12px;
      }

      .card-buttons {
        display: grid;
        grid-template-columns: 1fr 42px;
        gap: 8px;
        margin-top: 15px;
      }

      .add-button,
      .details-button {
        border: 0;
        border-radius: 10px;
        background: #00ffb3;
        color: #00130d;
        font-weight: 1000;
        min-height: 42px;
        display: grid;
        place-items: center;
      }

      .details-button {
        background: rgba(255,255,255,.07);
        color: white;
      }

      .banner {
        padding: 70px 0;
        background:
          linear-gradient(
            100deg,
            #00ffb3,
            #00aaff
          );
        color: #00130d;
      }

      .banner-inner {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
      }

      .banner span {
        font-weight: 1000;
        letter-spacing: 3px;
      }

      .banner h2 {
        margin-top: 10px;
        font-size: clamp(30px, 5vw, 65px);
        line-height: .95;
      }

      .banner p {
        margin-top: 12px;
        font-weight: 900;
      }

      .banner .neon-button {
        background: #00130d;
        color: #00ffb3;
      }

      .page {
        min-height: calc(100vh - 80px);
        padding: 90px 0;
      }

      .page-heading {
        margin-bottom: 45px;
      }

      .page-heading p {
        color: #82909c;
        margin-top: 12px;
      }

      .catalog-toolbar {
        display: grid;
        grid-template-columns: 1fr 200px 200px;
        gap: 12px;
        margin-bottom: 18px;
      }

      .catalog-toolbar input,
      .catalog-toolbar select,
      .admin-form input,
      .admin-form select,
      .admin-form textarea,
      .contact-form input,
      .contact-form textarea,
      .checkout-card input,
      .login-card input {
        width: 100%;
        border: 1px solid rgba(255,255,255,.1);
        background: rgba(255,255,255,.04);
        color: inherit;
        outline: none;
        border-radius: 12px;
        padding: 14px;
      }

      .catalog-toolbar select option,
      .header-actions select option {
        color: #111;
      }

      .catalog-result {
        color: #7e8b97;
        margin-bottom: 18px;
      }

      .empty-state {
        min-height: 330px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        gap: 15px;
        border: 1px dashed rgba(255,255,255,.12);
        border-radius: 22px;
      }

      .empty-state > div {
        font-size: 55px;
      }

      .empty-state.compact {
        min-height: 150px;
      }

      .product-detail {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 70px;
        align-items: center;
      }

      .detail-image {
        height: 650px;
        border-radius: 35px;
        overflow: hidden;
        background: #11161b;
        border: 1px solid rgba(255,255,255,.08);
      }

      .detail-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .detail-content h1 {
        margin-top: 12px;
        font-size: clamp(40px, 5vw, 70px);
        line-height: .98;
        letter-spacing: -3px;
      }

      .detail-rating {
        color: #ffd54a;
        margin-top: 20px;
      }

      .detail-price {
        display: flex;
        gap: 15px;
        align-items: center;
        margin-top: 20px;
      }

      .detail-price strong {
        font-size: 35px;
        color: #00ffb3;
      }

      .detail-price del {
        color: #65717d;
      }

      .detail-description {
        color: #8d99a4;
        font-size: 17px;
        line-height: 1.8;
        margin-top: 22px;
      }

      .stock {
        margin-top: 20px;
        color: #00ffb3;
      }

      .detail-actions {
        display: flex;
        gap: 10px;
        margin-top: 30px;
      }

      .heart-big {
        width: 54px;
        border: 1px solid rgba(255,255,255,.15);
        border-radius: 12px;
        background: rgba(255,255,255,.05);
        color: white;
        font-size: 25px;
      }

      .heart-big.active {
        color: #00ffb3;
      }

      .product-benefits {
        display: grid;
        gap: 9px;
        margin-top: 35px;
        color: #8b97a2;
      }

      .cart-layout {
        display: grid;
        grid-template-columns: 1.5fr .7fr;
        gap: 25px;
        align-items: start;
      }

      .cart-items {
        display: grid;
        gap: 12px;
      }

      .cart-item {
        display: grid;
        grid-template-columns: 85px 1fr auto auto auto;
        gap: 15px;
        align-items: center;
        padding: 15px;
        border: 1px solid rgba(255,255,255,.08);
        border-radius: 16px;
        background: rgba(255,255,255,.035);
      }

      .cart-item img {
        width: 85px;
        height: 85px;
        object-fit: cover;
        border-radius: 12px;
      }

      .cart-item-info span {
        color: #00ffb3;
        font-size: 11px;
      }

      .cart-item-info h3 {
        margin: 5px 0;
      }

      .quantity {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .quantity button {
        width: 32px;
        height: 32px;
        border: 1px solid rgba(255,255,255,.1);
        background: rgba(255,255,255,.05);
        color: white;
        border-radius: 8px;
      }

      .cart-line-total {
        min-width: 110px;
        color: #00ffb3;
      }

      .delete-small {
        border: 0;
        background: transparent;
        color: #ff5f65;
        font-size: 24px;
      }

      .checkout-card {
        position: sticky;
        top: 105px;
        padding: 25px;
        border: 1px solid rgba(0,255,179,.2);
        border-radius: 20px;
        background: rgba(255,255,255,.035);
      }

      .checkout-card h2 {
        margin-bottom: 20px;
      }

      .checkout-card label {
        display: block;
        margin: 15px 0 7px;
        color: #84919c;
        font-size: 12px;
      }

      .promo-row {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 8px;
      }

      .promo-row button {
        border: 0;
        background: #00ffb3;
        color: #00130d;
        border-radius: 10px;
        padding: 0 15px;
        font-weight: 900;
      }

      .success-message {
        margin-top: 10px;
        color: #00ffb3;
        font-size: 13px;
      }

      .summary {
        margin-top: 25px;
        border-top: 1px solid rgba(255,255,255,.08);
        padding-top: 15px;
      }

      .summary div {
        display: flex;
        justify-content: space-between;
        gap: 15px;
        margin-bottom: 12px;
        color: #85909b;
      }

      .summary strong {
        color: inherit;
      }

      .summary-total {
        padding-top: 14px;
        border-top: 1px solid rgba(255,255,255,.08);
        color: white !important;
        font-size: 19px;
      }

      .summary-total strong {
        color: #00ffb3;
      }

      .login-page {
        display: grid;
        place-items: center;
      }

      .login-card {
        width: min(440px, calc(100% - 30px));
        padding: 35px;
        border: 1px solid rgba(0,255,179,.2);
        border-radius: 25px;
        background: rgba(255,255,255,.04);
        box-shadow: 0 30px 100px rgba(0,0,0,.3);
      }

      .login-logo {
        font-weight: 1000;
        font-size: 22px;
        color: white;
      }

      .login-logo span {
        color: #00ffb3;
      }

      .login-card h1 {
        font-size: 42px;
        margin-top: 20px;
      }

      .login-card > p {
        color: #7f8b96;
        margin: 8px 0 25px;
      }

      .login-card form {
        display: grid;
        gap: 12px;
      }

      .login-tabs {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 5px;
        padding: 5px;
        background: rgba(255,255,255,.04);
        border-radius: 12px;
        margin-bottom: 15px;
      }

      .login-tabs button {
        border: 0;
        background: transparent;
        color: #8c98a3;
        padding: 10px;
        border-radius: 8px;
      }

      .login-tabs button.active {
        background: #00ffb3;
        color: #00130d;
        font-weight: 900;
      }

      .admin-hint {
        color: #00ffb3;
      }

      .error-message {
        color: #ff6b72;
        font-size: 13px;
      }

      .profile-head {
        display: flex;
        align-items: center;
        gap: 20px;
        padding: 30px;
        border: 1px solid rgba(255,255,255,.08);
        border-radius: 22px;
        background: rgba(255,255,255,.035);
      }

      .avatar {
        width: 75px;
        height: 75px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        background: #00ffb3;
        color: #00130d;
        font-size: 28px;
        font-weight: 1000;
      }

      .profile-head h1 {
        font-size: 35px;
      }

      .profile-head p {
        color: #7e8a95;
        margin-top: 5px;
      }

      .danger-button {
        margin-left: auto;
        border: 1px solid rgba(255,80,90,.25);
        background: rgba(255,80,90,.08);
        color: #ff6971;
        border-radius: 10px;
        padding: 11px 15px;
      }

      .profile-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 15px;
        margin-top: 20px;
      }

      .profile-stat {
        padding: 25px;
        border: 1px solid rgba(255,255,255,.08);
        border-radius: 17px;
        background: rgba(255,255,255,.035);
      }

      .profile-stat span {
        color: #82909c;
      }

      .profile-stat strong {
        display: block;
        margin-top: 8px;
        font-size: 30px;
        color: #00ffb3;
      }

      .order-list {
        display: grid;
        gap: 10px;
        margin-top: 15px;
      }

      .order-card {
        display: flex;
        align-items: center;
        gap: 25px;
        padding: 16px;
        border: 1px solid rgba(255,255,255,.08);
        border-radius: 14px;
      }

      .order-card > div {
        display: grid;
        gap: 4px;
      }

      .order-card > div:nth-child(1) {
        min-width: 100px;
      }

      .order-card > div:nth-child(2) {
        flex: 1;
      }

      .order-card span {
        color: #7c8995;
        font-size: 12px;
      }

      .status {
        background: rgba(0,255,179,.1);
        color: #00ffb3;
        padding: 6px 10px;
        border-radius: 100px;
        font-size: 11px;
      }

      .map-wrapper {
        height: 600px;
        position: relative;
        overflow: hidden;
        border-radius: 25px;
        border: 1px solid rgba(0,255,179,.2);
      }

      .map-wrapper iframe {
        width: 100%;
        height: 100%;
        border: 0;
        filter: saturate(.7) contrast(1.05);
      }

      .map-card {
        position: absolute;
        top: 25px;
        left: 25px;
        width: 280px;
        padding: 20px;
        border-radius: 17px;
        background: rgba(5,8,10,.88);
        border: 1px solid rgba(0,255,179,.3);
        backdrop-filter: blur(15px);
      }

      .map-pin {
        font-size: 28px;
      }

      .map-card h3 {
        margin-top: 8px;
      }

      .map-card p,
      .map-card span {
        display: block;
        color: #8a97a2;
        margin-top: 5px;
        font-size: 13px;
      }

      .review-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 18px;
      }

      .review-card {
        padding: 30px;
        border: 1px solid rgba(255,255,255,.08);
        border-radius: 20px;
        background: rgba(255,255,255,.035);
      }

      .review-avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        background: #00ffb3;
        color: #00130d;
        font-weight: 1000;
        margin-bottom: 15px;
      }

      .review-card p {
        color: #8995a0;
        line-height: 1.7;
        margin-top: 15px;
      }

      .faq-container {
        max-width: 950px;
      }

      .faq-list {
        display: grid;
        gap: 10px;
      }

      .faq-item {
        border: 1px solid rgba(255,255,255,.08);
        border-radius: 15px;
        overflow: hidden;
        background: rgba(255,255,255,.035);
      }

      .faq-item button {
        width: 100%;
        border: 0;
        background: transparent;
        color: inherit;
        padding: 20px;
        display: flex;
        justify-content: space-between;
        text-align: left;
        font-weight: 800;
      }

      .faq-item button b {
        color: #00ffb3;
        font-size: 20px;
      }

      .faq-item p {
        padding: 0 20px 20px;
        color: #87939e;
        line-height: 1.7;
      }

      .contact-grid {
        display: grid;
        grid-template-columns: .8fr 1.2fr;
        gap: 50px;
      }

      .contact-info h1 {
        font-size: 70px;
        letter-spacing: -4px;
        margin-top: 10px;
      }

      .contact-info > p {
        color: #87939e;
        margin-top: 15px;
      }

      .contact-item {
        display: flex;
        gap: 15px;
        align-items: center;
        margin-top: 25px;
      }

      .contact-item > span {
        width: 45px;
        height: 45px;
        border-radius: 12px;
        display: grid;
        place-items: center;
        background: rgba(0,255,179,.08);
      }

      .contact-item div {
        display: grid;
        gap: 3px;
      }

      .contact-item small {
        color: #77838e;
      }

      .contact-form {
        padding: 30px;
        border: 1px solid rgba(255,255,255,.08);
        border-radius: 22px;
        background: rgba(255,255,255,.035);
        display: grid;
        gap: 12px;
      }

      .contact-form textarea {
        min-height: 180px;
        resize: vertical;
      }

      .footer {
        border-top: 1px solid rgba(255,255,255,.08);
        padding-top: 60px;
        background: rgba(0,0,0,.18);
      }

      .footer-grid {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 1.3fr;
        gap: 40px;
        padding-bottom: 55px;
      }

      .footer p {
        color: #77838e;
        margin-top: 15px;
        line-height: 1.7;
      }

      .footer h3 {
        margin-bottom: 15px;
      }

      .footer-grid > div:not(:first-child) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 9px;
      }

      .footer-grid a:not(.footer-logo) {
        color: #77838e;
      }

      .footer-grid a:hover {
        color: #00ffb3;
      }

      .socials {
        display: flex;
        gap: 8px;
        margin-top: 20px;
      }

      .socials a {
        width: 38px;
        height: 38px;
        display: grid;
        place-items: center;
        border-radius: 10px;
        background: rgba(255,255,255,.06);
      }

      .footer-bottom {
        border-top: 1px solid rgba(255,255,255,.08);
        padding: 20px;
        text-align: center;
        color: #65717d;
        font-size: 12px;
      }

      /* =====================================================
         ADMIN
         ===================================================== */

      .admin-layout {
        min-height: 100vh;
        display: grid;
        grid-template-columns: 270px 1fr;
        background: #05070b;
        color: #f5f7fa;
      }

      .admin-sidebar {
        position: sticky;
        top: 0;
        height: 100vh;
        padding: 25px 18px;
        border-right: 1px solid rgba(255,255,255,.08);
        background:
          linear-gradient(
            180deg,
            rgba(0,255,179,.05),
            transparent 30%
          ),
          #070a0e;
        display: flex;
        flex-direction: column;
      }

      .admin-logo {
        font-size: 24px;
        font-weight: 1000;
        padding: 8px 12px 25px;
      }

      .admin-logo span {
        color: #00ffb3;
      }

      .admin-user {
        display: flex;
        gap: 12px;
        align-items: center;
        padding: 13px;
        border: 1px solid rgba(255,255,255,.07);
        background: rgba(255,255,255,.03);
        border-radius: 15px;
      }

      .admin-avatar {
        width: 40px;
        height: 40px;
        display: grid;
        place-items: center;
        border-radius: 50%;
        background: #00ffb3;
        color: #00130d;
        font-weight: 1000;
      }

      .admin-user div:last-child {
        display: grid;
        gap: 3px;
      }

      .admin-user span {
        color: #00ffb3;
        font-size: 11px;
      }

      .admin-menu {
        display: grid;
        gap: 5px;
        margin-top: 25px;
      }

      .admin-menu button {
        display: flex;
        align-items: center;
        gap: 12px;
        border: 0;
        background: transparent;
        color: #7f8c98;
        padding: 13px 14px;
        border-radius: 11px;
        text-align: left;
        font-weight: 800;
      }

      .admin-menu button:hover,
      .admin-menu button.active {
        background: rgba(0,255,179,.08);
        color: #00ffb3;
      }

      .admin-menu button span {
        width: 23px;
      }

      .admin-sidebar-bottom {
        margin-top: auto;
      }

      .admin-sidebar-bottom a {
        display: block;
        padding: 13px;
        color: #7d8994;
        border: 1px solid rgba(255,255,255,.07);
        border-radius: 11px;
      }

      .admin-main {
        min-width: 0;
        padding: 45px;
        background:
          radial-gradient(
            circle at 80% 0,
            rgba(0,255,179,.05),
            transparent 25%
          );
      }

      .admin-title {
        display: flex;
        justify-content: space-between;
        margin-bottom: 30px;
      }

      .admin-title span {
        color: #00ffb3;
        letter-spacing: 3px;
        font-size: 11px;
        font-weight: 1000;
      }

      .admin-title h1 {
        font-size: 45px;
        letter-spacing: -2px;
        margin-top: 7px;
      }

      .admin-title p {
        color: #77838e;
        margin-top: 7px;
      }

      .admin-metrics {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 15px;
        margin-bottom: 20px;
      }

      .metric {
        display: flex;
        gap: 15px;
        padding: 20px;
        border: 1px solid rgba(255,255,255,.07);
        border-radius: 17px;
        background: rgba(255,255,255,.03);
      }

      .metric-icon {
        width: 45px;
        height: 45px;
        border-radius: 12px;
        display: grid;
        place-items: center;
        background: rgba(0,255,179,.08);
      }

      .metric-content {
        display: grid;
        gap: 3px;
        min-width: 0;
      }

      .metric-content span {
        color: #78848f;
        font-size: 12px;
      }

      .metric-content strong {
        font-size: 22px;
        color: white;
      }

      .metric-content small {
        color: #00ffb3;
        font-size: 10px;
      }

      .admin-grid-two {
        display: grid;
        grid-template-columns: 1.4fr .8fr;
        gap: 18px;
        margin-bottom: 18px;
      }

      .admin-panel {
        padding: 22px;
        border: 1px solid rgba(255,255,255,.07);
        border-radius: 18px;
        background: rgba(255,255,255,.025);
        margin-bottom: 18px;
      }

      .panel-heading {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
      }

      .panel-heading h2 {
        font-size: 17px;
      }

      .panel-heading span {
        color: #75818c;
        font-size: 12px;
      }

      .chart {
        height: 260px;
        display: flex;
        align-items: end;
        gap: 10px;
        border-bottom: 1px solid rgba(255,255,255,.08);
        padding: 10px 5px 0;
      }

      .bar-wrap {
        height: 100%;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: end;
        align-items: center;
        gap: 7px;
      }

      .bar {
        width: 100%;
        max-width: 34px;
        min-height: 10px;
        background:
          linear-gradient(
            to top,
            #00ffb3,
            #008cff
          );
        border-radius: 7px 7px 0 0;
        box-shadow: 0 0 20px rgba(0,255,179,.15);
      }

      .bar-wrap small {
        color: #5f6b76;
        font-size: 9px;
      }

      .finance-line {
        margin-bottom: 20px;
      }

      .finance-line > div:first-child {
        display: flex;
        justify-content: space-between;
        margin-bottom: 7px;
      }

      .finance-line span {
        color: #7d8994;
        font-size: 12px;
      }

      .finance-line strong {
        color: #00ffb3;
        font-size: 12px;
      }

      .progress {
        height: 7px;
        border-radius: 100px;
        overflow: hidden;
        background: rgba(255,255,255,.07);
      }

      .progress span {
        display: block;
        height: 100%;
        background: #00ffb3;
        border-radius: inherit;
        box-shadow: 0 0 15px rgba(0,255,179,.5);
      }

      .recent-orders {
        margin-bottom: 0;
      }

      .admin-order-row {
        display: grid;
        grid-template-columns: 130px 1fr 1fr auto;
        gap: 15px;
        align-items: center;
        padding: 13px 0;
        border-top: 1px solid rgba(255,255,255,.06);
        font-size: 13px;
      }

      .admin-order-row span {
        color: #6f7b86;
      }

      .admin-order-row b {
        color: #00ffb3;
      }

      .empty-admin {
        padding: 50px;
        text-align: center;
        color: #687580;
      }

      .admin-table-wrap {
        overflow-x: auto;
      }

      .admin-table {
        width: 100%;
        border-collapse: collapse;
        min-width: 800px;
      }

      .admin-table th {
        text-align: left;
        color: #687580;
        font-size: 11px;
        padding: 12px;
        border-bottom: 1px solid rgba(255,255,255,.08);
      }

      .admin-table td {
        padding: 13px 12px;
        border-bottom: 1px solid rgba(255,255,255,.05);
        font-size: 13px;
      }

      .table-product {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .table-product img {
        width: 48px;
        height: 48px;
        object-fit: cover;
        border-radius: 9px;
      }

      .table-actions {
        display: flex;
        gap: 6px;
      }

      .edit-btn,
      .delete-btn {
        width: 34px;
        height: 34px;
        border-radius: 8px;
        border: 0;
      }

      .edit-btn {
        background: rgba(0,150,255,.1);
      }

      .delete-btn {
        background: rgba(255,70,80,.1);
      }

      .admin-form {
        padding: 25px;
        border: 1px solid rgba(255,255,255,.07);
        border-radius: 20px;
        background: rgba(255,255,255,.025);
      }

      .form-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
      }

      .form-group {
        margin-bottom: 16px;
      }

      .form-group label {
        display: block;
        color: #7c8994;
        font-size: 12px;
        margin-bottom: 7px;
      }

      .admin-form textarea {
        resize: vertical;
      }

      .form-buttons {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
      }

      .admin-order-list {
        display: grid;
        gap: 10px;
      }

      .admin-order-card {
        display: grid;
        grid-template-columns: 110px 1fr 1.3fr 1fr auto;
        align-items: center;
        gap: 15px;
        padding: 17px;
        border: 1px solid rgba(255,255,255,.06);
        border-radius: 13px;
      }

      .admin-order-card > div {
        display: grid;
        gap: 4px;
      }

      .admin-order-card span {
        color: #73808b;
        font-size: 11px;
      }

      .order-number {
        color: #00ffb3;
        font-weight: 900;
      }

      .finance-big {
        color: #00ffb3;
        font-size: 45px;
        font-weight: 1000;
      }

      .finance-description {
        color: #75818c;
        margin-top: 10px;
      }

      @media (max-width: 1200px) {
        .nav {
          display: none;
        }

        .product-grid {
          grid-template-columns: repeat(3, 1fr);
        }

        .admin-metrics {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media (max-width: 900px) {
        .hero-content,
        .product-detail,
        .contact-grid,
        .cart-layout,
        .admin-grid-two {
          grid-template-columns: 1fr;
        }

        .hero {
          padding: 80px 0;
        }

        .hero-visual {
          min-height: 450px;
        }

        .feature-grid,
        .review-grid {
          grid-template-columns: repeat(2, 1fr);
        }

        .product-grid {
          grid-template-columns: repeat(2, 1fr);
        }

        .catalog-toolbar {
          grid-template-columns: 1fr;
        }

        .admin-layout {
          grid-template-columns: 1fr;
        }

        .admin-sidebar {
          position: relative;
          height: auto;
        }

        .admin-menu {
          grid-template-columns: repeat(2, 1fr);
        }

        .admin-sidebar-bottom {
          margin-top: 15px;
        }
      }

      @media (max-width: 650px) {
        .container {
          width: min(100% - 24px, 1380px);
        }

        .header-inner {
          flex-wrap: wrap;
          padding: 12px 0;
        }

        .search-box {
          order: 5;
          width: 100%;
          margin-left: 0;
        }

        .search-box input {
          width: 100%;
        }

        .header-actions {
          margin-left: auto;
        }

        .hero h1 {
          letter-spacing: -3px;
        }

        .hero-stats {
          gap: 18px;
        }

        .feature-grid,
        .product-grid,
        .review-grid,
        .profile-grid {
          grid-template-columns: 1fr;
        }

        .section {
          padding: 65px 0;
        }

        .section-head {
          align-items: start;
          flex-direction: column;
          gap: 15px;
        }

        .banner-inner {
          flex-direction: column;
          align-items: flex-start;
        }

        .detail-image {
          height: 400px;
        }

        .cart-item {
          grid-template-columns: 65px 1fr auto;
        }

        .cart-item img {
          width: 65px;
          height: 65px;
        }

        .cart-line-total {
          display: none;
        }

        .delete-small {
          grid-column: 3;
        }

        .quantity {
          grid-column: 2;
        }

        .checkout-card {
          position: static;
        }

        .profile-head {
          flex-wrap: wrap;
        }

        .danger-button {
          margin-left: 0;
          width: 100%;
        }

        .map-wrapper {
          height: 450px;
        }

        .map-card {
          left: 12px;
          top: 12px;
          width: 230px;
        }

        .footer-grid {
          grid-template-columns: 1fr 1fr;
        }

        .admin-main {
          padding: 20px 14px;
        }

        .admin-metrics {
          grid-template-columns: 1fr;
        }

        .admin-menu {
          grid-template-columns: 1fr;
        }

        .form-grid {
          grid-template-columns: 1fr;
        }

        .admin-order-card {
          grid-template-columns: 1fr;
        }

        .admin-order-row {
          grid-template-columns: 1fr 1fr;
        }

        .contact-info h1 {
          font-size: 50px;
        }
      }
    `}</style>
  );
}

export default App;