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