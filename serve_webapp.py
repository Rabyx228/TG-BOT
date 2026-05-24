"""Simple static file server for the webapp folder.

Useful for local development. For production, host webapp/ on any HTTPS host
(GitHub Pages, Vercel, Netlify, etc.) and put the URL into WEBAPP_URL.

Run:  python serve_webapp.py
"""
import os
from aiohttp import web

from config import WEBAPP_HOST, WEBAPP_PORT

WEBAPP_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "webapp")


async def index(request: web.Request) -> web.FileResponse:
    return web.FileResponse(os.path.join(WEBAPP_DIR, "index.html"))


def make_app() -> web.Application:
    app = web.Application()
    app.router.add_get("/", index)
    app.router.add_static("/", WEBAPP_DIR, show_index=False)
    return app


if __name__ == "__main__":
    print(f"Serving {WEBAPP_DIR} at http://{WEBAPP_HOST}:{WEBAPP_PORT}")
    web.run_app(make_app(), host=WEBAPP_HOST, port=WEBAPP_PORT)
