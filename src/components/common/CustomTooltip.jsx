const positionClasses = {
    top: 'bottom-full mb-2 left-1/2 -translate-x-1/2',
    bottom: 'top-full mt-2 left-1/2 -translate-x-1/2',
    left: 'right-full mr-2 top-1/2 -translate-y-1/2',
    right: 'left-full ml-2 top-1/2 -translate-y-1/2',
};

const CustomTooltip = ({ children, tooltip, position = 'top' }) => {
  return (
    <div className="relative group">
      {children}
      {tooltip && (
        <span
        className={`absolute ${positionClasses[position]} hidden group-hover:block text-sm text-[#fff] bg-slate-500 px-2 py-1.5 rounded-lg z-10 whitespace-nowrap`}
        > 
            {tooltip}
        </span>
      )}
    </div>
  );
};

export default CustomTooltip;
