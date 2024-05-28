//Variables
const fragment = document.createDocumentFragment();
const mensaje = document.querySelector('#mensaje');
const comprobarInput = document.querySelector('#comprobarInput');
let comprobarInputValue;
const comprobarBoton = document.querySelector('#comprobarBoton');
const tablaBody = document.querySelector('#tablaBody');

const regExpMatricula = /^[\d]{4}\-[A-Z]{3}$/;

//Array de objetos
const bbddCoches = [
    {
      matricula: '1234-ABC',
      modelo: 'Toyota Camry',
      propietario: 'John Doe'
    },
    {
      matricula: '5678-XYZ',
      modelo: 'Honda Accord',
      propietario: 'Jane Smith'
    },
    {
      matricula: '9012-LMN',
      modelo: 'Ford Fusion',
      propietario: 'Alice Johnson'
    },
    {
      matricula: '3456-PQR',
      modelo: 'Chevrolet Malibu',
      propietario: 'Bob Brown'
    },
    {
      matricula: '7890-GHI',
      modelo: 'Nissan Altima',
      propietario: 'Charlie Davis'
    },
    {
      matricula: '2345-JKL',
      modelo: 'Hyundai Sonata',
      propietario: 'David Wilson'
    },
    {
      matricula: '6789-DEF',
      modelo: 'Kia Optima',
      propietario: 'Eve Clark'
    },
    {
      matricula: '0123-STU',
      modelo: 'Volkswagen Passat',
      propietario: 'Frank Martin'
    },
    {
      matricula: '4567-VWX',
      modelo: 'Subaru Legacy',
      propietario: 'Grace Lee'
    },
    {
      matricula: '8901-NOP',
      modelo: 'Mazda6',
      propietario: 'Henry Young'
    }
];

const bbddMultas = [
    {
      matricula: '7890-GHI',
      multas: ['multa1', 'multa2']
    },
    {
      matricula: '4567-VWX',
      multas: ['multa1']
    },
    {
      matricula: '2345-JKL',
      multas: ['multa1', 'multa2']
    },
    {
      matricula: '1234-ABC',
      multas: ['multa1', 'multa2', 'multa3', 'multa4']
    },
    {
      matricula: '3456-PQR',
      multas: ['multa1', 'multa2', 'multa3']
    }
];

const objValidarInput = {
    matricula: false
};

let arrObjPintar = [];

comprobarBoton.addEventListener('click', () =>{
    validarInput();
    mensaje.innerHTML = "";
});

const validarInput = () => {
    if (regExpMatricula.test(comprobarInput.value)) {
        objValidarInput.matricula = true;
        comprobarInputValue = comprobarInput.value;
        getInforMatricula(comprobarInputValue)
            .then ((respuesta) => {pintarTabla(respuesta)})
            .catch ((error) => {pintarMensaje(error)});
    } else {
        objValidarInput.matricula = false;
        alert('Matrícula no válida');
    };
};

const validarBBDDMatricula = async(comprobarInputValue) => {
    const foundMatricula = bbddCoches.find((obj) => obj.matricula === comprobarInputValue)?.matricula;
     if (foundMatricula) {
        return foundMatricula;
     } else {
        throw (`La matrícula ${comprobarInputValue} no está registrada.`);
     };
};

const validarBBDDMultas = async(comprobarInputValue) => {
    const foundMulta = bbddMultas.find((obj) => obj.matricula === comprobarInputValue)?.multas;
     if (foundMulta) {
        return foundMulta;
     } else {
        throw (`La matrícula ${comprobarInputValue} no tiene ninguna multa.`);
     };
};

const getInforMatricula = async(comprobarInputValue) => {
    try {
        const matricula = await validarBBDDMatricula(comprobarInputValue);
        const multa = await validarBBDDMultas(comprobarInputValue);
        const foundMatricula = bbddCoches.find((obj) => obj.matricula === comprobarInputValue);
        const foundMulta = bbddMultas.find((obj) => obj.matricula === comprobarInputValue)?.multas;
        foundMatricula.multas = foundMulta.length;
        const foundDuplicate = arrObjPintar.find((obj) => obj === foundMatricula);
        if (!foundDuplicate) {
            arrObjPintar.push(foundMatricula);
        } else {
            alert("Esta matrícula está duplicada");
        }
        return arrObjPintar;
    } catch (error){
        throw error;
    };
};

const pintarMensaje = (error) => {
    mensaje.innerHTML = "";
    mensaje.innerHTML = error;
};

const pintarTabla = (arrObjPintar) => {
    tablaBody.innerHTML = "";
    arrObjPintar.forEach(({matricula, modelo, propietario, multas}) => {
        const trTable = document.createElement('TR');
        const tdMatricula = document.createElement('TD');
        tdMatricula.innerHTML = matricula;
        const tdModelo = document.createElement('TD');
        tdModelo.innerHTML = modelo;
        const tdPropietario = document.createElement('TD');
        tdPropietario.innerHTML = propietario;
        const tdMultas = document.createElement('TD');
        tdMultas.innerHTML = multas;

        trTable.append(tdMatricula, tdModelo, tdPropietario, tdMultas);
        fragment.append(trTable);
    });
    tablaBody.append(fragment);
    console.log(arrObjPintar);
};



