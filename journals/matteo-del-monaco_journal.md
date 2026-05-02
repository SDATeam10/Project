### 2026-03-27
- **15:07:03 — Initial commit**
    - `.gitignore` : +24/-0

### 2026-04-09
- **21:59:52 — feat: base repo structure**
    - `README.md` : +13/-0
    - `journals/abdullah-rezaei_journal.md` : +0/-0
    - `journals/marco-oliviero_journal.md` : +0/-0
    - `journals/matteo-del-monaco_journal.md` : +0/-0
    - `journals/nima-_journal.md` : +0/-0
    - `journals/saaed-alebooyeh_journal.md` : +0/-0
    - `src/deliverables/Architecture.md` : +44/-0
    - `src/deliverables/Design.md` : +39/-0
    - `src/deliverables/Overview.md` : +7/-0
- **22:02:05 — fix: added .gitkeep**
    - `doc/.gitkeep` : +0/-0
    - `journals/.gitkeep` : +0/-0
    - `res/.gitkeep` : +0/-0
    - `src/.gitkeep` : +0/-0
    - `tools/.gitkeep` : +0/-0
- **22:04:11 — fix: added conditional phrasing**
    - `README.md` : +9/-9
- **22:05:46 — feat: added final reflection on where to possibly place internal notes**
    - `README.md` : +2/-0

### 2026-04-18
- **18:43:40 — feat: added a few useful references**
    - `res/architecture-useful-references.md` : +4/-0
- **18:44:23 — feat: added basic notes no rust's architecture**
    - `src/diagrams/architecture/component.png` : +0/-0
    - `src/diagrams/architecture/containers.png` : +0/-0
    - `src/diagrams/architecture/context.png` : +0/-0
    - `src/diagrams/architecture/context.puml` : +34/-0

### 2026-04-21
- **11:25:40 — feat: general notes on rust's main architecture. The diagram is not c4 compliant yet**
    - `src/diagrams/architecture/component.png` : +0/-0
    - `src/diagrams/architecture/container.puml` : +44/-0
    - `src/diagrams/architecture/containers.png` : +0/-0
    - `src/diagrams/architecture/context.png` : +0/-0
    - `src/diagrams/architecture/context.puml` : +0/-34
    - `src/diagrams/architecture/system-context.puml` : +17/-0
- **11:26:58 — feat: added imgs**
    - `img/diagrams/architecture/container.png` : +0/-0
    - `img/diagrams/architecture/system-context.png` : +0/-0
- **18:11:37 — feat: added automatic compilation for plantuml architecture diagrams**
    - `tools/puml2img/compile-architecture.sh` : +4/-0
- **18:12:37 — feat: expanded general architecture module, note, this is not C4 compliant yet; I am trying to understand the system before modelling it according to C4 standard**
    - `img/diagrams/architecture/container.png` : +0/-0
    - `src/diagrams/architecture/container.puml` : +12/-2

### 2026-04-24
- **16:55:42 — fix: removed references**
    - `src/diagrams/architecture/container.puml` : +0/-4
- **16:55:51 — feat: added two new ferences**
    - `res/architecture-useful-references.md` : +4/-0

### 2026-04-30
- **08:49:55 — feat: created component and container stub diagrams**
    - `img/diagrams/architecture/component.png` : +0/-0
    - `img/diagrams/architecture/container.png` : +0/-0
    - `src/diagrams/architecture/component.puml` : +47/-0
    - `src/diagrams/architecture/container.puml` : +7/-35
- **10:01:39 — feat: added images, short introduction and system context first draft**
    - `src/deliverables/Architecture.md` : +23/-0
- **10:37:44 — feat: container section draft**
    - `src/deliverables/Architecture.md` : +12/-0
- **10:40:24 — feat: removed xtask and base-db**
    - `src/diagrams/architecture/container.puml` : +0/-4

### 2026-05-01
- **11:01:17 — feat: diagram that shows the underlying loosely layered architecture of rust analyzer**
    - `img/diagrams/architecture/layered-architecture.png` : +0/-0
    - `src/diagrams/architecture/layered-architecture.puml` : +24/-0
- **11:01:51 — chore: re-rendered image to allign with latest changes**
    - `img/diagrams/architecture/container.png` : +0/-0
- **11:11:43 — style: changed diagram's direction from 'top to bottom' to 'left to right'**
    - `img/diagrams/architecture/container.png` : +0/-0
    - `img/diagrams/architecture/system-context.png` : +0/-0
    - `src/diagrams/architecture/container.puml` : +2/-0
    - `src/diagrams/architecture/system-context.puml` : +1/-0
- **11:12:04 — feat: wrapped images in figure html to improve layout**
    - `src/deliverables/Architecture.md` : +44/-4
- **16:38:51 — feat: component draft and VFS notes**
    - `src/deliverables/Architecture.md` : +41/-1
- **19:11:04 — fix: 'Integration' -> 'LSP Integratino'**
    - `src/diagrams/architecture/layered-architecture.puml` : +1/-1
- **19:11:16 — feat: added notes on IDE crate**
    - `src/deliverables/Architecture.md` : +19/-1
- **19:16:21 — fix: trying to see if align="center" is actually supported by github markdown renderer**
    - `src/deliverables/Architecture.md` : +2/-6

### 2026-05-02
- **11:35:09 — feat: added main loop section**
    - `src/deliverables/Architecture.md` : +40/-10
