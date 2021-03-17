var db = firebase.firestore();

function guardar(){
    var serie = document.getElementById('serie').value;
    var descripcion = document.getElementById('descripcion').value;
    var tamaño = document.getElementById('tamaño').value;
    var so = document.getElementById('so').value;
    var camara = document.getElementById('camara').value;
    var ram = document.getElementById('ram').value;

    db.collection("telefonos").add({
        serie: serie,
        descripcion: descripcion,
        tamaño: tamaño,
        so: so,
        camara: camara,
        ram: ram
    })
    .then(function(docRef){
        console.log("Exito: ", docRef.id);
        document.getElementById('serie').value= '';
        document.getElementById('descripcion').value= '';
        document.getElementById('tamaño').value= '';
        document.getElementById('so').value= '';
        document.getElementById('camara').value= '';
        document.getElementById('ram').value= '';
    })
    .catch(function(error){
        console.error("Error: ", error)
    });
}

//Mostrar datos
var tabla = document.getElementById('tabla');
db.collection("telefonos").onSnapshot((querySnapshot) => {
    tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().serie}`);
        tabla.innerHTML +=`
        <tr>
        <th scope="row">${doc.data().serie}</th>
        <td>${doc.data().descripcion}</td>
        <td>${doc.data().tamaño}</td>
        <td>${doc.data().so}</td>
        <td>${doc.data().camara}</td>
        <td>${doc.data().ram}</td>
        
        <td><button class="btn2" onclick="editar('${doc.id}','${doc.data().serie}','${doc.data().descripcion}','${doc.data().tamaño}','${doc.data().so}','${doc.data().camara}','${doc.data().ram}')">Editar</button></td>
        <td><button class="btn3" onclick="eliminar('${doc.id}')">Eliminar</button></td>
        </tr>
        `
    });
});

//Eliminar datos
function eliminar(id){
db.collection("telefonos").doc(id).delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
    console.error("Error removing document: ", error);
});
}

//Editar datos

function editar(id, serie, descripcion, tamaño, so, camara, ram){

    document.getElementById('serie').value = serie;
    document.getElementById('descripcion').value = descripcion;
    document.getElementById('tamaño').value = tamaño;
    document.getElementById('so').value = so;
    document.getElementById('camara').value = camara;
    document.getElementById('ram').value = ram;
    var boton = document.getElementById('boton');
    boton.innerHTML = 'Editar';

    boton.onclick = function(){
        var washingtonRef = db.collection("telefonos").doc(id);
        
        var serie = document.getElementById('serie').value;
        var descripcion = document.getElementById('descripcion').value;
        var tamaño = document.getElementById('tamaño').value;
        var so = document.getElementById('so').value;
        var camara = document.getElementById('camara').value;
        var ram = document.getElementById('ram').value;
        
        return washingtonRef.update({
        serie: serie,
        descripcion: descripcion,
        tamaño: tamaño,
        so: so,
        camara: camara,
        ram: ram
    })
    .then(() => {
    console.log("Document successfully updated!");
    
        document.getElementById('serie').value= '';
        document.getElementById('descripcion').value= '';
        document.getElementById('tamaño').value= '';
        document.getElementById('so').value= '';
        document.getElementById('camara').value= '';
        document.getElementById('ram').value= '';
        boton.innerHTML = 'Guardar';
    })
    .catch((error) => {
    console.error("Error updating document: ", error);
    });
    }
    
}
