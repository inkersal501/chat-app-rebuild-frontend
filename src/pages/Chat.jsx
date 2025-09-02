import TopBar from '@components/common/TopBar';
import ChatLayout from '@components/layout/ChatLayout';

function Chat() {
  return (
    <div className="h-screen flex flex-col bg-gray-900">  
      <TopBar /> 
      <div className="flex-1 flex overflow-hidden"> 
        <ChatLayout /> 
      </div>
    </div>
  );
}

export default Chat;
