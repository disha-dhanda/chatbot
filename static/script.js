function sendMessage() {
    const userInputField = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");
    const userInput = userInputField.value.trim();

    if (userInput === "") return;

    // Display user message
    const userMessage = document.createElement("div");
    userMessage.className = "message user";
    userMessage.innerText = userInput;
    chatBox.appendChild(userMessage);
    scrollToBottom();

    // Send to Flask backend
    fetch("/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: userInput })
    })
    .then(response => response.json())
    .then(data => {
        const botMessage = document.createElement("div");
        botMessage.className = "message bot";
        botMessage.innerText = data.response;
        chatBox.appendChild(botMessage);
        scrollToBottom();
    });

    userInputField.value = "";
}

function scrollToBottom() {
    const chatBox = document.getElementById("chat-box");
    chatBox.scrollTop = chatBox.scrollHeight;
}

const scrollBtn = document.getElementById("scroll-btn");
const chatBox = document.getElementById("chat-box");

chatBox.addEventListener("scroll", () => {
    const atBottom = chatBox.scrollHeight - chatBox.scrollTop <= chatBox.clientHeight + 10;
    scrollBtn.style.display = atBottom ? "none" : "block";
});

scrollBtn.addEventListener("click", scrollToBottom);
