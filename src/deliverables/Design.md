## Patterns

While reviewing the `rust-analyzer` source code, we found several design patterns. We selected the following four patterns to analyze:

### 1. Facade Pattern
* **Links to code:** `crates/ide/src/lib.rs`
* **Which classes play which role:** The `ide` crate essentially acts as a **Facade**. The `Analysis` and `AnalysisHost` structs are the main interface, hiding the complex inner workings of crates like `hir` and `syntax`.
* **Why is the pattern used / Problem solved:** The LSP client just wants to do high-level things like `goto_definition`. If we exposed the whole compiler logic to the client, the coupling would be huge. The Facade pattern gives the client a simple API without forcing it to understand syntax trees.
* **Alternative and Pros/Cons:** The alternative is letting the LSP server interact directly with `hir` and `syntax`.
    * *Pros:* No need to write and maintain wrapper functions.
    * *Cons:* Too much coupling. If the internal AST changes, the LSP server code would break immediately.

### 2. Visitor Pattern
* **Links to code:** `crates/syntax/src/ast/traits.rs`
* **Which classes play which role:** We found this in the `syntax` and `hir` crates. The `Visitor` trait is the **Visitor**, and the different AST nodes (like `Struct`, `Fn`) are the **Concrete Elements**.
* **Why is the pattern used / Problem solved:** The compiler needs to do a lot of different things with the syntax tree (like type checking or highlighting). Instead of modifying the AST nodes every time we need a new operation, the Visitor pattern lets us separate the algorithm from the object structure.
* **Alternative and Pros/Cons:** We could just use Rust's `match` statements across the AST enums.
    * *Pros:* It's the standard, idiomatic way to do things in Rust.
    * *Cons:* For a project this big, the match blocks would get huge, making the code really hard to read and maintain.

### 3. Builder Pattern
* **Links to code:** `crates/syntax/src/make.rs`
* **Which classes play which role:** Found in `syntax::make`. The builder functions here act as the **Builder** to create complex **Products** (like immutable AST nodes).
* **Why is the pattern used / Problem solved:** Creating complex AST nodes requires a lot of parameters and optional child nodes. Rust doesn't have default arguments, so using a Builder makes it much easier to construct these objects step-by-step without making mistakes.
* **Alternative and Pros/Cons:** Writing a single big constructor function with lots of `Option<T>` arguments.
    * *Pros:* Less boilerplate code (fewer structs to manage).
    * *Cons:* The code becomes very ugly when you have to pass things like `(None, Some(x), None)` over and over again.

### 4. Strategy Pattern
* **Links to code:** `crates/ide_completion/src/context.rs`
* **Which classes play which role:** Inside the `ide_completion` crate. The completion engine is the **Context**, and the specific providers (like `keyword` or `snippet` completion) act as the **Concrete Strategies**.
* **Why is the pattern used / Problem solved:** When asking for code completion, the engine has to choose what to suggest based on where the cursor is. The Strategy pattern delegates this to specific modules instead of having one massive function that tries to handle every single case.
* **Alternative and Pros/Cons:** A giant `generate_completions` function with lots of nested `if` and `match` blocks.
    * *Pros:* Everything is in one place.
    * *Cons:* It violates the Open-Closed Principle. Every time someone adds a new completion feature, they'd have to edit the core engine file.
