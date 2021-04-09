const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const form = document.querySelector('#form');
window.addEventListener('load', () => {
    form.addEventListener('submit', cotizar);
})

function cotizar(e) {
    e.preventDefault();
    const moneda = document.querySelector('#moneda').value
    var form =$('.form');
    data=form.serialize();
    console.log(moneda);    
    if(moneda === '') {        
        error('El campo es obligatorio')
        return;
    }
    $.ajax({
        type: 'POST',
        url: form.attr('action'),
        data: data
    })
    .done(mostrarCambio)
    .fail(error);
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    } 
}
    


function error(mensaje) {
  const alerta = document.querySelector('.alert');
  if(!alerta) {
      const alerta = document.createElement('div');
      alerta.classList.add('alert', "alert-danger" );
      alerta.innerHTML = `
          Error! ${mensaje}
      `;
      container.appendChild(alerta);
      setTimeout(() => {
          alerta.remove();
      }, 3000);
  }
}

function mostrarCambio(datos) {   
  const cambio = document.createElement('p');
  cambio.innerHTML = `${datos}`;
  const resultadoDiv = document.createElement('div');
  resultadoDiv.classList.add('text-center', 'text-black')
  resultadoDiv.appendChild(cambio);
  resultado.appendChild(resultadoDiv)
}

