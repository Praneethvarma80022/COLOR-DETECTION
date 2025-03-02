function sendMessage() {
    const userInput = document.getElementById("user-input").value.trim();
    if (!userInput) return;

    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;
    document.getElementById("user-input").value = ""; // Clear input field

    fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput })
    })
    .then(response => response.json())
    .then(data => {
        if (data.precautions && data.medication) {
            chatBox.innerHTML += `<p><strong>Precautions:</strong> ${data.precautions}</p>`;
            chatBox.innerHTML += `<p><strong>Medication:</strong> ${data.medication}</p>`;
        } else if (data.message) {
            chatBox.innerHTML += `<p><strong>Bot:</strong> ${data.message}</p>`;
        }
        chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to latest message
    })
    .catch(error => {
        chatBox.innerHTML += `<p><strong>Error:</strong> Could not connect to chatbot.</p>`;
    });
}

// Allow pressing "Enter" to send a message
function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}
