import axios from "axios";

// nodemailer.js
export const sendEmail = async (email, appointmentData) => {
  try {
    // Make the API request to your Node.js server to send the email
    const response = await axios.post("/send-email", {
      to: email,
      subject: "New Appointment Confirmation",
      text: `Hello,\n\nYou have successfully booked a new appointment.\n\nAppointment Details:\nTitle: ${appointmentData.title}\nDescription: ${appointmentData.content}\nDate: ${appointmentData.date}\nTime: ${appointmentData.time}\n\nThank you!\n`,
    });

    console.log("Email sent:", response.data.message);
  } catch (error) {
    console.error("Error sending email:", error);
    // Handle the error case
  }
};
