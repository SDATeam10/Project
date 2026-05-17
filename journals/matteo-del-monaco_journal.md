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
- **17:49:03 — chore: added transcript file to gitignore**
    - `.gitignore` : +2/-0
- **17:49:11 — feat: added crate graph section**
    - `src/deliverables/Architecture.md` : +37/-0

### 2026-05-03
- **11:07:51 — feat: started base db section**
    - `src/deliverables/Architecture.md` : +5/-0
- **12:39:08 — feat: base database crate**
    - `src/deliverables/Architecture.md` : +45/-0

### 2026-05-06
- **11:57:11 — chore: moved architectural notes from `src/deliverables/Architecture.md` to `res/architecture-notes.md`**
    - `res/architecture-notes.md` : +166/-0
    - `src/deliverables/Architecture.md` : +0/-139

### 2026-05-07
- **10:52:08 — chore: added shell.sh to gitignore**
    - `.gitignore` : +1/-0

### 2026-05-10
- **16:45:35 — feat: syntax overview**
    - `res/architecture-notes.md` : +55/-0
- **16:53:04 — fix: merge conflict + typos**
    - `journals/marco-oliviero_journal.md` : +18/-1
    - `res/architecture-notes.md` : +14/-0
- **17:10:07 — feat: added technology used in some diagrams**
    - `img/diagrams/architecture/component.png` : +0/-0
    - `img/diagrams/architecture/container.png` : +0/-0
    - `img/diagrams/architecture/layered-architecture.png` : +0/-0
    - `img/diagrams/architecture/system-context.png` : +0/-0
    - `src/diagrams/architecture/container.puml` : +8/-5
    - `src/diagrams/architecture/system-context.puml` : +6/-4
- **18:19:06 — feat: comment on SOLID**
    - `res/architecture-notes.md` : +23/-0

### 2026-05-15
- **11:00:58 — feat: design review**
    - `design-review.md` : +35/-0
- **12:28:43 — feat: SOLID analysis**
    - `src/deliverables/Architecture.md` : +47/-18
- **12:29:15 — feat: merge**
    - `img/diagrams/architecture/container.png` : +0/-0
    - `img/diagrams/architecture/system-context.png` : +0/-0
    - `src/diagrams/architecture/container.puml` : +3/-2
    - `src/diagrams/architecture/system-context.puml` : +1/-1
- **12:36:29 — fix: minor edits**
    - `src/deliverables/Architecture.md` : +5/-3
- **12:37:23 — fix: rust -> Rust**
    - `src/deliverables/Architecture.md` : +1/-1
- **12:39:19 — fix: broken design link**
    - `src/deliverables/Architecture.md` : +1/-1
- **17:12:34 — feat: recompiled plantuml source to regenarate .png**
    - `img/diagrams/architecture/container.png` : +0/-0
    - `img/diagrams/architecture/system-context.png` : +0/-0

### 2026-05-17
- **12:11:24 — style: reworked boudary section**
    - `src/deliverables/Architecture.md` : +16/-13
- **14:17:32 — feat: reworked previous sections and added diagrams to improve clarity**
    - `src/deliverables/Architecture.md` : +151/-23
- **14:22:15 — fix: duplicated sentece**
    - `src/deliverables/Architecture.md` : +0/-1
- **14:25:21 — fix: minor rewording**
    - `src/deliverables/Architecture.md` : +1/-4
