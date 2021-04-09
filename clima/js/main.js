const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const form = document.querySelector('#form');
window.addEventListener('load', () => {
    form.addEventListener('submit', buscar);
})

function buscar(e) {
    e.preventDefault();
    const ciudad = document.querySelector('#ciudad').value
    console.log(ciudad);    
    if(ciudad === '') {        
        error('El campo es obligatorio')
        return;
    }
    consultarAPI(ciudad);
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

function consultarAPI(ciudad) {        
    const token = '31b33df22fe2b492d9b74843003438fe';
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},MX&appid=${token}`;
    fetch(url)
      .then(respuesta => {
        return respuesta.json();
      })
      .then(datos => {
        console.log(datos);
        while(resultado.firstChild) {
          resultado.removeChild(resultado.firstChild);
      }        
        if(datos.cod === "404") {
          error('No se encontro la ciudad')
        } else {
          mostrarClima(datos)
        }
      })
      .catch(error => {
        console.log(error)
      });
}

function mostrarClima(datos) {  

  const { name, main: { temp, temp_max, temp_min } } = datos;
  const grados = Convertir(temp);
  const max = Convertir(temp_max);
  const min = Convertir(temp_min);
  const nombreCiudad = document.createElement('p');
  nombreCiudad.innerHTML = `Ciudad: ${name}`;
  const actual = document.createElement('p');
  actual.innerHTML = `${grados} &#8451;`;
  const tempMaxima = document.createElement('p');
  tempMaxima.innerHTML = `Max: ${max} &#8451;`;
  const tempMinima = document.createElement('p');
  tempMinima.innerHTML = `Min: ${min} &#8451;`;
  const resultadoDiv = document.createElement('div');
  resultadoDiv.classList.add('text-center', 'text-black')
  resultadoDiv.appendChild(nombreCiudad);
  resultadoDiv.appendChild(actual);
  resultadoDiv.appendChild(tempMaxima);
  resultadoDiv.appendChild(tempMinima);
  resultado.appendChild(resultadoDiv)
}
function Convertir(grados) {
  return parseFloat( grados - 273.15).toFixed(1);
}

