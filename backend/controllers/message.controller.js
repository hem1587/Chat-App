import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async(req,res)=>{
    try {
        const {message}=req.body;
        const {id:receiverId}=req.params;
        const senderId=req.user._id;

        let conversation=await Conversation.findOne({
            participants:{$all:[senderId,receiverId]}
        })
        if(!conversation){
            conversation=await Conversation.create({
                participants:[senderId,receiverIds]
            })
        }
        const newMessage=new Message({
            senderId,receiverId,message
        })
        if(newMessage){
            conversation.messages.push(newMessage._id)
        }
        await Promise.all([conversation.save(),newMessage.save()])
       
    } catch (error) {
        res.status(500).json({error:"Internal server error"})
        console.log("Error in send Message contoller",error.message)
    }

}
export const getMessages=async(req,res)=>{
   try {
    const {id:userToChatId}=req.params 
    const senderID=req.user._id
    const conversation=await Conversation.findOne({
        participants:{$all:[senderID,userToChatId]}
    }).populate("messages") ;
    if(!conversation) return res.status(200).json([]);
    const messages=conversation.messages;
    res.status(200).json(messages)
   } catch (error) {
       console.log("Error in send Message contoller",error.message)
    res.status(500).json({error:"Internal server error"})
   }
} 