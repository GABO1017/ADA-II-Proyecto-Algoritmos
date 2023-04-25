function accionesPD2(knapsackCapacity, n, buyers, packages) {
  // Crear la matrix de results
  const matrix = Array.from({ length: n + 1 }, () =>
    Array.from({ length: Math.floor((knapsackCapacity + 1) / packages) + 1 }, () => ({
      total: 0,
      amountActions: 0,
    }))
  );
  //cambia el indice por actionsXPackage
  const actionsXPackage = Math.floor(knapsackCapacity / packages);

  for (let offer = 1; offer <= n; offer++) {
    for (let actions = 1; actions <= actionsXPackage; actions++) {
      let maxBenefit = matrix[offer - 1][actions].total;
      let lastAction = 0;

      if (buyers[offer - 1][1] < packages && actions === 1) {

        maxBenefit = buyers[offer - 1][0];
        lastAction = 1;
      } else {
          
        for (
          let takenActions = Math.floor(buyers[offer - 1][2] / packages);
          takenActions <= Math.min(actions, Math.floor(buyers[offer - 1][1] / packages));
          takenActions++
        ) {
          const benefit =
            buyers[offer - 1][0] * takenActions * packages +
            matrix[offer - 1][actions - takenActions].total;

          if (benefit > maxBenefit) {
            maxBenefit = benefit;
            lastAction = takenActions;
          }
        }
      }

      matrix[offer][actions].total = maxBenefit;
      matrix[offer][actions].amountActions = lastAction;
    }
  }

  const actionsAssignment = [];
  let actualOffer = n;
  let remainingActions = actionsXPackage;

  while (actualOffer > 0) {
    const amountTaken = matrix[actualOffer][remainingActions].amountActions;
    const takenActions = amountTaken * packages;
    actionsAssignment.unshift(takenActions);

    actualOffer--;
    remainingActions -= amountTaken;
  }

  const outcome = [matrix[n][actionsXPackage].total, ...actionsAssignment];
  return outcome;
}
