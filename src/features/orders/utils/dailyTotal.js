export const getDailyTotals = (orders) => {
  const totalsMap = {};

  orders.forEach(order => {
    const d = new Date(order.delivery_datetime);
    // normalize to YYYY-MM-DD (ignores time)
    const day = d.toISOString().split("T")[0];  

    if (!totalsMap[day]) {
      totalsMap[day] = 0;
    }

    totalsMap[day] += order.total_amount; // assuming order.total_amount exists
  });

  // convert to array
  return Object.entries(totalsMap).map(([date, total]) => ({
    date,
    total
  }));
};