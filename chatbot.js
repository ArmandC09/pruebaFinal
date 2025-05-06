// Define las palabras clave, sinónimos y respuestas
const responses = {
    saludo: {
        keywords: ["hola", "que tal"],
        response: "Hola, mi nombre es Chatbot. ¿En qué puedo ayudarte hoy?"
    },
    despedida: {
        keywords: ["adiós", "hasta luego", "chao", "nos vemos"],
        response: "¡Hasta luego! Si necesitas algo más, no dudes en preguntar."
    },
    ayuda: {
        keywords: ["ayuda", "asistencia", "soporte", "necesito ayuda"],
        response: "Claro, estoy aquí para ayudarte. ¿Qué necesitas saber?"
    },
    contacto: {
        keywords: ["contacto", "hablar con alguien", "atención al cliente", "comunicación"],
        response: "Puedes contactarnos a través de nuestro correo electrónico."
    },
    precios: {
        keywords: ["precios", "costos", "tarifas", "valor", "cuánto cuesta", "costo"],
        response: "Nuestros precios varían según el producto o servicio. Por favor, contáctanos para más información."
    },
    quejas: {
        keywords: ["queja", "reclamo", "problema", "insatisfacción"],
        response: "Lamentamos que hayas tenido una mala experiencia. Por favor, envíanos un correo electrónico con los detalles y lo resolveremos."
    },
    productos: {
        keywords: ["productos", "materiales", "servicios", "ofertas", "nuestros productos"],
        response: "Ofrecemos una amplia variedad de productos y servicios. ¿Qué necesitas?"
    },
    servicios: {
        keywords: ["servicios", "aplicaciones", "soporte", "ayuda", "nuestros servicios"],
        response: "Nuestros servicios incluyen soporte técnico, mantenimiento y asistencia personalizada. ¿Qué necesitas?"
    },
    ayudaGeneral: {
        keywords: ["ayuda general", "preguntas frecuentes", "faq", "dudas"],
        response: "Puedes consultar nuestra sección de preguntas frecuentes en nuestro sitio web para obtener más información."},
    contactoGeneral: {
        keywords: ["contacto general", "correo electrónico", "soporte técnico", "atención al cliente"],
        response: "Puedes contactarnos a través de nuestro correo electrónico o por teléfono para recibir asistencia."},
    horarios: {
        keywords: ["horarios", "horario de atención", "días de atención", "horas de trabajo"],
        response: "Nuestro horario de atención es de lunes a viernes de 9:00 a 18:00 horas."
    },
};

// Función para manejar el mensaje del usuario
function handleUserMessage(userMessage) {
    userMessage = userMessage.toLowerCase();
    let response = "Lo siento, no entiendo tu pregunta. Por favor, intenta de nuevo.";

    for (const category in responses) {
        const data = responses[category];
        for (const keyword of data.keywords) {
            if (userMessage.includes(keyword)) {
                response = data.response;
                break;
            }
        }
        if (response !== "Lo siento, no entiendo tu pregunta. Por favor, intenta de nuevo.") {
            break;
        }
    }

    return response;
}

// Vincula el chatbot con el HTML
document.addEventListener("DOMContentLoaded", () => {
    const chatButton = document.getElementById("chat-button");
    const chatContainer = document.getElementById("chat-container");
    const chatMessages = document.getElementById("chat-messages");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");

    // Mostrar/ocultar el chat al hacer clic en el botón
    chatButton.addEventListener("click", () => {
        chatContainer.style.display = chatContainer.style.display === "none" || chatContainer.style.display === "" ? "flex" : "none";
    });

    // Función para agregar mensajes al contenedor
    function addMessage(content, sender) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", sender);
        messageDiv.textContent = content;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Desplaza hacia abajo
    }

    // Maneja el evento de clic en el botón "Enviar"
    sendBtn.addEventListener("click", () => {
        const userMessage = userInput.value.trim();
        if (userMessage) {
            addMessage(userMessage, "user"); // Agrega el mensaje del usuario
            const botResponse = handleUserMessage(userMessage); // Obtiene la respuesta del bot
            addMessage(botResponse, "chatbot"); // Agrega la respuesta del bot
            userInput.value = ""; // Limpia el campo de entrada
        }
    });

    // Permite enviar el mensaje al presionar Enter
    userInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Evita el comportamiento predeterminado
            sendBtn.click();
        }
    });
});











