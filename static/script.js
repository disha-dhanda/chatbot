function sendMessage() {
    let input = document.getElementById("user-input");
    let message = input.value.trim();
    if (message === "") return;

    let chatBox = document.getElementById("chat-messages");
    chatBox.innerHTML += `<div class="message user">${message}</div>`;
    input.value = "";

    fetch("/get_response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message })
    })
    .then(res => res.json())
    .then(data => {
        chatBox.innerHTML += `<div class="message bot">${data.response}</div>`;
        scrollToBottom();
    });
}

function scrollToBottom() {
    let chatBox = document.getElementById("chat-messages");
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Enter key = send
document.getElementById("user-input").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        sendMessage();
    }
});

// Scroll button toggle
let chatMessages = document.getElementById("chat-messages");
chatMessages.addEventListener("scroll", function() {
    let btn = document.getElementById("scroll-btn");
    if (chatMessages.scrollTop < chatMessages.scrollHeight - chatMessages.clientHeight - 50) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
});
