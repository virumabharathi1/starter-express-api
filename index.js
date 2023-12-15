const express = require("express");
const bodyparser = require("body-parser");
const nodemailer = require("nodemailer");
const config = require("./config");
const app = express();
const port = 5010;
const cors = require("cors");
app.use(cors());
app.use(bodyparser.json());



app.post("/register", (req, res) => {
  console.log(req.body);
  const transporter = nodemailer.createTransport(config.mail);
  const email = req.body.email;
  const name = req.body.name;
  const mailOptions = {
    from: "itservices@talentakeaways.com",
    to: `${name}`,
    subject: "Thank You for Your Interest in Our Courses!",
    html: `
    <html>
      <head>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          h1 {
            color: #007BFF;
          }
          p {
            line-height: 1.6;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Thank You for Your Interest!</h1>
          <p>
            Dear ${email},<br><br>
            Thank you for visiting our site to learn more about our courses. We appreciate your interest, and we'll keep you updated with the latest information on our courses and offerings.
          </p>
          <p>Best regards,<br>TNASDC LMS</p>
        </div>
      </body>
    </html>
  `,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    console.log(error);
    if (error) {
      res.status(500).json({
        status_code: 500,
        message: "failure",
      });
    } else {
      res.status(200).json({
        status_code: 200,
        message: "Success",
      });
    }
  });
});
app.get("/", (req, res) => {
  res.send("Hello, this is the root route!");
});
app.listen(port, (err) => {
  console.log(`Server is running on port ${port}`);
});
