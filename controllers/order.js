const { Order } = require('../models/order');
const { errorHandler } = require('../helpers/dbErrorHandler');
// sendgrid for email npm i @sendgrid/mail
const sgMail = require('@sendgrid/mail');
const { replace } = require('lodash');
sgMail.setApiKey(process.env.SENGRID_API_KEY);

exports.orderById = (req, res, next, id) => {
  Order.findById(id)
    .populate('products.product', 'name price')
    .exec((err, order) => {
      if (err || !order) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      req.order = order;
      next();
    });
};

exports.create = (req, res) => {
  //console.log('CREATE ORDER: ', req.body);
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  order.save((error, data) => {
    if (error) {
      return res.status(400).json({
        error: errorHandler(error),
      });
    }
    // User.find({ categories: { $in: categories } }).exec((err, users) => {}
    console.log('ORDER IS JUST SAVED >>> ', order);
    // send email alert to admin
    // order.address
    // order.products.length
    // order.amount

    const orderDetails = (products) => {
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

    const adminEmailBody = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <title>Demystifying Email Design</title>
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

    const emailData = {
      to: 'sales@bristar.be',
      from: order.user.email,
      subject: `A new order is received`,
      html: adminEmailBody,
    };
    sgMail
      .send(emailData)
      .then((sent) => console.log('SENT >>>', sent))
      .catch((err) => console.log('ERR >>>', err));

    const buyerEmailBody = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <title>Demystifying Email Design</title>
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
        </html>`;

    // email to buyer
    const emailData2 = {
      to: order.user.email,
      from: 'sales@bristar.be',
      subject: `You order is in process`,
      html: buyerEmailBody,
    };
    sgMail
      .send(emailData2)
      .then((sent) => console.log('SENT 2 >>>', sent))
      .catch((err) => console.log('ERR 2 >>>', err));

    res.json(data);
  });
};

exports.listOrders = (req, res) => {
  Order.find()
    .populate('user', '_id name address')
    .sort('-created')
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(error),
        });
      }
      res.json(orders);
    });
};

exports.getStatusValues = (req, res) => {
  res.json(Order.schema.path('status').enumValues);
};

exports.updateOrderStatus = (req, res) => {
  Order.update(
    { _id: req.body.orderId },
    { $set: { status: req.body.status } },
    (err, order) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(order);
    }
  );
};
