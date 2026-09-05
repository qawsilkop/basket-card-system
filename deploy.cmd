@echo off
chcp 65001 >nul
echo ==========================================
echo 正在執行自動化作業...
echo ==========================================

echo [1/3] 正在自動同步雲端資料庫 (Supabase)...
node sync-db.js

echo [2/3] 正在打包程式碼...
git add .
git commit -m "Auto update via deploy.cmd"

echo [3/3] 正在發布至雲端部署 (Vercel)...
git push

echo ==========================================
echo 全部搞定！資料庫已更新，網站已自動部署！
echo ==========================================
pause
