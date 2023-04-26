function accionesFB(A, B, n, list) {
  console.log(list.length)
  let values = list.map((comprador) => comprador[1]);
  let salesList = [];

  function benefits(X) {
    let totalActions = 0;
    for (let buyer = 0; buyer < list.length; buyer++) {
      let price = list[buyer][0];
      let actions = X[buyer];
      totalActions += actions * price;
    }
    return totalActions;
  }

  for (let i = 1; i < Math.pow(2, n); i += 2) {
    let binary = i.toString(2).padStart(n, "0");
    let sum = 0;
    let buyerActions = [];

    for (let j = 0; j < n - 1; j++) {
      if (binary[j] === "1") {
        sum += values[j];
        buyerActions.push(values[j]);
      } else {
        buyerActions.push(0);
      }
    }

    if (sum <= A) {
      let value = A - sum;
      buyerActions.push(value);
      salesList.push(buyerActions);
    }
  }

  let profit = 0;
  let buyerProfit = [];

  for (let solution of salesList) {
    let total = benefits(solution);
    if (total > profit) {
      profit = total;
      buyerProfit = solution;
    }
  }

  let auctionresult = [profit].concat(buyerProfit);
  return auctionresult;
}