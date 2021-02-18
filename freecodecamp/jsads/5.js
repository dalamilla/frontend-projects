function checkCashRegister(price, cash, cid) {
  const deno = { "PENNY": 1, "NICKEL": 5, "DIME": 10, "QUARTER": 25, "ONE": 100, "FIVE": 500, "TEN": 1000, "TWENTY": 2000, "ONE HUNDRED": 10000 };
  const roundRegister = cid.reverse().map(val => [val[0], Math.round(val[1]*100)]);
  const totalRegister = cid.reduce( (regsum, regcur) => (regsum += Math.round(regcur[1]*100)),0);
  let change = (cash - price) * 100;

  if (totalRegister < change) {
      return { status: "INSUFFICIENT_FUNDS", change: [] };
    }

  if (totalRegister === change) {
    return { status: "CLOSED", change: cid.reverse()};
  }

  let changeArr = roundRegister.reduce((val, cur) => {
        let temp = Math.min(cur[1], Math.floor(change / deno[cur[0]]) * deno[cur[0]]);
        if ( temp > 0 ) {
          val.push([cur[0], temp / 100]);
          change -= temp;
        } 
        return val;}, []);


  if (changeArr.length < 1 || change > 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  return { status: "OPEN", change: changeArr };
}
