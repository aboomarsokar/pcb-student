"""يبني «نسخة الطالب» ملفاً واحداً: يدمج الصور والفيديوهات داخل الصفحة.

الاستعمال:  python3 build.py
الناتج:     dist/pcb-student.html  (يُرسل كما هو على واتساب ويعمل بلا إنترنت)

- كلُّ مرجعٍ مثل  images/اسم.jpg  داخل index.html يصير  data:image/...;base64,...
- كلُّ مرجعٍ مثل  fonts/اسم.woff2  يصير data:font/woff2;base64,...
- كلُّ قيمةٍ مثل  "videos/اسم.mp4"  داخل var VID تصير نصَّ base64 (تفكّه الدالة vurl).
"""
import base64
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SRC = ROOT / "index.html"
OUT = ROOT / "dist" / "pcb-student.html"

MIME = {
    "jpg": "image/jpeg",
    "jpeg": "image/jpeg",
    "png": "image/png",
    "gif": "image/gif",
    "webp": "image/webp",
    "svg": "image/svg+xml",
}

IMG_REF = re.compile(r"images/[\w.-]+\.(jpg|jpeg|png|gif|webp|svg)\b")
VID_REF = re.compile(r'"videos/([\w.-]+\.mp4)"')
FONT_REF = re.compile(r"fonts/[\w.-]+\.woff2")
SCRIPT_REF = re.compile(r'<script src="(lib/[\w.-]+\.js)"></script>')
LESSON_REF = re.compile(r'"lessons/([\w.-]+\.html)"')


def b64(path: Path) -> str:
    if not path.is_file():
        sys.exit(f"ملفٌّ مفقود: {path.relative_to(ROOT)}")
    return base64.b64encode(path.read_bytes()).decode("ascii")


def main() -> None:
    html = SRC.read_bytes().decode("utf-8")
    counts = {"img": 0, "vid": 0}

    def inline_img(m: re.Match) -> str:
        counts["img"] += 1
        return f"data:{MIME[m.group(1)]};base64,{b64(ROOT / m.group(0))}"

    def inline_vid(m: re.Match) -> str:
        counts["vid"] += 1
        return f'"{b64(ROOT / "videos" / m.group(1))}"'

    def inline_font(m: re.Match) -> str:
        counts["font"] = counts.get("font", 0) + 1
        return f"data:font/woff2;base64,{b64(ROOT / m.group(0))}"

    def inline_lesson(m: re.Match) -> str:
        counts["lesson"] = counts.get("lesson", 0) + 1
        path = ROOT / "lessons" / m.group(1)
        if not path.is_file():
            sys.exit(f"ملفٌّ مفقود: {path.relative_to(ROOT)}")
        t = path.read_text(encoding="utf-8").replace('<base href="../">', "")
        def inline_js(mm: re.Match) -> str:
            jp = ROOT / mm.group(1)
            if not jp.is_file():
                sys.exit(f"ملفٌّ مفقود: {jp.relative_to(ROOT)}")
            raw = jp.read_bytes()
            if jp.suffix == ".js" and b"fonts/" in raw:
                raw = FONT_REF.sub(inline_font, raw.decode("utf-8")).encode("utf-8")
            libs[mm.group(1).split("/")[-1]] = base64.b64encode(raw).decode("ascii")
            return "<!--LIB:" + mm.group(1).split("/")[-1] + "-->"

        t = SCRIPT_REF.sub(inline_js, t)
        t = IMG_REF.sub(inline_img, t)
        t = FONT_REF.sub(inline_font, t)
        return '"b64html:' + base64.b64encode(t.encode("utf-8")).decode("ascii") + '"'

    libs: dict = {}
    html = LESSON_REF.sub(inline_lesson, html)
    if libs:
        html = html.replace("var LIBJS={};", "var LIBJS=" + json.dumps(libs) + ";", 1)
    html = IMG_REF.sub(inline_img, html)
    html = FONT_REF.sub(inline_font, html)
    html = VID_REF.sub(inline_vid, html)

    def inline_main_lib(m: re.Match) -> str:
        jp = ROOT / m.group(1)
        if not jp.is_file():
            sys.exit(f"ملفٌّ مفقود: {jp.relative_to(ROOT)}")
        return "<script>" + jp.read_text(encoding="utf-8").replace("</script", "<\\/script") + "</script>"

    html = re.sub(r'<script src="(lib/(?:icons|voice|bg|reader)\.js)"></script>', inline_main_lib, html)

    mf = ROOT / "books" / "manifest.json"
    if mf.is_file():
        html = html.replace("/*LIBM*/null", json.dumps(json.loads(mf.read_text(encoding="utf-8")), ensure_ascii=False), 1)

    OUT.parent.mkdir(exist_ok=True)
    OUT.write_bytes(html.encode("utf-8"))
    size = OUT.stat().st_size / 1024 / 1024
    print(f"صور: {counts['img']} · فيديو: {counts['vid']} → {OUT.relative_to(ROOT)} ({size:.1f} م.ب)")


if __name__ == "__main__":
    main()
