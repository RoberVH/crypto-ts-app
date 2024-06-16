import Image from 'next/image'
import Menues from '@/app/components/menues'

export default function Header() {
    return (
        <div id="header-id" className=" mx-auto  p-8 bg-[#080708] h-32">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                <Image 
                    src="/logoRU2.png"
                    alt="Logo"
                    width={50}
                    height={50}
                    className="ml-8"
                />
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
    )
}