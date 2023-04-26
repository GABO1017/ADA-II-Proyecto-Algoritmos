function accionesPD2(buyers, knapsackCapacity, packages){
  const matrix = [];
  const newActions = Math.floor(knapsackCapacity/packages)
  for (let i = 0; i <= buyers.length; i++) {
    matrix[i] = new Array(newActions + 1).fill({ value: 0, lastAction: 0 });
  }
  
  for (let buyer = 1; buyer <= buyers.length; buyer++) {
    const [value, maxActions, minActions] = buyers[buyer-1];
    for (let actions = 1; actions <= newActions; actions++) {
      let maxBenefit = matrix[buyer-1][actions].value;
      let lastAction = 0;
      for (let k = Math.floor(minActions/packages); k <= Math.min(Math.floor(maxActions/packages), actions); k++) {
        const benefit = matrix[buyer-1][actions-k].value + k*value*packages;
        if (benefit > maxBenefit) {
          maxBenefit = benefit;
          lastAction = k;
        }
      }
      matrix[buyer][actions] = { value: maxBenefit, lastAction };
    }
  }

  let actionsAssignment = new Array(buyers.length).fill(0);
  let buyer = buyers.length;
  let actions = Math.floor(knapsackCapacity/packages);
  let totalBenefit = matrix[buyer][actions].value;
  
  while (buyer > 0 && actions > 0) {
    const { lastAction } = matrix[buyer][actions];
    if (lastAction > 0) {
      actionsAssignment[buyer-1] = lastAction*packages;
      actions -= lastAction;
    }
    buyer--;
  }


  console.log(actionsAssignment);
  return [totalBenefit, ...actionsAssignment];
}