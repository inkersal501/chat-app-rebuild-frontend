import React from 'react'
import {messageService} from "@js";  

function Message({isSender, msg}) {
  return (
    <div className={`flex items-end gap-2 ${isSender ? 'flex-row-reverse' : ''}`}>
        <div
            className={`py-2 px-3 max-w-[75%] text-sm leading-relaxed
            ${isSender 
                ? 'bg-gray-800 border border-gray-700 rounded-2xl rounded-tr-none self-end' 
                : 'bg-gray-700 rounded-2xl rounded-tl-none self-start'} 
            `}
        >
            <div className="flex gap-3 justify-between items-end">
            <span className="whitespace-pre-wrap break-words">{msg.content}</span>
            <span className="text-[10px] text-gray-400 shrink-0">
                {messageService.convertDatetoTime(msg.createdAt)}
            </span>
            </div>
        </div>
    </div>
  )
}

export default Message