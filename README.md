# החווה

פרויקט Next.js + Supabase + Resend עבור אתר קצביית פרימיום בעברית מלאה (RTL), עם הזמנות, דשבורד ניהול, מבצעים, העלאת מדיה והתראות מייל.

## התקנה מקומית

```bash
npm install
npm run dev
```

## הקמת Supabase

1. ליצור פרויקט חדש.
2. להריץ `supabase/schema.sql`.
3. להריץ `supabase/seed.sql`.
4. להריץ `supabase/storage-policies.sql`.
5. ליצור משתמש אדמין ב־Auth.
6. להכניס את `user_id` והאימייל שלו לטבלת `admin_users`.

```sql
insert into public.admin_users (user_id, email)
values ('USER_ID_FROM_AUTH', 'hachava2026@gmail.com');
```

## הקמת Resend

1. לפתוח חשבון Resend.
2. לאמת דומיין שולח.
3. להגדיר `RESEND_API_KEY` ו־`RESEND_FROM`.

## פריסה ל־Vercel

1. להעלות את הפרויקט ל־GitHub.
2. לחבר את הריפו ל־Vercel.
3. להגדיר את משתני הסביבה.
4. לבצע deploy.

## בדיקות לפני עלייה לאוויר

- להעלות תמונות אמיתיות ל־Storage או ל־public.
- לעדכן טלפון, WhatsApp וכתובת.
- לבצע הזמנת בדיקה מקצה לקצה.
- לוודא שמייל ההזמנה מגיע.
- לוודא שמשתמש האדמין קיים בטבלת `admin_users`.
