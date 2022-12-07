const goal = [
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 0],
];
const start = [
  [1, 0, 7],
  [5, 4, 8],
  [2, 3, 6],
];
let open = [];
let close = [];

// rule : push left, right, top, bottom

function priorityQueue(a, b) {
  if (a.f < b.f) return -1;
  if (a.f > b.f) return 1;
  return 0;
}

const caculatorCost = (caseRule, nextPuzzle) => {
  let h = 0; // different between start and goal
  let f = 0;
  let g = -1;
  nextPuzzle ? (g = nextPuzzle.g) : (g = -1);
  for (let i = 0; i < caseRule.length; i++) {
    for (let j = 0; j < caseRule.length; j++) {
      if (caseRule[i][j] === 0) continue;
      if (caseRule[i][j] !== goal[i][j]) {
        h++;
      }
    }
  }
  if (nextPuzzle) {
    g = nextPuzzle.g + 1;
  } else {
    g++;
  }
  f = h + g;
  return { caseRule, h: h, g: g, f: f };
};

const findBlank = (nextPuzzle) => {
  let blank = {};
  for (let i = 0; i < nextPuzzle.length; i++) {
    for (let j = 0; j < nextPuzzle.length; j++) {
      if (nextPuzzle[i][j] === 0) {
        blank = { i: i, j: j };
        return blank;
      }
    }
  }
};

const compareGoal = (nextPuzzle, goal) => {
  if (nextPuzzle.h === 0) return true;
  for (let i = 0; i < nextPuzzle.length; i++) {
    for (let j = 0; j < nextPuzzle.length; j++) {
      if (nextPuzzle[i][j] === goal[i][j]) {
        return true;
      }
    }
  }
  return false;
};

//rule  {0:left -- 1:right -- 2: up -- 3: down}

const move = (nextPuzzle) => {
  let blank = findBlank(nextPuzzle.caseRule);
  for (let rule = 0; rule < 4; rule++) {
    let temp = 0;
    switch (rule) {
      case 0: //left
        let left = JSON.parse(JSON.stringify(nextPuzzle.caseRule));
        if (blank.i >= 0 && blank.j - 1 >= 0) {
          temp = left[blank.i][blank.j];
          left[blank.i][blank.j] = left[blank.i][blank.j - 1];
          left[blank.i][blank.j - 1] = temp;
          left = caculatorCost(left, nextPuzzle);
          open.push(left);
          console.log(left);
        }
        break;
      case 1: //right
        let right = JSON.parse(JSON.stringify(nextPuzzle.caseRule));
        if (blank.i >= 0 && blank.j + 1 <= start.length) {
          temp = right[blank.i][blank.j];
          right[blank.i][blank.j] = right[blank.i][blank.j + 1];
          right[blank.i][blank.j + 1] = temp;
          right = caculatorCost(right, nextPuzzle);
          open.push(right);
          console.log(right);
        }
        break;
      case 2: //up
        let up = JSON.parse(JSON.stringify(nextPuzzle.caseRule));
        if (blank.i - 1 >= 0 && blank.j >= 0) {
          temp = up[blank.i - 1][blank.j];
          up[blank.i - 1][blank.j] = up[blank.i][blank.j];
          up[blank.i][blank.j] = temp;
          up = caculatorCost(up, nextPuzzle);
          open.push(up);
          console.log(up);
        }
        break;
      default: //down
        let down = JSON.parse(JSON.stringify(nextPuzzle.caseRule));
        if (blank.i + 1 < start.length && blank.j >= 0) {
          temp = down[blank.i + 1][blank.j];
          down[blank.i + 1][blank.j] = down[blank.i][blank.j];
          down[blank.i][blank.j] = temp;
          down = caculatorCost(down, nextPuzzle);
          open.push(down);
          console.log(down);
        }
        break;
    }
  }
};
// object {matrix,g,h,f}

open.push(caculatorCost(start));
const aktTaci = (goal) => {
  if (open.length === 0) {
    console.log(`fail`);
    return;
  }
  open.sort(priorityQueue);
  const nextPuzzle = open.shift();
  const checkGoal = compareGoal(nextPuzzle, goal);
  close.push(nextPuzzle);
  open.filter((n) => n);
  if (!checkGoal) {
    move(nextPuzzle);
    aktTaci(nextPuzzle, goal);
  }

  if (checkGoal) {
    console.log("done");
    return;
  }
  console.log(open);
};
aktTaci(goal);
close.map((item) => console.log(`\n${item.caseRule.join("\n")}\n -->`));
