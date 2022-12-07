const matrix = [
  [0, 1, 1, 0, 0],
  [1, 0, 1, 1, 0],
  [1, 1, 0, 1, 0],
  [0, 1, 1, 0, 1],
  [0, 0, 0, 1, 0],
];
let vertexStore = []; // vertex store
const caculatorStepOfVertex = (matrix, vertexStore) => {
  matrix.map((element, index) => {
    let step = 0;
    for (let i = 0; i < element.length; i++) {
      if (element[i] === 1) step++;
    }
    vertexStore.push({ vertex: index, step: step, checkColor: false });
  });
  return vertexStore;
};

const findVertexHaveMaxStep = (vertexStore) => {
  let max = Math.max.apply(
    Math,
    vertexStore.map((vertexs) => vertexs.step)
  );
  let currentVertex = vertexStore.find((vertexs) => vertexs.step === max);
  return currentVertex;
};

const Coloring = (maxVertex) => {
  for (let i = maxVertex.vertex; i < matrix.length; i++) {
    let colors = 0;
    for (let j = 0; j < matrix.length; j++) {
      if (matrix[i][j] === 0) continue;
      if (matrix[i][j] === 1) {
        let vertexs = vertexStore[j];
        if (!vertexStore[j].checkColor) {
          vertexStore[maxVertex.vertex] = {
            ...maxVertex,
            step: 0,
            checkColor: true,
            color: colors,
          };
          if (vertexStore[j].step === 0) {
            continue;
          } else {
            vertexStore[j] = { ...vertexs, step: vertexs.step - 1 };
          }
        } else {
          colors++;
          vertexStore[maxVertex.vertex] = {
            ...maxVertex,
            step: 0,
            checkColor: true,
            color: colors,
          };
          if (vertexStore[j].step === 0) {
            continue;
          } else {
            vertexStore[j] = { ...vertexs, step: vertexs.step - 1 };
          }
        }
      }
    }
    console.log(vertexStore[maxVertex.vertex]);
    break;
  }
};

const reduceStepOfVertex = () => {};
//start

caculatorStepOfVertex(matrix, vertexStore);
vertexStore.map((vertexs, index) => {
  while (vertexs.step > 0) {
    let maxVertex = findVertexHaveMaxStep(vertexStore);
    Coloring(maxVertex);
    break;
  }
  if (index === vertexStore.length - 1) {
    for (let vertex = 0; vertex < vertexStore.length; vertex++) {
      const element = vertexStore[vertex];
      if (!element.checkColor) {
        Coloring(element);
      }
    }
  }
});
