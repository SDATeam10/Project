# Individual Journal: Marco Oliviero

***

### Date: 2026-04-21

### Period: 3 hours

### Objectives
* **Understanding Rust analyzer architecture:** Read the documentation about rust analyzer features and architecture

### Activities & Effort
* [x] Read the main `README.md` about the features rust analyzer offers
* [x] Read the `architecture.md` file to understand the structure and architecture of the system

### Report

Today's work was dedicated on understanding the whole structure of rust analyzer to have a global overview on how the system works

***

### Date: 2026-04-24

### Period: 3 hours

### Objectives
* **Analyzing the crates' tasks:** Discover which are the main tasks of the main crates

### Activities & Effort
* [x] Understood better which are the most important crates and how they interact with each other
* [x] Discovered the control flow of some main features rust analyzer offers
* [x] Defined the control flow between the crates `rust-analyzer`, `ide`, `hir`, `base-db` and `syntax`

### Report

Today's work was dedicated on understanding better the tasks of the most important crates, how they interact with each other and how the flow works in some important situation.


More in details:
* `rust-analyzer`: the only crate to know what a JSON or LSP is. It works as a transport and anti-corruption layer, handling the standard I/O mantaining the stateless server loop

* `ide`: the main API boundary for IDE features. It provides a stable, "Plain Old Data" (POD) interface using editor terminology (like text offsets) instead of compiler terminology. Apart from this crate, there are several crates of the form `ide-xxx` which handles more specific actions, like `ide-comletition`

* `hir`: the High-level Intermediate Representation façade. It wraps the raw, internal ECS-style compiler data into an Object-Oriented API. It provides a static, fully resolved view of the code. As for `ide`, it too has similar crates (`hir-xxx`) which do more specific actions

* `syntax`: defines the Rust syntax tree structure using the rowan library. It acts as an independent entry point and guarantees that parsing never fails, returning incomplete trees alongside errors instead of crashing

* `base-db`: the foundation of the incremental computation engine. It wraps the `salsa` database crate and defines the fundamental "ground state" inputs (files, crate graphs) that all other computations are derived from

***

### Date: 2026-04-25

### Period: 2 hours

### Objectives
* **Discover the main control flow:** Understand the main control flow for some important features rust-analyzer offers
* **Define some control flow diagrams:** Draw diagrams to summarize the flows

### Activities & Effort
* [x] Understood the control flow for some of the main real situations of rust-analyzer
* [x] Defined some raw diagrams showing the interactions between the main crates for the situation analyzed

### Report

Today's work was dedicated on discovering some important control flows, apllying the knowledge took from last work to guess the interactions between the crates and then confirming it from documentation, helped by AI. Then some diagrams of these flows have been defined and uploaded into `Project/img/diagrams/flowsDiagrams`

More in details:

* `Go-to-definition.png`: the flow describes the situation when a user who wrote a function, want to go to its definition

* `Code completition`: the flow describes the situation when the editor suggests a possible code completition while the user is writing. More importance has to be brought to `ide-completition` crate, which is an example of responsibility isolation, due to the complicate action to be performed

* `Signature help`: the flow describes the situation when a user is inserting the arguments in a defined function, and the editor helps him by showing what the function expects

***

### Date: 2026-04-28

### Period: 2 hours

### Objectives
* **Understand better internal architecture and crates' functioning**: understand better what every crate does and which is its place in the architecture and general overview

### Activities & Effort
* [x] Understood more details about some crates which are essential for the workflow of the system, like `hir`, `syntax` or `salsa` crates

### Report

Today's work was dedicated on discovering in a more detailed way the tasks in each crate. By reading the guide `rust-analyzer/docs/book/src/contributing/guide.md` it has been possible. For example how the `salsa` framework is queried to get any analysis information after every change. Or more important how syntax tree are built and visited.

***

### Date: 2026-05-05

### Period: 3 hours

### Objectives
* **Architecture report**: contribute on writing the report for architecture part

### Activities & Effort
* [x] Reviewed the already written things in the report
* [x] Contributed on writing more things in the report

### Report

Today's work was dedicated on reviewing and writing the report for the architecture part of Rust Analyzer. More specifically:
* checked the grammatical, syntattical and conceptual correctness of what my collegue already wrote
* adjusted the introduction
* Started to write the `Architectural characteristics` part

***

### Date: 2026-05-09

### Period: 2 hours

### Objectives
* **Architecture notes**: searching for other architectural notes

### Activities & Effort
* [x] Searched for SOLID principles' applications and violations in rust-analyzer architecture
* [x] Wrote these notes in the `architecture-note.md` document, ready for approval for inserting in main architecture report

### Report

Today's work was dedicated on investigating, in a more detailed way, in the Rust-analyzer architecture to individuate the applications of SOLID principle, but more importantly for their violations.

***

### Date: 2026-05-15

### Period: 2 hours

### Objectives
* **Design report review**: reviewing the `Design.md` report
* **Architecture report review**: reviewing and adjusting the `Architecture.md` report

### Activities & Effort
* [x] Read and reviewed the report for the Design part, notifying the other contributors for doubts
* [x] Adjusted the Architecture report on some inconsistencies

### Report

Today's work was dedicated on reading, reviewing and adjusting the two main reports documents.

***

### Date: 2026-05-16

### Period: 1 hours

### Objectives
* **Architecture report**: add more details in the `Architecture.md` report

### Activities & Effort
* [x] Searched for details about boundaries in the project
* [x] Added a section in the `Architecture.md` report about boundaries

### Report

Today's work was dedicated on researching more about Rust Analyzer architecture, giving more interest in the boundaries and wrote a paragraph about them.