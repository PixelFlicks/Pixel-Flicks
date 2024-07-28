document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const fileInput = document.getElementById('avatar');
    const usernameInput = document.getElementById('username');

    if (!usernameInput.value || !fileInput.files[0]) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onloadend = function() {
        const userData = {
            username: usernameInput.value,
            avatar: reader.result
        };
        localStorage.setItem('user', JSON.stringify(userData));

        // Redireciona para a página principal após login
        window.location.href = 'index.html'; // Altere para o caminho correto da sua página inicial
    };

    reader.readAsDataURL(file);
});
