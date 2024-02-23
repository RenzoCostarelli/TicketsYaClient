import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(mailData: any) {
  try {
    const {
      id,
      name,
      lastName,
      dni,
      email,
      phone,
      status,
      ticketTypeId,
      eventId,
      quantity,
      createdAt,
      updatedAt
    } = mailData;

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
        <p>${name} ${lastName}</p>
        <p>${dni}</p>
        <p>${email}</p>
        <p>${phone}</p>
        <p>P:${status}</p>
        <p>Q:${quantity}</p>
    `,
    };

    const data = await transporter.sendMail(mailOptions);
    console.log(data.response);
    return data.response;
  } catch (error) {
    return NextResponse.json(
      {
        message: error,
      },
      { status: 500 }
    );
  }
}
