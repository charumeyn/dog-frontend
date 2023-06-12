"use client"

import PaypalCheckoutButton from "./PaypalCheckoutButton";

const Checkout = () => {
  const product = {
    description: "Design+Code React Hooks Course",
    price: 19
  };

  return (
    <div>
      <div className="paypal-button-container">
        <PaypalCheckoutButton product={product} />
      </div>
    </div>
  );
};

export default Checkout;