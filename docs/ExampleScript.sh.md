# Beispielscript

Der Befehl `npm run scripts:generate` generiert aus allen Dateien in docs (ohne \_book & \_layout) die zwei Dateiendungen enthalten (zB .sh.md oder .ini.md) dazugehörige Dateien.
Dabei wird die Endung .md entfernt und nur der Inhalt aus Codeblöcken verwendet. Die fertigen Dateien landen in /scripts/

Hier steht ganz viel Markdown drinnen.

Und manchmal auch ein Code Block
```bash
#!/bin/bash
echo "Hello, World!"
```

Und dannach geht es einfach normal weiter.
