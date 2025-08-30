import Sidebar from "./Sidebar";
import ListPanel from "./ListPanel";
import MessagePanel from "./MessagePanel";

export default function ChatLayout() {
  return (
    <div className="flex h-full w-full">     
      <div className="w-[4%] bg-gray-900 text-white h-full">
        <Sidebar />
      </div>
 
      <div className="w-[25%] bg-gray-900 border-r border-gray-700 h-full">
        <ListPanel />
      </div>
 
      <div className="w-[71%] bg-white h-full">
        <MessagePanel />
      </div>
    </div>
  );
}
