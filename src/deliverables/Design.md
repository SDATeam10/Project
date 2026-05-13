## Code Dependencies

### Methodology and Tools
To analyze dependencies across the `rust-analyzer` workspace, we utilized **`cargo-modules`** to extract AST-aware `.dot` graphs and developed a [custom Node.js script](../../tools/analyze-dependencies.js) to process the data workspace-wide. `std` and external crates are excluded to strictly measure internal system coupling.

### Architectural Validation
During our initial system modeling, we visually hypothesized that the primary execution spine of the system flows sequentially through specific core components:
**Rust Analyzer ➔ Ide ➔ Hir ➔ Syntax ➔ Parser**
<figure align="center">
        <img
        src="../../img/diagrams/architecture/component.png"
        alt="component"
        />
        <figcaption><em>Component diagram</em></figcaption>
</figure>

Following this visual design, we intentionally focused our analytical efforts on this pipeline. The subsequent automated dependency extraction perfectly validated this hypothesis. The calculated metrics proved that these specific crates act as the absolute backbone of the system, exhibiting the highest Fan-In and Fan-Out values.

### Results and Analysis (Fan-In / Fan-Out)

We evaluated the architectural coupling using standard metrics: **Fan-Out** and **Fan-In**. The top 5 results for each category across the entire workspace are detailed below:

| Metric | Component Path | Score |
| :--- | :--- | :--- |
| **Highest Fan-Out**<br>*(Most Dependent)* | `syntax::ast::make::ext`<br>`hir` *(root / lib.rs)*<br>`ide` *(root / lib.rs)*<br>`hir_ty::infer`<br>`hir::semantics` | 154 dependencies<br>119 dependencies<br>74 dependencies<br>71 dependencies<br>67 dependencies |
| **Lowest Fan-Out**<br>*(Most Independent)* | `edition`<br>`syntax::syntax_error`<br>`base_db::all_crates`<br>`base_db::set_all_crates_with_durability`<br>`intern::symbol` | 0 dependencies<br>0 dependencies<br>0 dependencies<br>0 dependencies<br>0 dependencies |
| **Highest Fan-In**<br>*(System Core)* | `syntax::ast::generated::nodes`<br>`syntax::syntax_node`<br>`ide_db` *(root / lib.rs)*<br>`parser::syntax_kind::generated`<br>`hir::semantics` | 1367 times<br>1121 times<br>889 times<br>670 times<br>643 times |
| **Lowest Fan-In**<br>*(Rarely Imported)* | `base_db::change::file_text_durability`<br>`base_db::change::source_root_durability`<br>`cfg::cfg_expr::next_cfg_expr`<br>`cfg::dnf::distribute_conj`<br>`cfg::dnf::flatten` | 0 times<br>0 times<br>0 times<br>0 times<br>0 times |

*(For more details, refer to: [Crate-Level Dependency Report](../../res/crate-level-dependencies.txt) and [Global System Dependency Report](../../res/global-dependencies.txt)).*