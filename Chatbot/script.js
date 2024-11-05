let userName = '';
let isNameAsked = false; // To track if we have already asked for the user's name

document.getElementById('sendBtn').addEventListener('click', function() {
    const userInput = document.getElementById('userInput').value;
    if (userInput.trim() === '') return; // Ignore empty input

    // Display user message
    addMessage('You: ' + userInput, 'user');

    // Clear input
    document.getElementById('userInput').value = '';

    // Simulate AI typing
    showTypingIndicator();

    // Simulate API call with a delay
    setTimeout(() => {
        const response = getAIResponse(userInput);
        hideTypingIndicator();
        addMessage('Tusaroo: ' + response, 'ai');
        saveChatHistory();
    }, 1500); // 1.5-second delay for typing simulation
});

function addMessage(message, sender) {
    const chatbox = document.getElementById('chatbox');
    const messageElement = document.createElement('p');
    messageElement.className = sender;
    messageElement.textContent = message;
    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight; // Scroll to the bottom
}

function showTypingIndicator() {
    document.getElementById('typingIndicator').style.display = 'block';
}

function hideTypingIndicator() {
    document.getElementById('typingIndicator').style.display = 'none';
}

// Enhanced AI response function with problem-solving capabilities
function getAIResponse(input) {
    const lowerInput = input.toLowerCase();
    let response;

    // Handle asking for the user's name
    if (!userName && !isNameAsked) {
        isNameAsked = true;
        return "What's your name? I’d love to know you better!";
    } else if (isNameAsked && !userName) {
        userName = lowerInput; // Store the user's name
        return `Nice to meet you, ${userName}! How can I help you today?`;
    }

    // Analyze user input for emotional context
    const currentEmotion = detectEmotion(lowerInput);

    // Respond based on detected emotion and context
    switch (currentEmotion) {
        case 'sad':
            response = `I'm really sorry to hear that you're feeling this way, ${userName}. It's completely okay to feel sad sometimes. Would you like to talk about what's been bothering you?`;
            break;
        case 'happy':
            response = `That’s fantastic, ${userName}! I love hearing that. What has been making you feel this way? Let’s celebrate it together! 🎉`;
            break;
        case 'anxious':
            response = `I understand that feeling anxious can be overwhelming, ${userName}. Have you tried any techniques to calm down? Here’s a helpful tip: deep breathing can be really effective. I'm here to listen if you want to share what’s on your mind.`;
            break;
        case 'neutral':
            response = `It's great to chat with you, ${userName}. Sometimes, it’s nice to just have a conversation. What’s something that’s been on your mind lately?`;
            break;
        case 'compliment':
            response = `Wow, thank you for sharing that, ${userName}! Recognizing the good in yourself is so important. What are some things you appreciate about yourself? 🌟`;
            break;
        case 'frustrated':
            response = `I hear you, ${userName}. Feeling frustrated can be really tough. It might help to take a break or talk it out. What’s been causing your frustration?`;
            break;
        case 'overwhelmed':
            response = `It sounds like you're feeling overwhelmed, ${userName}. It’s okay to take a break. Here’s a simple method: make a list of things to do and prioritize them. What specific tasks are overwhelming you?`;
            break;
        case 'stress':
            response = `Stress can really take a toll, ${userName}. Try to take some time for yourself. Have you thought about setting aside a few minutes for relaxation techniques? What’s stressing you out?`;
            break;
        default:
            response = `I’m here to help, ${userName}. Can I assist you in any way? What’s been on your mind?`;
            break;
    }

    return response;
}

// Function to detect emotion based on user input
function detectEmotion(input) {
    const positiveWords = [
        "super", "great", "right", "nice", "cool", "outstanding", "fantastic",
        "better", "wonderful", "patient", "perfect", "sensational", "beautiful",
        "excellent", "exceptional", "charming", "delightful", "remarkable", "inspiring",
        "motivating", "extraordinary", "humorous", "loyal", "witty", "righteous",
        "openhearted", "kindhearted", "simple", "lovely", "gentle", "pleasant",
        "proud", "enjoyable", "affable", "amiable", "phenomenal", "polite",
        "sympathetic", "considerate", "honest", "understanding", "kind", "straightforward",
        "sincere", "intriguing", "respectable", "brilliant", "genius", "accomplished",
        "significant", "substantial", "courageous", "bright", "dynamic", "efficient",
        "intelligent", "fearless", "energetic", "diligent", "hardworking", "versatile",
        "enthusiastic", "adventurous", "trustworthy", "persistent", "determined", "funny",
        "observant", "hilarious", "impressive", "splendid", "proactive", "powerful",
        "non-judgemental", "organised", "amazing", "adorable", "admirable", "astonishing",
        "amusing", "flexible", "breathtaking", "resourceful", "tactical", "practical",
        "adaptable", "positive", "well-educated", "authentic"
    ];

    const negativeWords = [
        "sad", "depressed", "down", "frustrated", "angry", "hurt", "disappointed",
        "stressed", "overwhelmed", "worried", "anxious", "nervous", "scared"
    ];

    // Check for positive words in the user input
    for (const word of positiveWords) {
        if (input.includes(word)) {
            return 'compliment';
        }
    }

    // Check for negative words in the user input
    for (const word of negativeWords) {
        if (input.includes(word)) {
            if (word === "frustrated") return 'frustrated';
            if (word === "overwhelmed") return 'overwhelmed';
            if (word === "stress") return 'stress';
            return 'sad';
        }
    }

    // Check for neutral context
    return 'neutral';
}

// Save chat history to local storage
function saveChatHistory() {
    const chatbox = document.getElementById('chatbox');
    localStorage.setItem('chatHistory', chatbox.innerHTML);
}

// Load chat history from local storage
function loadChatHistory() {
    const chatHistory = localStorage.getItem('chatHistory');
    if (chatHistory) {
        document.getElementById('chatbox').innerHTML = chatHistory;
    }
}

// Load chat history on page load and introduce Tusaroo
window.onload = function() {
    loadChatHistory();
    setTimeout(() => {
        addMessage('Tusaroo: Hello! I am Tusaroo, your friendly AI chatbot. How was your day?', 'ai');
    }, 500); // Slight delay for introduction
};
