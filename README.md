# החווה — גרסת Vercel Static + Serverless

חבילת פריסה מלאה לאתר הקצבייה "החווה" עם:
- אתר ציבורי מלא בעברית RTL
- אזור ניהול
- מערכת הזמנות
- ניהול תוכן, מוצרים, מבצעים ומדיה
- אחסון תמונות ב-Supabase Storage
- שליחת מיילים דרך Resend
- פריסה על Vercel ללא תלות בפריימוורק צד שלישי

## מה צריך להכין

### משתני סביבה ב-Vercel
להגדיר את כל המשתנים הבאים:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_STORAGE_BUCKET` (ברירת מחדל: `site-assets`)
- `RESEND_API_KEY`
- `RESEND_FROM`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `ADMIN_COOKIE_SECRET`
- `SITE_URL`
- `WHATSAPP_URL`

### Supabase
בסביבת SQL Editor להריץ לפי הסדר:
1. `supabase/schema.sql`
2. `supabase/seed.sql`
3. `supabase/storage-policies.sql`

### Resend
- ליצור API key
- להגדיר sender מאומת ב-`RESEND_FROM`

## בדיקה מקומית
```bash
npm install
npm run build
python3 -m http.server 3000
```

## פריסה ל-Vercel
1. להעלות את הפרויקט ל-GitHub
2. לייבא את הריפו ב-Vercel
3. להגדיר את כל משתני הסביבה
4. לפרוס

## נתיבי מערכת
### ציבורי
- `/`
- `/products`
- `/order`
- `/about`
- `/contact`
- `/promotions`

### ניהול
- `/admin/login`
- `/admin`
- `/admin/orders`
- `/admin/products`
- `/admin/promotions`
- `/admin/content`
- `/admin/media`
