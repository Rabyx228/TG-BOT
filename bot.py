import asyncio
import json
import logging
from aiogram import Bot, Dispatcher, F
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode
from aiogram.filters import CommandStart, Command
from aiogram.types import (
    Message,
    InlineKeyboardButton,
    InlineKeyboardMarkup,
    ReplyKeyboardMarkup,
    KeyboardButton,
    WebAppInfo,
)

from config import BOT_TOKEN, WEBAPP_URL, ADMIN_ID
from products import get_product_by_id

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
)
log = logging.getLogger(__name__)

bot = Bot(
    token=BOT_TOKEN,
    default=DefaultBotProperties(parse_mode=ParseMode.HTML),
)
dp = Dispatcher()


def main_menu_keyboard() -> ReplyKeyboardMarkup:
    return ReplyKeyboardMarkup(
        keyboard=[
            [
                KeyboardButton(
                    text="🍎 Открыть Apple Store",
                    web_app=WebAppInfo(url=WEBAPP_URL),
                )
            ],
            [
                KeyboardButton(text="📦 Мои заказы"),
                KeyboardButton(text="ℹ️ О магазине"),
            ],
            [KeyboardButton(text="📞 Поддержка")],
        ],
        resize_keyboard=True,
        input_field_placeholder="Выберите действие…",
    )


def webapp_inline_keyboard() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(
                    text="🛍 Открыть магазин",
                    web_app=WebAppInfo(url=WEBAPP_URL),
                )
            ]
        ]
    )


@dp.message(CommandStart())
async def cmd_start(message: Message):
    user_name = message.from_user.first_name or "друг"
    text = (
        f"<b>Привет, {user_name}!</b> 👋\n\n"
        "Добро пожаловать в <b>Apple Store</b> — официальный магазин "
        "продуктов Apple с быстрой доставкой и гарантией.\n\n"
        "✨ В каталоге:\n"
        "• iPhone 15 Pro Max, Pro, 15\n"
        "• MacBook Pro, MacBook Air, iMac\n"
        "• iPad Pro, iPad Air\n"
        "• Apple Watch Ultra 2, Series 9\n"
        "• AirPods Pro 2, AirPods Max\n\n"
        "Нажмите <b>«Открыть Apple Store»</b>, чтобы выбрать и оформить заказ."
    )
    await message.answer(text, reply_markup=main_menu_keyboard())


@dp.message(Command("menu"))
async def cmd_menu(message: Message):
    await message.answer("Главное меню:", reply_markup=main_menu_keyboard())


@dp.message(Command("shop"))
async def cmd_shop(message: Message):
    await message.answer(
        "🛍 Откройте каталог Apple Store:",
        reply_markup=webapp_inline_keyboard(),
    )


@dp.message(Command("help"))
async def cmd_help(message: Message):
    text = (
        "<b>Команды бота:</b>\n\n"
        "/start — начать работу\n"
        "/shop — открыть магазин\n"
        "/menu — главное меню\n"
        "/help — справка\n\n"
        "Поддержка: @support"
    )
    await message.answer(text)


@dp.message(F.text == "📦 Мои заказы")
async def my_orders(message: Message):
    await message.answer(
        "📦 <b>Мои заказы</b>\n\n"
        "У вас пока нет заказов. Откройте магазин и выберите товар!",
        reply_markup=webapp_inline_keyboard(),
    )


@dp.message(F.text == "ℹ️ О магазине")
async def about(message: Message):
    text = (
        "🍎 <b>Apple Store</b>\n\n"
        "Мы — официальный магазин продуктов Apple.\n\n"
        "✅ Только оригинальная продукция\n"
        "✅ Гарантия 1 год от производителя\n"
        "✅ Быстрая доставка по всей стране\n"
        "✅ Trade-in и рассрочка 0%\n"
        "✅ Профессиональная настройка устройств\n\n"
        "<i>Think different.</i>"
    )
    await message.answer(text)


@dp.message(F.text == "📞 Поддержка")
async def support(message: Message):
    text = (
        "📞 <b>Служба поддержки</b>\n\n"
        "Мы на связи 24/7:\n"
        "• Telegram: @support\n"
        "• Email: help@apple-store.ru\n"
        "• Телефон: 8 800 555-35-35\n\n"
        "Среднее время ответа — 5 минут."
    )
    await message.answer(text)


@dp.message(F.web_app_data)
async def web_app_data(message: Message):
    try:
        data = json.loads(message.web_app_data.data)
    except json.JSONDecodeError:
        await message.answer("Не удалось обработать данные заказа.")
        return

    if data.get("action") != "order":
        await message.answer("Получены данные из мини-приложения.")
        return

    items = data.get("items", [])
    customer = data.get("customer", {})
    total = data.get("total", 0)

    if not items:
        await message.answer("Корзина пуста.")
        return

    lines = ["🛒 <b>Новый заказ</b>\n"]
    for it in items:
        product = get_product_by_id(it.get("id", "")) or {}
        name = product.get("name") or it.get("name", "Товар")
        qty = it.get("qty", 1)
        price = it.get("price", product.get("price", 0))
        color = it.get("color", "")
        storage = it.get("storage", "")
        opts = " · ".join(x for x in [color, storage] if x)
        opts_str = f" ({opts})" if opts else ""
        lines.append(f"• {name}{opts_str} × {qty} — ${price * qty}")

    lines.append(f"\n<b>Итого: ${total}</b>")
    if customer:
        lines.append("\n<b>Контакт:</b>")
        if customer.get("name"):
            lines.append(f"Имя: {customer['name']}")
        if customer.get("phone"):
            lines.append(f"Телефон: {customer['phone']}")
        if customer.get("address"):
            lines.append(f"Адрес: {customer['address']}")

    order_text = "\n".join(lines)

    await message.answer(
        order_text + "\n\n✅ Спасибо! Менеджер свяжется с вами в течение 10 минут.",
    )

    if ADMIN_ID:
        try:
            user = message.from_user
            user_info = f"\n\n<b>Покупатель:</b> @{user.username or '—'} (id: <code>{user.id}</code>)"
            await bot.send_message(ADMIN_ID, order_text + user_info)
        except Exception as e:
            log.warning("Failed to notify admin: %s", e)


@dp.message()
async def fallback(message: Message):
    await message.answer(
        "Я не понял команду. Откройте магазин или используйте меню.",
        reply_markup=main_menu_keyboard(),
    )


async def main():
    log.info("Bot is starting…")
    await bot.delete_webhook(drop_pending_updates=True)
    await dp.start_polling(bot)


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except (KeyboardInterrupt, SystemExit):
        log.info("Bot stopped.")
