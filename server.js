const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.post("/sendEmail", (req, res) => {
    console.log(req.body);

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "imuraeisakuweb@gmail.com",
            pass: "wdofgjhymqfhvueg"
        }
    });

    const mailOptions = {
        from: req.body.formEmail,
        to: "imura.eisaku@gmail.com",
        subject: `Message from ${req.body.formEmail} from Personal Website`,
        text: req.body.formMessage
    };


    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).json({message: error});
        }
        else {
            console.log(`Email sent: ${info.response}`);
            res.status(200).json({message: info.response});
        }
    });
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});