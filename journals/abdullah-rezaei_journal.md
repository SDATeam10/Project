# Individual Journal: Abdullah Rezaei

***

### Date: 2026-04-18

### Period: 5 hours

### Cooperators
* [Saeid Albouyeh]

### Objectives
* **Objective 1:** Extract basic code statistics (number of files, lines of code) required for the Report Overview section.
* **Objective 2:** Establish a native, AST-aware methodology to map and evaluate code dependencies to identify the most and least dependent files for the Software Design report.

### Activities & Effort
* [x] Extracted baseline repository statistics (#files, #lines of code) utilizing the `scc` tool.
* [x] Evaluated `auto-uml` and `Mermaid Preview` for full-system UML generation.
* [x] Transitioned to `cargo-modules` to leverage native Rust AST parsing.
* [x] Downgraded `cargo-modules` to version 1.94.0 to resolve CLI compatibility issues.
* [x] Scoped the analysis to core foundational crates (`rust-analyzer`, `hir`, `syntax`, `ide`) due to workspace constraints.
* [x] Generated `.dot` graphs and parsed them via shell scripts to calculate file-level dependencies.

### Report

Today's effort focused on gathering baseline metrics for the Overview section and establishing a reliable, accurate methodology for evaluating code dependencies.

For the Overview portion, the `scc` tool was successfully employed to efficiently generate the required code statistics, providing a precise breakdown of the file counts and lines of code across the repository. 

The Software Design portion required an iterative, problem-solving approach. Initially, I attempted to generate a comprehensive UML diagram utilizing `auto-uml` and the `Mermaid Preview` extension. However, this generic approach was not perfectly suited for Rust's unique architecture. To ensure a higher standard of architectural analysis, I actively searched for a native solution and selected `cargo-modules`, a tool specifically designed to parse Rust's abstract syntax tree.

Integrating this tool presented technical challenges. First, I had to resolve a versioning issue by downgrading the tool to version 1.94.0 to regain access to necessary `.dot` graph generation features. Second, because `rust-analyzer` is structured as a massive Cargo Workspace, `cargo-modules` inherently blocked attempts to map the entire repository at once; it strictly mandates that the user specify a single target crate. 

This technical requirement actually proved beneficial. By being forced to focus on specific, foundational crates(`rust-analyzer`, `hir`, `syntax`, `ide`), I avoided generating an illegible, massive dependency web. Generating individual `.dot` graphs for these core crates allowed me to bypass visual clutter entirely and parse the data programmatically using shell scripts to identify exactly which files act as central orchestrators and which operate as standalone utilities.

***