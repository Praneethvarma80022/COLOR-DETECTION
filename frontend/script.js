document.getElementById("uploadImage").addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const imgElement = document.getElementById("uploadedImage");
        imgElement.src = e.target.result;
    };
    reader.readAsDataURL(file);
});

document.getElementById("uploadedImage").addEventListener("click", function (event) {
    const imgElement = event.target;
    const rect = imgElement.getBoundingClientRect();

    // Calculate relative coordinates
    const x = Math.floor(event.clientX - rect.left);
    const y = Math.floor(event.clientY - rect.top);

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
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert("❌ Error: " + data.error);
        } else {
            document.getElementById("colorName").textContent = `Color: ${data.color_name}`;
            document.getElementById("rgbValue").textContent = `RGB: (${data.r}, ${data.g}, ${data.b})`;
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("❌ Failed to detect color. Please try again.");
    });
});
