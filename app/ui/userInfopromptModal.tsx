import React from 'react'

import Link from 'next/link'

const linkExplorer = process.env.NEXT_PUBLIC_EXPLORER_URL

interface UserInfoPromptModalProps {
  message: string
  hash: string
  children?: React.ReactNode // children optional according to where is called from
}

function UserInfoPromptModal(props: UserInfoPromptModalProps) {
  const { message, children, hash } = props
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 text-xs">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
        <p className='text-2xl  text-center text-blue-700'>&#128712; </p>
        <p className="mb-2 text-xs font-semibold">  {message}</p>
        <Link href={`${linkExplorer}${hash}`} target="_blank" rel="noopener noreferrer">
        <label className="mb-2">Hash de Transacción: </label>
        <p className=" truncate text-blue-600 pointer-mouse mt-2"> 
         {hash} 
          </p>
        </Link>
        <div className="text-center">{children}</div>
      </div>
    </div>
  )
}

export default UserInfoPromptModal
