import { useState, React } from 'react';
import { CohereClient } from "cohere-ai";

function ChatRoom() {
  const [conversation, setConversation] = useState([]);
  

  const cohere = new CohereClient({
    token: "CmTSYM5W6eTKpPlGPoLxOYrp9SkIu8qmdNSaKaFJ", // env vars not working...
  });

  // Needs to eventually pull last conversation from mongo
  const initialChat = async (e) => {
    e.preventDefault();
      const reply = await cohere.chat({
        
        message: "You are a chatbot greeting the user. In a friendly and extremely concise way, mention your last conversation together, if there was one.",
        stream: false,
        chatHistory: [
          {
            role: "USER",
            message: "I have mastered python, but I am a rookie in Java."
          },
          {
            role: "USER",
            message: "What language should I work on today?"
          },
          {
            role: "CHATBOT",
            message: "Since you have mastered Python, I suggest you work on Java or another language you are less comfortable in."
          },
        ],
        maxTokens: 50,
      });

      // {
      //   *         message: "Can you give me a global market overview of solar panels?",
      //   *         stream: false,
      //   *         chatHistory: [{
      //   *                 role: Cohere.ChatMessageRole.Chatbot,
      //   *                 message: "Hi!"
      //   *             }, {
      //   *                 role: Cohere.ChatMessageRole.Chatbot,
      //   *                 message: "How can I help you today?"
      //   *             }],
      //   *         promptTruncation: Cohere.ChatRequestPromptTruncation.Off,
      //   *         citationQuality: Cohere.ChatRequestCitationQuality.Fast,
      //   *         temperature: 0.3,
      //   *         searchOptions: {},
      //   *         promptOverride: {}
      //   *     }
      
      
      console.log('prompt is: ', reply, 'chat is: ', reply.text);
  }
  
  
  const userSendChat = async (e) => {
    e.preventDefault();
    const userMessage = e.target.parentElement.querySelector('input').value
      const reply = await cohere.chat({
        message: userMessage,
        stream: false,
        chatHistory: [],
        maxTokens: 150,
      });

      
      console.log('prompt is: ', userMessage, 'chat is: ', reply.text);
  }
  



  return (
    <div>
      <h1>Chat Room</h1>
      <div>
        <p>Welcome to the Chat Room!</p>
        <form>
          <input type='text'></input>
          <button onClick={userSendChat}>Chat</button>
        </form>
        
      </div>
    </div>
  );

}

export default ChatRoom;
