import nodemailer from "nodemailer";

const email = process.env.EMAIL;
const pass = process.env.EMAIL_PASS;
const emailTo = process.env.EMAIL_TO;
const secure = process.env.NODE_ENV !== "development";

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure,
  auth: {
    user: email,
    pass,
  },
});

const sendEmail = async () => {
  if (!email && !pass && !emailTo) return;

  transporter.sendMail(
    {
      from: email,
      to: emailTo,
      subject: "Новая заявка",
      text: "На сайт skyarhyz.ru поступила новая заявка! ",
      html: "<h1>На сайт skyarhyz.ru поступила новая заявка!</h1><a href='https://skyarhyz.ru/dashboard/requests'>Посмотреть</a>",
    },
    (error, info) => {
      if (error) {
        return console.log(error);
      }

      console.log("Message sent: " + info.response);
    }
  );
};

export default sendEmail;
