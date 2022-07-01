import { createTransport } from "nodemailer";
import twilio from "twilio";
import { ADMIN_EMAIL, TWILIO_AUTHTOKEN, TWILIO_SID } from "../config/config";

export const transporter = createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: ADMIN_EMAIL,
    pass: "4Z7tq4rx3qDF12xjYB",
  },
});

export const twilioClient = twilio(TWILIO_SID, TWILIO_AUTHTOKEN);
