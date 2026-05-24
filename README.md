# Apple Store — Telegram Bot + Mini App

Профессиональный Telegram-бот с встроенным Web App в фирменном стиле Apple.
Каталог: iPhone, Mac, iPad, Apple Watch, AirPods. Оформление заказа отправляется в бот.

## Стек

- **Бот:** Python 3.10+ / [aiogram 3](https://docs.aiogram.dev/)
- **Mini App:** статический HTML + CSS + JS (без сборки) + [Telegram Web App API](https://core.telegram.org/bots/webapps)
- **Static server (dev):** aiohttp

## Структура

```
.
├── bot.py                # основная логика бота
├── config.py             # конфиг (токен, URL)
├── products.py           # каталог товаров (Python)
├── serve_webapp.py       # локальный статический сервер для webapp/
├── webapp/               # сам Mini App
│   ├── index.html
│   ├── styles.css        # Apple-style: SF Pro, gradient title, blurred nav, pills
│   └── app.js            # каталог, корзина, оформление заказа
├── requirements.txt
├── .env.example
└── README.md
```

## Установка

```bash
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
```

Откройте `.env` и заполните:

```
BOT_TOKEN=8321664057:AAEY70QjIt9-LDdebPoa2UGGQP5YkwzRCPk
WEBAPP_URL=https://your-domain.com    # ОБЯЗАТЕЛЬНО HTTPS!
ADMIN_ID=                              # ваш Telegram ID — будут приходить заказы
```

## Где захостить Mini App

Telegram требует **HTTPS** для Web App. Варианты:

| Хостинг | Как |
|---|---|
| **GitHub Pages** | Залить папку `webapp/` в публичный репо → Settings → Pages → Source: main |
| **Vercel** | `cd webapp && vercel --prod` |
| **Netlify** | `netlify deploy --dir=webapp --prod` |
| **Cloudflare Pages** | drag-and-drop `webapp/` |
| **Свой сервер** | `python serve_webapp.py` + nginx + Let's Encrypt |

После деплоя пропишите URL в `WEBAPP_URL`.

Для локального тестирования через тоннель:

```bash
python serve_webapp.py        # → http://localhost:8080
ngrok http 8080               # получите https://xxxx.ngrok.io
# WEBAPP_URL=https://xxxx.ngrok.io
```

## Запуск

```bash
python bot.py
```

Откройте бота в Telegram → `/start` → «🍎 Открыть Apple Store».

## Регистрация Web App в @BotFather (опционально)

Чтобы добавить кнопку Web App в меню бота:

1. `@BotFather` → `/mybots` → выберите бота
2. **Bot Settings → Menu Button → Configure Menu Button**
3. Текст: `🍎 Apple Store`, URL: ваш `WEBAPP_URL`

## Что умеет бот

- `/start` — приветствие + reply-клавиатура с кнопкой запуска Mini App
- `/shop` — inline-кнопка запуска
- `/menu`, `/help`
- 📦 Мои заказы · ℹ️ О магазине · 📞 Поддержка
- Принимает `web_app_data` от мини-приложения — формирует красивое сообщение заказа покупателю и (опционально) администратору

## Что умеет Mini App

- 🎨 Дизайн в стиле apple.com/store: SF Pro, hero, gradient-заголовок, blurred sticky nav, pill-категории, карточки на `--bg-tertiary`, поддержка dark mode
- 📱 5 категорий, 12 товаров
- 🎯 Страница товара с выбором цвета и накопителя
- 🛍 Корзина с шагалками, удалением, бесплатной доставкой от $999
- 💳 Чекаут (имя, телефон, адрес) → отправка `Telegram.WebApp.sendData(...)` в бот
- 🔄 Haptic feedback, BackButton, persistent корзина в `localStorage`

## Замена картинок / товаров

Каталог дублирован в `products.py` (бот) и `webapp/app.js` (CATALOG). Удобно
вынести в один JSON и читать в обоих местах — это следующий шаг для расширения.

## Лицензия

MIT. Apple, iPhone, Mac, iPad, Apple Watch, AirPods — товарные знаки Apple Inc.
