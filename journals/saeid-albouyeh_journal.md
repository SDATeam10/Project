# Individual Journal: Saeid Albouyeh

***

### Date: 2026-04-18

### Period: 8 hours

### Cooperators
* Abdullah Rezaei

### Objectives
* **Group Organization:** Dividing tasks among group members
* **Rust language essentials:** The core concepts of the Rust language and syntax
* **Understanding the project:** The subject of the project and its use cases
* **The repository structure:** The organization of the project
* **Finding tools for required analyses:** Understanding which information we need and how to gather it

### Activities & Effort
* [x] Organizing the group: Part of the group will work on design and the other part will work on architecture
* [x] Getting familiar with Rust: Rust has a special syntax and a steep learning curve; it does not follow traditional OOP principles, and there are no classes or traditional interfaces. Instead, it handles them in a different way. It also uses the Cargo tool for package management
* [x] Overview of the project: rust-analyzer is a language server that provides different services such as code completion and syntax checking; it can be used anywhere that an LSP (Language Server Protocol) is required, such as code editors which support LSP ![Rust analyzer architecture overview](assets/arc-overview.png "overview")
* [x] Overview of the structure: The code is mostly located in the crates directory; each crate represents a package. Required external libraries are listed in Cargo.toml
* [x] Finding Tools: For some of the required information (such as lines of code and number of packages), the source code must be analyzed. For other parts (such as coupling in changes), the Git history must be analyzed

### Report
Work was organized by splitting responsibilities among group members to focus on design and architecture. Project documentation and the rust-analyzer structure were studied, with a focus on the organization of crates and the Language Server Protocol. The essentials of the Rust language were examined, specifically how it eschews traditional classes, interfaces, and inheritance in favor of structs and traits to achieve composition. For the required metrics, various analysis tools were evaluated; cloc and scc were checked, with scc ultimately being chosen for the task. Finally, the analysis process was supported by the use of Code Mate in conjunction with specific Linux bash commands.

***

### Date: 2026-05-04

### Period: 2 hours

### Cooperators
* Abdullah Rezaei

### Objectives
* **Installing tools:** Installing tools for analyzing 
* **Gathering information:** Getting required information for overview part using tools
* **Writing the overview:** Writing specific parts of the overview

### Activities & Effort
* [x] Installing tools: Installing code-maat and cargo package manager
* [x] Gathering information: Extracting the number of packages, modules and authors of the project in CSV format
* [x] Writing the overview: Writing the reports about the packages, modules and authors for overview in MD format

### Report
The selected tools installed and environment for project set up successfully, The required information generated as a sort of CSV files for packages, modules and authors and their amount of contribution.
According to the project specifications from the slides, the information presented as the overview and the results and CSV files shared with teammates. 

***

### Date: 2026-05-12

### Period: 6 hours

### Cooperators
* Abdullah Rezaei

### Objectives
* **Hotspot Analysis:** Identifying frequently modified files and active crates
* **Temporal Coupling Analysis:** Extracting temporal coupling data from the Git history
* **Structural Coupling Analysis:** Generating the native SCIP index of the repository
* **Coupling Intersection:** Cross-referencing temporal and structural dependencies to identify distinct code relationships

### Activities & Effort
* [x] Hotspot & Revision Analysis: Extracted file revision frequencies using `code-maat` and generated graphs to visualize the top crates and the top 50 architectural hotspots
* [x] Temporal Coupling: Generated temporal coupling data using the `code-maat` tool based on the repository's version control history
* [x] Structural Dependency Graph: Generated the codebase's SCIP index using the `rust-analyzer scip .` (using the project to analyze itself!) command to capture code dependencies
* [x] Cross-Analysis Scripting: Executed a custom Python script utilizing the Protobuf library to parse the binary SCIP graph and check each temporally coupled pair for direct structural links
* [x] Result Validation: Exported the cross-referenced data and validated links against the source code

### Report
File revision frequencies were extracted using code-maat and visualized into graphs to identify architectural hotspots and the most active crates in the project. The temporal coupling of the project was also analyzed by generating a CSV file using code-maat from the Git history. To evaluate structural dependencies, the SCIP index of the codebase was generated natively using rust-analyzer. A Python script utilizing the Protobuf library was then used to parse the binary index and cross-reference the structural dependencies with the temporal coupling data. The final results were compiled into a new CSV file, which successfully categorized file pairs into directional, bidirectional, and non-structurally coupled relationships. These findings were manually validated against the repository's source code to ensure accuracy.
