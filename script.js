

document.addEventListener('DOMContentLoaded', function() {

  //fetch('items.json') para hacer pruebas
  fetch('http://jsonblob.com/api/1240254923857059840')
    .then(response => {
      // Verificar si la respuesta es exitosa (código de estado 200-299)
      if (!response.ok) {
        throw new Error('La solicitud falló');
      }
      // Parsear la respuesta JSON
      return response.json();
    })
    .then(data => {
      // Definimos las variables iniciales para mostrar la lista de artículos
      var elemento = document.getElementById("miListaElementos");
      var miCarrito = document.getElementById("micarrito");
      var numeroItems = data.products.length;
      var nombre=[];
      var precio=[];

      var cantidad=[];
      //inicializo todos los elementos del vector cantidad a 0.
      for (var i = 0; i < numeroItems; i++) {
        cantidad.push(0);
      }
            
      // Una vez cargado el DOM muestro los artículos del API
      for (let i = 0; i < numeroItems; i++) {
        nombre[i] = data.products[i].title;
        precio[i] = data.products[i].price;
        elemento.innerHTML += "<div class='list_items'>"
        + "<div class='item_details'>"+ nombre[i] + "</div>"
        + "<div class='item_details' id='Item_Resta"+i+"' >-</div>"
        + "<div class='item_details'><label id='Item_Cantidad"+i+"'>0</label></div>"
        + "<div class='item_details' id='Item_Suma"+i+"'>+</div>"
        + "<div class='item_details'>" + precio[i] + "</div>"
        + "<div class='item_details' id='Item_Total"+i+"'>0</div>"
        + "</div>";
        
        
      }

      // Una vez cargado el DOM gestiono los eventos de Sumar
      for (let i = 0; i < numeroItems; i++) {
        let suma = document.getElementById("Item_Suma" + i);
        let outputLabel = document.getElementById("Item_Cantidad" + i);
        let total = document.getElementById("Item_Total" + i);

        suma.addEventListener("click", function(event) {
          let elementoClicado = event.target; // Obtener el elemento que ha producido el evento
          let idElementoClicado = elementoClicado.id; // Obtener el ID del elemento clicado
          let currentValue = parseInt(outputLabel.textContent);
          cantidad[i] = currentValue + 1;
          outputLabel.textContent = cantidad[i];
          total.textContent = cantidad[i]*data.products[i].price;

        });
      }//fin del evento Sumar

      // Una vez cargado el DOM gestiono los eventos de Restar
      for (let i = 0; i < numeroItems; i++) {
        let resta = document.getElementById("Item_Resta" + i);
        let outputLabel = document.getElementById("Item_Cantidad" + i);
        let total = document.getElementById("Item_Total" + i);

        resta.addEventListener("click", function(event) {
          let elementoClicado = event.target; // Obtener el elemento que ha producido el evento
          let idElementoClicado = elementoClicado.id; // Obtener el ID del elemento clicado
          let currentValue = parseInt(outputLabel.textContent);
          if (currentValue>=1) {
          cantidad[i] = currentValue - 1;
          outputLabel.textContent = cantidad[i];
          total.textContent = cantidad[i]*data.products[i].price;
          }else{
            alert("No se pueden solicitar cantidades negativas")
          }
        });
      }//fin del evento Restar

      // Obtener el botón
      const Actualizar = document.getElementById("boton_Actualizar");
      const Borrar = document.getElementById("boton_Borrar");
      const Total = document.getElementById("Total_Carrito");

      // Agregar el event listener para el evento click
      Actualizar.addEventListener("click", actualizar);
      Borrar.addEventListener("click", borrar);

      // Función ACTUALIZAR 
        function actualizar() {
        var total = 0;

        if (Total.innerText=="" ){
        
         carrito = new Carrito();
         for (let i = 0; i < numeroItems; i++) {
            
             if (cantidad[i]!= 0){
             
                 total += precio[i]*cantidad[i];
                 carrito.agregarArticulo(nombre[i],precio[i],cantidad[i]);
                 micarrito.innerHTML += "<div>"+nombre[i]+"</div>"
                 micarrito.innerHTML += "<div>"+cantidad[i]+"</div>"
                 micarrito.innerHTML += "<div class='precio_total_articulo'>"+precio[i]*cantidad[i]+"</div>"
                
                 
             }
             else{
                console.log("Es articulo no ha sido seleccionado")
             }
         }
         Total.innerHTML = "<div>TOTAL</div><div>"+total+"</div>"
        
         this.cantidad = [];
        }else{
          alert("Antes tiene que limpiar el carrito!");
        }
      
        }//fin de la función ACTUALIZAR
      
      // Función BORRAR
        function borrar(){
    
          location.reload();
        }

      // Definimos la clase CARRITO  
        class Carrito {
          constructor() {
            this.items = []; // Inicializamos un array para almacenar los elementos del carrito
          }
        
          // Método para agregar un artículo al carrito
          agregarArticulo(nombre, precio) {
            const articulo = {nombre, precio};
            this.items.push(articulo);
          }

          
            }//fin de la clase carrito



    })
    .catch(error => {
      // Manejar errores
      console.error('Hubo un error:', error);
    });
});