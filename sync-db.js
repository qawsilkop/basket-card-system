const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

// 自動讀取本地 .env.local 的 Supabase 金鑰
let supabaseUrl = '';
let supabaseKey = '';
try {
  const envFile = fs.readFileSync('.env.local', 'utf8');
  envFile.split('\n').forEach(line => {
    if (line.startsWith('NEXT_PUBLIC_SUPABASE_URL=')) {
      supabaseUrl = line.split('=')[1].trim().replace(/['"]/g, '');
    }
    if (line.startsWith('NEXT_PUBLIC_SUPABASE_ANON_KEY=')) {
      supabaseKey = line.split('=')[1].trim().replace(/['"]/g, '');
    }
  });
} catch (e) {
  console.log('讀取 .env.local 失敗');
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ 錯誤：找不到 Supabase 金鑰設定！');
    return;
  }

  console.log('🔄 正在自動同步資料到 Supabase 雲端資料庫...');

  // 1. 自動同步廠商（欣鼎川）
  const { data: existingVendor } = await supabase.from('vendors').select('*').eq('name', '欣鼎川');
  if (!existingVendor || existingVendor.length === 0) {
    await supabase.from('vendors').insert([{ name: '欣鼎川' }]);
    console.log('✔ 已自動建立廠商：欣鼎川');
  } else {
    console.log('✔ 廠商「欣鼎川」已存在');
  }

  // 2. 自動同步預設員工帳號（E001 / 1234）
  const { data: existingEmp } = await supabase.from('employees').select('*').eq('emp_id', 'E001');
  if (!existingEmp || existingEmp.length === 0) {
    await supabase.from('employees').insert([{ emp_id: 'E001', name: '張課長', password: '1234' }]);
    console.log('✔ 已自動建立員工帳號：E001 (密碼: 1234)');
  } else {
    console.log('✔ 員工帳號 E001 已存在');
  }

  console.log('🎉 資料庫自動同步完成！\n');
}

main();
