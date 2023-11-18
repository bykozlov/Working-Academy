
var contador=1;

function animacion(){
    document.getElementById("img1").style.opacity = '0';
    document.getElementById("img1").style.transition = 'all 1s';
    setTimeout("carrusel()", 2000);
}

function carrusel(){

    if(contador > 4){
        contador = 1;
    }
        document.getElementById("img1").setAttribute("src", `../../img/empresas/img${contador}.jpg`);
        document.getElementById("img1").style.opacity = '2';
        document.getElementById("img1").style.transition = 'all 3s';
      
        contador++;

        setTimeout("animacion()",3000);
    
   
}
document.body.setAttribute("onload", "carrusel()");