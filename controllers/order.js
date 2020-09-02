const sgMail = require('@sendgrid/mail');
const { Order } = require('../models/order');
const { errorHandler } = require('../helpers/dbErrorHandler');
const adminEmailBody = require('../templates/orderToAdmin');
const buyerEmailBody = require('../templates/orderToUser');
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

    const adminEmailData = {
      to: 'sales@bristar.be',
      from: order.user.email,
      subject: `A new order is received`,
      html: adminEmailBody(order),
    };
    sgMail
      .send(adminEmailData)
      .then((sent) => console.log('SENT >>>', sent))
      .catch((err) => console.log('ERR >>>', err));

    // email to buyer
    const buyerEmailData = {
      to: order.user.email,
      from: 'sales@bristar.be',
      subject: `You order is in process`,
      html: buyerEmailBody(req, order),
    };
    sgMail
      .send(buyerEmailData)
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
