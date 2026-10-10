import React, { useContext } from 'react';
import { AppContext } from './AppContext';

export default function Navbar() {
  const { theme, setTheme, lang, setLang, cart, favorites, setRoute, t } = useContext(AppContext);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* LOGO */}
        <div onClick={() => setRoute('home')} className="flex items-center gap-2 cursor-pointer group">
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-xl flex items-center justify-center text-white font-black text-xl group-hover:rotate-12 transition-transform">S</div>
          <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">SportHealth</span>
        </div>
        
        {/* MENU LINKS */}
        <div className="hidden md:flex gap-8 items-center font-semibold text-gray-700 dark:text-gray-300">
          <button onClick={() => setRoute('home')} className="hover:text-blue-500 transition">{t('home')}</button>
          <button onClick={() => setRoute('catalog')} className="hover:text-blue-500 transition">{t('catalog')}</button>
          <button onClick={() => setRoute('contact')} className="hover:text-blue-500 transition">{t('contact')}</button>
        </div>

        {/* CONTROLS */}
        <div className="flex gap-3 items-center">
          {/* LANG */}
          <select value={lang} onChange={(e) => setLang(e.target.value)} className="bg-gray-100 dark:bg-gray-800 border-none rounded-lg px-3 py-2 text-sm font-bold dark:text-white outline-none cursor-pointer">
            <option value="uz">UZ</option><option value="ru">RU</option><option value="en">EN</option>
          </select>
          
          {/* THEME */}
          <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          
          {/* FAVORITES */}
          <button onClick={() => setRoute('favorites')} className="relative p-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition">
            ❤️ {favorites.length > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white dark:border-gray-900">{favorites.length}</span>}
          </button>
          
          {/* CART */}
          <button onClick={() => setRoute('cart')} className="relative p-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition">
            🛒 {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white dark:border-gray-900">{cart.length}</span>}
          </button>

          {/* ADMIN */}
          <button onClick={() => setRoute('admin')} className="ml-2 px-5 py-2.5 bg-gray-900 dark:bg-white dark:text-black text-white rounded