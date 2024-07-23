import React, { useRef } from 'react'
import { copyToClipboard } from '../lib/utils'

interface PairTitleTextProps {
  title: string
  text: string
}

const PairTitleText: React.FC<PairTitleTextProps> = ({ title, text }) => {
  const textRef = useRef<HTMLParagraphElement>(null)

  return (
    <div className="flex space-x-4 w-full ">
      <p
        className="font-bold text-xs truncate max-w-[calc(50%-1rem)]"
        title={title}
      >
        {title}
      </p>
      <p
        ref={textRef}
        onClick={() => copyToClipboard({ textRef })}
        className="text-xs truncate max-w-[calc(50%-1rem)] hover:cursor-pointer"
        title={text}
      >
        {text}
      </p>
    </div>
  )
}

export default PairTitleText
