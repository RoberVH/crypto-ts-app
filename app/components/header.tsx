import Image from "next/image";
import Menues from "@/app/components/menues";
import Link from "next/link";

export default function Header() {
  return (
    <div id="header-id" className=" mx-auto w-screen p-8 bg-[#080708] h-32">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <Link href="/">
          <Image
            src="/logoRU2.png"
            alt="Logo"
            width={50}
            height={50}
            className="ml-8"
          />
        </Link>
        <h1 className="hidden sm:block text-xl mr-16  mb-4 sm:mb-0 text-white">
          <span className="flex space-x-4">
            <p>Curso: </p>
            <p className="text-[]">Introducción a Blockchain</p>
          </span>
        </h1>
      </div>
      <div>
        <Menues />
      </div>
    </div>
  );
}
