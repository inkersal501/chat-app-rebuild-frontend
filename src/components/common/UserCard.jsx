import { FaComments  } from "react-icons/fa"; 
import Button from "./Button";
import IconButton from "./IconButton";

function UserCard({ name, type = "default", onActionClick, onDeclineClick, openChat }) {
  const getStatusContent = () => {
    switch (type) {
      case "send":
        return (
          <Button onClick={onActionClick}>
            Add Friend
          </Button>
        );
      case "request-sent":
        return (
          <div className="text-green-400 font-medium text-xs"> 
            Request Sent
          </div>
        );
      case "accept":
        return ( 
          <div className="flex gap-2">
            <Button onClick={onActionClick}>Accept</Button>
            <Button variant="danger" onClick={onDeclineClick}>Decline</Button>
          </div>
        );
      case "request-accepted":
        return (
          <div className="text-green-400 font-medium text-xs"> 
            Request Accepted
          </div>
        );
      case "request-declined":
        return (
          <div className="text-red-400 font-medium text-xs"> 
            Request Declined
          </div>
        ); 
      case "friends":
        return (
          <div className="text-center"> 
            <IconButton 
              icon={<FaComments />}
              tooltip={"Click to chat"}
              position="left"
              active={""}
              onClick={openChat}
            />            
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`flex items-center justify-between gap-3 px-2 py-2 ${type==='friends'?'hover:bg-slate-800':''} transition duration-200 cursor-pointer`}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 flex items-center justify-center rounded-full text-gray-900
        bg-gradient-to-r from-gray-200 via-slate-100 to-gray-300 font-semibold text-lg uppercase">
          {name[0]}
        </div>
        <span className="text-white text-base font-medium">{name}</span>
      </div>
      {getStatusContent()}
    </div>
  );
}

export default UserCard;
