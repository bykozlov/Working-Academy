const d = document;

if(filename() == 'index.html'){
    document.querySelector('.empleos').style.display = 'none';
}

function borrar(){
    let input = document.querySelector('.input-buscar');
    if(input.value.toString().trim() == ''){
        if(filename() == 'index.html'){
            document.querySelector('.empleos').style.display = 'none';
            document.querySelector('.cuerpo').style.display = 'block';
        }else{
            d.querySelectorAll('.all1').forEach((a)=>{
            a.classList.remove('filtro');
            });
        }
    }
}

function buscadorFiltros(input, selector){
    d.addEventListener('keyup', function (e){
        if(filename() == 'index.html'){
            let empleos =  document.querySelector('.empleos');
            let cuerpo = document.querySelector('.cuerpo');
            if(e.target.value == ''){  
                empleos.style.display = 'none';
                cuerpo.style.display = 'block';
            }else{
                empleos.style.display = 'block';
                cuerpo.style.display = 'none';
            }
           
        }

        //Si el selector coincide con la variable input
        if(e.target.matches(input)){

            //Recorre cada uno de los elementos con la 
            // etiqueta selctor con el uso del "forEach", ya que
            // querySelectorAll retorna un arreglo 
            d.querySelectorAll(selector).forEach((a) => {
                //Si el contenido convertido a minúsculas coincide con el valor 
                // del 
                if(quitarAcentos(a.textContent.toLowerCase()).includes(quitarAcentos(e.target.value.toLowerCase()))){
                    a.classList.remove('filtro');
                }else{
                    a.classList.add('filtro');
                }
            });
        }
    });
}

function quitarAcentos(cadena){
	const acentos = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};
	return cadena.split('').map( letra => acentos[letra] || letra).join('').toString();	
}



function filename(){
    var rutaAbsoluta = self.location.href;   
    var posicionUltimaBarra = rutaAbsoluta.lastIndexOf("/"); // Devuelve la posicion del ultimo "/"
    var rutaRelativa = rutaAbsoluta.substring( posicionUltimaBarra + "/".length , rutaAbsoluta.length); // Extrae desde la posición 62 hasta la 72(Final de la oración);
    return rutaRelativa;  
}


buscadorFiltros('.input-buscar', '.all1');

