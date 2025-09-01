import CustomTooltip from "./CustomTooltip";

const IconButton = ({ icon, tooltip = "", active, onClick, position = "top", badge=0 }) => {
  const buttonElement = (
    <button
      className={`text-xl p-3 rounded-full cursor-pointer hover:bg-gray-700 ${active ? 'bg-gray-700' : ''} relative`}
      onClick={onClick}
    >
      {icon} {badge > 0 && <span className="absolute top-[-5px] right-[-4px] text-xs font-bold bg-red-600 px-2 py-1 rounded-full">{badge}</span>}
    </button>
  );

  return tooltip !== "" ? (
    <CustomTooltip tooltip={tooltip} position={position}>
      {buttonElement}
    </CustomTooltip>
  ) : (
    buttonElement
  );
};

export default IconButton;