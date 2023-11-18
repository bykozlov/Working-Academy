var nombre_archivo = nombreArchivo(); // Obtener el nombre del archivo
var longitud = localStorage.length; // Longitud del localStorange (Es un array que se almacena en el navegador)
localStorage.setItem('usuario0', 'Administrador;Admin;00000000;000000000;0000-00-00;1;admin@gmail.com;admin;0'); // Cuenta de administrador

function nombreArchivo(){
    var rutaPrincipal = self.location.href;   
    var posicionUltimaBarra = rutaPrincipal.lastIndexOf("/"); // Devuelve la posicion del ultimo "/"
    var rutaAcortada = rutaPrincipal.substring( posicionUltimaBarra + "/".length , rutaPrincipal.length); // Extrae desde la posición 62 hasta la 72(Final de la oración);
    return rutaAcortada;  
}

var colorBlanco = '#FFFFFF';
var colorVerde = '#00ff00';
var colorRojo = '#FF2E2F';
var ocultar = 'hidden';
var visible = 'visible';

function obtenerValor(variable){
    return variable.value;
}

function ocultarVisualizarPlaceholder(parametro){
    let input = document.querySelectorAll('input');
    input.forEach(function (evento){ //Recorre todo el arreglo del input
        evento.style.setProperty('--bg-pseudo', parametro); // Se agrega las propiedades
    });
}

function campoColor(txt, color){
    txt.style.background = color;
}

if (nombre_archivo == 'registro.html') { 
    var validacion = 0; // Variable bandera
   
    document.querySelector('input[name="txtDni"]').addEventListener('keypress', function(event){
        let longitud = event.target.value.length;
        if(longitud >= 8){
            alert('Solo se permite un valor máximo de 8 dígitos');
            window.event.preventDefault(); 
            return;
        }
    
        let ascii = event.keyCode || event.which;
        if(ascii < 48 || ascii > 57){
            alert('No se permite el ingreso de valores no numéricos');
            window.event.preventDefault();
            return
        }
    });

    document.querySelector('input[name="txtTelefono"]').addEventListener('keypress', function(event){
        let longitud = event.target.value.length;
        if(longitud >= 9){
            alert('Solo se permite un valor máximo de 9 dígitos');
            window.event.preventDefault(); 
            return;
        }
    
        let ascii = event.keyCode || event.which;
        if(ascii < 48 || ascii > 57){
            alert('No se permite el ingreso de valores no numéricos');
            window.event.preventDefault();
            return
        }
    });

    var campoRe = document.getElementById('re');
    var campoIn = document.getElementById('in');
    
    campoRe.txtFechaNaci.setAttribute('min','1950-01-01');
    campoRe.txtFechaNaci.setAttribute('max','2005-12-31');
    campoRe.txtFechaNaci.setAttribute('onkeydown', 'return false');

    function mostrar(event){
        if(event.value == 2){
            document.querySelector('.empresa').style.display = 'block';
        }else{
            document.querySelector('.empresa').style.display = 'none';
            campoRe.txtNombreEmpr.value = '';
        }
    }

    function registrarse(frm) {
        // Obtener los valores dentros de los campos de texto
        let nombre = frm.txtNombres; 
        let apellidos = frm.txtApellidos;
        let dni = frm.txtDni;
        let telefono = frm.txtTelefono;
        let fechaNaci = frm.txtFechaNaci;
        let tipoCuenta = frm.cmbTipoCuenta;
        let nombreEmpresa = frm.txtNombreEmpr;
        let correoReg = frm.txtCorreoReg;
        let contraseniaReg = frm.txtContraseniaReg;
        let confirmarContra = frm.txtConfirmarContrasenia;
        
        validarDatos(nombre, apellidos, dni, telefono, fechaNaci, tipoCuenta, correoReg, contraseniaReg, confirmarContra, nombreEmpresa,) ;
       
        if(validacion != 0){
            window.event.preventDefault();
        }else{
            window.event.preventDefault();
            if(obtenerValor(tipoCuenta) == 1){
                crearUsuario(nombre, apellidos, dni, telefono, fechaNaci, tipoCuenta, correoReg, contraseniaReg);
            }else{
                crearEmpresa(nombre, apellidos, dni, telefono, fechaNaci, tipoCuenta, correoReg, contraseniaReg, nombreEmpresa);

            }

            ocultarVisualizarPlaceholder(ocultar);
            limpiarCamposRe(frm);
            colorCamposRe(frm, colorVerde);
            setTimeout(alert('Su cuenta ha sido creada exitosamente'), 10);
            window.location.href='login.html'
        }
    }



    function campoValidar(condicion, txt, mensaje){
        if(condicion){
            campoColor(txt, colorRojo);
            validacion = 1;
            alert(mensaje);
            return false
        }else{
            campoColor(txt, colorBlanco);
            return true
        }
    }

    function limpiarCamposRe(frm){
        frm.txtNombres.value = '';
        frm.txtApellidos.value = '';
        frm.txtDni.value = '';
        frm.txtTelefono.value = '';
        frm.txtFechaNaci.value = '';
        frm.cmbTipoCuenta.value = '0';
        frm.txtNombreEmpr.value = '';
        frm.txtCorreoReg.value = '';
        frm.txtContraseniaReg.value = '';
        frm.txtConfirmarContrasenia.value = '';
    }
    
    function colorCamposRe(frm, color){
        frm.txtNombres.style.background = color;
        frm.txtApellidos.style.background = color;
        frm.txtDni.style.background = color;
        frm.txtTelefono.style.background = color;
        frm.txtFechaNaci.style.background = color;
        frm.cmbTipoCuenta.style.background = color;
        frm.txtNombreEmpr.style.background = color;
        frm.txtCorreoReg.style.background = color;
        frm.txtContraseniaReg.style.background = color;
        frm.txtConfirmarContrasenia.style.background = color;
    }

    function validarDatos(nombre, apellidos, dni, telefono, fechaNaci, tipoCuenta, correoReg, contraseniaReg, confirmarContra,  nombreEmpresa) {
        testNombre = /^[a-zA-Z\u00C0-\u017F\s]*$/;
        testDni = /^\d{8}$/;
        testTelefono = /^[2-9][0-9]{8}$/;
        testCorreo = /^([a-zA-Z0-9_])+[@]([a-z])+[.][a-z]{2,3}$/;
        testContrasenia = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;

        a = campoValidar(!(testNombre.test(obtenerValor(nombre))) || obtenerValor(nombre).trim() == '', nombre, 'Ingrese el nombre correctamente');
        b = campoValidar(!(testNombre.test(obtenerValor(apellidos))) || obtenerValor(apellidos).trim() == '', apellidos, 'Ingrese el apellido correctamente');
        c = encontrarValoresRepetidosValidacioneCampos(dni, testDni, 'El dni debe contener 8 dígitos', 2, 'El dni que usted ha ingresado, ya se encuentra registrado');                           //encontrarDniRepetidosValidacionCampos(dni, testDni);
        d = encontrarValoresRepetidosValidacioneCampos(telefono, testTelefono, 'Introduzca un télefono válido', 3, 'El teléfono que usted ha ingresado, ya se encuentra registrado');                            // encontrarTelefonosRepetidosValidacionCampos(telefono, testTelefono);
        e = campoValidar(obtenerValor(fechaNaci) == '', fechaNaci, 'Introduzca correctamente la fecha de nacimiento');
        f = campoValidar(obtenerValor(tipoCuenta) == 0, tipoCuenta, 'Seleccione el tipo de cuenta');
        g = encontrarValoresRepetidosValidacioneCampos(correoReg, testCorreo, 'Ingrese un correo válido', 6, 'El correo que usted ha ingresado, ya se encuentra registrado');                            //encontrarCorreosRepetidosValidacionCampos(correoReg, testCorreo);
        h = campoValidar(!(testContrasenia.test(obtenerValor(contraseniaReg))) || obtenerValor(contraseniaReg).trim() == '', contraseniaReg, 'La contraseña debe tener entre 8 y 16 caracteres que deben contener dígitos, minúsculas y mayúsculas');
        i = campoValidar(obtenerValor(contraseniaReg) != obtenerValor(confirmarContra) || obtenerValor(confirmarContra).trim() == '', confirmarContra, 'Las contraseñas son diferentes, vuelva a intentarlo.');

        if(obtenerValor(tipoCuenta) == 2){
            j = campoValidar(!(testNombre.test(obtenerValor(nombreEmpresa))) || obtenerValor(nombreEmpresa).trim() == '', nombreEmpresa, 'Ingrese el nombre de la empresa correctamente');
            if(j == false){
               return validacion = 1; 
            }
        }
        if(a == true && b == true && c == true && d == true && e == true && f == true && g == true && h == true && i == true){
            return validacion = 0;
        }        
    }

    function encontrarValoresRepetidosValidacioneCampos(txt, test, mensaje1, posicionDelValor, mensaje2){
        if(!(test.test(obtenerValor(txt))) || obtenerValor(txt).trim() == ''){
            campoColor(txt, colorRojo);
            validacion = 1;
            alert(mensaje1);
            return true
        }else{
            for(let i=0; i < localStorage.length; i++){
                let usuario = localStorage.getItem(`usuario${i}`);
                let separador = usuario.toString().split(';'); 
                if(obtenerValor(txt).trim() == separador[posicionDelValor]){
                    campoColor(txt, colorRojo);
                    validacion = 1;
                    alert(mensaje2);
                    return false
                }
            }
                campoColor(txt, colorBlanco);
                return true
        }
    }

    function informacionUsuario(nombre, apellidos, dni, telefono, fechaNaci, tipoCuenta, correoReg, contraseniaReg) {
        let img = Math.floor(Math.random() * 5); // Genera un número aleatorio para colocar la imagen
        return nombre + ';' + apellidos + ';'  + dni + ';' + telefono + ';'  + fechaNaci + ';' 
        + tipoCuenta + ';' + correoReg + ';' + contraseniaReg + ';' + img; // Cuenta de la información del usuario
    }

    function informacionEmpresa(nombre, apellidos, dni, telefono, fechaNaci, tipoCuenta, correoReg, contraseniaReg, nombreEmpresa) {
        let img = Math.floor(Math.random() * 5); // Genera un número aleatorio para colocar la imagen
        return nombre + ';' + apellidos + ';'  + dni + ';' + telefono + ';'  + fechaNaci + ';' 
        + tipoCuenta + ';' + correoReg + ';' + contraseniaReg + ';' + nombreEmpresa + ';' + img; // Cuenta de la información del usuario
    }

    
    function crearUsuario(nombre, apellidos, dni, telefono, fechaNaci, tipoCuenta, correoReg, contraseniaReg) {
        let b = informacionUsuario(obtenerValor(nombre), obtenerValor(apellidos), obtenerValor(dni), obtenerValor(telefono), obtenerValor(fechaNaci), obtenerValor(tipoCuenta), obtenerValor(correoReg), obtenerValor(contraseniaReg)); // Se elige los datos importantes para crear el usuario

        for (let i = 0; i < longitud; i++) {
            if (i + 1 == longitud) {
                localStorage.setItem(`usuario${i+1}`, b); // Se almacena usuario
            }
        }
    }

    function crearEmpresa(nombre, apellidos, dni, telefono, fechaNaci, tipoCuenta, correoReg, contraseniaReg, nombreEmpresa,) {
        let b = informacionEmpresa(obtenerValor(nombre), obtenerValor(apellidos), obtenerValor(dni), obtenerValor(telefono), obtenerValor(fechaNaci), obtenerValor(tipoCuenta), obtenerValor(correoReg), obtenerValor(contraseniaReg), obtenerValor(nombreEmpresa)); // Se elige los datos importantes para crear el usuario

        for (let i = 0; i < longitud; i++) {
            if (i + 1 == longitud) {
                localStorage.setItem(`usuario${i+1}`, b); // Se almacena usuario
            }
        }
    }


    /*------------------------------------------------------------------------*/
    /*
   
    
*/
}else if(nombre_archivo == 'login.html'){
    let usuario = []; // Crea array user
    let login = 0; // Variable bandera

    function logearse(frm) {
        // Se obtiene los valores de los campos de texto
        let correoIn = frm.txtCorreoIn;  
        let contrasenia = frm.txtPasswordIn;

        // Al no ser un servidor, este script puede volverse a ejecutar de 0 en caso la página se reinicie, como 
        // consecuencia se pierde los datos. Pero eso no sucede con el localStorange
        // Por ello se guarda los valores del localStorange en el array user.
        
        window.event.preventDefault();
        validarLogin(obtenerValor(correoIn), obtenerValor(contrasenia));
        
        if (login == 1) {
            window.event.preventDefault();
            limpiarCamposIn(frm);
            colorCamposIn(frm, colorVerde);
            ocultarVisualizarPlaceholder(ocultar);
            setTimeout(alert('Bienvenidos a Working Acadmy'), 10);
            window.location.href='../index.html'
        }else{
            alert('Correo y contraseñas incorrectas');
            limpiarCamposIn(frm);
            colorCamposIn(frm, colorRojo);
        }
      
    }


    function limpiarCamposIn(frm){
        frm.txtCorreoIn.value = '';
        frm.txtPasswordIn.value = '';
    }


    function colorCamposIn(frm, color){
        frm.txtCorreoIn.style.background = color;
        frm.txtPasswordIn.style.background = color;
    }
    

    function guardarUsuario() {
        for (let i = 0; i < localStorage.length; i++) {
            usuario[i] = [localStorage.getItem(`usuario${i}`)]; // Se guarda los usuarios creados
        }
    }

    function validarLogin(correoIn, contrasenia) {
        for (let i = 0; i < localStorage.length; i++) {
            guardarUsuario();

            let separador;

            // Los valores dentro del array, se convierte en String para luego separarlos a partir de los ";"
            // en donde se almacenará en la variable separador, pero este a su vez se utilizará como array, ya que es el
            // resultado del método .split()
            separador = usuario[i].toString().split(';');
            
            //Si el email y contraseña del user creado es igual a los introducidos, entonces...
            if (separador[6] == correoIn && separador[7] == contrasenia){
                var infoUsuario = i; // Esta variable guardará el nombre del usuario, ejemplo, user1, user2 ...
                localStorage.setItem('infoUsuario', infoUsuario.toString()); 
                login = 1;
                return
            }
        }
    }

} else{
    let botones = document.querySelector('.elementos-opciones_final');
    let img = document.querySelector('.usuario-img');
    let cajaImg = document.querySelector('.elementos-f');
    if (localStorage.getItem('infoUsuario') != null) {
        let usuario = localStorage.getItem(`usuario${ localStorage.getItem('infoUsuario')}`).toString().split(';');
        let usuarioItem =  document.querySelector('.usuario-item-none');
        let cerrar = document.querySelector('.cerrar');
        botones.style.display = 'none';
        img.style.display = 'block';
        cajaImg.style.display = 'block';

        
        img.addEventListener('click', function(){
            if(usuarioItem.className == 'usuario-item-none'){
                usuarioItem.style.display = 'block';
                usuarioItem.className = 'usuario-item-block';
            }else{
                usuarioItem.style.display = 'none';
                usuarioItem.className = 'usuario-item-none';
            }
        
        });


     
        if(nombre_archivo == 'index.html'){

            cerrar.addEventListener('click', function(){
                localStorage.removeItem('infoUsuario');
                window.location.href='index.html'
                
            });

            if(usuario[8] > 4){
                document.querySelector('.img-user').style.content =  `url(img/user${usuario[8]}.gif)`;
            }else{
                document.querySelector('.img-user').style.content =  `url(img/user${usuario[8]}.png)`;
            }
          
        }else{
            cerrar.addEventListener('click', function(){
                localStorage.removeItem('infoUsuario');
                window.location.href='../../index.html'
                
            });

            if(usuario[8] > 4){
                document.querySelector('.img-user').style.content =  `url(../../img/user${usuario[8]}.gif)`;
            }else{
                document.querySelector('.img-user').style.content =  `url(../../img/user${usuario[8]}.png)`;
            }
        }
    
    }else{
        botones.style.display = 'block';
    }
}