'use client';
import { useState } from 'react';
import Link from 'next/link';

// 預設員工帳號密碼對照表（以後可以直接在這裡新增員工）
const EMPLOYEE_DB = [
  { empId: 'E001', name: '張課長', password: '1234' },
  { empId: 'A001', name: '廠長', password: '8888' },
  { empId: 'admin', name: '系統管理員', password: 'admin' }
];

export default function LoginPage() {
  const [empId, setEmpId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // 檢查員工編號與密碼是否相符
    const user = EMPLOYEE_DB.find(
      (u) => u.empId === empId.trim() && u.password === password.trim()
    );

    if (user) {
      // 登入成功，將登入狀態記在瀏覽器裡
      localStorage.setItem('loggedUser', JSON.stringify(user));
      alert(`歡迎回來，${user.name}！`);
      window.location.href = '/';
    } else {
      alert('登入失敗：員工編號或密碼錯誤！');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200 w-full max-w-md">
        <h2 className="text-2xl font-black text-slate-800 mb-6 text-center">廠區員工登入</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">員工編號</label>
            <input
              type="text"
              value={empId}
              onChange={(e) => setEmpId(e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:border-blue-600 font-bold text-lg"
              placeholder="例如: E001"
              required
              autoFocus
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">密碼 / PIN 碼</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:border-blue-600 font-bold text-lg"
              placeholder="請輸入密碼"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-3.5 rounded-xl transition-colors shadow-lg mt-2 text-base"
          >
            登入系統
          </button>
        </form>
        <div className="mt-6 text-center">
          <Link href="/" className="text-sm font-bold text-slate-400 hover:text-blue-600 transition-colors">
            ← 返回主畫面
          </Link>
        </div>
      </div>
    </div>
  );
}
