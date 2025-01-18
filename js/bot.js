const chatInput = document.querySelector('.chat-input textarea');
const sendChatBtn = document.querySelector('.chat-input span');
const chatbox = document.querySelector('.chatbox');
const chatbotToggler = document.querySelector('.chatbot-toggler');
const chatbotCloseBtn = document.querySelector('.close-btn');

let userMessage;
const API_KEY = "";
const inputInitHieght = chatInput.scrollHeight;

const createChatBubble = (message, className) => {
    // create a chat <li> element with the passed message and class name
    const chatBubble = document.createElement('li');
    chatBubble.classList.add("chat", className);
    let chatBubbleContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatBubble.innerHTML = chatBubbleContent;
    chatBubble.querySelector('p').textContent = message;
    return chatBubble;
}

const generateBotResponse = (incomingMessage) => {
    // generate random bot response
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = incomingMessage.querySelector('p');

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: userMessage
                }
            ]
        })
    }
    // send request to OpenAI GPT-3 API to get bot response
    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        messageElement.classList.add('error');
       messageElement.textContent = data.choices[0].message.content;
    }).catch(error => {
        messageElement.textContent = "Sorry, I am not able to process your request right now!";  
    }).finally(() => {
        chatbox.scrollTo(0,chatbox.scrollHeight);
    });
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;
    chatInput.value = "";
    chatInput.style.height = `${inputInitHieght}px`;

    // append user message to chatbox
    chatbox.appendChild(createChatBubble(userMessage, "outgoing")); 
    chatbox.scrollTo(0,chatbox.scrollHeight);

    // display thinking message
    setTimeout(() => {
        const incomingMessage = createChatBubble("Thinking....", "incoming");
        chatbox.appendChild(incomingMessage);
        chatbox.scrollTo(0,chatbox.scrollHeight); 
        generateBotResponse(incomingMessage);
    }, 600);
}

chatInput.addEventListener('input', () => {
    // auto resize the chat input textarea
    chatInput.style.height = `${inputInitHieght}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});
chatInput.addEventListener('keydown', (e) => {
    // if user presses enter key and not shift key, send the chat message to bot 
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    } 
});

sendChatBtn.addEventListener('click', handleChat);
chatbotToggler.addEventListener('click', () => document.body.classList.toggle('showchatbot'));
chatbotCloseBtn.addEventListener('click', () => document.body.classList.remove('showchatbot'));
