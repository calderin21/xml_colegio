let alumnos = [];

document.addEventListener('DOMContentLoaded', () => {
  cargarAlumnos();

  document.getElementById('formAlumno').addEventListener('submit', e => {
    e.preventDefault();
    const alumno = {
      id: document.getElementById('id').value,
      nombre: document.getElementById('nombre').value,
      curso: document.getElementById('curso').value,
      email: document.getElementById('email').value,
      asignatura: document.getElementById('asignatura').value
    };

    const index = alumnos.findIndex(a => a.id === alumno.id);
    if (index >= 0) alumnos[index] = alumno;
    else alumnos.push(alumno);

    guardarAlumnos();
  });
});

function cargarAlumnos() {
  fetch('php/cargar.php')
    .then(res => res.json())
    .then(data => {
      alumnos = data.alumnos;
      renderTabla();
    });
}

function guardarAlumnos() {
  fetch('php/guardar.php', {
    method: 'POST',
    body: JSON.stringify({ alumnos }),
    headers: { 'Content-Type': 'application/json' }
  }).then(() => {
    renderTabla();
    document.getElementById('formAlumno').reset();
  });
}

function renderTabla() {
  const tbody = document.querySelector('#tablaAlumnos tbody');
  tbody.innerHTML = '';
  alumnos.forEach(a => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${a.id}</td><td>${a.nombre}</td><td>${a.curso}</td><td>${a.email}</td><td>${a.asignatura}</td>
      <td><button class="btn btn-sm btn-secondary" onclick="editar('${a.id}')">Editar</button></td>`;
    tbody.appendChild(tr);
  });
}

function editar(id) {
  const a = alumnos.find(x => x.id === id);
  if (!a) return;
  document.getElementById('id').value = a.id;
  document.getElementById('nombre').value = a.nombre;
  document.getElementById('curso').value = a.curso;
  document.getElementById('email').value = a.email;
  document.getElementById('asignatura').value = a.asignatura;
}
