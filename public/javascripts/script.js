const form = document.querySelector(".form-container");

// Adiciona o ouvinte de evento para o evento de submit
form.addEventListener("submit", function (event) {
  // Captura os campos do formulário
  const nome = document.querySelector("#nome");
  const email = document.querySelector("#email");
  const senha = document.querySelector("#senha");

  let valid = true; // Variável para controlar se o formulário é válido
  const errorMessages = []; // Array para armazenar as mensagens de erro

  // Limpar qualquer mensagem de erro anterior
  const errorContainer = document.querySelector(".error-messages");
  errorContainer.innerHTML = "";

  // Verifica se o campo 'nome' está vazio
  if (!nome.value.trim()) {
    event.preventDefault();
    valid = false;
    errorMessages.push("O campo 'Nome' é obrigatório.");
    nome.classList.add("error");
  } else {
    nome.classList.remove("error");
  }

  // Verifica se o campo 'email' está vazio
  if (!email.value.trim()) {
    valid = false;
    errorMessages.push("O campo 'Email' é obrigatório.");
    email.classList.add("error");
  } else {
    email.classList.remove("error");
  }

  // Verifica se o campo 'senha' está vazio
  if (!senha.value.trim()) {
    valid = false;
    errorMessages.push("O campo 'Senha' é obrigatório.");
    senha.classList.add("error");
  } else {
    senha.classList.remove("error");
  }

  // Se algum campo estiver vazio, mostra as mensagens de erro
  if (!valid) {
    errorMessages.forEach((message) => {
      const errorElement = document.createElement("p");
      errorElement.textContent = message;
      errorContainer.appendChild(errorElement);
    });
    return; // Não faz a requisição se houver erro de validação
  }

  // Se o formulário for válido, envie a requisição para o backend
  const data = {
    nome: nome.value,
    email: email.value,
    senha: senha.value,
  };

  // Envia a requisição para o backend (substitua 'api/register' pela sua rota)
  fetch("/users/cadastrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // Envia os dados do formulário como JSON
  })
    .then((response) => response.json()) // Converte a resposta para JSON
    .then((data) => {
      if (data.message === "Usuário criado com sucesso") {
        // Redireciona ou exibe uma mensagem de sucesso
        window.location.href = "/users/login"; // Redireciona para a página de login
      } else {
        // Se o backend retornar um erro, exibe a mensagem
        alert(data.message);
      }
    })
    .catch((error) => {
      // Se houver erro na requisição, exibe um alerta
      console.error("Erro ao registrar usuário:", error);
      alert("Ocorreu um erro ao enviar os dados. Tente novamente.");
    });
});
