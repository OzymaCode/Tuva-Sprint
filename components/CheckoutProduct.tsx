import Image from "next/image";
import { TbChevronDown } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { urlFor } from "../sanity";
import { RootState } from "../redux/store";
import { removeFromBasket } from "../redux/basketSlice";

interface Props {
  item: Product;
  quantity: number;
}

const CheckoutProduct: React.FC<Props> = ({ item, quantity }: Props) => {
  const dispatch = useDispatch();
  const removeItemFromBasket = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(removeFromBasket(item));
    }
  };
  return (
    <div className="border-b-2 border-[#cacaca] pb-5">
      <div className="">
        <div className="">
          <Image
            alt={`Image of ${item.title}`}
            src={urlFor(item.image[0]).url()}
            width={250}
            height={250}
          />
        </div>
      </div>
      <h1 className="text-2xl font-semibold">{item.title}</h1>
      <div className="flex flex-row items-center justify-between font-semibold">
        <div className="flex flex-row">
          {quantity}
          <TbChevronDown
            onClick={() => dispatch(removeFromBasket(item))}
            className="h-6 w-6 cursor-pointer text-blue-500"
          />
        </div>
        <span className="text-2xl">
          {(item.price * quantity).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </span>
      </div>
      <div className="flex flex-row items-center justify-between pt-1    font-semibold">
        <span className="flex cursor-pointer flex-row font-semibold text-blue-500">
          Show product details <TbChevronDown className="h-6 w-6" />
        </span>
        <span
          className="cursor-pointer text-blue-500"
          onClick={removeItemFromBasket}
        >
          Remove
        </span>
      </div>
    </div>
  );
};

export default CheckoutProduct;
