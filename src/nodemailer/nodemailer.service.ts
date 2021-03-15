import { Injectable } from "@nestjs/common";
const nodemailer = require("nodemailer");
require("dotenv").config();

@Injectable()
export class NodemailerService {
  constructor() { }

  sendEmail = async (req,message,email) => {
    
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
    try {
      var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: process.env.EmailUserName,
          pass: process.env.EmailPassword,
        },
      });

      var mailOptions = {
        from: process.env.EmailUserName,
        to: "musfirazia250@gmail.com",
        subject: "Order update",
        text: req.body.reasonForRejecting,
        html:
          `
        <div style=" background-color: white" >
        <img src="cid:logo" style="
        margin-left: -9px; margin:0 auto; display:flex; height:100px"  alt="Food panda" width="190px"/>
        <br/>
        <h1 style="font-style: 100%" > Order Status</h1>
        <hr />
        <br />

        <h3> To: <span>${email}</span> </h3>
        <h3> From: <span>${process.env.EmailUserName}</span> </h3>
          <h3 >${message}</h3>
          <br/>
          <p>
          <hr />
          <p>Thanks, </p>
          <p>The FoodPanda Team</P>
        </div>
        `,
        attachments: [{
          filename: 'Logo.png',
          path: './assets/foodpanda.png',
          cid: 'logo' //my mistake was putting "cid:logo@cid" here! 
        }]

      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log('123', error);
        } else {
          console.log("Email sent: ", info.response);
        }
      });


    }
    catch (e) {
      console.log(e)
      throw e

    }
  }
}
