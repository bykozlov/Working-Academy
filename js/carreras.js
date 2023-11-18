var pdf = document.querySelector('#files');
var visualizarPDF = document.querySelector('.vpdf');
var cajaPDF = document.querySelector('.vpdf iframe');

pdf.addEventListener('change',function(){
    //Accedemos a un arreglo llamado File, que puede tener varios archivos dependiendo de que el usuario
    //seleccion, para ello, solamente, accederemos al archivo que se encuentra en la primera posición
    let pdfFile = pdf.files[0]; 
    let pdfFileURL = URL.createObjectURL(pdfFile);
    console.log(pdf.value)

    console.log();

    if(localStorage.getItem('infoUsuario') == null){
        visualizarPDF.style.display = 'none';
        cajaPDF.setAttribute('src', '');
        pdf.value='';
        alert('Inicia sesión para poder enviar currículo');

    }else{
        if(extension() == 'pdf'){
            visualizarPDF.style.display = 'block';
            cajaPDF.setAttribute('src', pdfFileURL);
        }else{
            cajaPDF.setAttribute('src', '');
            pdf.value="";
            visualizarPDF.style.display = 'none';
            alert('Ingrese un archivo en formato pdf');
        }
    }



   
});

function extension(){
    let rutaCompleta = pdf.value;   
    let posicionUltimoPunto= rutaCompleta.lastIndexOf('.'); 
    let rutaObtenida = rutaCompleta.substring( posicionUltimoPunto+ ".".length , rutaCompleta.length); 
    return rutaObtenida;  
}

function dirigir(frm){
    window.event.preventDefault();
    window.location.href='../salida.html'
}