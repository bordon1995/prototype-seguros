class Object {
    constructor(marca, year, tipo) {
        this.marca = marca,
        this.year = year,
        this.tipo = tipo
    };

    priceObject() {
        let result;
        const base=2000;
        switch(this.marca) {
            case 'Americano':
                result = base * 1.15;
                break;
            case 'Asiatico':
                result = base * 1.05;
                break;
            case 'Europeo':
                result = base * 1.35;
                break;
        };
        const diferensOfYear=new Date().getFullYear()-this.year;
        result -= ((diferensOfYear * 3) * result)/100;

        if(this.tipo === 'basico'){
            result *= 1.3;
        } else {
            result *= 1.5;
        }
        return result;
    };
};

class UI {
    constructor() { }

    years() {
        const max = new Date().getFullYear();
        const min = max - 10;

        for (let index = max; index > min; index--) {
            const option = document.createElement('option');
            option.value = index;
            option.innerText = index;
            year.appendChild(option);
        };
    };

    viewHteml(messeg,type){
        const div=document.createElement('div');

        if(type === 'error'){
            div.classList.add('mensaje','error');
        } else {
            div.classList.add('mensaje','correcto');
        };
        div.classList.add('mt-10');
        div.innerText=`${messeg}`;
        document.querySelector('#cotizar-seguro').insertBefore(div,document.querySelector('#resultado'));
   
        setTimeout(() =>{
            div.remove();
        },2000)
    };

    viewResoult(total,object){
        const {marca,year,tipo}=object;

        const div=document.createElement('div');
        div.classList.add('mt-10');
        div.innerHTML=`
        <p class="header">Tu Resumen</p>
        <p class="font-bold">Marca: <span class="font-normal"> ${marca}</span></p>
        <p class="font-bold">Año: <span class="font-normal"> ${year}</span></p>
        <p class="font-bold">Tipo: <span class="font-normal"> ${tipo}</span></p>
        <p class="font-bold">Total: <span class="font-normal">$ ${total}</span></p>
        `;

        const spinner=document.querySelector('#cargando');
        spinner.style.display='block';

        setTimeout(() =>{
            spinner.style.display='none';
            document.querySelector('#resultado').appendChild(div);
        },2000)
    };
}

const ui=new UI();


document.addEventListener('DOMContentLoaded', () =>{
    ui.years();
})
document.querySelector('#cotizar-seguro').addEventListener('submit', event =>{
    event.preventDefault();
    const marca=document.querySelector('#marca').value;
    const year=document.querySelector('#year').value;
    const tipo=document.querySelector('input[name="tipo"]:checked').value;
    
    if(marca === '' || year==='' || tipo===''){
        ui.viewHteml('rellena todos los campos','error');
        return;
    };

    ui.viewHteml('cargando...','correcto');
    const object=new Object(marca,year,tipo);
    const relust=object.priceObject();

    if(document.querySelector('#resultado div') != null){
        document.querySelector('#resultado div').remove();
    }

    ui.viewResoult(relust,object);
});