import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CheckmarkIcon } from "react-hot-toast";
import { AiOutlineCheck } from "react-icons/ai";
import { GiConverseShoe } from "react-icons/gi";

import {
  BsChevronDoubleDown,
  BsChevronDown,
  BsChevronUp,
} from "react-icons/bs";
import { SlHandbag } from "react-icons/sl";
import { TbBallFootball } from "react-icons/tb";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import Button from "../components/Button";
import { RootState } from "../redux/store";
import { fetchLineItems } from "../utils/fetchLineItems";
import { useSession } from "next-auth/react";

interface Props {
  products: StripeProduct[];
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const sessionId = query.session_id as string;
  const products = await fetchLineItems(sessionId);
  return {
    props: {
      products,
    },
  };
};

const Success = ({ products }: Props) => {
  console.log(products);
  const { data: session } = useSession();
  const router = useRouter();
  const { session_id } = router.query;
  const [mounted, setMounted] = useState(false);
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  // const items = useSelector((state: RootState) => state.basket.items);
  const subtotal = products.reduce(
    (acc, product) =>
      acc + (product.price.unit_amount * product.quantity) / 100,
    0
  );
  const total = subtotal + 20;
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  useEffect(() => {
    setMounted(true);
  }, []);

  const showOrderSummaryCondition = isTabletOrMobile ? showOrderSummary : true;

  const handleShowOrderSummary = () => {
    setShowOrderSummary(!showOrderSummary);
  };

  return (
    <div>
      <Head>
        <title>Thank you! - Tuva</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="mx-auto max-w-xl">
        <div className="h-24 w-12 lg:hidden">
          <Link href="/">
            <TbBallFootball className="relative ml-4 h-16 w-8 cursor-pointer opacity-75 transition hover:opacity-100 " />
          </Link>
        </div>
      </header>
      <main className="grid grid-cols-1 lg:grid-cols-9">
        <section className="order-2 mx-auto max-w-xl pb-12 lg:col-span-5 lg:mx-0 lg:max-w-none lg:pr-16 lg:pt-16 xl:pl-16 2xl:pl-44">
          <Link href="/">
            <TbBallFootball className="relative ml-4 hidden h-60 w-60 cursor-pointer  transition hover:opacity-100 lg:inline-flex" />
          </Link>
          <div className="my-8 ml-4 flex space-x-4 lg:ml-14 xl:ml-0">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-black">
              <AiOutlineCheck className="h-8 w-8" />
            </div>
            <div>
              <p className="text-sm text-gray-600">
                Order #{session_id?.slice(-5)}
              </p>
              <h4 className="text-lg">Thank you </h4>
              {session ? session.user?.name?.split(" ")[0] : "Guest"}
            </div>
          </div>
          <div className="mx-4 divide-y divide-gray-300 rounded-md border border-gray-300 p-4 lg:ml-14">
            <div className="space-y-2 pb-3">
              <p>Your order is confirmed</p>
              <p className="text-sm text-gray-600">
                We've accepted your order, and we're getting it ready. Come back
                to this page for updates on your shipment status.
              </p>
            </div>
            <div className="pt-3 text-sm">
              <p className="font-medium text-gray-600">
                Other tracking number:
              </p>
              <p>CNB21324533</p>
            </div>
          </div>
          <div className="my-4 mx-4 space-y-2 rounded-md border border-gray-300 p-4 lg:ml-14">
            <p>Order updates</p>
            <p className="text-sm text-gray-600">
              You'll get shipping and delivery updates by email and text.
            </p>
          </div>
          <div className="mx-4 flex flex-col items-center justify-between text-sm lg:ml-14 lg:flex-row">
            <p className="hidden lg:inline">Need help? Contact us</p>
            {mounted && (
              <Button
                title="Continue Shopping"
                onClick={() => router.push("/")}
                width={isTabletOrMobile ? "w-full" : undefined}
                padding="py-4"
              />
            )}
          </div>
        </section>
        {mounted && (
          <section className="overflow-y-scroll border-y border-l border-gray-300 bg-[#FAFAFA] lg:order-2 lg:col-span-4 lg:h-screen lg:border-y-0">
            <div
              className={`w-full ${
                showOrderSummary && "border-b"
              } border-gray-300 text-sm lg:hidden`}
            >
              <div className="mx-auto flex max-w-xl items-center justify-between px-4 py-6">
                <button
                  onClick={handleShowOrderSummary}
                  className="flex flex-row items-center space-x-2"
                >
                  <SlHandbag className="headerIcon" />
                  <p>Show order summary</p>
                  {showOrderSummary ? (
                    <BsChevronUp className="h-4 w-4" />
                  ) : (
                    <BsChevronDown className="h-4 w-4" />
                  )}
                </button>
                <p className="font-md text-xl font-semibold text-black">
                  {total.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
              </div>
            </div>
            {showOrderSummaryCondition && (
              <div className="lg:max-2-lg mx-auto max-w-xl divide-y border-gray-300 px-4 py-4 lg:mx-0 lg:px-10 lg:py-16">
                <div className="space-y-4 pb-4">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center space-x-4 text-sm font-medium"
                    >
                      <div className="relative flex h-16 w-16 items-center justify-center rounded-md border border-gray-300 bg-[#F1F1F1]">
                        <div className="h-7 w-7">
                          <TbBallFootball className="h-6 w-6 animate-bounce rounded-md transition" />
                        </div>
                        <div className="bg-grey-700 absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gray-600  text-gray-100">
                          {product.quantity}
                        </div>
                      </div>
                      <p className="flex-1">{product.description}</p>
                      <p className="font-semibold">
                        {(product.price.unit_amount / 100).toLocaleString(
                          "en-US",
                          {
                            style: "currency",
                            currency: "USD",
                          }
                        )}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="space-y-1 py-4">
                  <div className="flex justify-between text-sm">
                    <p className="font-semibold text-gray-600">Subtotal</p>
                    <p className="font-semibold">
                      {subtotal.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <p className="text-gray-600">Discount</p>
                    <p className="text-gray-600"></p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <p className="text-gray-600">Shipping</p>
                    <p className="font-medium">
                      {(20).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}{" "}
      </main>
    </div>
  );
};

export default Success;
