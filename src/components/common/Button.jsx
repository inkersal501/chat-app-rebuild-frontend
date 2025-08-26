function Button({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 rounded-lg font-semibold text-xs text-gray-900
        bg-gradient-to-r from-gray-200 via-slate-100 to-gray-300
        shadow-lg border border-slate-300
        hover:from-gray-300 hover:via-slate-200 hover:to-gray-400
        active:from-gray-400 active:via-slate-300 active:to-gray-500
        transition-all duration-300
        hover:shadow-2xl
        backdrop-blur-md
        cursor-pointer
        ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
