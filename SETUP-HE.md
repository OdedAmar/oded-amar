# מדריך התקנה והפעלה — עודד אמר

> מדריך זה כתוב עבור מי שאינו מפתח. קראו בסדר, שלב אחר שלב.

---

## תוכן עניינים

1. [הפעלה מקומית על המחשב שלכם](#1-הפעלה-מקומית)
2. [יצירת חשבון Vercel](#2-יצירת-חשבון-vercel)
3. [יצירת Redis לשמירת תוכן ופניות (Upstash)](#3-upstash-redis)
4. [יצירת Blob Storage לתמונות](#4-vercel-blob)
5. [יצירת מפתח Resend לשליחת אימייל](#5-resend)
6. [יצירת מפתחות Turnstile להגנה מספאם](#6-cloudflare-turnstile)
7. [הגדרת משתני הסביבה](#7-משתני-סביבה)
8. [פריסה ל-Vercel](#8-פריסה-ל-vercel)
9. [חיבור דומיין מותאם אישית](#9-חיבור-דומיין)
10. [החלפת לוגו, תמונת פורטרט וווידאו](#10-החלפת-נכסים)
11. [שימוש בלוח הניהול](#11-לוח-הניהול)
12. [הסבר עלויות כנה](#12-הסבר-עלויות)

---

## 1. הפעלה מקומית

כדי לראות את האתר על המחשב לפני הפרסום:

**שלב א — פתחו את תיקיית הפרויקט**

פתחו את תוכנת הטרמינל (Command Prompt, PowerShell, או Terminal):
```
cd "d:\VS CODE\oded-amar"
```

**שלב ב — צרו קובץ הגדרות**

העתיקו את קובץ הדוגמה:
```
copy .env.local.example .env.local
```

פתחו את הקובץ `.env.local` בעורך טקסט (Notepad) והגדירו לפחות:
```
ADMIN_PASSWORD=הסיסמה-שלכם-לאדמין
```

**שלב ג — הפעילו את שרת הפיתוח**
```
npm run dev
```

**שלב ד — פתחו את הדפדפן**

גשו לכתובת: `http://localhost:3000`

האתר יפעל בלי Redis, Blob או Resend — כל הנתונים יישמרו בזיכרון ויאבדו עם כיבוי השרת. זה בסדר לבדיקה.

---

## 2. יצירת חשבון Vercel

Vercel הוא הפלטפורמה שתאחסן ותריץ את האתר.

1. גשו ל-[vercel.com](https://vercel.com) ולחצו **Sign Up**
2. בחרו להתחבר עם GitHub (צרו חשבון GitHub אם אין לכם)
3. לאחר ההרשמה, תגיעו ל-Dashboard

---

## 3. Upstash Redis

Upstash Redis שומר את תוכן האתר ואת פניות הלקוחות. יש תוכנית חינמית.

**שלב א — התחברות ל-Vercel Integration**

1. גשו ל-[Vercel Dashboard](https://vercel.com/dashboard)
2. לחצו על **Marketplace** (בתפריט הצד)
3. חפשו **Upstash Redis**
4. לחצו **Add Integration**
5. בחרו את הפרויקט שלכם (ראו שלב 8 לפרסום ראשון)
6. לחצו **Add Storage** ושמו את ה-Database "oded-amar-kv"
7. בחרו Region קרוב לישראל (בחרו **EU West** או **US East**)

**שלב ב — קבלת המפתחות**

לאחר היצירה, Vercel יוסיף אוטומטית לפרויקט שלכם שני משתני סביבה:
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

לא צריך להעתיק אותם ידנית — Vercel עושה זאת אוטומטית.

לשימוש מקומי (על המחשב), העתיקו את הערכים מ-Vercel Dashboard לקובץ `.env.local`.

---

## 4. Vercel Blob

Vercel Blob שומר את התמונות שתעלו דרך לוח הניהול.

1. ב-Vercel Dashboard, גשו לפרויקט שלכם
2. לחצו על **Storage** ← **Create Database**
3. בחרו **Blob**
4. שמו אותו "oded-amar-blob" ולחצו Create
5. Vercel יוסיף אוטומטית את המשתנה `BLOB_READ_WRITE_TOKEN`

---

## 5. Resend

Resend שולח לכם אימייל כאשר מישהו ממלא את טופס הפנייה.

1. גשו ל-[resend.com](https://resend.com) ולחצו **Sign up**
2. אמתו את האימייל שלכם
3. גשו ל-**API Keys** ← **Create API Key**
4. שמו את המפתח "oded-amar" ולחצו **Create**
5. **שמרו את המפתח שמתחיל ב-`re_`** — הוא יוצג רק פעם אחת
6. הדביקו אותו בתור `RESEND_API_KEY` בהגדרות Vercel

**חשוב:** כדי לשלוח מאימייל בדומיין שלכם (לדוגמה `noreply@odedamar.co.il`), תצטרכו לאמת את הדומיין ב-Resend. ניתן לשלוח זמנית מ-`onboarding@resend.dev` בחינם.

---

## 6. Cloudflare Turnstile

Turnstile מגן על הטופס מספאם. עובד גם כשהאתר על Vercel.

1. גשו ל-[dash.cloudflare.com](https://dash.cloudflare.com) ולחצו **Sign Up**
2. לאחר כניסה, לחצו על **Turnstile** בתפריט הצד
3. לחצו **Add site**
4. שם: "עודד אמר"
5. Domain: `odedamar.co.il` (הדומיין שלכם)
6. Widget type: בחרו **Managed**
7. לחצו **Create**
8. תקבלו שני מפתחות:
   - **Site Key** (מתחיל ב-`0x4A...`) ← זהו `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
   - **Secret Key** ← זהו `TURNSTILE_SECRET_KEY`

---

## 7. משתני סביבה

כל המפתחות מוגדרים ב-Vercel ב-Settings של הפרויקט.

**לפרויקט על Vercel:**

1. גשו ל-Vercel Dashboard ← הפרויקט שלכם
2. לחצו **Settings** ← **Environment Variables**
3. הוסיפו כל אחד מהמשתנים הבאים:

| שם המשתנה | ערך לדוגמה | הערות |
|---|---|---|
| `ADMIN_PASSWORD` | `סיסמה-חזקה-שלכם` | **חובה** — לכניסה לאדמין |
| `CONTACT_EMAIL` | `your@email.com` | כתובת לקבלת פניות |
| `RESEND_API_KEY` | `re_xxxxx` | ממדריך Resend למעלה |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | `0x4AAAA...` | ממדריך Turnstile |
| `TURNSTILE_SECRET_KEY` | `0x4AAAA_secret` | ממדריך Turnstile |
| `NEXT_PUBLIC_SITE_URL` | `https://odedamar.co.il` | הדומיין הסופי שלכם |
| `WEBHOOK_URL` | `https://hook.make.com/...` | אופציונלי — ל-Make/Zapier |

את `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, ו-`BLOB_READ_WRITE_TOKEN` — Vercel מוסיף אוטומטית לאחר חיבור ה-Storage.

**לקובץ `.env.local` על המחשב המקומי:**

העתיקו את כל הערכים לקובץ `.env.local` על המחשב שלכם כדי שהסביבה המקומית תעבוד זהה לייצור.

---

## 8. פריסה ל-Vercel

**שיטה א — דרך ה-Vercel CLI (מהטרמינל):**

```bash
# התקינו את Vercel CLI
npm install -g vercel

# היכנסו לחשבון שלכם
vercel login

# פרסו
cd "d:\VS CODE\oded-amar"
vercel --prod
```

**שיטה ב — דרך GitHub (מומלץ לעדכונים עתידיים):**

1. העלו את הפרויקט ל-GitHub:
   - גשו ל-[github.com](https://github.com) וצרו Repository חדש
   - בטרמינל הריצו:
     ```
     git init
     git add .
     git commit -m "Initial commit"
     git remote add origin https://github.com/YOUR_USERNAME/oded-amar.git
     git push -u origin main
     ```
2. ב-Vercel Dashboard, לחצו **New Project**
3. בחרו **Import Git Repository** ← בחרו את `oded-amar`
4. ודאו שה-Framework הוא **Next.js**
5. לחצו **Deploy**

כל פעם שתדחפו קוד ל-GitHub, Vercel יפרסם אוטומטית.

---

## 9. חיבור דומיין

לאחר פריסה ראשונה:

**ב-Vercel:**

1. גשו ל-Dashboard ← הפרויקט ← **Settings** ← **Domains**
2. הזינו את הדומיין שלכם, לדוגמה: `odedamar.co.il`
3. לחצו **Add**
4. Vercel יציג לכם את רשומות ה-DNS שצריך להוסיף

**אצל רשם הדומיין שלכם (Godaddy, Name.com, Domain.co.il, וכו'):**

גשו לניהול הדומיין ← DNS Management ← הוסיפו:

**אפשרות א — אם הדומיין הוא apex (ללא www):**

| Type | Name | Value |
|---|---|---|
| A | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

**אפשרות ב — אם אתם משתמשים ב-www:**

| Type | Name | Value |
|---|---|---|
| CNAME | www | cname.vercel-dns.com |

**ואז:**

5. חזרו ל-Vercel וחכו דקות עד שעה לאימות
6. Vercel מוסיף SSL (HTTPS) אוטומטית, בחינם
7. עדכנו את `NEXT_PUBLIC_SITE_URL` למחרת הדומיין המלא

---

## 10. החלפת נכסים

**החלפת הלוגו:**

דרך לוח הניהול (`/admin/content` ← Tab "Hero"):
1. לחצו **העלה** ליד שדה "לוגו"
2. בחרו את קובץ הלוגו שלכם (PNG עם רקע שקוף מומלץ)
3. לחצו **שמור שינויים**

**החלפת תמונת הפורטרט:**

דרך לוח הניהול (`/admin/content` ← Tab "Hero"):
1. לחצו **העלה** ליד שדה "תמונת פורטרט"
2. בחרו את הצילום שלכם (JPEG/PNG, מינימום 800x1000 פיקסל)
3. לחצו **שמור שינויים**

**החלפת הוידאו:**

1. העלו את הוידאו ל-YouTube (כגלוי או לא רשום)
2. מהכתובת `https://www.youtube.com/watch?v=XXXXXXXXXX` — העתיקו את `XXXXXXXXXX`
3. גשו ל-`/admin/content` ← Tab "Hero" ← שדה "YouTube Video ID"
4. הדביקו את ה-ID ולחצו **שמור שינויים**

---

## 11. לוח הניהול

גשו ל-`https://odedamar.co.il/admin` והיכנסו עם הסיסמה שהגדרתם ב-`ADMIN_PASSWORD`.

**פניות (CRM):**
- רשימת כל הפניות מהטופס, חדשות ראשון
- ניתן לסנן: הכל / לטיפול / טופל
- לחצו "סמן כטופל" לאחר שדיברתם עם הלקוח

**עריכת תוכן:**
- שנו כל כיתוב באתר ללא כתיבת קוד
- העלו תמונות ישירות
- ערכו שאלות ותשובות
- שנו פרטי קשר ומספר וואטסאפ
- לחצו **שמור שינויים** — האתר מתעדכן מיד

---

## 12. הסבר עלויות

### מה חינמי

| שירות | תוכנית חינמית |
|---|---|
| Upstash Redis | 10,000 בקשות/יום, 256MB — מספיק בנוחות לאתר נחיתה |
| Vercel Blob | 1GB אחסון, 1GB העברה/חודש — מספיק לתמונות |
| Resend | 100 אימיילים/יום, 3,000/חודש — מספיק לחלוטין |
| Cloudflare Turnstile | בלי הגבלות לשימוש סביר |

### עלות Vercel

כאן יש החלטה שצריכה להיות שלכם:

**תוכנית Hobby (חינמית):**
Vercel מציעה תוכנית חינמית לפרויקטים אישיים. תנאי השימוש אומרים שהיא מיועדת לשימוש אישי לא מסחרי. אתר עסקי כמו שלכם נופל טכנית בגדר "מסחרי".

**האפשרויות שלכם:**

1. **להישאר על Hobby (חינם)** — בפועל Vercel לא אוכפת זאת באגרסיביות עבור אתרי נחיתה קטנים, והסיכון המעשי נמוך. אבל זה לא רשמית מורשה.

2. **לשדרג ל-Vercel Pro ($20/חודש)** — מורשה לשימוש מסחרי, ללא הגבלות, עם uptime SLA טוב יותר.

3. **לעבור ל-Cloudflare Pages (חינם מסחרי)** — Cloudflare Pages מציע תוכנית חינמית שמורשית לשימוש מסחרי. ה-migration פשוט מכיוון שהקוד הוא Next.js. כאן תצטרכו:
   - להחליף Upstash Redis ב-Cloudflare KV (API דומה)
   - להחליף Vercel Blob ב-Cloudflare R2 (API דומה)

**המלצה:** אם האתר קטן ונפח התנועה נמוך, תוכנית Hobby עובדת בפועל. כשהאתר יתבסס ויתחיל להניב הכנסות, שדרגו ל-Pro. זו ההחלטה שלכם.

---

## שאלות נפוצות

**ש: שיניתי תוכן בלוח הניהול אבל האתר לא התעדכן.**
ת: רעננו את הדף (F5). שינויי התוכן מיידיים.

**ש: לא מגיעים אימיילים.**
ת: בדקו שה-`RESEND_API_KEY` וה-`CONTACT_EMAIL` נכונים ב-Environment Variables של Vercel. גשו ל-Vercel Dashboard ← Settings ← Environment Variables.

**ש: לוח הניהול אומר "Unauthorized".**
ת: הסיסמה שהזנתם לא תואמת את `ADMIN_PASSWORD`. בדקו ב-Vercel Dashboard.

**ש: הוידאו לא עולה.**
ת: ודאו שה-YouTube Video ID נכון (לא כל ה-URL, רק ה-ID — לדוגמה `LSyWn4tF1EU`).

---

## תמיכה

לשאלות טכניות, פנו למפתח שבנה את האתר.
