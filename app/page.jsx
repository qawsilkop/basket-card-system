<Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors ml-2 shadow-sm">
  管理員登入
</Link>
'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const i18n = {
  'zh-TW': { title: '籃卡進出管理系統', plant: '廠區', vendor: '對應廠商', in: '📥 進籃 (廠商➔公司)', out: '📤 出籃 (公司➔廠商)', submit: '生成簽收單 (QR Code)' },
  'en': { title: 'Basket Management System', plant: 'Plant', vendor: 'Vendor', in: '📥 Basket In', out: '📤 Basket Out', submit: 'Generate QR Code' },
  'vi': { title: 'Hệ thống quản lý rổ', plant: 'Nhà máy', vendor: 'Nhà cung cấp', in: '📥 Nhập rổ', out: '📤 Xuất rổ', submit: 'Tạo mã QR' },
  'zh-en': { title: '籃卡管理 (Basket Management)', plant: '廠區 (Plant)', vendor: '對應廠商 (Vendor)', in: '📥 進籃 (Basket In)', out: '📤 出籃 (Basket Out)', submit: '生成簽收單 (Generate QR)' },
  'zh-vi': { title: '籃卡管理 (Quản lý rổ)', plant: '廠區 (Nhà máy)', vendor: '對應廠商 (Nhà cung cấp)', in: '📥 進籃 (Nhập rổ)', out: '📤 出籃 (Xuất rổ)', submit: '生成簽收單 (Tạo mã QR)' }
};

export default function HomePage() {
  const [lang, setLang] = useState('zh-vi');
  const [theme, setTheme] = useState('mobile-buttons');
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [direction, setDirection] = useState('in');

  const t = i18n[lang] || i18n['zh-TW'];

  useEffect(() => {
    async function fetchVendors() {
      const { data } = await supabase.from('vendors').select('*');
      if (data) setVendors(data);
    }
    fetchVendors();
  }, []);

  const handleSubmit = async () => {
    if (!selectedVendor || quantity <= 0) {
      alert('請選擇廠商並輸入有效數量');
      return;
    }

    const { error } = await supabase.from('inventory_transactions').insert([
      {
        trans_no: 'TX-' + Date.now(),
        plant_code: 'A',
        vendor_id: selectedVendor,
        basket_id: 'six_grid',
        direction: direction,
        quantity: Number(quantity),
        unit_used: 'piece',
        status: 'pending'
      }
    ]);

    if (!error) {
      alert('單據建立成功！');
      setQuantity(0);
    } else {
      alert('建立失敗: ' + error.message);
    }
  };

  return (
    <div className={`min-h-screen p-4 ${theme === 'dark-tech' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-800'}`}>
      <header className="flex justify-between items-center bg-white/10 p-3 rounded-xl mb-4 backdrop-blur-md">
        <h1 className="font-extrabold text-lg">{t.title}</h1>
        <div className="flex gap-2">
          <select value={lang} onChange={(e) => setLang(e.target.value)} className="bg-slate-800 text-white text-xs p-2 rounded-lg">
            <option value="zh-TW">繁體中文</option>
            <option value="en">English</option>
            <option value="vi">Tiếng Việt</option>
            <option value="zh-en">中英雙語</option>
            <option value="zh-vi">中越雙語</option>
          </select>
          <select value={theme} onChange={(e) => setTheme(e.target.value)} className="bg-slate-800 text-white text-xs p-2 rounded-lg">
            <option value="mobile-buttons">風格三：大按鈕現場風</option>
            <option value="dark-tech">風格一：深色戰情室</option>
            <option value="clean-ui">風格二：極簡現代風</option>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors ml-2 shadow-sm">
  管理員登入
</button>
          </select>
        </div>
      </header>

      <main className="max-w-md mx-auto bg-white text-slate-900 p-5 rounded-2xl shadow-xl space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-500 mb-1">{t.vendor}</label>
          <select 
            value={selectedVendor} 
            onChange={(e) => setSelectedVendor(e.target.value)}
            className="w-full border-2 border-slate-300 rounded-xl p-3 font-bold text-base"
          >
            <option value="">-- 請選擇廠商 --</option>
            {vendors.map((v) => (
              <option key={v.id} value={v.id}>{v.name}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button 
            onClick={() => setDirection('in')}
            className={`py-3 rounded-xl font-black text-xs ${direction === 'in' ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-600'}`}
          >
            {t.in}
          </button>
          <button 
            onClick={() => setDirection('out')}
            className={`py-3 rounded-xl font-black text-xs ${direction === 'out' ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-600'}`}
          >
            {t.out}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => setQuantity(Math.max(0, quantity - 1))} className="w-12 h-12 bg-slate-200 text-xl font-black rounded-xl">-</button>
          <input 
            type="number" 
            value={quantity} 
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="flex-1 text-center text-2xl font-black border-2 border-slate-300 rounded-xl py-2" 
          />
          <button onClick={() => setQuantity(quantity + 1)} className="w-12 h-12 bg-blue-600 text-white text-xl font-black rounded-xl">+</button>
        </div>

        <div className="flex gap-2">
          <button onClick={() => setQuantity(quantity + 10)} className="flex-1 bg-slate-100 py-2 rounded-lg font-bold text-xs">+10</button>
          <button onClick={() => setQuantity(quantity + 50)} className="flex-1 bg-slate-100 py-2 rounded-lg font-bold text-xs">+50</button>
          <button onClick={() => setQuantity(0)} className="flex-1 bg-red-50 text-red-600 py-2 rounded-lg font-bold text-xs">清空</button>
        </div>

        <button 
          onClick={handleSubmit} 
          className="w-full bg-blue-600 text-white font-extrabold py-3.5 rounded-xl shadow-lg"
        >
          {t.submit}
        </button>
      </main>
    </div>
  );
}
