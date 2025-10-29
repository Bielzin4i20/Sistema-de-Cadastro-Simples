// Inicializa EmailJS com sua chave pública
emailjs.init("yFSwWjc_kK0MNw3qP");

const form = document.getElementById("cadastroForm");
const toast = document.getElementById("toast");
const cards = document.querySelectorAll(".card");
const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");
const contadorNumero = document.getElementById("contadorNumero");

// Recupera o valor salvo no localStorage (ou começa em 0)
let totalCadastros = parseInt(localStorage.getItem("totalCadastros")) || 0;
contadorNumero.textContent = totalCadastros;

// Mostra animação de "toast"
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 4000);
}

// Animação dos cards ao aparecerem na tela
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
});
cards.forEach(card => observer.observe(card));

// Menu mobile
menuToggle.addEventListener("click", () => {
  menu.classList.toggle("show");
});

// Envio do formulário
form.addEventListener("submit", function(event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;

  // 1 Enviar e-mail para o admin
  emailjs.send("service_8bsyrj3", "template_kmoexlj", {
    user_name: nome,
    user_email: email
  })
  .then(() => console.log("Admin notificado!"))
  .catch(err => console.log("Erro admin:", err));

  // 2 Enviar e-mail de boas-vindas para o usuário
  emailjs.send("service_8bsyrj3", "template_0c00nur", {
    to_name: nome,
    to_email: email
  })
  .then(() => {
    showToast("Cadastro realizado com sucesso! 🚀");
    atualizarContador();
    form.reset();
  })
  .catch(err => {
    showToast("Falha ao enviar o e-mail de boas-vindas 😞");
    console.log(err);
  });

  // Seleciona o elemento do contador
 const contadorNumero = document.getElementById("contadorNumero");

  // Carrega o valor salvo (ou começa em 0)
  let totalCadastros = parseInt(localStorage.getItem("totalCadastros")) || 0;
  contadorNumero.textContent = totalCadastros;

  // Função para atualizar o contador com animação
  function atualizarContador() {
  totalCadastros++;
  contadorNumero.textContent = totalCadastros;
  localStorage.setItem("totalCadastros", totalCadastros);

  // Efeito de "crescimento" visual
  contadorNumero.style.transform = "scale(1.3)";
  setTimeout(() => contadorNumero.style.transform = "scale(1)", 300);
}

});
