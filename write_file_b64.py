import sys, base64, pathlib
path = sys.argv[1]
b64 = sys.argv[2]
p = pathlib.Path(path)
p.parent.mkdir(parents=True, exist_ok=True)
p.write_bytes(base64.b64decode(b64))
print(f'Wrote {path}')
