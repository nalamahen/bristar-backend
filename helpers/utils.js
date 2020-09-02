exports.orderDetails = (products) => {
  let row = '';
  for (i = 0; i < products.length; i++) {
    row =
      row +
      '<tr><td>' +
      products[i].name +
      '</td><td>' +
      products[i].count +
      '</td><td>' +
      products[i].price +
      '</td></tr>';
  }

  return row;
};
