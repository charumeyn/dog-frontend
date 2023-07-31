import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2022-11-15",
});

export async function POST(req: NextRequest) {
  const { data } = await req.json();
  const { amount } = data;
  try {
    let customer;

    const findCustomer = await stripe.customers.list({
      email: 'char1@gmail.com',
      limit: 1
    })

    if (findCustomer.data.length > 0) {
      customer = findCustomer.data[0].id
    } else {
      const newCustomer = await stripe.customers.create({
        email: 'char@gmail.com',
        description: 'My First Test Customer (created for API docs at https://www.stripe.com/docs/api)',
      });
      customer = newCustomer.id
    }

    // const newCustomer = await stripe.customers.create({
    //   email: 'charcandava@gmail.com',
    //   description: 'My First Test Customer (created for API docs at https://www.stripe.com/docs/api)',
    // });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount) * 100,
      currency: "USD",
      description: "test",
      customer: customer,
    });

    return new NextResponse(paymentIntent.client_secret, { status: 200 });

    // const customer = await stripe.customers.list({
    //   email: 'charcandava@gmail.com',
    //   limit: 1
    // })

    // if (!customer) {
    //   const newCustomer = await stripe.customers.create({
    //     email: 'charcandava@gmail.com',
    //     description: 'My First Test Customer (created for API docs at https://www.stripe.com/docs/api)',
    //   });

    //   const paymentIntent = await stripe.paymentIntents.create({
    //     amount: Number(amount) * 100,
    //     currency: "USD",
    //     description: "test",
    //     customer: newCustomer.id
    //   });

    //   console.log("newCustomer", newCustomer)

    //   return new NextResponse(paymentIntent.client_secret, { status: 200 });
    // } else {
    //   const paymentIntent = await stripe.paymentIntents.create({
    //     amount: Number(amount) * 100,
    //     currency: "USD",
    //     description: "test",
    //     customer: customer.data[0].id
    //   });
    //   console.log("customer", customer)
    //   return new NextResponse(paymentIntent.client_secret, { status: 200 });
    // }


  } catch (error: any) {
    return new NextResponse(error, {
      status: 400,
    });
  }
}