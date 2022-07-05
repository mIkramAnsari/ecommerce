// var cron = require('node-cron');
// // const mailer =  require("../utils/emailSender");

// cron.schedule("*/1 * * * *", function() {
//   sendMail();
//   });
// // cron.schedule('* * * * *', () => {
// //   // sending mails to mikramyousaf@gmail.com for testing purposes
// //   console.log('sending mails every minutes');
// //   mailer.emailSender("mikramyousaf@gmail.com");
// // });
// "use strict";
// const nodemailer = require("nodemailer");
// function sendMail() {
//   let mailTransporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//       user: "mikramyousaf@gmail.com",
//       pass: "Kami123456+."
//       }
//   });
    
//   // Setting credentials
//   let mailDetails = {
//       from: "mikramyousaf@gmail.com",
//       to: "mikramyousaf@gmail.com",
//       subject: "Test mail ",
//       text: " email testing "
//   };
    
    
//   // Sending Email
//   mailTransporter.sendMail(mailDetails, 
//                   function(err, data) {
//       if (err) {
//           console.log("Error Occurs", err);
//       } else {
//           console.log("Email sent successfully");
//       }
//   });
// }