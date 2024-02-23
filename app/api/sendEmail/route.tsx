import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const { subject, message } = await request.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "cannibal5033@gmail.com",
        pass: "aoga ywvd lwxq gnlv",
      },
    });

    const mailOptions = {
      from: "cannibal5033@gmail.com",
      to: "rojonicolasdev@gmail.com",
      subject: "Entradas de la ticketera",
      template: "email",
      html: `
        <h3>Titulo hardcodeado en el html</h3>
        <p>${subject}</p>
        <p>${message}</p>
    `,
    };

    const data = await transporter.sendMail(mailOptions);
    console.log(data.response);
    return NextResponse.json(
      {
        message: "Email sent",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: error,
      },
      { status: 500 }
    );
  }
}
