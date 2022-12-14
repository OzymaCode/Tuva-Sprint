import Image from "next/image";
import { useEffect, useState } from "react";
import { TbChevronDown } from "react-icons/tb";
import { useSelector } from "react-redux";
import Button from "../components/Button";
import CheckoutProduct from "../components/CheckoutProduct";
import Header from "../components/Header";
import { RootState } from "../redux/store";
import { urlFor } from "../sanity";
// import { loadStripe, Stripe } from "@stripe/stripe-js";
import Stripe from "stripe";
import { Elements } from "@stripe/react-stripe-js";
import { stripeCheckout } from "../stripeCheckout";

const Checkout = () => {
  const items = useSelector((state: RootState) => state.basket.items);
  const [publishableKey, setPublishableKey] = useState("");
  const [itemGroups, setItemGroups] = useState(
    {} as { [key: string]: Product[] }
  );
  const [subtotal, setSubtotal] = useState(0);
  useEffect(() => {
    console.log(items);
    const newItems = items.reduce((acc, element) => {
      acc[element._id] = acc[element._id] || [];
      acc[element._id].push(element);
      return acc;
    }, {} as { [key: string]: Product[] });
    setItemGroups(newItems);
    const newSubtotal = items.reduce((acc, item) => acc + item.price, 0);
    setSubtotal(newSubtotal);
  }, [items]);

  const [loading, setLoading] = useState(false);
  // const createCheckoutSession = async () => {
  //   setLoading(true);
  // const checkoutSession: Stripe.Checkout.Session = await fetchPostJSON(
  //   "/api/checkout_sessions",
  //   {
  //     items: items,
  //   }
  // );
  // if ((checkoutSession as any).statusCode == 500) {
  //   console.error((checkoutSession as any).message);
  //   return;
  // }
  // const stripe = await getStripe();
  // const { error } = await stripe!.redirectToCheckout({
  //   sessionId: checkoutSession.id,
  // });
  // console.warn(error.message);

  // convert item to format

  //   setLoading(false);
  // };
  const createCheckoutSession = async () => {
    setLoading(true);
    let lineItems = [];
    for (let i = 0; i < Object.values(itemGroups).length; i++) {
      let itemGroup = Object.values(itemGroups)[i];
      let price = itemGroup[0].stripeApi;
      let quantity = itemGroup.length;
      lineItems.push({
        price,
        quantity,
      });
    }
    await stripeCheckout({ lineItems });
    setLoading(false);
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-[#d9d7d5] p-4">
        <div>
          <h1 className="text-4xl font-semibold lg:text-5xl xl:text-6xl">
            Review your bag.
          </h1>
          <p className="text-2xl font-semibold">
            Free felivery and free returns.
          </p>
        </div>
        <div>
          {items.length > 0 &&
            Object.values(itemGroups).map((item, index) => {
              return (
                <CheckoutProduct
                  item={item[0]}
                  key={index}
                  quantity={item.length}
                />
              );
            })}
        </div>
        <div className="border-b-2 border-[#cacaca] pb-5">
          <div className="flex flex-row items-center justify-between py-1 font-semibold">
            <p>Subtotal</p>
            <p>
              {subtotal.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
          </div>
          <div className="flex flex-row items-center justify-between py-1 font-semibold">
            <p>Shipping</p>
            <p>FREE</p>
          </div>
          <div className="flex flex-row items-center justify-between py-1 font-semibold">
            <p>Estimated tax:</p>
            <p>$ -</p>
          </div>
          <div className="flex cursor-pointer flex-row items-center py-1 font-semibold text-blue-500">
            Enter zip code <TbChevronDown className="h-6 w-6" />
          </div>
        </div>
        <div>
          <div className="flex flex-row items-center justify-between py-1 font-semibold">
            <p className="text-3xl">Total</p>
            <p className="text-3xl">
              {subtotal.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
          </div>
          <Button
            noIcon
            title="Check Out"
            loading={loading}
            width="w-full"
            onClick={createCheckoutSession}
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
