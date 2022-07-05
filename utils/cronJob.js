var cron = require('node-cron');
const mailer =  require("../utils/emailSender");

cron.schedule('0 * * * *', () => {
  // sending mails to mikramyousaf@gmail.com for testing purposes
  console.log('sending mails every hour');
  mailer.emailSender("mikramyousaf@gmail.com");
});
