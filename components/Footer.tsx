import React from "react";
import Image from "next/image";
import Link from "next/link";
const Footer = () => {
  return (
    <footer className="flexStart footer mt-20 ">
      <div className="flex flex-col lg:flex-row justify-between  gap-5 w-full">
        <div className="flex items-start flex-col">
          <Image src="/logo.svg" width={135} height={52} alt="Logo" />
          <p className="text-start text-sm font-montserrat mt-5 max-w-xs">
            Pronnect is underdevelopment.
          </p>
        </div>
        <div>
          <div>
            <ul className="flex font-montserrat text-stone-500 mt-5 justify-between text-sm min-[460px]:flex-row min-[460px]:gap-8 gap-2 flex-col">
              <li>
                <Link href="/" className="hover-text">
                  Donate
                </Link>
              </li>
              <li>
                <Link href="/" className="hover-text">
                  About us
                </Link>
              </li>
              <li>
                <Link href="/" className="hover-text">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/" className="hover-text">
                  Support
                </Link>
              </li>
              <li>
                <Link href="/" className="hover-text">
                  Help
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-row gap-10">
          <a href="/" className="glow-on-hover">
            <Image src="/instagram.svg" alt="insta" width={20} height={20} />
          </a>
          <a href="/" className="glow-on-hover">
            <Image src="/linkedin.svg" alt="linkedin" width={20} height={20} />
          </a>
          <a href="/" className="glow-on-hover">
            <Image src="/facebook.svg" alt="fb" width={20} height={20} />
          </a>
          <a href="/" className="glow-on-hover">
            <Image src="/github.svg" alt="gh" width={20} height={20} />
          </a>
        </div>
      </div>

      <div className="flex lg:flex-row flex-col justify-between w-full font-montserrat text-xs text-stone-500">
        <p>@ 2023 Pronnect. All rights Reserved</p>
        <p className="text-gray">
          <span className=" font-semibold">Testing Phase [0]</span>
          Projects
        </p>
      </div>
    </footer>
  );
};

export default Footer;
