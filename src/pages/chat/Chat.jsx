import React from 'react'
import { useAppStore} from '@/store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import ChatContainer from './components/chat-container';
import ContactsContainer from './components/contacts-container';
import EmptyContainer from './components/empty-chat-container';

// Chat page shell
// - Reads userInfo and selectedChatType from the store
// - Typically renders ContactsContainer (left) + ChatContainer (right)
// - Protected by PrivateRoute at the routing level
// - Keep this component lightweight; heavy logic lives in child components
// Default export or named export should match how you import elsewhere

const Chat = () => {

  const {userInfo,selectedChatType}=useAppStore();
  const navigate=useNavigate();
  useEffect(() => {
    if(!userInfo.profileSetup){
      toast.error("please setup profile to continue");
      navigate("/profile");
    }

  }, [userInfo,navigate])
  
  return (
    <div className='flex h-[100vh] text-white overflow-hidden '>
      
      <ContactsContainer />
      {
        selectedChatType===undefined ?
      <EmptyContainer />
      :
      <ChatContainer />
}
    </div>
  )
}

export { Chat }


// create the documentation for this project including all the information I have done so far and in order so that anyone can refer and build it later and also update it when I tell you