import Link from "next/link";
import { SlHandbag } from "react-icons/sl";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

function Basket() {
  const items = useSelector((state: RootState) => state.basket.items);

  if (items.length === 0) return null;

  return (
    <Link href="/checkout">
      <div className="fixed bottom-10 right-10 z-50 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-gray-300">
        {items.length > 0 && (
          <span className="absolute -right-2 -top-2 z-50 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-[10px] text-white">
            {items.length}
          </span>
        )}
        <SlHandbag className="headerIcon h-8 w-8" />
      </div>
    </Link>
  );
}

export default Basket;
