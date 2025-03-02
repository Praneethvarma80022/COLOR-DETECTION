async function sendMessage() {
    let userInput = document.getElementById("user-input").value.trim();
    if (userInput === "") return;

    let chatBox = document.getElementById("chat-box");

    // Show user message in chat
    let userMessage = document.createElement("div");
    userMessage.className = "user-message";
    userMessage.innerText = userInput;
    chatBox.appendChild(userMessage);

    // Scroll to latest message
    chatBox.scrollTop = chatBox.scrollHeight;

    document.getElementById("user-input").value = "";

    // Send request to Flask backend
    try {
        let response = await fetch("http://127.0.0.1:3000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userInput })
        });

        let data = await response.json();

        // Show bot response
        let botMessage = document.createElement("div");
        botMessage.className = "bot-message";

        if (data.precautions && data.medication) {
            botMessage.innerHTML = `<b>Precautions:</b> ${data.precautions}<br><b>Medication:</b> ${data.medication}`;
        } else {
            botMessage.innerText = data.message || "I didn't understand that. Can you rephrase?";
        }

        chatBox.appendChild(botMessage);
        chatBox.scrollTop = chatBox.scrollHeight;
    } catch (error) {
        console.error("Error:", error);
    }
}

// Allow "Enter" key to send message
function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}
