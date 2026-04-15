insert into public.site_settings (business_name, slogan, phone, whatsapp_url, email, instagram_url, address, logo_url)
values ('החווה', 'מהמשק לצלחת', '050-0000000', 'https://wa.me/972500000000', 'hachava2026@gmail.com', 'https://www.instagram.com/hachava_meat', 'קניון גנים', '/logo.png')
on conflict do nothing;

insert into public.product_categories (slug, name_he, sort_order, image_url) values
('beef', 'בקר', 1, '/products/beef.svg'),
('chicken', 'עוף', 2, '/products/chicken.svg'),
('burgers', 'בורגרים', 3, '/products/burgers.svg'),
('lamb', 'טלה', 4, '/products/lamb.svg'),
('sausages', 'נקניקיות', 5, '/products/sausages.svg'),
('wine', 'יין', 6, '/products/wine.svg'),
('spices', 'תבלינים', 7, '/products/spices.svg'),
('hosting-accessories', 'אביזרי אירוח', 8, '/products/hosting.svg')
on conflict (slug) do nothing;
