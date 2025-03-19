// 📸 Función para abrir la cámara
async function openCamera() {
    try {
        const video = document.getElementById("video");
        video.style.display = "block";

        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        video.srcObject = stream;

        // Agregar un botón para tomar la foto
        let captureButton = document.createElement("button");
        captureButton.textContent = "Capturar QR";
        captureButton.id = "captureButton";
        captureButton.classList.add("qr-button");
        captureButton.onclick = capturePhoto;

        document.querySelector(".container").appendChild(captureButton);

        // Ocultar el contenido del QR al comenzar
        const qrContentBox = document.getElementById('qrContentBox');
        qrContentBox.style.display = 'none'; // Ocultar hasta escanear el QR
    } catch (error) {
        console.error("Error al acceder a la cámara:", error);
        alert("No se pudo acceder a la cámara. Verifica los permisos.");
    }
}

// 📷 Función para capturar la foto del QR y analizarlo
function capturePhoto() {
    const video = document.getElementById("video");
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    // Tomar foto del video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Detener la cámara
    video.srcObject.getTracks().forEach(track => track.stop());
    video.style.display = "none";

    // Quitar botón de captura
    document.getElementById("captureButton")?.remove();

    // Ocultar el texto inicial
    const qrContentBox = document.getElementById('qrContentBox');
    const qrContentText = document.getElementById('qrContentText');
    qrContentText.textContent = 'Escaneando...';
    qrContentBox.style.display = 'block'; // Mostrar el contenido

    // Convertir imagen y analizar QR
    canvas.toBlob(blob => processImage(blob));
}

// 📌 Función para analizar la imagen del QR
function processImage(image) {
    const img = new Image();
    img.src = URL.createObjectURL(image);

    img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = img.width * 1.5;
        canvas.height = img.height * 1.5;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const qrCodeData = jsQR(imageData.data, canvas.width, canvas.height);

        const qrContentText = document.getElementById('qrContentText');
        const qrContentBox = document.getElementById('qrContentBox');

        if (qrCodeData) {
            console.log("QR Detectado:", qrCodeData.data);
            qrContentText.textContent = qrCodeData.data;
            qrContentText.style.color = "green";

            if (isValidURL(qrCodeData.data)) {
                const visitButton = document.createElement('button');
                visitButton.textContent = 'Ver información';
                visitButton.classList.add('qr-button');
                visitButton.addEventListener('click', () => {
                    window.open(qrCodeData.data, '_blank');
                });
                qrContentBox.appendChild(visitButton);
            }
        } else {
            console.error("No se detectó un código QR en la imagen.");
            qrContentText.textContent = 'No se detectó un código QR en la imagen.';
            qrContentText.style.color = "red";
        }
    };
}

function isValidURL(string) {
    try {
        new URL(string);
        return true;
    } catch {
        return false;
    }
}

document.getElementById('fileInput').addEventListener('change', readQRCode);

// 📂 Función para leer el código QR desde un archivo
function readQRCode(event) {
    const file = event.target.files[0];
    if (file) {
        const imageUrl = URL.createObjectURL(file);
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // Aumentar la resolución del canvas para mejorar la detección
            canvas.width = img.width * 2;
            canvas.height = img.height * 2;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            // Aplicar filtro para mejorar contraste (escala de grises y binarización)
            let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            let data = imageData.data;
            for (let i = 0; i < data.length; i += 4) {
                let avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                data[i] = data[i + 1] = data[i + 2] = avg > 128 ? 255 : 0; // Binarización
            }
            ctx.putImageData(imageData, 0, 0);

            console.log("Canvas size:", canvas.width, canvas.height);
            console.log("Processing Image Data...");
            
            const qrCodeData = jsQR(imageData.data, canvas.width, canvas.height);
            const qrContentText = document.getElementById('qrContentText');
            const qrContentBox = document.getElementById('qrContentBox');
            
            qrContentText.textContent = 'Aquí aparecerá el contenido del código QR';
            qrContentBox.querySelector('button')?.remove();
            
            if (qrCodeData) {
                console.log("QR Detectado:", qrCodeData.data);
                qrContentText.textContent = ` ${qrCodeData.data}`;
                qrContentText.style.color = "green";
                if (isValidURL(qrCodeData.data)) {
                    const visitButton = document.createElement('button');
                    visitButton.textContent = 'Ver información';
                    visitButton.style.marginTop = '20px';
                    visitButton.style.padding = '10px 15px';
                    visitButton.style.fontSize = '16px';
                    visitButton.style.cursor = 'pointer';
                    visitButton.style.backgroundColor = '#4CAF50';
                    visitButton.style.color = 'white';
                    visitButton.style.border = 'none';
                    visitButton.style.borderRadius = '8px';

                    visitButton.addEventListener('click', () => {
                        window.open(qrCodeData.data, '_blank');
                    });

                    qrContentBox.appendChild(visitButton);
                }
            } else {
                console.error("No se detectó un código QR en la imagen.");
                qrContentText.textContent = 'No se detectó un código QR en la imagen.';
                qrContentText.style.color = "red";
            }
        };
    }
}

function triggerFileInput() {
    document.getElementById('fileInput').click();
}
