const roadMap = [
  // A  B  C  D  E  F  G  H  I  K  J
  [0, 0, 10, 16, 12, 20, 0, 0, 0, 0, 0], // A
  [0, 0, 12, 10, 0, 0, 18, 0, 11, 0, 0], // B
  [10, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0], // C
  [16, 10, 0, 0, 8, 0, 0, 0, 0, 0, 0], // D
  [12, 0, 0, 8, 0, 0, 0, 0, 7, 0, 9], // E
  [20, 0, 0, 0, 0, 0, 0, 16, 0, 13, 12], // F
  [0, 18, 0, 0, 0, 0, 0, 7, 6, 0, 8], // G
  [0, 0, 0, 0, 0, 16, 7, 0, 0, 10, 9], // H
  [0, 11, 0, 0, 7, 0, 8, 0, 0, 0, 5], // I
  [0, 0, 0, 0, 0, 13, 0, 10, 0, 0, 0], // K
  [0, 0, 0, 0, 9, 12, 6, 9, 5, 0, 0], // J
];
//                        A . B .C . D .E .F .G .H .I .J
const costMapHueristic = [33, 35, 43, 36, 28, 13, 17, 10, 24, 0, 19];
let open = []; //queue
let close = [];
//convert adjacency to object
let Vertexs = [];

const convertAdjacencyToObject = () => {
  costMapHueristic.map((cost, index) =>
    Vertexs.push({ vertex: index, hueristic: cost, g: 0, f: 0 })
  );
};

function priorityQueue(a, b) {
  if (a.f < b.f) return -1;
  if (a.f > b.f) return 1;
  return 0;
}
// open.sort(priorityQueue);
const checkGoal = (vertexMin, goal) => {
  if (vertexMin.vertex == goal.vertex) return true;
  return false;
};

const checkFromStartToNeighbor = (start) => {
  for (let i = start.vertex; i < roadMap.length; i++) {
    for (let j = 0; j < roadMap.length; j++) {
      if (roadMap[i][j] === 0) continue;
      //caculator g( vertex current )
      Vertexs[j].g = start.g + roadMap[i][j];
      Vertexs[j].f = Vertexs[j].g + Vertexs[j].hueristic;
      open.push({ ...Vertexs[j], g: Vertexs[j].g, f: Vertexs[j].f });xx
    }
    open.sort(priorityQueue);
    console.log(open);
    break;
  }
};
convertAdjacencyToObject();
const start = Vertexs[0];
const goal = Vertexs[9];
open.push(Vertexs[0]);
let g = 0; // cost of road from start to current vertex
let h = start.hueristic; // hueristic of vertex
let f = g + h; //total cost from start to current vertex
const Astart = () => {
  if (open.length === 0) {
    console.log(`fail`);
    return;
  }
  let vertexMininOpen = open.shift();
  let check = checkGoal(vertexMininOpen, goal);
  console.log(`check : ${check}`);
  close.push(vertexMininOpen);
  if (!check) {
    checkFromStartToNeighbor(vertexMininOpen);
    Astart();
  }
  if (check) {
    console.log("done");
    const temp = [];
    close.map((el) => temp.push(el.vertex));
    console.log(temp.join("-->"));
    return;
  }
};
Astart();
