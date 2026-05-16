# Individual Journal: Abdullah Rezaei

***

### Date: 2026-04-18

### Period: 8 hours

### Cooperators
* Saeid Albouyeh

### Objectives
* **Basic code statistics(number of files, lines of code)**
* **Establish a native, AST-aware methodology to map and evaluate code dependencies to identify the most/least dependent files**

### Activities & Effort
* [x] Extracted baseline repository statistics (#files, #lines of code) utilizing the `scc` tool.
* [x] Evaluated `auto-uml` and `Mermaid Preview` for full-system UML generation.
* [x] Transitioned to `cargo-modules` to leverage native Rust AST parsing.

### Report

For the Overview portion, the `scc` tool was successfully employed to efficiently generate the required code statistics, providing a precise breakdown of the file counts and lines of code across the repository. 

The Software Design portion required an iterative, problem-solving approach. Initially, I attempted to generate a comprehensive UML diagram utilizing `auto-uml` and the `Mermaid Preview` extension. However, this generic approach was not perfectly suited for Rust's unique architecture. To ensure a higher standard of architectural analysis, I actively searched for a native solution and selected `cargo-modules`, a tool specifically designed to parse Rust's abstract syntax tree.

Integrating this tool presented technical challenges. First, I had to resolve a versioning issue by downgrading the tool to version 1.94.0 to regain access to necessary `.dot` graph generation features. Second, `cargo-modules` inherently blocked attempts to map the entire repository at once; it strictly mandates that the user specify a single target crate. So, for the analyses we want to perform, we should keep in mind that we need to generate diagrams for each crate separately.

***

### Date: 2026-05-04

### Period: 1 hour

### Cooperators
* Saeid Albouyeh

### Objectives
* **Writing basic code statistics section**

### Activities & Effort
* [x] Extracted baseline repository statistics (#files, #lines of code) utilizing the `scc` tool.

### Report

The focus was on completing the Basic Code Statistics overview by validating metrics such as Languages, Files, Lines, Blanks, Comments, and Code, and applying them to the entire project, as well as completing the related section in the Overview report.

***

### Date: 2026-05-12

### Period: 6 hours

### Cooperators
* Saeid Albouyeh

### Objectives
* **Automate the extraction and analysis of code dependencies**

### Activities & Effort
* [x] Developed a custom, automated parsing tool to extract, filter, and quantify workspace-wide dependency graphs.

### Report

Today's effort was dedicated to scaling our dependency analysis from a manual, per-crate approach to a fully automated, workspace-wide architectural evaluation. To fulfill the design report requirements, we formally mapped the concepts of "most/least dependent components" to standard software engineering metrics: **Fan-Out** (Out-Degree) and **Fan-In** (In-Degree).

Initially, I realized that relying on simple string matching (Regex) to count `use` statements was fundamentally flawed for a complex Rust codebase, as it fails to account for macros and complex module trees. While `cargo-modules` provided the necessary AST-aware `.dot` graphs, manually generating and parsing these graphs for dozens of crates was unscalable. To resolve this, I developed a [custom Node.js script](../tools/analyze-dependencies.js)(should be placed in the project root and executed using the command `node analyze-dependencies.js`) to dynamically iterate through all directories, execute the CLI commands, and generate comprehensive Crate-Level and Global-Level summaries.

We observed that the native `cargo-modules` tool often treats inline modules (e.g., `mod ext { ... }`) as distinct entities, even if they reside within the same physical file. **Ultimately, we made the architectural decision to base our evaluation strictly on *logical module dependencies* rather than physical file dependencies.** A module, whether inline or in a separate file, enforces namespace encapsulation and acts as a legitimate logical boundary. This perspective successfully yielded a clean, precise, and logically sound representation of the system's internal coupling.