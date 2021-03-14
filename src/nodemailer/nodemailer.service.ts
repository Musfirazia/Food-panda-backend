import { Injectable } from "@nestjs/common";
const nodemailer = require("nodemailer");
require("dotenv").config();

@Injectable()
export class NodemailerService {
  constructor() { }

  sendEmail = async (req,type) => {
    console.log('Name -->', req.body.name)
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
        to: req.body.email,
        subject: "PHNX-Dao reason for rejection.",
        text: req.body.reasonForRejecting,
        html:
          `
        <div style=" background-color: white" >
        <img src="cid:logo" style="
        margin-left: -9px;" alt="Pheonix Dao" width="230px"/>
        <br/>
        <h3 style="font-style: 100%" > ${type=="proposalRejection" ? "Your proposal has been rejected" : "Your milestone has been rejected"}</h3>
        <hr />
        <br />

        <h3> To: <span>${req.body.email}</span> </h3>
        <h3> From: <span>${process.env.EmailUserName}</span> </h3>

        <h3>Proposal Name: <span> ${type=="proposalRejection" ? req.body.proposalName : req.body.name} </span> </h3>
          <h3 >Reason for rejection: ${req.body.reasonForRejecting}</h3>
          <br/>
          <p>
          <hr />
          <p>Thanks, </p>
          <p>The PheonixDao Team</P>
        </div>
        `,
        attachments: [{
          filename: 'Logo.png',
          path: __dirname + '/assets/foodpanda.png',
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
