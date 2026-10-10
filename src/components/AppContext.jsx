import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

const TRANSLATIONS = {
  uz: {
    home: "Bosh sahifa", catalog: "Katalog", favorites: "Sevimlilar", cart: "Savatcha", contact: "Aloqa", admin: "Admin",
    search: "Mahsulot izlash...", filter: "Filtr", sort: "Saralash", price_low: "Arzonlari oldin", price_high: "Qimmatlari oldin",
    add_to_cart: "Savatga qo'shish", buy: "Rasmiylashtirish", total: "Jami summa", promo: "Promokod", apply: "Qo'llash",
    admin_login: "Boshqaruv paneliga kirish", username: "Login", password: "Parol", login_btn: "Kirish",
    dash_products: "Mahsulotlar bazasi", dash_orders: "Buyurtmalar", logout: "Tizimdan chiqish", add_product: "Yangi mahsulot",
    edit: "Tahrirlash", delete: "O'chirish", save: "Saqlash", cancel: "Bekor qilish", empty_cart: "Sizning savatchangiz bo'sh",
    name: "Mahsulot nomi", price: "Narxi (UZS)", category: "Kategoriya", image: "Rasm URL manzili",
    checkout_name: "Ism-sharifingiz", phone: "Telefon raqamingiz", hero_title: "Sog'lom Hayot Tarzi", hero_desc: "Eng sara sport anjomlari",
    all_cats: "Barcha kategoriyalar", sport: "Sport anjomlari", health: "Sog'liq/Vitaminlar", equip: "Katta uskunalar",
    contact_us: "Biz bilan bog'lanish", location: "Bizning manzil (Xarita)"
  },
  ru: {
    home: "Главная", catalog: "Каталог", favorites: "Избранное", cart: "Корзина", contact: "Контакты", admin: "Админ",
    search: "Поиск товаров...", filter: "Фильтр", sort: "Сортировка", price_low: "Сначала дешевые", price_high: "Сначала дорогие",
    add_to_cart: "В корзину", buy: "Оформить", total: "Итого", promo: "Промокод", apply: "Применить",
    admin_login: "Вход в панель управления", username: "Логин", password: "Пароль", login_btn: "Войти",
    dash_products: "База товаров", dash_orders: "Заказы", logout: "Выйти", add_product: "Добавить товар",
    edit: "Изменить", delete: "Удалить", save: "Сохранить", cancel: "Отмена", empty_cart: "Ваша корзина пуста",
    name: "Название товара", price: "Цена (UZS)", category: "Категория", image: "URL картинки",
    checkout_name: "Ваше имя", phone: "Ваш телефон", hero_title: "Здоровый Образ Жизни", hero_desc: "Лучшие спорттовары",
    all_cats: "Все категории", sport: "Спорттовары", health: "Здоровье/Витамины", equip: "Тренажеры",
    contact_us: "Свяжитесь с нами", location: "Наш адрес (Карта)"
  },
  en: {
    home: "Home", catalog: "Catalog", favorites: "Favorites", cart: "Cart", contact: "Contact", admin: "Admin",
    search: "Search products...", filter: "Filter", sort: "Sort by", price_low: "Price: Low to High", price_high: "Price: High to Low",
    add_to_cart: "Add to Cart", buy: "Checkout", total: "Total Amount", promo: "Promo Code", apply: "Apply Code",
    admin_login: "Control Panel Login", username: "Username", password: "Password", login_btn: "Login",
    dash_products: "Product Database", dash_orders: "Orders", logout: "Logout", add_product: "Add New Product",
    edit: "Edit", delete: "Delete", save: "Save", cancel: "Cancel", empty_cart: "Your cart is currently empty",
    name: "Product Name", price: "Price (UZS)", category: "Category", image: "Image URL",
    checkout_name: "Full Name", phone: "Phone Number", hero_title: "Healthy Lifestyle", hero_desc: "Best sporting goods",
    all_cats: "All Categories", sport: "Sports Gear", health: "Health/Vitamins", equip: "Equipment",
    contact_us: "Contact Us", location: "Our Location (Map)"
  }
};

const INITIAL_DATA = [
  { id: 1, name: "Pro Dumbbell Set 20kg", price: 450000, category: "Sport", image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=500&q=80" },
  { id: 2, name: "Optimum Nutrition Whey", price: 950000, category: "Health", image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=500&q=80" },
  { id: 3, name: "Eco-Friendly Yoga Mat", price: 150000, category: "Sport", image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&q=80" },
  { id: 4, name: "Omega-3 Fish Oil 1000mg", price: 220000, category: "Health", image: "https://images.unsplash.com/photo-1550572017-edb9287a20dc?w=500&q=80" },
  { id: 5, name: "MaxFit Treadmill T-500", price: 6500000, category: "Equipment", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&q=80" },
  { id: 6, name: "Adjustable Kettlebell", price: 320000, category: "Sport", image: "https://images.unsplash.com/photo-1519500528574-8b209e99a80f?w=500&q=80" },
  { id: 7, name: "Vitamin C + Zinc Complex", price: 95000, category: "Health", image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=500&q=80" },
  { id: 8, name: "Stationary Spin Bike", price: 3200000, category: "Equipment", image: "https://images.unsplash.com/photo-1594882645126-14020914d58d?w=500&q=80" },
];

export const AppProvider = ({ children }) => {
  const [lang, setLang] = useState(localStorage.getItem('sh_lang') || 'uz');
  const [theme, setTheme] = useState(localStorage.getItem('sh_theme') || 'dark');
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('sh_cart')) || []);
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('sh_fav')) || []);
  const [products, setProducts] = useState(JSON.parse(localStorage.getItem('sh_prod')) || INITIAL_DATA);
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('sh_admin') === 'true');
  const [route, setRoute] = useState('home');

  useEffect(() => { localStorage.setItem('sh_lang', lang); }, [lang]);
  useEffect(() => { 
    localStorage.setItem('sh_theme', theme);
    if(theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [theme]);
  useEffect(() => { localStorage.setItem('sh_cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('sh_fav', JSON.stringify(favorites)); }, [favorites]);
  useEffect(() => { localStorage.setItem('sh_prod', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('sh_admin', isAdmin); }, [isAdmin]);

  const t = (key) => TRANSLATIONS[lang]?.[key] || key;

  return (
    <AppContext.Provider value={{ lang, setLang, theme, setTheme, cart, setCart, favorites, setFavorites, products, setProducts, isAdmin, setIsAdmin, route, setRoute, t }}>
      {children}
    </AppContext.Provider>
  );
};