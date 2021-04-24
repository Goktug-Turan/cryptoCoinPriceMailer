require('dotenv').config()
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
       user : process.env.EMAIL_USER,
        pass : process.env.EMAIL_PASS
    }
});

const from = process.env.EMAIL_USER;
function sendEmail(to, subject, text) {
    transporter.sendMail({from, to, subject, text}, (error, info) => {
            if (error) {
            console.log(error)
            } else {
            console.log(`Email sent: ${info.response}`)
            }
        }
    )
};

const recipients = process.env.EMAIL_RECIPIENTS;
const sendEmailInRequestedFormat = (coinName, coinPrice, lowerLimit, upperLimit) => {
    let highAlert = `${coinName} price is now above your upper price target of ${upperLimit} $ at ${coinPrice} $`;
    let lowAlert = `${coinName} price is now below your lower price target of ${lowerLimit} $ at ${coinPrice} $`;
    let text = `Last ${coinName} price is ${coinPrice} $.`;
    let subject = '';
    if(coinPrice < lowerLimit){
        subject = lowAlert
    } if(coinPrice > upperLimit) {
        subject = highAlert
    };
    sendEmail( recipients, subject, text)
};

module.exports.send = sendEmailInRequestedFormat;
