
import Sigma from "sigma";
import Graph from "graphology";
import FA2Layout from 'graphology-layout-forceatlas2/worker';

const data = [
    "it-cmf",
    "business process management",
    "fabrica de software",
    "dimensions of information quality",
    "information",
    "information quality",
    "technological advancement",
    "environmental awareness",
    "education",
    "classroom",
    "technology adoption",
    "erp",
    "technology usage",
    "tam",
    "it-cmf",
    "business process management",
    "bpm",
    "software development",
    "higher education",
    "competency",
    "project management",
    "it-cmf",
    "capability",
    "competency",
    "graph",
    "information systems",
    "information systems and technology",
    "it-cmf",
    "capability",
    "competency",
    "graph",
    "information systems",
    "information systems and technology",
    "informatioin systems and technology",
    "information systems and technology competency",
    "competency grammar",
    "backus-naur form",
    "competency",
    "information systems",
    "information systems and technology competency",
    "competency mapping",
    "modelos de evolução",
    "estádios de crescimento",
    "tecnologias e sistemas de informação",
    "modelos de maturidade",
    "organization evolution model",
    "stages of growth",
    "information systems and technologies",
    "maturity models"
]

const container = document.getElementById("sigma-container") as HTMLElement;
const graph = new Graph();

// The parameters are the same as for the synchronous version, minus `iterations` of course
const layout = new FA2Layout(graph, {
    settings: { gravity: 1 },
    getEdgeWeight: 'weight'
});

// To start the layout
layout.start();

data.map((item, index) => {
    if (graph.nodes().includes(item) == false) {
        graph.addNode(item, { 
            label: item, 
            x: 2*Math.random()-1, 
            y: 2*Math.random()-1, 
            size: 10, 
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

// circular_x: L * Math.cos(Math.PI * 2 * i / N),
// circular_y: L * Math.sin(Math.PI * 2 * i / N),

// Math.cos(Math.PI * 2 * index / 48) * 10
// Math.sin(Math.PI * 2 * index / 48) * 10

// graph.updateNode(item, {
//     size: graph.getNodeAttribute(item, 'size') + 1
// })