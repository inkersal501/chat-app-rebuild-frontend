import React from 'react'

function UserIcon({name}) {
  return (
    name!=="" ? (
    <div className="w-8 h-8 flex items-center justify-center rounded-full text-gray-900
    bg-gradient-to-r from-gray-200 via-slate-100 to-gray-300 font-semibold text-lg uppercase">
        {name[0]}
    </div>
    ):null
  )
}

export default UserIcon;