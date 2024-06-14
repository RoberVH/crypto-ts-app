"use client"
import { useState } from 'react';
import Link from 'next/link';
import { useRouter} from 'next/navigation'

interface MenuItem {
    menu: string
    path: string
}

interface Menu {
    title: string
    items: MenuItem[]
}


const menues: Menu[]  = [
    {
    title: 'Criptografía',
    items: [
           { 
            menu: 'Hash',
            path: '/funciones/hash'
        },
        { 
            menu: 'Firma',
            path: '/funciones/firma'
        }
    ]
    },
    {
        title: 'Consenso',
        items: [
            { 
                menu: 'Mecanismos',
                path: '/mecanismos'
            },
            { 
                menu: 'PoW',
                path: '/PoW'
            }
        ]
    }
]

export default function Menues() {
    const router=useRouter()
    const [visibleMenu, setVisibleMenu] = useState<number | null>(null)

    const handleMouseEnter = (index: number) => {
        setVisibleMenu(index)
    }

    const handleMouseLeave = () => {
        setVisibleMenu(null)
    }

    const handleMenueClick = (path: string) => {
        setVisibleMenu(null)
        router.push(path)
    }

    return (
        <div className="flex justify-center space-x-8  text-white">
            {menues.map((menu, index) => (
                <div
                    key={index}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(index)}
                    
                    >
                    <h3 className="cursor-pointer"
                    >
                        {menu.title}
                    </h3>
                    <ul 
                        onMouseLeave={handleMouseLeave}
                        className={`absolute bg-white shadow-lg mt-2 ${visibleMenu === index ? 'block' : 'hidden'}`}    
                        
                    >
                        {menu.items.map((item, idx) => (
                            <li key={idx} className="whitespace-nowrap">
                                <Link href={item.path}>
                                    <button className="block px-4 py-2 text-gray-700 hover:bg-[#FFC000] hover:text-white  cursor-pointer"
                                    onClick={ () => handleMenueClick(item.path)}>
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