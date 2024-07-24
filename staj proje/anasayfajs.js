let username = "";

function login() {
    username = document.getElementById('login-username').value;
    if (username.trim() === "") {
        alert("Lütfen bir kullanıcı adı girin.");
        return;
    }
    document.getElementById('login-container').style.display = "none";
    document.getElementById('chat-container').style.display = "flex";
    document.getElementById('username-display').textContent = "Hoş geldin, " + username;
}

function sendMessage() {
    var userInput = document.getElementById('user-input').value;
    if (userInput.trim() === "") return;

    // Kullanıcı mesajını göster
    var userMessage = document.createElement('div');
    userMessage.className = 'message user';
    userMessage.innerHTML = userInput + '<div class="timestamp">' + getCurrentTime() + '</div>';
    document.getElementById('chat-body').appendChild(userMessage);

    // Kullanıcı girişini temizle
    document.getElementById('user-input').value = "";
    scrollToBottom();

    // Bot cevabı beklenirken yükleniyor animasyonu göster
    var loadingMessage = document.createElement('div');
    loadingMessage.className = 'message bot loading';
    loadingMessage.textContent = 'Yükleniyor...';
    document.getElementById('chat-body').appendChild(loadingMessage);
    scrollToBottom();

    // Bot cevabını göster
    setTimeout(function() {
        document.getElementById('chat-body').removeChild(loadingMessage);
        var botMessage = document.createElement('div');
        botMessage.className = 'message bot';
        botMessage.innerHTML = getBotResponse(userInput) + '<div class="timestamp">' + getCurrentTime() + '</div>';
        document.getElementById('chat-body').appendChild(botMessage);
        scrollToBottom();
    }, 1000);
}

function getBotResponse(input) {
    input = input.toLowerCase();

    // Basit anahtar kelime eşleşmesi
    if (input.includes("merhaba") || input.includes("selam")) {
        return "Merhaba " + username + "! Size nasıl yardımcı olabilirim?";
    } else if (input.includes("nasılsın")) {
        return "Ben bir yapay zeka botuyum, bu yüzden duygularım yok, ama size yardımcı olabilirim!";
    } else if (input.includes("adın ne")) {
        return "Ben bir chatbot'um. Size nasıl yardımcı olabilirim?";
    } else if (input.includes("hava nasıl")) {
        return "Hava durumu hakkında bilgi veremem ama internette hava durumuna bakabilirsiniz.";
    } else if (input.includes("saat kaç")) {
        return "Şu anki saat: " + getCurrentTime();
    } else if (input.includes("teşekkürler")) {
        return "Rica ederim! Başka bir sorunuz var mı?";
    } else if (input.includes("ne yapıyorsun")) {
        return "Size yardımcı olmak için buradayım. Nasıl yardımcı olabilirim?";
    } else if (input.includes("hoşçakal") || input.includes("görüşürüz")) {
        return "Hoşçakalın! Görüşmek üzere.";
    } else if (input.includes("nerelisin")) {
        return "Ben bir yapay zeka botuyum, yani herhangi bir yerden değilim.";
    } else if (input.includes("hangi dilleri konuşuyorsun")) {
        return "Şu an için sadece Türkçe konuşuyorum. Ama başka diller de öğrenebilirim!";
    } else if (input.includes("ne zaman doğdun")) {
        return "Benim doğum tarihim yok, çünkü bir yazılımım. Ama her zaman buradayım!";
    } else {
        return "Üzgünüm " + username + ", sizi anlayamadım. Başka bir şey sormak ister misiniz?";
    }
}

function getCurrentTime() {
    var now = new Date();
    return now.getHours() + ':' + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
}

function scrollToBottom() {
    var chatBody = document.getElementById('chat-body');
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Enter tuşuna basıldığında sendMessage işlevini çağır
document.getElementById('user-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});
