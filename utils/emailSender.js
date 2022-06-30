const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  "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"
);
function emailSender(to) {
  const msg = {
    to: to, // Change to your recipient
    from: "shehzad@spadasoft.com", // Change to your verified sender
    subject: "Welcome",
    text: 'Thank You so much for your registration to ecommerce app',
    html: '<h1>Thank You so much for your registration to ecommerce app</h>',
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
      return;
    })
    .catch((error) => {
      console.log(
        "🚀 ~ file: emailSender.js ~ line 48 ~ emailSender ~ error",
        error.response.body
      );
      return error;
      // console.error("errors=>", error.response.body.errors);
    });
  return;
}
module.exports = {
  emailSender,
};
