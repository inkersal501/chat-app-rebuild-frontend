import CustomTooltip from "./CustomTooltip";

const IconButton = ({ icon, tooltip = "", active, onClick, position = "top" }) => {
  const buttonElement = (
    <button
      className={`text-xl p-3 rounded-full cursor-pointer hover:bg-gray-700 ${active ? 'bg-gray-700' : ''}`}
      onClick={onClick}
    >
      {icon}
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