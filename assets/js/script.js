function openMenu() {
    document.getElementById("sideMenu").classList.add("open");
}

function closeMenu() {
    document.getElementById("sideMenu").classList.remove("open");
}

const form = document.getElementById("formContato");
const status = document.getElementById("status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  status.textContent = "Enviando...";

  const data = {
    nome: document.getElementById("nome").value,
    email: document.getElementById("email").value,
    mensagem: document.getElementById("mensagem").value
  };

  try {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      status.textContent = "Mensagem enviada com sucesso!";
      form.reset();
    } else {
      status.textContent = "Erro ao enviar mensagem.";
    }
  } catch {
    status.textContent = "Erro de conexão.";
  }
});
