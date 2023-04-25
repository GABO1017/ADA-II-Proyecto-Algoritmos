function accionesV(buyers, cantidadDeAccionesDisponiblesVenta) {
  buyers.sort((a, b) => b[0] / b[1] - a[0] / a[1]);

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

  const maxBenefit = bestActions.reduce((acc, cur, i) => acc + cur * buyers[i][0], 0);
  const acciones = [maxBenefit].concat(bestActions);
  return acciones;
}

