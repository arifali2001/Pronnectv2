import Image from "next/image";
import Link from "next/link";

import { NavLinks } from "@/constant";
import { getCurrentUser } from "@/lib/session";

import AuthProviders from "./AuthProviders";
import Button from "./Button";
import ProfileMenu from "./ProfileMenu";

const Navbar = async () => {
  const session = await getCurrentUser();

  return (
    <div>
      <nav className="flex max-[377px]:hidden justify-between font-montserrat  navbar bg-gray-50">
        <div className="xl:flex xl:flexStart mt-3 hidden  xl:w-[500px]">
          <ul className="xl:flex hidden text-xs gap-6">
            {NavLinks.map((link) => (
              <Link href={link.href} key={link.key} className="hover-text">
                {link.text}
              </Link>
            ))}
          </ul>
        </div>
        <div className="mt-3">
          <Link href="/">
            <Image src="/logo.svg" width={116} height={43} alt="logo" />
          </Link>
        </div>

        <div className="xl:w-[500px]">
          <div className="mt-1">
            {session?.user ? (
              <div className="flex flex-row items-center justify-end gap-7">
                <ProfileMenu session={session} />
                <Link
                  href="/create-project"
                  className="bg-black-100 text-white text-sm py-1 rounded-full px-2"
                >
                  + Host New
                </Link>
              </div>
            ) : (
              <div className="flex flex-row  justify-end">
                <AuthProviders />
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Responsive */}
      <nav className="flex flex-row min-[377px]:hidden justify-between font-montserrat  navbar bg-gray-50">
        <div className="xl:flex xl:flexStart mt-3 hidden  xl:w-[500px]">
          <ul className="xl:flex hidden text-xs gap-6">
            {NavLinks.map((link) => (
              <Link href={link.href} key={link.key}>
                {link.text}
              </Link>
            ))}
          </ul>
        </div>
        <div className="mt-5">
          <Link href="/">
            <Image src="/logo.svg" width={130} height={47} alt="logo" />
          </Link>
        </div>

        <div>
          <div className="mt-3">
            {session?.user ? (
              <div className="flex flex-row items-center justify-end gap-2">
                <ProfileMenu session={session} />
                <Link
                  href="/create-project"
                  className="bg-black-100 text-sm rounded-full font-montserrat py-1 px-2 text-white"
                >
                  + Host
                </Link>
              </div>
            ) : (
              <div className="flex flex-row  justify-end">
                <AuthProviders />
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
