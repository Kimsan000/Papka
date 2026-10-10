import React, { useState, useEffect, createContext, useContext, useMemo } from 'react';

// --- 1. GLOBAL STATE & KONTEKSTLAR ---
const AppContext = createContext();

const translations = {
  uz: { home: "Bosh sahifa", catalog: "Katalog", cart: "Savatcha", admin: "Admin", login: "Tizimga kirish", search: "Qidirish...", add_cart: "Savatga qo'shish" },
  ru: { home: "Главная", catalog: "Каталог", cart: "Корзина", admin: "Админ", login: "Войти", search: "Поиск...", add_cart: "В корзину" },
  en: { home: "Home", catalog: "Catalog", cart: "Cart", admin: "Admin", login: "Login", search: "Search...", add_cart: "Add to Cart" },
  tr: { home: "Ana Sayfa", catalog: "Katalog", cart: "Sepet", admin: "Yönetici", login: "Giriş", search: "Ara...", add_cart: "Sepete Ekle" },
  kz: { home: "Басты бет", catalog: "Каталог", cart: "Себет", admin: "Әкімші", login: "Кіру", search: "Іздеу...", add_cart: "Себетке қосу" }
};

const initialProducts = [
  { id: 1, name: "Gantel 5kg", price: 150000, category: "Sport", image: "https://via.placeholder.com/150" },
  { id: 2, name: "Oqsil (Protein)", price: 450000, category: "Sog'liq", image: "https://via.placeholder.com/150" },
  { id: 3, name: "Yugurish yo'lakchasi", price: 3500000, category: "Sport", image: "https://via.placeholder.com/150" }
];

// --- 2. ASOSIY PROVIDER ---
const AppProvider = ({ children }) => {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'uz');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
  const [products, setProducts] = useState(JSON.parse(localStorage.getItem('products')) || initialProducts);
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') === 'true');

  useEffect(() => { localStorage.setItem('lang', lang); }, [lang]);
  useEffect(() => { 
    localStorage.setItem('theme', theme);
    document.documentElement.className = theme;
  }, [theme]);
  useEffect(() => { localStorage.setItem('cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('favorites', JSON.stringify(favorites)); }, [favorites]);
  useEffect(() => { localStorage.setItem('products', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('isAdmin', isAdmin); }, [isAdmin]);

  const t = (key) => translations[lang][key] || key;

  return (
    <AppContext.Provider value={{ lang, setLang, theme, setTheme, cart, setCart, favorites, setFavorites, products, setProducts, isAdmin, setIsAdmin, t }}>
      {children}
    </AppContext.Provider>
  );
};

// --- 3. KOMPONENTLAR ---
const Navbar = ({ setRoute }) => {
  const { theme, setTheme, lang, setLang, cart, t } = useContext(AppContext);
  return (
    <nav className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md transition-colors duration-300">
      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 cursor-pointer" onClick={() => setRoute('home')}>SportHealth</div>
      <div className="flex gap-4 items-center">
        <button onClick={() => setRoute('catalog')} className="text-gray-700 dark:text-gray-200 hover:text-blue-500">{t('catalog')}</button>
        <button onClick={() => setRoute('cart')} className="text-gray-700 dark:text-gray-200 hover:text-blue-500">{t('cart')} ({cart.length})</button>
        <button onClick={() => setRoute('admin')} className="text-gray-700 dark:text-gray-200 hover:text-blue-500">{t('admin')}</button>
        
        <select value={lang} onChange={(e) => setLang(e.target.value)} className="bg-gray-100 dark:bg-gray-700 dark:text-white rounded p-1">
          {Object.keys(translations).map(l => <option key={l} value={l}>{l.toUpperCase()}</option>)}
        </select>
        
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="p-2 rounded-full bg-gray-200 dark:bg-gray-600">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </nav>
  );
};

const Catalog = () => {
  const { products, cart, setCart, t } = useContext(AppContext);
  const [search, setSearch] = useState('');

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="p-8">
      <input 
        type="text" 
        placeholder={t('search')} 
        value={search} 
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 mb-6 rounded border dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map(p => (
          <div key={p.id} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow border dark:border-gray-700 glassmorphism">
            <img src={p.image} alt={p.name} className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-bold dark:text-white">{p.name}</h3>
            <p className="text-blue-600 dark:text-blue-400 font-semibold my-2">{p.price} UZS</p>
            <button onClick={() => addToCart(p)} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
              {t('add_cart')}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const { products, setProducts } = useContext(AppContext);
  
  const addMockProduct = () => {
    const newProduct = { id: Date.now(), name: "Yangi Mahsulot", price: 100000, category: "Sport", image: "https://via.placeholder.com/150" };
    setProducts([...products, newProduct]);
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-md p-4">
        <h2 className="text-2xl font-bold text-blue-600 mb-6">Admin Panel</h2>
        <ul>
          <li className="mb-2 p-2 bg-blue-100 dark:bg-gray-700 text-blue-800 dark:text-blue-300 rounded cursor-pointer">Dashboard</li>
          <li className="mb-2 p-2 hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-gray-200 rounded cursor-pointer">Mahsulotlar</li>
        </ul>
      </aside>
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold dark:text-white mb-6">Statistika va Boshqaruv</h1>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-gray-500 dark:text-gray-400">Jami Mahsulotlar</h3>
            <p className="text-3xl font-bold dark:text-white">{products.length}</p>
          </div>
        </div>
        <button onClick={addMockProduct} className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600">+ Yangi qo'shish</button>
      </main>
    </div>
  );
};

const AdminLogin = ({ setRoute }) => {
  const { setIsAdmin } = useContext(AppContext);
  const handleLogin = (e) => {
    e.preventDefault();
    setIsAdmin(true);
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
      <form onSubmit={handleLogin} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl w-96">
        <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">Admin Login</h2>
        <input type="text" placeholder="Username" className="w-full p-3 mb-4 border rounded dark:bg-gray-700 dark:text-white" required />
        <input type="password" placeholder="Password" className="w-full p-3 mb-6 border rounded dark:bg-gray-700 dark:text-white" required />
        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">Kirish</button>
      </form>
    </div>
  );
};

// --- 4. ASOSIY APP ---
const MainApp = () => {
  const { isAdmin } = useContext(AppContext);
  const [route, setRoute] = useState('home');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 font-sans">
      {route !== 'admin' && <Navbar setRoute={setRoute} />}
      
      {route === 'home' && (
        <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">Sport va Sog'liqqa Xush Kelibsiz</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">Eng sifatli sport anjomlari va vitaminlar bitta joyda.</p>
          <button onClick={() => setRoute('catalog')} className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all">Xaridni boshlash</button>
        </div>
      )}

      {route === 'catalog' && <Catalog />}
      
      {route === 'admin' && (isAdmin ? <AdminDashboard /> : <AdminLogin setRoute={setRoute} />)}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}