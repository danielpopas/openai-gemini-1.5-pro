document.getElementById('input').addEventListener('keypress', function(event) {
	if (event.key === 'Enter') {
	  const input = document.getElementById('input');
	  const message = input.value;
	  input.value = ''; // Очистить поле ввода

	  // Отображение сообщения пользователя в чате
	  const userMessage = document.createElement('div');
	  userMessage.textContent = 'Вы: ' + message;
	  document.getElementById('messages').appendChild(userMessage);

	  // Отправка сообщения на сервер и получение ответа
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