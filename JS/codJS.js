
document.getElementById('formLugar').addEventListener('submit', saveLugar);


function saveLugar(e) {
    let pCod = document.getElementById('cod').value++;
    let pImagen = document.getElementById('imagen').value;
    let pNombre = document.getElementById('nombre').value;
    let pPais = document.getElementById('pais').value;
    let pDepartamento = document.getElementById('departamento').value;
    let pMunicipio = document.getElementById('municipio').value;
    const lugar = {
        pCod,
        pImagen,
        pNombre,
        pPais,
        pDepartamento,
        pMunicipio
    };

    if (localStorage.getItem('lista') === null) {
        let lugares = [];

        lugares.push(lugar);
        localStorage.setItem('lista', JSON.stringify(lugares));
        alert("Registro guardado con éxito!")
    }
    else {

        let lugares = JSON.parse(localStorage.getItem('lista'));

        lugares.push(lugar);
        localStorage.setItem('lista', JSON.stringify(lugares));

    }
    getLugares();
    limpiar();
    e.preventDefault();
}

//funcion que hace que me muestre la imagen en el form
function previewFile() {
    var preview = document.getElementById('imgPrev');
    var file    = document.querySelector('input[type=file]').files[0];
    var imagen  = document.getElementById('imagen');
    var reader  = new FileReader();
  
    reader.onloadend = function () {
        console.log(reader.result);
      preview.src = reader.result;
      imagen.value = reader.result;
    }
  
    if (file) {
      reader.readAsDataURL(file);
    } else {
      preview.src = "";
    }
  }

//funcion para listar los lugares
function getLugares() {

    let lugares = JSON.parse(localStorage.getItem('lista'));
    let lugaresView = document.getElementById('lista');
    lugaresView.innerHTML = '';
    console.log(lugares);

    for (let i = 0; i < lugares.length; i++) {

        let pCod = lugares[i].pCod;
        let pImagen = lugares[i].pImagen;
        let pNombre = lugares[i].pNombre;
        let pPais = lugares[i].pPais;
        let pDepartamento = lugares[i].pDepartamento;
        let pMunicipio = lugares[i].pMunicipio;

        lugaresView.innerHTML += `
        <div class="col-4 box">
        <div class="imgBx">
        
            <img src="${pImagen}">
        </div>
        <div class="content">
        <p>${pCod}</p>
            <h2>${pNombre}</h2>
            <p>${pPais}</p>
            <p>${pDepartamento},${pMunicipio}</p>
            <a class="btnEliminar" onclick="deleteLugares('${pNombre}')"><i class="far fa-trash-alt"></i> Eliminar</a>
        </div>
        </div>
        <br>`;

    }
}
getLugares();


//funcion para eliminar un registro
function deleteLugares( pCod) {

    let lugares = JSON.parse(localStorage.getItem('lista'));

    let i = searchLugares( pCod);
    lugares.splice(i, 1);
    
    localStorage.setItem("lista", JSON.stringify(lugares));
    
    getLugares();
}

//funcion para buscar el registro
function searchLugares(pCod) {

    let lugares = JSON.parse(localStorage.getItem('lista'));
    let iLugar;

    for (let i = 0; i < lugares.length; i++) {

        if (lugares[i].pCod == pCod) {
            iLugar = i;
        }
    }
    return iLugar;
}

function limpiar(){
    document.getElementById("imgPrev").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("departamento").value = "";
    document.getElementById("municipio").value = "";

}