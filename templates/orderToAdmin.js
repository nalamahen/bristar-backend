const { orderDetails } = require('../helpers/utils');

module.exports = (order) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>Bristar Oline Liquor Store</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <style>
    table {
      border-collapse: collapse;
    width: 520px;
    margin: 0 auto;
    }
    table, td, th {
      border: 1px solid #ccc;
    }
    td {padding: 10px;}
    </style>
    </head>
    <body style="margin: 0; padding: 0;">
    <div style="border: 1px solid #cccccc; width:600px; margin: 0 auto; padding-bottom: 50px">
    <div style="width:520px; margin: 0 auto;"><p>Hi Admin,</p><p>Somebody just made a purchase in your Bristar Liqour Store.</p>
    <p>Custormer name: ${order.user.name}</p>
    <p>User's purchase history:${order.user.history.length}</p>
    <p>User's email: ${order.user.email}</p>
    <p>Total products: ${order.products.length}</p>
    <p>Transaction ID: ${order.transaction_id}</p>
    <p>Order status: ${order.status}</p>
    <p>Order Date: ${new Date().toLocaleDateString()}</p>
    </div>
    <table>
    <tr>
    <td>Product</td>
    <td>Qyabtuty</td>
    <td>Price</td>
    </tr>
    ${orderDetails(order.products)}
    <tr>
      <td colspan="2">
      Sub Total
      </td>
    <td>&euro;${order.amount}</td>
    </tr>        
    <tr>
      <td colspan="2">
      Total
      </td>
    <td>&euro;${order.amount}</td>
    </tr>
    </table>

    <div style="margin: 0 auto; width: 520px;">
    <p><b>Delivery Address:</b></p>
    <div style="margin: 0 auto; padding: 1px 10px; width: 520px; border: 1px solid #cccccc;">
    <p>${order.address}</p>
    </div>

    </div>
    </div>
    </body>
    </html>`;
};
