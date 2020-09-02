const { orderDetails } = require('../helpers/utils');

module.exports = (req, order) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <title>Bristar Online Liquor Store</title>
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
        <div style="padding:10px 10px; box-sizing: border-box; height: 50px; margin: 0 auto; background-color:#a23f25; color:#ffffff; text-align:center">Thank you for your order</div>
        <div style="width:520px; margin: 0 auto;"><p>Hi ${req.profile.name},</p>
        <p>We have received your order and your order being processed.</p>        
        <p><b>Order ID: </b></p>
        <p><b>Order Status: ${order.status}</b></p>
        <p><b>Order Date: ${new Date().toLocaleDateString()}</b></p>
        <p><b>Total products: ${order.products.length}</b></>
        
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
          Payment Method
          </td>
        <td>Bank Transfer</td>
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
        <p>${order.user.email}</p>
        </div>
         <br>
        Thanks for shoping with us.
        </div>
        </div>
        </body>
        </html>
    `;
};
