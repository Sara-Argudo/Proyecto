document.addEventListener("DOMContentLoaded", function () {

    
    const nombre      = document.getElementById("nombre");
    const dni         = document.getElementById("dni");
    const correo      = document.getElementById("correo");
    const telefono    = document.getElementById("telefono");
    const tiempo      = document.getElementById("tiempo");
    const fecha       = document.getElementById("fecha");
    const hora        = document.getElementById("hora");
    const btnReservar = document.getElementById("btnReservar");
    const resultado   = document.getElementById("resultado");

    
    const errorNombre   = document.getElementById("errorNombre");
    const errorDni      = document.getElementById("errorDni");
    const errorCorreo   = document.getElementById("errorEmail");      
    const errorTelefono = document.getElementById("errortelefono");   
    const errorVehiculo = document.getElementById("errorTipo");       
    const errorTiempo   = document.getElementById("errorPractica");   
    const errorFecha    = document.getElementById("errorFecha");
    const errorHora     = document.getElementById("errorHora");


    

    function validarNombre() {
        const v = nombre.value.trim();
        if (v.length < 3) {
            errorNombre.textContent = "Mínimo 3 caracteres.";
            return false;
        }
        errorNombre.textContent = "";
        return true;
    }

    function validarDni() {
        const v = dni.value.trim().toUpperCase();
        if (!/^\d{8}[A-Z]$/.test(v)) {
            errorDni.textContent = "Formato: 8 dígitos + letra (ej: 12345678A).";
            return false;
        }
        errorDni.textContent = "";
        return true;
    }

    function validarCorreo() {
        const v = correo.value.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
            errorCorreo.textContent = "Correo no válido.";
            return false;
        }
        errorCorreo.textContent = "";
        return true;
    }

    function validarTelefono() {
        const v = telefono.value.trim();
        if (!/^[6-9]\d{8}$/.test(v)) {
            errorTelefono.textContent = "Teléfono de 9 dígitos empezando por 6-9.";
            return false;
        }
        errorTelefono.textContent = "";
        return true;
    }

    function validarVehiculo() {
        if (!document.querySelector('input[name="tipo"]:checked')) {
            errorVehiculo.textContent = "Selecciona un tipo de práctica.";
            return false;
        }
        errorVehiculo.textContent = "";
        return true;
    }

    function validarTiempo() {
        if (tiempo.value === "") {
            errorTiempo.textContent = "Selecciona una duración.";
            return false;
        }
        errorTiempo.textContent = "";
        return true;
    }

    function validarFecha() {
        const v = fecha.value;
        if (!v) {
            errorFecha.textContent = "Selecciona una fecha.";
            return false;
        }
        const hoy = new Date(); hoy.setHours(0,0,0,0);
        if (new Date(v + "T00:00:00") < hoy) {
            errorFecha.textContent = "La fecha no puede ser anterior a hoy.";
            return false;
        }
        errorFecha.textContent = "";
        return true;
    }

    function validarHora() {
        const v = hora.value;
        if (!v) {
            errorHora.textContent = "Selecciona una hora.";
            return false;
        }
        const h = parseInt(v.split(":")[0], 10);
        if (h < 8 || h >= 20) {
            errorHora.textContent = "Horario disponible: 08:00–20:00.";
            return false;
        }
        errorHora.textContent = "";
        return true;
    }


    
    function validarTodo() {
        const resultados = [
            validarNombre(),
            validarDni(),
            validarCorreo(),
            validarTelefono(),
            validarVehiculo(),
            validarTiempo(),
            validarFecha(),
            validarHora()
        ];
        const todoBien = resultados.every(Boolean);
        btnReservar.disabled = !todoBien;
        return todoBien;
    }


    
    nombre.addEventListener("input",   validarTodo);
    dni.addEventListener("input",      validarTodo);
    correo.addEventListener("input",   validarTodo);
    telefono.addEventListener("input", validarTodo);
    fecha.addEventListener("input",    validarTodo);
    hora.addEventListener("input",     validarTodo);
    tiempo.addEventListener("change",  validarTodo);
    document.querySelectorAll('input[name="tipo"]').forEach(r =>
        r.addEventListener("change", validarTodo)
    );


   
    document.getElementById("formulario").addEventListener("submit", function (e) {
        e.preventDefault();
        if (!validarTodo()) return;

        const tipo    = document.querySelector('input[name="tipo"]:checked').value;
        const dur     = tiempo.value === "45" ? "45 min" : "90 min";
        const obs     = document.getElementById("observaciones").value.trim();

        resultado.className = "resultado exito";
        resultado.classList.remove("oculto");
        resultado.innerHTML = `
            <h2>¡Reserva realizada con éxito! 🎉</h2>
            <p><strong>Nombre:</strong> ${nombre.value.trim()}</p>
            <p><strong>DNI:</strong> ${dni.value.trim().toUpperCase()}</p>
            <p><strong>Email:</strong> ${correo.value.trim()}</p>
            <p><strong>Teléfono:</strong> ${telefono.value.trim()}</p>
            <p><strong>Tipo de práctica:</strong> ${tipo}</p>
            <p><strong>Duración:</strong> ${dur}</p>
            <p><strong>Fecha:</strong> ${fecha.value}</p>
            <p><strong>Hora:</strong> ${hora.value}</p>
            ${obs ? `<p><strong>Observaciones:</strong> ${obs}</p>` : ""}
        `;

        
        document.getElementById("resumen-carrito").innerHTML = `
            <p><strong>Práctica:</strong> ${tipo}</p>
            <p><strong>Duración:</strong> ${dur}</p>
            <p><strong>Fecha:</strong> ${fecha.value}</p>
            <p><strong>Hora:</strong> ${hora.value}</p>
        `;

        btnReservar.disabled = true;
    });


    
    document.querySelector(".confirmar").addEventListener("click", function () {
        const tiene = document.querySelector("#resumen-carrito strong");
        alert(tiene
            ? "¡Reserva confirmada! Nos pondremos en contacto contigo pronto."
            : "Completa el formulario primero.");
    });

});
