function MessageDate({formattedDate}) {
  return (
    <div className="text-center my-2">
        <span className="px-2 py-1 bg-gray-800 text-gray-200 text-xs rounded-md">
            {formattedDate}
        </span>
    </div>
  )
}

export default MessageDate;