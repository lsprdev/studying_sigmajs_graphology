import Graph from "graphology";
import FA2Layout from 'graphology-layout-forceatlas2/worker';
import Sigma from "sigma";

// Data
const data = 
[
    ["it-cmf", "business process management", "fabrica de software"], 
    ["dimensions of information quality", "information", "information quality"], 
    ["technological advancement", "environmental awareness", "education", "classroom"], 
    ["technology adoption", "erp", "technology usage", "tam"], 
    ["it-cmf", "business process management", "bpm", "software development", "higher education", "competency", "project management"], 
    ["it-cmf", "capability", "competency", "graph", "information systems", "information systems and technology"], 
    ["it-cmf", "capability", "competency", "graph", "information systems", "information systems and technology"], 
    ["informatioin systems and technology", "information systems and technology competency", "competency grammar", "backus-naur form"], 
    ["competency", "information systems", "information systems and technology competency", "competency mapping"], 
    ["modelos de evolução", "estádios de crescimento", "tecnologias e sistemas de informação", 
    "modelos de maturidade", "organization evolution model", "stages of growth", "information systems and technologies", "maturity models"]
];


const container = document.getElementById("sigma-container") as HTMLElement;
const graph = new Graph();

// The parameters are the same as for the synchronous version, minus `iterations` of course
const layout = new FA2Layout(graph, {
    settings: { gravity: 5, scalingRatio: 1, strongGravityMode: false, barnesHutOptimize: true, barnesHutTheta: 0.5   },
    getEdgeWeight: 'weight',
});


// To start the layout
layout.start();

// Looping that creates the nodes 
data.flat().map((item, index) => {
    if (graph.nodes().includes(item) == false) {
        graph.addNode(item, { 
            label: item, 
            x: 2*Math.random()-1, 
            y: 2*Math.random()-1, 
            size: 5, 
            color: "#727EE0" 
        });
    } else {
        graph.setNodeAttribute(
            item,
            "size",
            ((graph.getNodeAttribute(item, "size") as number) + 6)
            );
    };
    if (data.length-1 === index) {
        const sigma = new Sigma(graph, container);
    }
});

// Looping that creates the edges

let keywords = data;
let listaFinal: any[] = [];

for (let paper1 of keywords) {
    let tamanho = paper1.length;
    paper1.sort();

    let key = "";
    let source = "";
    let target = "";
    let weight:number = 1;
    let item = {};

    for (let i = 0; i <= tamanho - 2; i++) {
        for (let j = i + 1; j < paper1.length; j++) {
            source = paper1[i];
            target = paper1[j];
            key = source + "-" + target;
            weight = 1;
            item = { key, source, target, weight };

            if (!listaFinal.find(l => l.key === key)) {
                listaFinal.push(item);
            }
            else {
                listaFinal.find(l => l.key === key).weight++;
            }
        }
    }
}

for (let elemento of listaFinal) {
    console.log(`key: ${elemento.key} | origem: ${elemento.source} | destino: ${elemento.target} | peso: ${elemento.weight}`);
    graph.addEdge(elemento.source, elemento.target, { size: elemento.weight });
    // Stop the layout
    if(elemento.weight >= 3) {
        graph.setEdgeAttribute(elemento.source, elemento.target, "color", "#727EE0");
    }
    setTimeout(() => { layout.stop(); }, 1000);
}

// graph.addEdge("it-cmf", "erp", { size: 3 })
// graph.addEdge("bpm", "erp", { size: 3 })

// graph.setEdgeAttribute(elemento.source, elemento.target, "color", "#727EE0");