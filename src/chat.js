document.getElementById('input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Предотвратить действие по умолчанию для Enter

        const message = this.value; // Получаем значение из поля ввода
        this.value = ''; // Очищаем поле ввода

        // Добавляем сообщение пользователя в чат
        const userMessage = document.createElement('div');
        userMessage.textContent = 'Вы: ' + message;
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
            aiMessage.textContent = 'API: ' + data.choices[0].message.content;
            document.getElementById('messages').appendChild(aiMessage);
        })
        .catch(error => console.error('Ошибка:', error));
    }
});
