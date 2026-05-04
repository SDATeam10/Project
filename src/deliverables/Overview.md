### Basic Code Statistics
The analysis was performed using `scc` tool. It is a tool for counting the lines of code, blank lines, comment lines, and physical lines of source code in many programming languages.

| Language    | Files | Lines   | Blanks | Comments | Code    |
|------------|------:|--------:|-------:|---------:|--------:|
| Rust       | 1,452 | 561,484 | 37,153 | 31,456   | 492,875 |
| Plain Text | 93    | 5,724   | 0      | 0        | 5,724   |
| TOML       | 55    | 2,061   | 334    | 95       | 1,632   |
| Markdown   | 46    | 8,426   | 2,580  | 0        | 5,846   |
| HTML       | 32    | 2,469   | 231    | 0        | 2,238   |
| TypeScript | 27    | 7,301   | 795    | 383      | 6,123   |
| JSON       | 17    | 23,908  | 6      | 0        | 23,902  |
| YAML       | 13    | 1,123   | 175    | 63       | 885     |
| License    | 7     | 877     | 133    | 0        | 744     |
| SVG        | 2     | 230     | 2      | 2        | 226     |
| AsciiDoc   | 1     | 90      | 13     | 0        | 77      |
| Dockerfile | 1     | 8       | 3      | 0        | 5       |
| JavaScript | 1     | 144     | 15     | 9        | 120     |
| Python     | 1     | 145     | 27     | 29       | 89      |
| Shell      | 1     | 53      | 6      | 27       | 20      |
| **Total**  | 1,749 | 614,043 | 41,473 | 32,064   | 540,506 |

### High Level Code Statistics
* **Total Packages:** 48 (Based on project structures using shell script `find . -name "Cargo.toml" | wc -l`)
* **Total Modules:** 3249 (Based on search among packages using shell script `grep -rnE "^[[:space:]]*(pub(\([^)]+\))?[[:space:]]+)?mod[[:space:]]+[a-zA-Z0-9_]+" crates/`)
* **Total Authors:** 800+ (Based on repository logs using code-maat `java -jar ~/Apps/code-maat/code-maat-1.0.4-standalone.jar -l logfile.txt -c git2 -a authors`)

#### Top 10 Contributors
1. Aleksey Kladov (matklad)
2. Laurențiu Nicola (lnicola)
3. Lukas Wirth (Veykril)
4. Florian Diebold (flodiebold)
5. Jonas Schievink (JonasSchievink)
6. Edwin Cheng (edwin0cheng)
7. Jeremy Kolb (kjeremy)
8. David Barsky (davidbarsky)
9. Kirill Bulatov (SomeoneToIgnore)
10. Chayim Friedman (ChayimFriedman2)

#### Packages List
| No. | Package Name |
|---|---|
| 1 | `(workspace root)` |
| 2 | `base-db` |
| 3 | `cfg` |
| 4 | `edition` |
| 5 | `fuzz` |
| 6 | `hir` |
| 7 | `hir-def` |
| 8 | `hir-expand` |
| 9 | `hir-ty` |
| 10 | `ide` |
| 11 | `ide-assists` |
| 12 | `ide-completion` |
| 13 | `ide-db` |
| 14 | `ide-diagnostics` |
| 15 | `ide-ssr` |
| 16 | `imp` |
| 17 | `intern` |
| 18 | `la-arena` |
| 19 | `limit` |
| 20 | `line-index` |
| 21 | `load-cargo` |
| 22 | `lsp-server` |
| 23 | `macros` |
| 24 | `mbe` |
| 25 | `parser` |
| 26 | `paths` |
| 27 | `proc-macro-api` |
| 28 | `proc-macro-srv` |
| 29 | `proc-macro-srv-cli` |
| 30 | `proc-macro-test` |
| 31 | `profile` |
| 32 | `project-model` |
| 33 | `query-group-macro` |
| 34 | `rust-analyzer` |
| 35 | `rustc-dependencies` |
| 36 | `sourcegen` |
| 37 | `span` |
| 38 | `stdx` |
| 39 | `syntax` |
| 40 | `syntax-bridge` |
| 41 | `test-fixture` |
| 42 | `test-utils` |
| 43 | `text-edit` |
| 44 | `toolchain` |
| 45 | `tt` |
| 46 | `vfs` |
| 47 | `vfs-notify` |
| 48 | `xtask` |
