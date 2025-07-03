
const form = document.getElementById('medform');
const lista = document.getElementById('lista-remedios');


let remedios = JSON.parse(localStorage.getItem('remedios')) || [];


function exibirRemedios() {
  lista.innerHTML = '';
  remedios.forEach((remedio, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${remedio.nome}</strong> - ${remedio.dosagem} às ${remedio.horario}
      <button onclick="removerRemedio(${index})" style="float:right;">🗑️</button>
    `;
    lista.appendChild(li);
  });
}


form.addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const dosagem = document.getElementById('dosagem').value.trim();
  const horario = document.getElementById('horario').value;

  if (!nome || !dosagem || !horario) return;

  const novoRemedio = { nome, dosagem, horario };
  remedios.push(novoRemedio);
  localStorage.setItem('remedios', JSON.stringify(remedios));

  form.reset();
  exibirRemedios();
});


function removerRemedio(index) {
  remedios.splice(index, 1);
  localStorage.setItem('remedios', JSON.stringify(remedios));
  exibirRemedios();
}

exibirRemedios();


if (Notification.permission !== 'granted') {
  Notification.requestPermission();
}

function verificarHorario() {
  const agora = new Date();
  const horaAtual = agora.toTimeString().slice(0, 5); 

  remedios.forEach(remedio => {
    if (remedio.horario === horaAtual) {
      mostrarNotificacao(remedio);
    }
  });
}

function mostrarNotificacao(remedio) {
  if (Notification.permission === 'granted') {
    new Notification(`Hora do remédio!`, {
      body: `${remedio.nome} - ${remedio.dosagem} (${remedio.horario})`,
      icon: 'https://cdn-icons-png.flaticon.com/512/2920/2920277.png', 
    });
  }
}

setInterval(verificarHorario, 60000); 
verificarHorario(); 
