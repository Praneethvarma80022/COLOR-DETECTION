function sendMessage() {
    const userInput = document.getElementById("user-input").value.trim();
    if (!userInput) return;

    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;
    document.getElementById("user-input").value = ""; // Clear input field

<<<<<<< HEAD
    fetch("http://localhost:3000/chat", {
=======
document.getElementById("uploadedImage").addEventListener("click", function (event) {
    const imgElement = event.target;
    const rect = imgElement.getBoundingClientRect();

    // Calculate scaling factor for accurate coordinate mapping
    const scaleX = imgElement.naturalWidth / imgElement.width;
    const scaleY = imgElement.naturalHeight / imgElement.height;

    // Adjust coordinates to the original image size
    const x = Math.floor((event.clientX - rect.left) * scaleX);
    const y = Math.floor((event.clientY - rect.top) * scaleY);

    const fileInput = document.getElementById("uploadImage");
    if (fileInput.files.length === 0) {
        alert("⚠️ Please upload an image first!");
        return;
    }

    const formData = new FormData();
    formData.append("image", fileInput.files[0]); // Send the uploaded image
    formData.append("x", x);
    formData.append("y", y);

    fetch("http://127.0.0.1:5000/detect_color", {
>>>>>>> f141db2 (Added all project files)
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput })
    })
    .then(response => response.json())
    .then(data => {
<<<<<<< HEAD
        if (data.precautions && data.medication) {
            chatBox.innerHTML += `<p><strong>Precautions:</strong> ${data.precautions}</p>`;
            chatBox.innerHTML += `<p><strong>Medication:</strong> ${data.medication}</p>`;
        } else if (data.message) {
            chatBox.innerHTML += `<p><strong>Bot:</strong> ${data.message}</p>`;
=======
        if (data.error) {
            alert("❌ Error: " + data.error);
        } else {
            document.getElementById("colorName").textContent = `Color: ${data.color_name}`;
            document.getElementById("rgbValue").textContent = `RGB: (${data.r}, ${data.g}, ${data.b})`;
            
            // Update Color Preview Box
            document.getElementById("colorPreview").style.backgroundColor = `rgb(${data.r}, ${data.g}, ${data.b})`;
>>>>>>> f141db2 (Added all project files)
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
