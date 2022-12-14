import { BsSearch } from "react-icons/bs";
import { SlHandbag } from "react-icons/sl";
import { AiOutlineUser } from "react-icons/ai";
import { TbBallFootball } from "react-icons/tb";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

const Header = () => {
  const items = useSelector((state: RootState) => state.basket.items);
  const { data: session } = useSession();

  return (
    // bg-[#d9d7d5]
    <header className="sticky top-0 z-30 flex items-center justify-between bg-[#d9d7d5] p-2">
      <div className="flex w-1/5 items-center justify-center ">
        <Link href="/">
          <TbBallFootball className="headerIcon" />
        </Link>
      </div>
      <div className="hidden space-x-8 md:flex">
        <a href="" className="headerLink">
          Product
        </a>
        <a href="" className="headerLink">
          Explore
        </a>
        <a href="" className="headerLink">
          Support
        </a>
        <a href="" className="headerLink">
          Business
        </a>
      </div>
      <div className="flex w-1/5 items-center justify-center space-x-3">
        <BsSearch className="headerIcon" />
        <Link href="/checkout">
          <div className="relative cursor-pointer">
            <span className="absolute -top-1 -right-1 z-50 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-orange-600 to-red-600 font-semibold text-[#d9d7d5]">
              {items.length}
            </span>
            <SlHandbag className="headerIcon" />
          </div>
        </Link>
        {session ? (
          <Image
            alt={`${(<AiOutlineUser className="headerIcon" />)}`}
            src={
              session.user?.image ||
              "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
            }
            className="cursor-pointer rounded-full"
            width={34}
            height={34}
            onClick={() => signOut()}
          />
        ) : (
          <AiOutlineUser className="headerIcon" onClick={() => signIn()} />
        )}
      </div>
    </header>
  );
};

export default Header;
