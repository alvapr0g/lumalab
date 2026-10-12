# CLAUDE.md · Luma-Lab (sitio)

Código de `lumalab.io`, HTML estático en Firebase Hosting. La base de conocimiento del equipo
(decisiones, tablero, actas) vive en `luma-lab-io/comunidad`.

## Antes de hacer push o abrir un PR

Este repo trabaja con ramas: `feature/<nombre>-<tema>` → PR a `development` (publica en
`dev.lumalab.io`) → PR de `development` a `main` (publica en `lumalab.io`). A `development`
solo entra directo la documentación (`*.md`, `docs/`). Resumen en `CONTRIBUTING.md`.

**Ante un push rechazado, un error `GH013` o un check en rojo:** leer la guía
`docs/sitio/flujo-de-ramas.md` del repo `luma-lab-io/comunidad`, sección "Errores y qué hacer":
https://github.com/luma-lab-io/comunidad/blob/main/docs/sitio/flujo-de-ramas.md

No saltarse el hook con `--no-verify` para "destrabar" un push: mover los commits a una rama
propia y abrir un PR, como indica la guía.

## Reglas

- El material crudo de WhatsApp (audios, fotos, exports) nunca entra a este repo.
- Los `*.md`, `docs/` y `scripts/` no se publican en el sitio (`firebase.json`, campo `ignore`).
- Infraestructura (Firebase, Cloudflare, secrets): la lleva César.
