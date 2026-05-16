# Architecture
<!--
- Primary goal: document and describe the architecture of the system
- Use C4 notation, provide levels 1-2-3:
    - Declare the tool(s) used for C4 diagram
    - Context diagram
    - Container diagram
    - Components diagrams (motivate decisions if you may need to discard specific containers)
- Tooling
    - https://c4model.com/tooling
    - indicate what you used in the report
- Max 2500 words, excluding diagrams
-->

## Introduction
Rust Analyzer is structured using a **compiler-as-a-library** architectural pattern. It operates as a collection of modular libraries working together to provide structured syntactic and semantic analysis of Rust source code. However, it is important to note that the crates within the `crates/` directory form an internal architecture; they are not published as independent tools and are not intended for external use.

<!--
Note from Marco Oliviero:
I'm not sure about this part, because as we discovered recently, the majority of the crates are not intended for external use.
Cfr:
    Published Library Crates: Three crates in lib/ are published to crates.io as independent libraries

    Internal Crates: All crates in crates/ have version 0.0.0 and are not intended for external use. They form rust-analyzer's internal architecture and can evolve freely without backward compatibility constraints

    link: https://deepwiki.com/rust-lang/rust-analyzer/2.1-crate-structure-and-dependencies
-->

In this analysis we focused our attention on what is probably the most common use case for Rust Analyzer: a user interacting with Rust Analyzer through an IDE to obtain language tooling features (such as code completion, type checking, error checking, goto-definitions, … ).

To support this highly interactive environment, Rust Analyzer relies on a loosely layered architecture where each internal layer exposes a clear API boundary and builds on top of lower-level abstractions. This decoupling allows the system to utilize internal components in isolation. By combining these modular pieces, the architecture successfully achieves the fast, incremental computation required for responsive IDE features.

## Context level
<!--
- Context level: diagram and explanations
-->

As mentioned in the introduction, Rust Analyzer's core workflow consists of a user asking its IDE for some language tooling feature. The IDE then forwards this request to Rust Analyzer using the LSP protocol.


<figure>
    <center>
        <img
        src="../../img/diagrams/architecture/system-context.png"
        alt="system-context"
        />
        <figcaption><em>Figure 1.1: System context diagram</em></figcaption>
    </center>
</figure>


> "The Language Server Protocol (LSP) is an open, JSON-RPC-based protocol for use between source-code editors or integrated development environments (IDEs) and servers that provide 'language intelligence tools'. The goal of the protocol is to allow programming language support to be implemented and distributed independently of any given editor or IDE."
> 
> \- *Wikipedia*

***

## Container Level
<!--
- Container level: diagram and explanations
    * Did you find any relationship with the Clean Architecture blueprint?

Salsa apparently shouldn't be considered a container, as it's not a database running as a separate process, but rather a logical component that implements incremental persistance.
-->

At the container level Rust Analyzer's layered architecture is not yet visible, though some of the most important entities start to emerge.

The external IDE interacts directly with the language server exposed by Rust Analyzer's single deployed container.

<figure>
    <center>
        <img
        src="../../img/diagrams/architecture/container.png"
        alt="container"
        />
        <figcaption><em>Figure 2.1: Container diagram</em></figcaption>
    </center>
</figure>




As Rust Analyzer is a single deployable unit, the clean architecture blueprint is not yet clearly visible at this level of abstraction.
Rust Analyzer's designers were clearly aware of "clean code" and "clean architecture" approaches as it will become evident in the next section.

***

## Component Level
<!--
- Component level: diagrams and explanations
    * Did you observe any violation of SOLID principles at level 3 ?
-->

At a high level, Rust Analyzer is structured in a loosely layered way, as shown in the figure 3.1.
The analysis starts when the client requests some type of analysis through the LSP protocol.
The LSP layer than forwards this request to the `IDE` layer. 
Then `IDE` layer asks the lower levels to provide the actual analysis of the code:
the syntactic layer parses the text and generates a valid CST of the provided source files.
Then, the semantic layer takes the CST input and applies semantical meaning to it: mapping syntax nodes to logical concepts. 



<figure align="center">
        <img
        src="../../img/diagrams/architecture/layered-architecture.png"
        alt="layered-architecture"
        />
        <figcaption><em>Figure 3.1: Rust's Analizer layered architecture</em></figcaption>
</figure>

<figure align="center">
        <img
        src="../../img/diagrams/architecture/component.png"
        alt="component"
        />
        <figcaption><em>Figure 3.2: Component diagram</em></figcaption>
</figure>

### Boundaries

After analyzing more in details the components, several boundaries have been discovered.

Starting from the lowest level, the `syntax` crate constitutes the first boundary. In fact this crate is responsible to transform text into a lossless syntax tree, as a consequence it knows nothing about salsa or LSP, so this makes it totally independent from the rest of Rust Analyzer. Basically the `syntax` crate can be seen as an enrty point to the system, providing API calls, so it is an API boundary.

Going up, we find another API boundary at the top level `hir` crate. That's beacuse it wraps ECS-style internal API into a more Object Oriented flavored API.

On top of `hir`, there is the API boundary given by `ide` crate. Indeed, thanks to `Analysis` type and all its methods, it behaves like a façade, providing API calls for the upper level `rust-analyzer` crate. And also because it translates the data received from `hir` into POD structs, without knowing anything about LSP.

Last boundary is at the `rust-analyzer` crate, simply because it's the only crate knowing something about Language Server Protocol, so it defines an LSP interface in terms of *stdio*, acting as an **Anti-Corruption Layer**.

***

## Architectural characteristics
<!--
- Architectural characteristics: comment on important architectural characteristics/qualities of the system and how they are supported by the architecture
    * You might also use components coupling and cohesion metrics to support your reasoning
-->

### Robustness and Fault Tolerance
In an IDE the code is most of the time broken. Due to that, the architecture must treat broken code as the normal state, without generating failures, and this is an important feature of Rust Analyzer architecture, having resistence to uncomplete or malformed inputs and internal failures. This is reached by these principles:

* **Non-destructive parsing**: `syntax` crate guarantees that parsing never fails, indeed it returns `(Tree, Vec<Error>)` instead of `Result<T, Error>`. This ensures that the AST is always generated, even with error nodes, allowing the semantic layer to provide features like *code completion*.
* **Graceful cancellation**: when a user types a new character, any background process which is analyzing the old code must be stopped. This is done by the `salsa` database, which bumps a revision counter, causing background threads to panic. The outer LSP boundary catches these panics using `catch_unwind` and transforms them into graceful cancellation responses for the IDE, preventing the system from crashing while freeing up CPU resources immediately.
* **Process isolation for external code**: Rust heavily utilizes Procedural Macros, which execute custom, third-party code during compilation. Because poorly written macros can infinite-loop or panic, Rust Analyzer delegates macro expansion to an entirely separate OS process (`proc-macro-srv`). This creates a strict fault-isolation boundary: if a macro crashes, only the child process dies, while the main language server remains responsive.

### Portability and Determinism
Rust Analyzer uses a virtual file system to abstract away how files are actually stored in the file system.
This is done for several reasons:
1. Rust Analyzer, to avoid occupying too much memory, has to be able to create derived data, forget about it and then recompute it again. Rust Analyzer is therefore mostly concerned with storing stable, versioned snapshots of file contents, so that the analysis can be incremental and deterministic. 
2. Rust Analyzer wants to be *platform-agnostic*, it should be able to work regardless of the underlying file system used by the OS. The VFS helps decouple the internal representation of files from how the OS keeps track of them. Only specific submodules (`loader`) know actual OS paths.
3. On a similar vein, Rust Analyzer would also like to be able to support Multi-file system works (for example, projects written on a Windows machine, but analyzed on a separate Linux server).

For Rust Analyzer is much simpler to create an internal representation of files as text snapshots indexed by an ID, removing direct dependence on OS paths and file system semantics. To achieve this, stored files aren't identified by their paths, but through a field called `FileId`. 
 
Using IDs to identify files has another important consequence: it makes it very hard to go from a `FileId` to an actual file on the OS file system.
This makes it easier to avoid mistakes where a developer accidentally reads a file directly and causes problems.
This way, access to files happens strictly through the *virtual file system*.
This trend is visible throughout this whole component, file system specific information is systematically erased and only the virtual representation is available to the rest of the project.

<!--
> **Architecture Invariant**
> VFS doesn't perform any IO directly and doesn't load or read files, its job is only to record state. The VFS is updated through events such as `set_file_contents`, which in turn updates the `changes` array.
>
> It's instead `loader.rs` job to perform the actual read of the file. It is both able to read files and detect when they have been changed (and emit the associated events). The 'watching' functionality is a non-trivial issue to solve, as most raw OS APIs don't offer a reliable mechanism to detect changes. The crate `vfs_notify` is an implementation of `loader::Handle` and implements the file watching function.
>
> The file watching bits here are untested and quite probably buggy. For this reason, by default Rust Analyzer doesn't watch files and relies on editor’s file watching capabilities instead.
-->

`FileSet` is a special module that allows VFS to be split into "chunks" that roughly correspond to single crate. This is quite useful because it allows to prevent the propagation of changes across the whole VFS, thus help limit recomputation by grouping related files.

### Performance and Responsiveness
To provide real-time IDE features (such as auto-completion and type checking) without noticeable latency, `rust-analyzer` must return results in milliseconds. Because executing a full compilation cycle on every keystroke is computationally impossible, the architecture relies heavily on **Incremental Computation**, driven by an underlying in-memory database component called `salsa`.

* **Query-Based Architecture**: Instead of a traditional compiler pipeline (Lexing $\rightarrow$ Parsing $\rightarrow$ Type Checking), the architecture is modeled as a database of facts. The raw source files are the "inputs" and everything else (ASTs, resolved types, diagnostics) is a "derived query". `salsa` automatically tracks the dependencies between these queries.
* **Granular Cache Invalidation**: When the user types a character, `rust-analyzer` packages the modification into a `Change` struct and applies it to the database. Because `salsa` tracks exact query dependencies, it only invalidates and recomputes the specific derived data affected by that edit (e.g., the local variables within the currently edited function), leaving the rest of the project's semantic model cached and instantly available.
* **Durability Levels (**`HIGH` **vs** `LOW`**)**: By default, changing any input in a global database might invalidate the entire cache. To prevent this, the architecture implements a strict classification of data volatility using "Durability" levels. User code being actively edited is marked as `Durability::LOW`, while external dependencies and the Rust standard library are marked as `Durability::HIGH`. Modifying low-durability data does not trigger a revalidation of high-durability data, saving massive amounts of CPU cycles and allowing the server to respond instantly.
* **Separation of Compiler and IDE State**: To further optimize performance and prevent the compiler layers from doing unnecessary work, the database is split into two distinct traits: `SourceDatabase` (for core compiler logic) and `SourceDatabaseExt` (for IDE-specific needs). This strict boundary ensures that the core semantic analyzer is never forced to recompute its state just because an IDE-only visual feature changed.

***


