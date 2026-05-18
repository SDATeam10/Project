# Individual Journal: Nima

***

### Date: 2026-05-04

### Period: 4 hours

### Cooperators
* Abdullah Rezaei
* Saeid Albouyeh

### Objectives
* Go through the codebase to find the 4 design patterns required for the Design report.
* Write down the analysis (roles, problem solved, alternatives) for each pattern based on Prof. Torchiano's slides.

### Activities & Effort
* [x] Searched the `ide` and `syntax` crates to see how they structure the code.
* [x] Found 4 concrete patterns: Facade, Visitor, Builder, and Strategy.
* [x] Drafted the descriptions and pros/cons for these patterns.
* [x] Added the final text to the `Design.md` file.

### Report

Today I spent most of my time looking for design patterns to complete the missing section in our Software Design report. Since Abdullah already mapped out the dependencies, it was a bit easier to know where to look. I checked Professor Torchiano's slides and managed to map 4 patterns in the `rust-analyzer` code:
- Facade (in the `ide` crate)
- Visitor (used for AST traversal in `syntax`)
- Builder (in `syntax::make`)
- Strategy (inside `ide_completion`)

I wrote down why they were used and what alternatives existed, then pushed the updates to `Design.md`.

***

## Date: 2026-05-18

### Period: 3.5 hours

### Objectives
* **Compile Project Overview:** Draft and structure the executive summary for the complete system report.
* **Methodology Alignment:** Document and clarify the exact tooling and empirical methods utilized across the architectural and design phases.

### Activities & Effort
* [x] **Main Purpose & Stakeholder Layout:** Authored a clear overview of the library-compiler paradigm and classified end-user vs contributor concerns.
* [x] **Methodology Mapping:** Explicitly integrated the project's analytical toolchain (`scc`, `cargo-modules` v1.94.0, `analyze-dependencies.js`, PlantUML/Mermaid pipeline) and detailed the concrete "Go to Definition" code inspection methodology.
* [x] **System Summaries:** Synthesized the architectural Salsa invariants and mapped the design patterns (Adapter, Facade, Builder, Strategy) strictly within the execution path of the 5 core crates.

### Report
I completed the first integrated draft of the project's Overview document following the layout requested by Matteo and the technical requirements discussed with Abdullah. The text was structured to clearly separate our tool-driven design methodology from our architectural summaries while actively preserving the baseline metrics and statistics previously implemented by Saeid.
