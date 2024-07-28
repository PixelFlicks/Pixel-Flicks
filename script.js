// Função para redirecionar para o link associado à imagem
function redirectToLink(element) {
  const link = element.getAttribute('data-link');
  if (link) {
    // Adiciona o filme à lista "Continuar Assistindo"
    continueWatching(element);
    // Abre o link em uma nova aba
    window.open(link, '_blank');
  }
}

// Função para adicionar um filme à lista "Continuar Assistindo"
function continueWatching(movieElement) {
  const continuarAssistindoContainer = document.getElementById('continuar-assistindo-container');

  // Verifica se o filme já está na lista de continuar assistindo
  const filmesNaLista = continuarAssistindoContainer.querySelectorAll('.movie');
  const filmeJaNaLista = Array.from(filmesNaLista).find(filme => filme.src === movieElement.src);

  if (filmeJaNaLista) {
    return; // Sai da função se o filme já estiver na lista
  }

  // Clona o filme para adicionar na lista de continuar assistindo
  const movieClone = movieElement.cloneNode(true);
  movieClone.removeAttribute('onclick'); // Remove o evento onclick do clone

  // Adiciona um evento de clique ao clone para redirecionar para o link
  movieClone.onclick = function() {
    const link = movieElement.getAttribute('data-link');
    if (link) {
      window.open(link, '_blank');
    }
  };

  // Adiciona o clone na lista de continuar assistindo
  continuarAssistindoContainer.appendChild(movieClone);

  // Salva a lista atualizada no localStorage
  saveContinueWatching();
}

// Função para salvar a lista "Continuar Assistindo" no localStorage
function saveContinueWatching() {
  const continuarAssistindoContainer = document.getElementById('continuar-assistindo-container');
  const movies = Array.from(continuarAssistindoContainer.children).map(movie => ({
    src: movie.src,
    alt: movie.alt,
    link: movie.getAttribute('data-link')
  }));
  localStorage.setItem('continuarAssistindo', JSON.stringify(movies));
}

// Função para carregar a lista "Continuar Assistindo" do localStorage
function loadContinueWatching() {
  const continuarAssistindoContainer = document.getElementById('continuar-assistindo-container');
  const movies = JSON.parse(localStorage.getItem('continuarAssistindo')) || [];
  movies.forEach(({ src, alt, link }) => {
    const movieElement = document.createElement('img');
    movieElement.src = src;
    movieElement.alt = alt;
    movieElement.className = 'movie';
    movieElement.setAttribute('data-link', link);

    // Adiciona um evento de clique para abrir o link do filme na lista "Continuar Assistindo"
    movieElement.onclick = function() {
      window.open(link, '_blank');
    };

    continuarAssistindoContainer.appendChild(movieElement);
  });
}

// Carregar a lista "Continuar Assistindo" ao carregar a página
window.onload = loadContinueWatching;

// Função para rolar o carrossel
function scrollCarousel(button, direction) {
  const moviesContainer = button.parentElement.querySelector('.movies-container');
  const scrollAmount = 300; // Ajuste este valor conforme necessário

  moviesContainer.scrollBy({
    left: direction * scrollAmount,
    behavior: 'smooth'
  });
}

// Função para permitir rolagem por toque
function enableTouchScrolling() {
  const containers = document.querySelectorAll('.movies-container');

  containers.forEach(container => {
    let startX, scrollLeft;

    container.addEventListener('touchstart', e => {
      startX = e.touches[0].pageX;
      scrollLeft = container.scrollLeft;
    });

    container.addEventListener('touchmove', e => {
      const x = e.touches[0].pageX;
      const walk = (x - startX) * 2; // Ajuste a sensibilidade do toque
      container.scrollLeft = scrollLeft - walk;
    });
  });
}

// Ativar rolagem por toque
enableTouchScrolling();

// Função para limpar a lista "Continuar Assistindo"
function limparContinuarAssistindo() {
  const continuarAssistindoContainer = document.getElementById('continuar-assistindo-container');
  
  // Limpa o conteúdo da div
  continuarAssistindoContainer.innerHTML = '';
  
  // Remove a lista do localStorage
  localStorage.removeItem('continuarAssistindo');
}

document.addEventListener('DOMContentLoaded', () => {
    // Carregar informações do usuário do localStorage
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        const avatarImg = document.getElementById('user-avatar');
        const usernameSpan = document.getElementById('username');

        // Defina o src da imagem e o texto do nome de usuário
        avatarImg.src = user.avatar;
        usernameSpan.textContent = user.username;

        // Exiba a imagem e o nome de usuário
        avatarImg.style.display = 'block';
        usernameSpan.style.display = 'block';
    }
});

// Função para alternar a exibição do menu
function toggleMenu() {
    const menuOptions = document.getElementById('menu-options');
    menuOptions.style.display = menuOptions.style.display === 'block' ? 'none' : 'block';
}

document.addEventListener('DOMContentLoaded', () => {
    // Carregar informações do usuário do localStorage
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        const avatarImg = document.getElementById('user-avatar');
        const usernameSpan = document.getElementById('username');
        
        // Defina o src da imagem e o texto do nome de usuário
        avatarImg.src = user.avatar;
        usernameSpan.textContent = user.username;

        // Exiba a imagem e o nome de usuário
        avatarImg.style.display = 'block';
        usernameSpan.style.display = 'block';
    }
});

// Função para alternar a exibição do menu
function toggleMenu() {
    const dropdownMenu = document.getElementById('dropdown-menu');
    dropdownMenu.classList.toggle('show-menu');
}

// Função para voltar para a tela de login
function goToLogin() {
    window.location.href = 'login.html';
}

// Adiciona evento de clique ao avatar e ao nome para redirecionar para a tela de login
document.getElementById('user-avatar').addEventListener('click', goToLogin);
document.getElementById('username').addEventListener('click', goToLogin);

// Função para carregar avatares da pasta 'icons'
function loadAvatars() {
    const avatarContainer = document.getElementById('avatar-selection');
    const avatarFiles = ['patria.png', 'espoleta.png', 'trem.png', 'boy.png', 'black.png']; // Lista de avatares disponíveis

    avatarFiles.forEach(file => {
        const div = document.createElement('div');
        div.className = 'avatar-option';
        div.innerHTML = `<img src="icons/${file}" alt="Avatar">`;
        div.addEventListener('click', () => selectAvatar(file));
        avatarContainer.appendChild(div);
    });
}

// Função para selecionar o avatar
function selectAvatar(fileName) {
    document.querySelectorAll('.avatar-option').forEach(div => div.classList.remove('selected'));
    const selectedAvatar = Array.from(document.querySelectorAll('.avatar-option')).find(div => div.querySelector('img').src.includes(fileName));
    selectedAvatar.classList.add('selected');

    // Salvar o avatar selecionado no localStorage
    const user = JSON.parse(localStorage.getItem('user')) || {};
    user.avatar = `icons/${fileName}`;
    localStorage.setItem('user', JSON.stringify(user));
}

// Função para carregar informações do usuário
function loadUserInfo() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        const avatarImg = document.getElementById('user-avatar');
        const usernameSpan = document.getElementById('username');
        
        avatarImg.src = user.avatar || '';
        usernameSpan.textContent = user.username || '';

        if (user.avatar) avatarImg.style.display = 'block';
        if (user.username) usernameSpan.style.display = 'block';
    }
}

// Função para salvar o nome de usuário e voltar à tela inicial
function saveUserInfo() {
    const usernameInput = document.getElementById('username-input').value;
    if (usernameInput) {
        const user = JSON.parse(localStorage.getItem('user')) || {};
        user.username = usernameInput;
        localStorage.setItem('user', JSON.stringify(user));
        
        // Redireciona para a tela inicial
        window.location.href = 'index.html';
    }
}

// Inicializa a tela de login
document.addEventListener('DOMContentLoaded', () => {
    loadAvatars();
    loadUserInfo();
    
    // Adiciona o evento para o botão de salvar
    document.getElementById('save-btn').addEventListener('click', saveUserInfo);
});


