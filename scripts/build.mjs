import fs from 'fs';
import path from 'path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const src = path.join(root, 'src');
const dist = path.join(root, 'dist');

const categories = [
  ['בקר', 'נתחים מובחרים, טחינה טרייה וסטנדרט גבוה של איכות, יישון וניקיון.', 'beef.svg'],
  ['עוף', 'מבחר חלקי עוף טריים, מסודרים ונוחים להכנה יומיומית או לאירוח.', 'chicken.svg'],
  ['בורגרים', 'קציצות פרימיום מוכנות לגריל, עם נראות עשירה וטעם בשרי מודגש.', 'burgers.svg'],
  ['טלה', 'מבחר איכותי לטאבון, לצלייה ולאירוח חגיגי עם אופי עמוק ומעודן.', 'lamb.svg'],
  ['נקניקיות', 'נקניקיות בעבודת קצב, למנגל, לאירוח ולארוחה משפחתית מחממת.', 'sausages.svg'],
  ['יין', 'יינות משלימים לארוחת בשר עשירה, להגשה מוקפדת ולאווירה מלאה.', 'wine.svg'],
  ['תבלינים', 'תערובות חמות, עמוקות ומדויקות לבשרים, צלייה ותבשילים עשירים.', 'spices.svg'],
  ['אביזרי אירוח', 'תוספות משלימות לשולחן אירוח מרשים, מדויק וחווייתי.', 'hosting.svg']
];

function ensureDir(dir){ fs.mkdirSync(dir, { recursive: true }); }
function copyDir(srcDir, destDir){
  ensureDir(destDir);
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const s = path.join(srcDir, entry.name);
    const d = path.join(destDir, entry.name);
    if (entry.isDirectory()) copyDir(s, d); else fs.copyFileSync(s, d);
  }
}
function write(file, content){ ensureDir(path.dirname(file)); fs.writeFileSync(file, content); }
function cardGrid(items){
  return `<div class="grid grid-4">${items.map(([title, desc, img]) => `
    <article class="card">
      <div class="card-media" style="background-image:url('/assets/products/${img}')"></div>
      <div class="card-body"><h3>${title}</h3><p>${desc}</p></div>
    </article>`).join('')}</div>`;
}
function shell({ title, body, popup = false }) {
  return `<!doctype html>
<html lang="he" dir="rtl">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
  <meta name="description" content="החווה — גרסת תצוגה ויזואלית מוכנה לפריסה" />
  <link rel="stylesheet" href="/assets/styles.css" />
</head>
<body>
  <div class="site-shell">
    <div class="vines vines-right"></div>
    <div class="vines vines-left"></div>
    <div class="lamp lamp-right"></div>
    <div class="lamp lamp-left"></div>
    <header class="header">
      <div class="container header-inner">
        <a class="brand" href="/">
          <img class="brand-logo" src="/assets/logo.png" alt="לוגו החווה" />
          <div class="brand-copy"><strong>החווה</strong><span>מהמשק לצלחת • בשר פרימיום כשר</span></div>
        </a>
        <nav class="nav">
          <a href="/">דף הבית</a><a href="/products/">מוצרים</a><a href="/order/">הזמנה</a><a href="/about/">אודות</a><a href="/contact/">צור קשר</a><a href="/promotions/">מבצעים</a>
        </nav>
        <a class="cta" href="/order/">הזמינו עכשיו</a>
      </div>
    </header>
    <main>${body}</main>
    <footer class="footer"><div class="container"><p>החווה • קצביית פרימיום כשרה • קניון גנים</p><p class="small-note">גרסה מאומתת לפריסה ב־Vercel לצורך בדיקת עיצוב, RTL, תוכן וחוויית שימוש.</p></div></footer>
    ${popup ? `<div class="promo-overlay" id="promoOverlay" hidden><div class="panel promo-modal"><p class="eyebrow">מבצע פעיל</p><h2 style="margin-top:0;color:var(--gold-light);font-size:2.2rem">מבצע פתיחה חגיגי</h2><p class="lead" style="max-width:unset">מארזי אירוח נבחרים בקונספט כפרי חם, עם התאמה אישית לארוחה משפחתית או אירוע ביתי.</p><div class="promo-actions"><a href="/promotions/" class="cta">לצפייה במבצעים</a><button id="closePromo" class="ghost-btn" type="button">סגירה</button></div></div></div><script src="/assets/site.js"></script>` : ''}
  </div>
</body>
</html>`;
}

fs.rmSync(dist, { recursive: true, force: true });
ensureDir(dist);
copyDir(path.join(src, 'assets'), path.join(dist, 'assets'));

const homeBody = `
<section class="hero"><div class="container hero-grid">
  <div class="panel hero-copy">
    <p class="eyebrow">כשר • איכותי • כפרי • מוקפד</p>
    <h1>החווה</h1>
    <p class="subtitle">מהמשק לצלחת</p>
    <p class="lead">קצביית פרימיום ישראלית עם אווירה חמה, עץ כהה, תאורה רכה ומבחר בשרים איכותי המוגש בחוויה אישית, משפחתית ומדויקת.</p>
    <div class="hero-actions"><a class="cta" href="/order/">הזמינו עכשיו</a><a class="secondary-btn" href="/products/">לצפייה במוצרים</a></div>
  </div>
  <div class="panel hero-visual"><div class="logo-showcase"><img src="/assets/logo.png" alt="לוגו החווה" /><div class="kosher-badge">כשר</div></div></div>
</div></section>
<section class="section"><div class="container"><div class="section-head"><h2>הקטגוריות הבולטות שלנו</h2><p>עמוד הבית מציג את הכיוון החזותי: חום עץ, זהב, ירוק עמוק, לוגו מרכזי ונראות יוקרתית עם תחושת משק חמה.</p></div>${cardGrid(categories.slice(0,4))}</div></section>
<section class="section" style="padding-top:0"><div class="container grid grid-2">
  <section class="panel form-panel"><h2 style="margin-top:0;color:var(--gold-light)">למה לבחור בהחווה</h2><ul style="padding:0;margin:0;list-style:none;display:grid;gap:10px"><li>• בשר איכותי וטרי במראה פרימיום ובשירות אישי</li><li>• חוויית קנייה כפרית, חמה ומזמינה</li><li>• נראות כשרה וברורה בכל עמוד מרכזי</li><li>• מוצרים, מארזים ואביזרי אירוח תחת קורת גג אחת</li></ul></section>
  <section class="panel form-panel"><h2 style="margin-top:0;color:var(--gold-light)">מוצרים לדוגמה בהזמנה</h2><div class="grid" style="gap:10px"><div class="muted-box">אנטריקוט מיושן</div><div class="muted-box">אסאדו פרימיום</div><div class="muted-box">קבב ביתי</div><div class="muted-box">בורגר בקר טרי</div><div class="muted-box">שוקי עוף למרינדה</div><div class="muted-box">כתף טלה לאירוח</div></div></section>
</div></section>`;

const productsBody = `<section class="section"><div class="container"><div class="section-head"><h1>המוצרים שלנו</h1><p>עמוד מוצרים להצגת קטגוריות הבשר, היין, התבלינים ואביזרי האירוח. בגרסה המלאה ניתן יהיה להרחיב כל קטגוריה לרשימות מוצרים מפורטות.</p></div>${cardGrid(categories)}</div></section>`;

const orderChoices = categories.map(([title, desc], i) => `<div class="muted-box"><div style="display:flex;justify-content:space-between;gap:12px;align-items:center"><div><strong style="display:block;margin-bottom:6px">${title}</strong><span class="small-note">${desc}</span></div><input class="field" style="max-width:88px;text-align:center" type="number" min="0" value="0" /></div></div>`).join('');
const orderBody = `<section class="section"><div class="container"><div class="section-head"><h1>הזמנה מהירה ונוחה</h1><p>מבנה ההזמנה מוצג כאן באופן מלא לצורכי בדיקת חוויית שימוש, שדות, סדר המידע והיררכיית התוכן לפני חיבור אמיתי למערכת חיה.</p></div><div class="form-grid"><section class="panel form-panel"><h2 style="margin-top:0;color:var(--gold-light)">בחירת מוצרים</h2><div class="field-row">${orderChoices}</div></section><section class="panel form-panel"><h2 style="margin-top:0;color:var(--gold-light)">פרטי הזמנה</h2><form><div class="field-row"><input class="field" placeholder="שם מלא" /><input class="field" placeholder="מספר טלפון" /><input class="field" placeholder="כתובת מלאה" /><textarea class="textarea" placeholder="הערות נוספות להזמנה"></textarea></div><div class="choice-row" style="margin-bottom:16px"><label class="choice"><input type="radio" name="delivery" checked />משלוח</label><label class="choice"><input type="radio" name="delivery" />איסוף עצמי</label></div><button class="cta" type="button">שליחת הזמנה</button><p class="small-note" style="margin-top:12px">בגרסה הזו הטופס הוא ויזואלי בלבד, כדי לאפשר בדיקת מבנה, תוכן וחוויית שימוש ללא תלות בשרת.</p></form></section></div></div></section>`;

const aboutBody = `<section class="section"><div class="container"><div class="panel form-panel" style="max-width:900px;margin:0 auto"><p class="eyebrow">משפחתיות • טריות • פרימיום</p><h1 style="margin-top:0;color:var(--gold-light)">על החווה</h1><p class="lead" style="max-width:unset">בהחווה אנחנו מאמינים שבשר איכותי מתחיל בכבוד לחומר הגלם, בעבודה נקייה ומדויקת ובחוויה שמרגישה אישית מהרגע הראשון. לכן בחרנו בשפה ויזואלית חמה, כפרית ואותנטית — עץ כהה, ירוק עמוק, זהב מעודן ותאורה רכה שמזכירה משק משפחתי ברמה גבוהה.</p><p class="lead" style="max-width:unset">המותג מדגיש טריות, כשרות ברורה, שירות מקצועי, תחושת אירוח ואווירה פרימיום שאינה קרה או מינימליסטית. המסר המוביל הוא פשוט: מהמשק לצלחת, עם איכות שנראית טוב, מרגישה נכונה ונשארת בזיכרון.</p></div></div></section>`;

const contactBody = `<section class="section"><div class="container grid grid-2"><section class="panel form-panel"><h1 style="margin-top:0;color:var(--gold-light)">צור קשר</h1><div class="contact-list"><div class="contact-item"><strong>טלפון:</strong> <a href="tel:0500000000">050-0000000</a></div><div class="contact-item"><strong>וואטסאפ:</strong> <a href="https://wa.me/972500000000" target="_blank">שלחו הודעה</a></div><div class="contact-item"><strong>אימייל:</strong> <a href="mailto:hachava2026@gmail.com">hachava2026@gmail.com</a></div><div class="contact-item"><strong>אינסטגרם:</strong> <a href="https://www.instagram.com/hachava_meat" target="_blank">hachava_meat</a></div><div class="contact-item"><strong>כתובת:</strong> קניון גנים</div><div class="contact-item"><strong>שעות פעילות:</strong><br/>ראשון–חמישי: 09:00–21:00<br/>שישי: 09:00–14:00</div></div></section><section class="panel" style="padding:12px"><iframe class="map-frame" title="מפת קניון גנים" loading="lazy" src="https://www.google.com/maps?q=%D7%A7%D7%A0%D7%99%D7%95%D7%9F%20%D7%92%D7%A0%D7%99%D7%9D&output=embed"></iframe></section></div></section>`;

const promotionsBody = `<section class="section"><div class="container"><div class="section-head"><h1>מבצעים מיוחדים</h1><p>בגרסת התצוגה, עמוד המבצעים מציג כיוון חזותי מלא: כותרת, תיאור ותמונת מבצע. בשלב הבא החלק הזה יתחבר לניהול דינמי.</p></div><div class="grid grid-2"><article class="card"><div class="card-media" style="background-image:url('/assets/products/hosting.svg')"></div><div class="card-body"><h3>מבצע פתיחה חגיגי</h3><p>מארזי אירוח נבחרים בקונספט כפרי חם, עם התאמה אישית לארוחה משפחתית או אירוע ביתי.</p><p class="small-note">כפתור הפופאפ בדף הבית מפנה לעמוד הזה, כדי שתוכל לבדוק גם את התנהגות המבצע וגם את העיצוב של עמוד ייעודי.</p></div></article><article class="card"><div class="card-body"><h3>עוד הצעות לעיצוב התוכן</h3><ul style="padding:0;list-style:none;margin:0;display:grid;gap:10px">${categories.slice(0,4).map(([title]) => `<li>• מבצע על קטגוריית ${title}</li>`).join('')}</ul></div></article></div></div></section>`;

write(path.join(dist, 'index.html'), shell({ title: 'החווה | קצביית פרימיום', body: homeBody, popup: true }));
write(path.join(dist, 'products', 'index.html'), shell({ title: 'מוצרים | החווה', body: productsBody }));
write(path.join(dist, 'order', 'index.html'), shell({ title: 'הזמנה | החווה', body: orderBody }));
write(path.join(dist, 'about', 'index.html'), shell({ title: 'אודות | החווה', body: aboutBody }));
write(path.join(dist, 'contact', 'index.html'), shell({ title: 'צור קשר | החווה', body: contactBody }));
write(path.join(dist, 'promotions', 'index.html'), shell({ title: 'מבצעים | החווה', body: promotionsBody }));

console.log('Build completed successfully. Output:', dist);
