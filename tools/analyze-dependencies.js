const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const CRATES_DIRECTORY = 'crates';
const OUTPUT_DIRECTORY = 'dependency-analysis';
const CRATE_REPORT_FILE = path.join(OUTPUT_DIRECTORY, 'crate-level-report.txt');
const GLOBAL_REPORT_FILE = path.join(OUTPUT_DIRECTORY, 'global-report.txt');

let crates = [];

try {
    crates = fs.readdirSync(CRATES_DIRECTORY, { withFileTypes: true }).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);
    console.log(`Founded Crates: ${crates.length}`);
} catch (error) {
    console.error(error);
    process.exit(1);
}

const validRustCrates = crates.map(c => c.replace(/-/g, '_'));

if (!fs.existsSync(OUTPUT_DIRECTORY)) {
    fs.mkdirSync(OUTPUT_DIRECTORY, { recursive: true });
}

if (fs.existsSync(CRATE_REPORT_FILE)) fs.unlinkSync(CRATE_REPORT_FILE);
if (fs.existsSync(GLOBAL_REPORT_FILE)) fs.unlinkSync(GLOBAL_REPORT_FILE);

fs.writeFileSync(CRATE_REPORT_FILE, '=== Rust-Analyzer Project Crate-Level Dependency Analysis ===\n\n');
fs.appendFileSync(CRATE_REPORT_FILE, `Total Crates Analyzed: ${crates.length}\n\n`);
fs.writeFileSync(GLOBAL_REPORT_FILE, '=== Rust-Analyzer Project GLOBAL Dependency Analysis ===\n\n');
fs.appendFileSync(GLOBAL_REPORT_FILE, `Total Crates Analyzed: ${crates.length}\n\n`);

const globalFanOut = {};
const globalFanIn = {};
const globalAllNodes = new Set();

crates.forEach(crate => {
    console.log(`Analyzing crate: ${crate}`);

    const rustCrateName = crate.replace(/-/g, '_');
    const dotFileName = path.join(OUTPUT_DIRECTORY, `${crate}-dependencies.dot`);

    const cmd = `cargo +1.94.0 modules dependencies --package ${crate} --lib --no-sysroot --no-owns --layout circo > ${dotFileName}`;

    try {
        execSync(cmd, { stdio: 'pipe' });

        const dotContent = fs.readFileSync(dotFileName, 'utf-8');
        const lines = dotContent.split('\n');

        const nodeTypes = {};

        lines.forEach(line => {
            if (!line.includes('->') && line.includes('label=')) {
                const nameMatch = line.match(/"([^"]+)"/);
                const typeMatch = line.match(/\((mod|struct|enum|trait|fn|type|union|const|static|macro)\)/);
                if (nameMatch && typeMatch) {
                    nodeTypes[nameMatch[1]] = typeMatch[1];
                }
            }
        });

        function getModuleLevel(nodePath) {
            let parts = nodePath.split('::');
            let moduleParts = [];

            for (let i = 0; i < parts.length; i++) {
                if (/^[A-Z]/.test(parts[i])) {
                    break;
                }
                moduleParts.push(parts[i]);
            }

            while (moduleParts.length > 1) {
                let currentPath = moduleParts.join('::');
                let type = nodeTypes[currentPath];

                if (type === 'mod') break;
                if (type && type !== 'mod') {
                    moduleParts.pop();
                    continue;
                }
                break;
            }

            return moduleParts.join('::');
        }

        const fanOut = {};
        const fanIn = {};
        const allNodes = new Set();

        const uniqueEdges = new Set();
        const globalUniqueEdges = new Set();

        lines.forEach(line => {
            if (line.includes('->')) {
                let [leftPart, rightPart] = line.split('->');

                let left = leftPart.replace(/"/g, '').trim();
                let right = rightPart.split('[')[0].replace(/"/g, '').trim();

                left = getModuleLevel(left);
                right = getModuleLevel(right);

                if (left === right) return;

                let globalLeft = left.replace(/^crate::/, `${rustCrateName}::`);
                let globalRight = right.replace(/^crate::/, `${rustCrateName}::`);

                const rightCrateRoot = globalRight.split('::')[0];

                if (validRustCrates.includes(rightCrateRoot)) {
                    const edgeId = `${left}|${right}`;
                    if (!uniqueEdges.has(edgeId)) {
                        uniqueEdges.add(edgeId);
                        allNodes.add(left);
                        allNodes.add(right);
                        fanOut[left] = (fanOut[left] || 0) + 1;
                        fanIn[right] = (fanIn[right] || 0) + 1;
                    }

                    const globalEdgeId = `${globalLeft}|${globalRight}`;
                    if (!globalUniqueEdges.has(globalEdgeId)) {
                        globalUniqueEdges.add(globalEdgeId);
                        globalAllNodes.add(globalLeft);
                        globalAllNodes.add(globalRight);
                        globalFanOut[globalLeft] = (globalFanOut[globalLeft] || 0) + 1;
                        globalFanIn[globalRight] = (globalFanIn[globalRight] || 0) + 1;
                    }
                }
            }
        });

        allNodes.forEach(node => {
            if (!(node in fanOut)) fanOut[node] = 0;
            if (!(node in fanIn)) fanIn[node] = 0;
        });

        const sortDesc = (obj) => Object.entries(obj).sort((a, b) => b[1] - a[1]).slice(0, 5);
        const sortAsc = (obj) => Object.entries(obj).sort((a, b) => a[1] - b[1]).slice(0, 5);

        let reportText = `\n=========================================\n`;
        reportText += `CRATE: ${crate}\n`;
        reportText += `=========================================\n\n`;

        reportText += `\nHighest FAN-OUT:\n`;
        sortDesc(fanOut).forEach(([node, count]) => reportText += `  ${count} dependencies\t -> ${node}\n`);

        reportText += `\nLowest FAN-OUT:\n`;
        sortAsc(fanOut).forEach(([node, count]) => reportText += `  ${count} dependencies\t -> ${node}\n`);

        reportText += `\nHighest FAN-IN:\n`;
        sortDesc(fanIn).forEach(([node, count]) => reportText += `  ${count} times\t\t -> ${node}\n`);

        reportText += `\nLowest FAN-IN:\n`;
        sortAsc(fanIn).forEach(([node, count]) => reportText += `  ${count} times\t\t -> ${node}\n`);

        reportText += `\n`;
        fs.appendFileSync(CRATE_REPORT_FILE, reportText);
    } catch (error) {

    }
});

globalAllNodes.forEach(node => {
    if (!(node in globalFanOut)) globalFanOut[node] = 0;
    if (!(node in globalFanIn)) globalFanIn[node] = 0;
});

const sortDescGlobal = (obj) => Object.entries(obj).sort((a, b) => b[1] - a[1]).slice(0, 5);
const sortAscGlobal = (obj) => Object.entries(obj).sort((a, b) => a[1] - b[1]).slice(0, 5);

let globalReport = '';

globalReport += `HIGHEST FAN-OUT:\n`;
sortDescGlobal(globalFanOut).forEach(([node, count]) => globalReport += `  ${count} dependencies\t -> ${node}\n`);

globalReport += `\nLOWEST FAN-OUT:\n`;
sortAscGlobal(globalFanOut).forEach(([node, count]) => globalReport += `  ${count} dependencies\t -> ${node}\n`);

globalReport += `\nHIGHEST FAN-IN:\n`;
sortDescGlobal(globalFanIn).forEach(([node, count]) => globalReport += `  ${count} times\t\t -> ${node}\n`);

globalReport += `\nLOWEST FAN-IN:\n`;
sortAscGlobal(globalFanIn).forEach(([node, count]) => globalReport += `  ${count} times\t\t -> ${node}\n`);

fs.appendFileSync(GLOBAL_REPORT_FILE, globalReport);

console.log('Finished!');