import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2022-11-15",
});

export async function POST(req: NextRequest) {
  const { data } = await req.json();
  const { amount, email, description, currency } = data;
  try {
    let customer;

    const findCustomer = await stripe.customers.list({
      email: email,
      limit: 1
    })

    if (findCustomer.data.length > 0) {
      customer = findCustomer.data[0].id
    } else {
      const newCustomer = await stripe.customers.create({
        email,
        description,
      });
      customer = newCustomer.id
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount) * 100,
      currency,
      description,
      customer,
    }).then()

    return NextResponse.json({
      id: paymentIntent.id,
      clientSecret: paymentIntent.client_secret,
      amount: paymentIntent.amount,
      customer: customer,
      email: email,
      status: paymentIntent.status
    });

  } catch (error: any) {
    return new NextResponse(error, {
      status: 400,
    });
  }
}