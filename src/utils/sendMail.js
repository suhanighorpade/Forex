const User = require("../models/users")
const fp = require("../models/fp")
const nodemailer = require("nodemailer");

var getUsers = async function (title) {
    var provider = await fp.findOne({
        title: title
    })
    var emails = provider.users
    return emails
}


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'shivanipat74@gmail.com',
    pass: 'shivani@patil19'
  }
});

var sendNotification=async function(to,noti){
  var mailOptions = {
    from: 'shivanipat74@gmail.com',
    to: to,
    subject: 'Notification Alert',
    text: noti
  };
  const ans=await transporter.sendMail(mailOptions);
  return ans
}

module.exports = {
    getUsers,
    sendNotification
};