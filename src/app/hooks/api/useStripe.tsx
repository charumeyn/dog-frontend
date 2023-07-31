import { useMutation } from "@tanstack/react-query";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const stripecheckout = async (cart: any) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      cart
    ],
    mode: 'payment',
  });


  console.log(session)
}

const useStripecheckout = (
  onLoginSuccess: () => void,
  onLoginError?: () => void
) => {
  return useMutation((cart: any) => stripecheckout(cart), {
    onSuccess: (data: any) => {
      console.log(data)
    },
    onError: (error) => {
      console.log(error)
    },
  });
};

export { useStripecheckout }