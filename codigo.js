var fila="<tr><td class='id'></td><td class='foto'></td><td class='price'></td><td class='title'></td><td class='description'></td><td class='category'></td><td class='delete'></td></tr>";

	 var productos=null;
  function codigoCat(catstr) {
	var code="null";
	switch(catstr) {
		case "electronicos":code="c1";break;
	    case "joyeria":code="c2";break;
		case "caballeros":code="c3";break;
		case "damas":code="c4";break;
	}
	return code;
}   
	  var orden=0;
	  
	  
	function listarProductos(productos) {

	  var form=document.getElementById("form");
	  form.style.display="none";
	  var boton=document.getElementById("btnAgregar");
	  boton.style.display="block";

	  var precio=document.getElementById("price"); 
	  precio.setAttribute("onclick", "orden*=-1;listarProductos(productos);");
	  var num=productos.length;
	  var listado=document.getElementById("listado");
	  var ids,titles,prices,descriptions,categories,fotos,eliminar;
	  var tbody=document.getElementById("tbody"),nfila=0;
	  tbody.innerHTML="";
	  var catcode;
	  for(i=0;i<num;i++) tbody.innerHTML+=fila;
	  var tr; 
	  ids=document.getElementsByClassName("id");
	  titles=document.getElementsByClassName("title");
	  descriptions=document.getElementsByClassName("description");
	  categories=document.getElementsByClassName("category");   
	  fotos=document.getElementsByClassName("foto");   
	  prices=document.getElementsByClassName("price");
	  eliminar=document.getElementsByClassName("delete"); 
 
	  if(orden===0) {orden=-1;precio.innerHTML="Precio"}
	  else
	     if(orden==1) {ordenarAsc(productos,"price");precio.innerHTML="Precio A";precio.style.color="darkgreen"}
	     else 
	       if(orden==-1) {ordenarDesc(productos,"price");precio.innerHTML="Precio D";precio.style.color="blue"}
	
		  
	  	  listado.style.display="block";
	  for(nfila=0;nfila<num;nfila++) {
        ids[nfila].innerHTML=productos[nfila].id;
		titles[nfila].innerHTML=productos[nfila].title;
		descriptions[nfila].innerHTML=productos[nfila].description;
		categories[nfila].innerHTML=productos[nfila].category;
		catcode=codigoCat(productos[nfila].category);
		tr=categories[nfila].parentElement;
		tr.setAttribute("class",catcode);
		prices[nfila].innerHTML="$"+productos[nfila].price;
		fotos[nfila].innerHTML="<img src='"+productos[nfila].image+"'>";
		fotos[nfila].firstChild.setAttribute("onclick","window.open('"+productos[nfila].image+"');" );
		var img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRURc0gjb5APnS6gWnnL7UPmDt61XYLkbIZTQ&usqp=CAU";
		eliminar[nfila].innerHTML = "<img src='"+img+"'>";
		eliminar[nfila].firstChild.setAttribute("onclick","eliminarProducto("+productos[nfila].id+");" );


		}
	}

function eliminarProducto(id)
{
	var delresult;
	var url = "https://retoolapi.dev/oJpqxd/productos/"+id;
	console.log(url);

fetch(url,
{ method:"DELETE"})
.then(response=>response.json())
.then(data=>delresult=data);
delresult
alert("Eliminado con éxito");


	obtenerProductos();
	obtenerProductos();

}



function obtenerProductos() {
	  fetch('https://retoolapi.dev/oJpqxd/productos')
            .then(res=>res.json())
            .then(data=>{
				productos=data;
				productos.forEach(
				function(producto)	{
					producto.price=parseFloat(producto.price)
			});
				listarProductos(data)})
}


function guardarD()
{
var miempleado={
	image: document.getElementById("foto").value,
    price: document.getElementById("precio").value,
    title: document.getElementById("titulo").value,
    category: document.getElementById("categoria").value, 
    description: document.getElementById("descripcion").value 
}

var addresult;
fetch("https://retoolapi.dev/oJpqxd/productos",
{ method:"POST",
  body: JSON.stringify(miempleado),
  headers: {
     'Accept': 'application/json',
     'Content-type': 'application/json; charset=UTF-8',
  }
})
.then(response=>response.json())
.then(data=>addresult=data);
var form=document.getElementById("form");
form.style.display="none";
var boton=document.getElementById("btnAgregar");
boton.style.display="block";
var boton2=document.getElementById("btnObtener");
boton2.style.display="none";

document.getElementById("foto").value="";
document.getElementById("precio").value="";
document.getElementById("titulo").value="";
document.getElementById("categoria").value="";
document.getElementById("descripcion").value="";
alert("Agregado con éxito");

	obtenerProductos();
	obtenerProductos();


}



function agregarProductos()
{
	var form=document.getElementById("form");
	form.style.display="block";
	var listado=document.getElementById("listado");
	listado.style.display="none";
	var boton=document.getElementById("btnObtener");
	boton.style.display="block";

}

function ordenarDesc(p_array_json, p_key) {
   p_array_json.sort(function (a, b) {
      if(a[p_key] > b[p_key]) return -1;
if(a[p_key] < b[p_key]) return 1;
return 0;
   });
}

function ordenarAsc(p_array_json, p_key) {
   p_array_json.sort(function (a, b) {
      if(a[p_key] > b[p_key]) return 1;
if(a[p_key] < b[p_key]) return -1;
return 0;
   });
}