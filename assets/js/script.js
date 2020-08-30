var personajes_agregados_arr =[];
var numero_episodios = 0;
$(function () {
  
  init();
  $("#buscar").click(e=>{
    buscarPersonaje();
  });

  $("#limpiar").click(e=>{
    limpiar();
  })

  $(document).keypress(e=>{
    if(e.which == 13){
      buscarPersonaje();
    }
  })
});


function getPersonaje(id){
  $.ajax({
    type: "GET",
    url: `https://rickandmortyapi.com/api/character/${id}`,
    success: function (data) {
      console.log("data=>", data);
      //imprimir data
      $("#card").append(generarCard(data));
      addPersonajeList(data);
      generarGrafico();
      update_contador();
    }
  });
}

function generarCard(personaje){
  var card = `
  <div class="col-sm-12 col-md-3">
    <div class="card" style="width:100%;">
      <img src="${personaje.image}"  class="card-img-top img-fluid" alt="...">
      <div class="card-body">
        <h5 class="card-title">${personaje.name}</h5>
        <div>Status : ${personaje.status}</div>
        <div>Especie : ${personaje.species}</div>
      </div>
    </div>
  </div>
  `
  return card;
}

function validacion(id){
  var expresion = /^\d{1,3}$/;

  if(!expresion.test(id)){
    alert("Input invalido");
    $("input_busqueda").focus();
    return false
  }
  else if(!check_nueva_id(id)){
    alert(`Personaje ya ingresado`);
    return false;
  }

  return true;
}

function check_nueva_id(id){
  //si encuentro alguna id igual a la nueva , returno que no es una nueva id con un false
  if(personajes_agregados_arr.some(personaje => personaje.id == id)){
    return false;
  }
  //si llego hasta aca es por que es una id nueva y retorno true. 
  return true;
}

function buscarPersonaje(){
  var id_personaje = $("#input_busqueda").val();
    //validacion
    if(validacion(id_personaje)){
      getPersonaje(id_personaje);
      $("#input_busqueda").val("");
      $("#input_busqueda").focus();
    }
}

function limpiar(){
  $("#card").empty();
  $("#input_busqueda").focus();

  cleanPersojesAgregados();
  update_contador();
  
}

function cleanPersojesAgregados(){
  personajes_agregados_arr = []
  generarGrafico();
}

function getAllEpisodes(){
  $.ajax({
    type: "GET",
    url: "https://rickandmortyapi.com/api/episode/",
    success: function (episodios) {
      numero_episodios = episodios.info.count;
    }
  });
}

function init(){
  getAllEpisodes();
  //otra metodo al partir el documento
  generarGrafico();
  update_contador();
}

function generarGrafico(){
 
  var options = {
    title: {
      text: `Participación en episodios total(${numero_episodios})`              
    },
    axisY:{
      maximum: numero_episodios,
      interval: 5,
    },
    data: [              
    {
      // Change type to "doughnut", "line", "splineArea", etc.
      type: "column",
      dataPoints: [
        ...personajes_agregados_arr,
      ]
    }
    ]
  };
  
  $("#grafico").CanvasJSChart(options);
}

function addPersonajeList(personaje){
  var new_personaje = {
    id: personaje.id,
    label: personaje.name,
    y: personaje.episode.length,
  }
  personajes_agregados_arr.push(new_personaje);
}

function update_contador(){
  $("#contador").html(personajes_agregados_arr.length);
}