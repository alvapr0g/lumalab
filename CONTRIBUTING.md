# Cómo se trabaja en el sitio

El sitio de Luma Lab es HTML estático publicado en Firebase Hosting (proyecto
`luma-labs-comunity`). Hay dos ambientes y cada uno tiene su rama.

| Rama | Para qué | Cómo entra un cambio | Se publica en |
|---|---|---|---|
| `feature/<nombre>-<tema>`, `fix/<nombre>-<tema>` | Trabajo de cada uno | Push libre | Link de vista previa en el PR (7 días) |
| `development` | Integración y pruebas | PR desde tu rama. Push directo **solo** si es documentación | `dev.lumalab.io` |
| `main` | Producción | Solo PR desde `development` | `lumalab.io` |

"Documentación" son los archivos `*.md` y todo lo que está en `docs/`. Esos cambios no
publican nada en ningún ambiente.

## Primera vez en tu clon

```bash
bash scripts/instalar-hooks.sh
```

Activa el hook `.githooks/pre-push`, que rechaza el push directo a `main` y el push directo a
`development` cuando trae algo que no es documentación.

## El ciclo de un cambio

```bash
git switch development && git pull
git switch -c feature/alvaro-hero        # tu rama
# ... cambios, commits ...
git push -u origin feature/alvaro-hero
gh pr create --base development          # o desde github.com
```

1. Al abrir el PR, GitHub Actions publica una **vista previa** y deja el link como comentario.
   Se actualiza con cada push a tu rama. Sirve para mostrar el cambio antes de mergear.
2. Se mergea el PR a `development` y el cambio queda en **dev.lumalab.io**.
3. Cuando dev está bien, se abre un PR de `development` a `main`. Al mergearlo se publica en
   **lumalab.io**.

## Controles

- **En tu computador:** el hook `pre-push` (se puede saltar con `--no-verify`, por eso hay
  controles en el servidor).
- **En GitHub:** `main` exige PR y no acepta force push; `development` no acepta force push
  ni borrado. El workflow `ramas` falla si un PR a `main` no viene de `development`, o si un
  commit entra directo a `development` con código.

## Publicar a mano

No hace falta, los workflows publican solos. Si alguna vez se necesita:

```bash
firebase deploy --only hosting:dev    # dev.lumalab.io
firebase deploy --only hosting:prod   # lumalab.io
```
