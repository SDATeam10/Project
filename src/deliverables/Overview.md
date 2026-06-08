# Rust Analyzer: Project Overview

## 1. Main Purpose
`rust-analyzer` functions as a modular, query-driven language server engineered specifically for the Rust programming language. Its core architecture transitions away from traditional batch-compiler models toward a "compiler-as-a-library" implementation. The primary objective of the system is to act as an LSP (Language Server Protocol) backend that delivers real-time semantic and syntactic intelligence to modern IDEs. Unlike rigid ahead-of-time compilers, it is designed from the ground up to handle incomplete, mutating, or syntactically broken source code interactively, ensuring features like type inference, auto-completion, and on-the-fly diagnostics operate with millisecond-level latency during active typing loops.

## 2. Stakeholders
The project accommodates two distinct stakeholder groups with different operational requirements:
* **End Users (Rust Developers):** Software engineers utilizing extension-enabled code editors (such as VS Code or Neovim) who depend entirely on the language server's stability, execution speed, and feature accuracy to navigate and refactor complex Rust codebases daily.
* **Tooling Developers & Contributors:** Open-source maintainers and downstream developer tool architects who build upon, extend, or integrate `rust-analyzer`'s underlying semantic engines, libraries, and compilation crates to drive external development utilities.

## 3. Methodology & Tooling
Our reverse-engineering and evaluation of `rust-analyzer` relied on a multi-tiered quantitative and qualitative framework to extract structural insights without relying on speculative conclusions:
* **Repository & Codebase Metrics:** We leveraged the static analysis tool `scc` to systematically measure physical files, comment densities, and absolute lines of source code across the entire workspace directory.
* **Workspace Dependency Tracks:** To map exact structural coupling, we utilized `cargo-modules` (pinned to version 1.94.0) to output native, abstract syntax tree (AST)-aware graphs. The resulting metrics were processed through a custom Node.js script (`tools/analyze-dependencies.js`) to parse structural dependencies and calculate the precise Fan-In and Fan-Out values across the system.
* **Architectural Modeling:** Visual boundaries and subsystem distributions were mapped utilizing the formal **C4 Model** conventions. Diagrams were scripted and compiled locally into target image assets via PlantUML configurations and standalone Mermaid scripts using our automated compilation pipeline (`tools/puml2img/compile-architecture.sh`).
* **Design Pattern Justification:** Rather than extracting design patterns out of context, we traced an active end-to-end IDE feature execution path—specifically focusing on a *"Go to Definition"* request. We monitored how this control flow propagated across the system boundaries and systematically mapped the interacting code structures against the structural and behavioral pattern criteria outlined in our course framework, checking individual roles, problem contexts, and design alternatives.


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



## 4. Architecture Summary
The architectural model of `rust-analyzer` implements a loosely layered pipeline designed to enforce a hard separation between external wire-protocol communication and internal compiler state management. The engine's core execution flow is centered around an incremental computation model driven by the `salsa` framework. By operating as an on-demand database, the system caches structural data and computes only the exact delta affected by a user's local file modification, optimizing processing cycles.

The infrastructure maintains three primary architectural invariants:
* **Fault Isolation:** External, unpredictable tasks such as procedural macro evaluations are detached completely from the primary server thread and executed within an independent operational process (`proc-macro-srv`) to insulate the language server from catastrophic crashes.
* **Portability & System Decoupling:** Filesystem lookups and physical paths are wrapped inside an abstract Virtual File System (`vfs`), mapping system files to immutable, versioned internal tokens (`FileId`) to ensure environment-agnostic execution.
* **Volatilities Control:** Cache invalidation loops are constrained using High vs. Low durability tiers within the database layer, ensuring active typing edits within a local scratchpad do not force a rebuild of stable high-durability targets like external library dependencies.

## 5. Design Summary 
The design analysis focused strictly on evaluating the structural and behavioral patterns implemented across the primary 5 core modules (crates) that orchestrate the system's execution pipeline:

$$\text{rust-analyzer} \longrightarrow \text{ide} \longrightarrow \text{hir} \longrightarrow \text{syntax} \longrightarrow \text{parser}$$

By analyzing the interfaces across these specific boundaries during a target execution flow, we verified the application of four structural, creational, and behavioral design patterns adapted to Rust's unique type system:
* **Adapter Pattern (Structural Boundary: `rust-analyzer`):** Serves as an anti-corruption layer on the server loop edge. The system uses the `from_proto` and `to_proto` modules to actively map and translate external, line/column-based LSP JSON structures into the text offsets and structural primitives required by the internal compilation database.
* **Facade Pattern (Structural Boundary: `ide`):** Implemented directly through the `ide::Analysis` entry struct. It encapsulates the massive underlying operational complexity of the syntax trees, Salsa queries, and semantic indices behind a clean, unified public API wrapper designed for consumption by request handlers.
* **Builder Pattern (Creational Boundary: `syntax`):** Driven by the internal `SyntaxTreeBuilder` to build a complex, immutable, and lossless green syntax tree. The object is built step-by-step through a decoupled series of discrete event streams driven by the parsing stage, hiding mutable tree mutations from consumers.
* **Strategy Pattern (Behavioral Boundary: `parser`):** Anchored within the `TopEntryPoint::parse` entry sequence. Instead of running a rigid file-wide parser, the framework accepts a `TopEntryPoint` token to dynamically swap the executing grammar strategy at runtime depending on whether it needs to parse an standalone expression, a block, a type, or an entire source file.
