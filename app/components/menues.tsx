"use client";
import Link from "next/link";

interface MenuItem {
  menu: string;
  path: string;
}

interface Menu {
  title: string;
  items: MenuItem[];
}

const menues: Menu[] = [
  {
    title: "Criptografía",
    items: [
      {
        menu: "Hash",
        path: "/funciones/hash",
      },
      {
        menu: "Firma",
        path: "/funciones/firma",
      },
    ],
  },
    {
    title: "Consenso",
    items: [
      {
        menu: "PoW",
        path: "/consenso/pow",
      },
    ],
  },
  {
    title: "Contrato",
    items: [
      {
        menu: "Fuente",
        path: "/contrato/fuente",
      },
      {
        menu: "Trivias",
        path: "/contrato/trivias",
      },
    ],
  }
];

export default function Menues() {


  return (
    <div className="flex justify-center space-x-8 text-white">
    {menues.map((menu, index) => (
      <div
        key={index}
        className="relative group hover:border-b-8 border-[#FFC000]" 
        id="first-level-menu"
      >
        <h3 className="cursor-pointer">{menu.title}</h3>
        <ul
          className={`absolute bg-white shadow-lg mt-2 transition-opacity duration-300 left-1/2 transform -translate-x-1/2 group-hover:opacity-100 group-hover:visible invisible`} 
        >
          {menu.items.map((item, idx) => (
            <li key={idx} className="whitespace-nowrap">
              <Link href={item.path}>
                <button
                  className="block px-4 py-2 text-gray-700 hover:bg-[#FFC000] hover:text-white cursor-pointer"
                >
                  {item.menu}
                </button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
  )
}
