import os
from dotenv import load_dotenv

load_dotenv()

BOT_TOKEN = os.getenv("BOT_TOKEN", "8321664057:AAEY70QjIt9-LDdebPoa2UGGQP5YkwzRCPk")
WEBAPP_URL = os.getenv("WEBAPP_URL", "https://your-domain.com")
ADMIN_ID = int(os.getenv("ADMIN_ID", "0")) if os.getenv("ADMIN_ID") else None

WEBAPP_HOST = os.getenv("WEBAPP_HOST", "0.0.0.0")
WEBAPP_PORT = int(os.getenv("WEBAPP_PORT", "8080"))
