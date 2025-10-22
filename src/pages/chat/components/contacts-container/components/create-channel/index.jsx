import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { TooltipProvider } from "@radix-ui/react-tooltip"
import { FaPlus } from "react-icons/fa";
import {  useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { GET_ALL_CONTACTS_ROUTES, HOST } from "@/utils/constants";
import Lottie from "react-lottie"
import { Avatar,AvatarImage } from "@radix-ui/react-avatar";
import { Input } from "@/components/ui/input";
import { apiClient } from "@/lib/api-client";
import { SEARCH_CONTACTS_ROUTES } from "@/utils/constants";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useAppStore } from "@/store";
import { Button } from "@/components/ui/button";
import MultipleSelector from "@/components/ui/multipleselect";
import { CREATE_CHANNEL_ROUTE } from "@/utils/constants";

const CreateChannel = () => {
  const { selectedChatData, selectedChatType, setSelectedChatType, setSelectedChatData, addChannel } = useAppStore();
  const [openNewContactModal,setNewChannelModal]=useState(false);
  const [allContacts,setAllContacts]=useState([]);
  const [selectedContacts,setSelectedContacts]=useState([]);
  const [channelName,setChannelName]=useState("");

  useEffect(()=>{
    const getData=async()=>{
        const response=await apiClient.get(GET_ALL_CONTACTS_ROUTES,{withCredentials:true});
        if(response.data.contacts){
            setAllContacts(response.data.contacts);
            console.log(allContacts);
        }
    
        

    };
    getData();

  },[])


 const createChannel=async ()=>{
   try{
    if(channelName.length>0 && selectedContacts.length>0){
            console.log(selectedContacts);
       const response=await apiClient.post(CREATE_CHANNEL_ROUTE,{
           name:channelName,
           members:selectedContacts.map((contact)=>contact.value)
       },{withCredentials:true});
       console.log(response.data.channel)
       if(response.data.status==201){
           setChannelName("");
           setSelectedContacts([]);
           addChannel(response.data.channel);
           setNewChannelModal(false);
       }
    }
      
   }
   catch(error){
       console.log({error});
   }
 }

  
  return (
   <>
   <TooltipProvider>
     <Tooltip>
       <TooltipTrigger><FaPlus onClick={()=>setNewChannelModal(true)}
        className="text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer transition-all duration-300 "
       /></TooltipTrigger>
       <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white ">
        Create New Channel
       </TooltipContent>
     </Tooltip>
   </TooltipProvider>
   <Dialog open={openNewContactModal} onOpenChange={setNewChannelModal}>
  <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
    <DialogHeader>
      <DialogTitle>

      Please fill up the details for new channel.
      </DialogTitle>
      <DialogDescription>


      </DialogDescription>
    </DialogHeader>
    <div>
      <Input placeholder="Channel Name" className='rounded-lg p-6 bg-[#2c2e3b] border-none ' 
      onChange={e=>setChannelName(e.target.value)}
      value={channelName}

      />
    </div>
    <div>
        <MultipleSelector
        className="rounded-lg bg-[#2c2e3b] border-none py-2 text-white"
        defaultOptions={allContacts}
        placeholder="Search Contacts"
        value={selectedContacts}
        onChange={setSelectedContacts}
        emptyIndicator={
            <p className="text-center text-lg leading-10 text-gray-600 "> No results found. </p>
        }
        />
    </div>
    <div>
        <Button className="w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300" onClick={createChannel}>
            Create Channel
        </Button>
    </div>

  </DialogContent>
  </Dialog>
   </>
  )


}

export default CreateChannel;
/*
"New DM" flow
- Toggles a modal/drawer to search users
- Calls search endpoint and stores results in searchedContacts
- On selecting a user: setSelectedChatType("contact") and setSelectedChatData(user)
  (Ensure your store defines these actions and you import the correct hook)
- Default export; import without braces
*/
