import React from 'react'

interface WaitModalProps {
  message: string
  children?: React.ReactNode // children optional according to where is called from
}

function WaitModal(props: WaitModalProps) {
  const { message, children } = props
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
        <h2 className="text-lg font-semibold mb-4">Por favor espere</h2>
        <p>{message}</p>
        <div className="mt-4 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <div className="text-center">
        {children}
        </div>
      </div>
    </div>
  )
}

export default WaitModal
