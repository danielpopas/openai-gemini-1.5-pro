document.getElementById('sendButton').addEventListener('click', sendMessage);

document.getElementById('input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Предотвратить действие по умолчанию для Enter
        sendMessage();
    }
});

function sendMessage() {
    const input = document.getElementById('input');
    const message = input.value; // Получаем значение из поля ввода
    if (!message) return; // Если сообщение пустое, не делаем ничего
    input.value = ''; // Очищаем поле ввода

    // Добавляем сообщение пользователя в чат
    const userMessage = document.createElement('div');
    userMessage.classList.add('message', 'user-message');
    userMessage.innerHTML = `<span>Вы: </span>${message}<span class="timestamp">${new Date().toLocaleTimeString()}</span>`;
    document.getElementById('messages').appendChild(userMessage);

    // Отправляем сообщение на сервер и обрабатываем ответ
    fetch('https://openai-gemini-1-5-pro.vercel.app/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer AIzaSyD-2HgAcDbq8nh4XaTLwk6XwDlZh1qMrIY'
        },
        body: JSON.stringify({ messages: [{ content: message }] })
    })
    .then(response => response.json())
    .then(data => {
        const aiMessage = document.createElement('div');
        aiMessage.classList.add('message', 'ai-message');
        aiMessage.innerHTML = `<span>API: </span>${data.choices[0].message.content}<span class="timestamp">${new Date().toLocaleTimeString()}</span>`;
        document.getElementById('messages').appendChild(aiMessage);
    })
    .catch(error => console.error('Ошибка:', error));
}
