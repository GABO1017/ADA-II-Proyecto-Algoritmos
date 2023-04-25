function accionesPD1(buyers,knapsackCapacity){
  const matrix = [];

for (let i = 0; i <= buyers.length; i++) {
  matrix[i] = new Array(knapsackCapacity + 1).fill({ value: 0, lastAction: 0 });
}

for (let buyer = 1; buyer <= buyers.length; buyer++) {
  const [value, maxActions, minActions] = buyers[buyer-1];
  for (let actions = 1; actions <= knapsackCapacity; actions++) {
    let maxBenefit = matrix[buyer-1][actions].value;
    let lastAction = 0;
    for (let k = minActions; k <= Math.min(maxActions, actions); k++) {
      const benefit = matrix[buyer-1][actions-k].value + k*value;
      if (benefit > maxBenefit) {
        maxBenefit = benefit;
        lastAction = k;
      }
    }
    matrix[buyer][actions] = { value: maxBenefit, lastAction };
  }
}

let bestActions = new Array(buyers.length ).fill(0);
let buyer = buyers.length;
let actions = knapsackCapacity;
let totalBenefit = matrix[buyer][actions].value;

while (buyer > 0 && actions > 0) {
  const { lastAction } = matrix[buyer][actions];
  if (lastAction > 0) {
    bestActions[buyer-1] = lastAction;
    actions -= lastAction;
  }
  buyer--;
}

return [totalBenefit, ...bestActions];

}
