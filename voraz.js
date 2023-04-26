function accionesV(buyers, cantidadDeAccionesDisponiblesVenta) {
  let bestActions = new Array(buyers.length).fill(0);
  let actionsLeft = cantidadDeAccionesDisponiblesVenta;
  
  for (let i = 0; i < buyers.length && actionsLeft > 0; i++) {
    const [value, maxActions, minActions] = buyers[i];
    const actionsToBuy = Math.min(actionsLeft, maxActions);
    if (actionsToBuy >= minActions) {
      bestActions[i] = actionsToBuy;
      actionsLeft -= actionsToBuy;
    }
  }
  console.log(bestActions.length)
  const maxBenefit = bestActions.reduce((acc, cur, i) => acc + cur * buyers[i][0], 0);

  const acciones = [maxBenefit].concat(bestActions);
  return acciones;
  //return [maxBenefit, bestActions];
}