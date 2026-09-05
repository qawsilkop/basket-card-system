import './globals.css';

export const metadata = {
  title: '籃卡進出管理系統',
  description: 'Basket Management System',
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW">
      <body className="bg-slate-50 text-slate-800">{children}</body>
    </html>
  );
}
