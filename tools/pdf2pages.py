"""يحوّل ملف PDF (كتاب أو رزمة) إلى صفحات webp ويضيفه إلى books/manifest.json

الاستعمال:
  python3 tools/pdf2pages.py كتاب.pdf --id phys10 --kind books --subject 0 --title "كتاب الفيزياء" [--width 1100] [--quality 70]
المواد: 0 فيزياء، 1 كيمياء، 2 أحياء. النوع: books أو packs.
"""
import argparse, json, subprocess, sys, tempfile
from pathlib import Path
from PIL import Image

ap = argparse.ArgumentParser()
ap.add_argument("pdf"); ap.add_argument("--id", required=True); ap.add_argument("--kind", default="books", choices=["books", "packs"])
ap.add_argument("--subject", type=int, required=True); ap.add_argument("--title", required=True)
ap.add_argument("--width", type=int, default=1100); ap.add_argument("--quality", type=int, default=70)
a = ap.parse_args()
root = Path(__file__).resolve().parent.parent
out = root / "books" / a.id
out.mkdir(parents=True, exist_ok=True)
with tempfile.TemporaryDirectory() as td:
    subprocess.run(["pdftoppm", "-r", "110", "-png", a.pdf, f"{td}/p"], check=True)
    files = sorted(Path(td).glob("p-*.png"))
    for i, f in enumerate(files, 1):
        im = Image.open(f).convert("RGB")
        if im.width > a.width:
            im = im.resize((a.width, round(im.height * a.width / im.width)), Image.LANCZOS)
        im.save(out / f"p-{i:03d}.webp", "WEBP", quality=a.quality, method=6)
n = len(files)
mf = root / "books" / "manifest.json"
m = json.loads(mf.read_text(encoding="utf-8")) if mf.is_file() else {"books": [], "packs": []}
m[a.kind] = [x for x in m.get(a.kind, []) if x["id"] != a.id] + [{"id": a.id, "s": a.subject, "t": a.title, "n": n}]
mf.write_text(json.dumps(m, ensure_ascii=False, indent=1), encoding="utf-8")
print(f"{n} صفحة → books/{a.id}/  ({sum(p.stat().st_size for p in out.glob('*.webp'))/1e6:.1f} م.ب)")
