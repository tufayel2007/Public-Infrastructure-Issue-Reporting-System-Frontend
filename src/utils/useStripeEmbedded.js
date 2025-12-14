// src/Utils/useStripeEmbedded.js
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

export const useStripeEmbedded = (clientSecret) => {
  const [stripe, setStripe] = useState(null);

  useEffect(() => {
    if (!clientSecret) return;

    const initStripe = async () => {
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC);
      setStripe(stripe);

      const checkout = await stripe.initEmbeddedCheckout({
        clientSecret,
      });

      checkout.mount("#stripe-checkout");
    };

    initStripe();
  }, [clientSecret]);

  return { stripe };
};
