insert into public.site_settings (
  business_name, slogan, phone, whatsapp_url, email, instagram_url, address, hero_title, hero_subtitle, about_title, about_body, kosher_label, map_embed_url, logo_url
) values (
  'החווה', 'מהמשק לצלחת', '050-0000000', 'https://wa.me/972500000000', 'hachava2026@gmail.com', 'https://www.instagram.com/hachava_meat', 'קניון גנים',
  'בשר איכותי מהמשק',
  'קצביית פרימיום עם אווירה כפרית חמה, שירות אישי ובשר מובחר — מהמשק לצלחת.',
  'על החווה',
  'בהחווה אנחנו מאמינים שבשר איכותי מתחיל במקצוענות, טריות וכבוד לחומר הגלם. אנו מגישים חוויית קנייה חמה, משפחתית ויוקרתית, עם הקפדה על איכות בלתי מתפשרת — מהמשק לצלחת.',
  'כשר',
  'https://www.google.com/maps?q=%D7%A7%D7%A0%D7%99%D7%95%D7%9F%20%D7%92%D7%A0%D7%99%D7%9D&output=embed',
  '/assets/logo.png'
) on conflict do nothing;

insert into public.product_categories (slug, name_he, image_url, sort_order) values
('beef','בקר','/assets/beef.jpg',1),
('chicken','עוף','/assets/chicken.jpg',2),
('burgers','בורגרים','/assets/burgers.jpg',3),
('lamb','טלה','/assets/lamb.jpg',4),
('sausages','נקניקיות','/assets/sausages.jpg',5),
('wine','יין','/assets/wine.jpg',6),
('spices','תבלינים','/assets/spices.jpg',7),
('hosting-accessories','אביזרי אירוח','/assets/hosting.jpg',8)
on conflict (slug) do nothing;

insert into public.products (category_id, name_he, description_he, image_url, sort_order)
select id, 'אנטריקוט מובחר', 'נתח בקר עשיר בטעם לאירוח מושלם.', '/assets/beef.jpg', 1 from public.product_categories where slug='beef'
on conflict do nothing;
insert into public.products (category_id, name_he, description_he, image_url, sort_order)
select id, 'פרגיות טריות', 'עוף איכותי למנגל ולבישול ביתי.', '/assets/chicken.jpg', 1 from public.product_categories where slug='chicken'
on conflict do nothing;
insert into public.products (category_id, name_he, description_he, image_url, sort_order)
select id, 'בורגר קצבים', 'תערובת פרימיום עסיסית ואיכותית.', '/assets/burgers.jpg', 1 from public.product_categories where slug='burgers'
on conflict do nothing;
insert into public.products (category_id, name_he, description_he, image_url, sort_order)
select id, 'צלעות טלה', 'טלה משובח לארוחות מיוחדות.', '/assets/lamb.jpg', 1 from public.product_categories where slug='lamb'
on conflict do nothing;
insert into public.products (category_id, name_he, description_he, image_url, sort_order)
select id, 'נקניקיות בוטיק', 'נקניקיות איכות בעבודת קצב.', '/assets/sausages.jpg', 1 from public.product_categories where slug='sausages'
on conflict do nothing;
insert into public.products (category_id, name_he, description_he, image_url, sort_order)
select id, 'יין לאירוח', 'בחירה משלימה לארוחה חגיגית.', '/assets/wine.jpg', 1 from public.product_categories where slug='wine'
on conflict do nothing;
insert into public.products (category_id, name_he, description_he, image_url, sort_order)
select id, 'תערובת הבית', 'תבלינים מותאמים לבשרים ולצלייה.', '/assets/spices.jpg', 1 from public.product_categories where slug='spices'
on conflict do nothing;
insert into public.products (category_id, name_he, description_he, image_url, sort_order)
select id, 'קרשי הגשה', 'אביזרי אירוח משלימים לחוויה מושלמת.', '/assets/hosting.jpg', 1 from public.product_categories where slug='hosting-accessories'
on conflict do nothing;
