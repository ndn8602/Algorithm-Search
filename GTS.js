const matrix = [
  [0, 20, 42, 31, 6, 24],
  [10, 0, 17, 6, 35, 18],
  [25, 5, 0, 27, 14, 9],
  [12, 9, 24, 0, 30, 12],
  [14, 7, 21, 15, 0, 38],
  [40, 15, 16, 5, 20, 0],
];
const temp = [];

const visit = (current, tours) => {
  const visited = tours.includes(current);
  return visited;
};

const move = (matrix, current, cost, tours, source) => {
  if (tours.length !== matrix.length) {
    for (i = 0; i < matrix.length; i++) {
      matrix.map((array, index) => {
        if (visit(index, tours)) {
          return;
        } else {
          if (index === current) {
            tours.push(current);
            let minCost = findMinCost(array, tours, source);
            current = minCost.visited;
            cost += minCost.cost;
          }
        }
      });
    }
    temp.push({ cost, tours });
  } else {
    console.log(`cost ${cost}`);
    return { cost, tours };
  }
};

const findMinCost = (array, tours, source) => {
  let cost = 0;
  let minFirst = Number.MAX_VALUE;
  let minSecond = Number.MAX_VALUE;
  let visited = 0;
  for (let i = 0; i < array.length; i++) {
    if (minFirst > array[i]) {
      minFirst = array[i];
    }
  }
  if (tours.length !== matrix.length) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] < minSecond) {
        if (array[i] > minFirst) {
          if (visit(i, tours)) {
            continue;
          } else {
            minSecond = array[i];
            visited = i;
          }
        }
      }
    }
  } else {
    minSecond = array[source];
    visited = i;
    tours.push(source);
  }
  cost += minSecond;
  return { visited, cost };
};
//gst1
const GreedyTravellingSalesman = (matrix, startAt, source, cost, tours) => {
  return move(matrix, startAt, cost, tours, source);
};
//GST2  

for (let startAt = 0; startAt < matrix.length; startAt++) {
  const source = startAt;
  let tours = [];
  let cost = 0;
  //start
  GreedyTravellingSalesman(matrix, startAt, source, cost, tours);
}
const minCost = () => {
  let minvalue = temp[0].cost;
  for (let index = 0; index < temp.length; index++) {
    if (minvalue > temp[index].cost) {
      minvalue = temp[index].cost;
    }
  }
  // console.log(`minvalue : ${minvalue}`);
  return minvalue;
};

const path = () => {
  for (let index = 0; index < temp.length; index++) {
    const element = temp[index];
    if (minCost() == element.cost) {
      console.log(`Best cost : ${element.cost}`);
      console.log(`Best tours : ${element.tours.join(" --> ")}`);
      return;
    }
  }
};
path();
