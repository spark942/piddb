
const EXP_TABLE = {}
EXP_TABLE["Slow"] = [1, 2, 10, 33, 80, 156, 270, 428, 640, 911, 1250, 1663, 2160, 2746, 3430, 4218, 5120, 6141, 7290, 8573, 10000, 11576, 13310, 15208, 17280, 19531, 21970, 24603, 27440, 30486, 33750, 37238, 40960, 44921, 49130, 53593, 58320, 63316, 68590, 74148, 80000, 86151, 92610, 99383, 106480, 113906, 121670, 129778, 138240, 147061, 156250, 165813, 175760, 186096, 196830, 207968, 219520, 231491, 243890, 256723, 270000, 283726, 297910, 312558, 327680, 343281, 359370, 375953, 393040, 410636, 428750, 447388, 466560, 486271, 506530, 527343, 548720, 570666, 593190, 616298, 640000, 664301, 689210, 714733, 740880, 767656, 795070, 823128, 851840, 881211, 911250, 941963, 973360, 1005446, 1038230, 1071718, 1105920, 1140841, 1176490, 1212873, 999999999999999999]
EXP_TABLE["Medium Slow"] = [1, 2, 9, 57, 96, 135, 179, 236, 314, 419, 560, 742, 973, 1261, 1612, 2035, 2535, 3120, 3798, 4575, 5460, 6458, 7577, 8825, 10208, 11735, 13411, 15244, 17242, 19411, 21760, 24294, 27021, 29949, 33084, 36435, 40007, 43808, 47846, 52127, 56660, 61450, 66505, 71833, 77440, 83335, 89523, 96012, 102810, 109923, 117360, 125126, 133229, 141677, 150476, 159635, 169159, 179056, 189334, 199999, 211060, 222522, 234393, 246681, 259392, 272535, 286115, 300140, 314618, 329555, 344960, 360838, 377197, 394045, 411388, 429235, 447591, 466464, 485862, 505791, 526260, 547274, 568841, 590969, 613664, 636935, 660787, 685228, 710266, 735907, 762160, 789030, 816525, 844653, 873420, 902835, 932903, 963632, 995030, 1027103, 999999999999999999]
EXP_TABLE["Medium Fast"] = [1, 2, 8, 27, 64, 125, 216, 343, 512, 729, 1000, 1331, 1728, 2197, 2744, 3375, 4096, 4913, 5832, 6859, 8000, 9261, 10648, 12167, 13824, 15625, 17576, 19683, 21952, 24389, 27000, 29791, 32768, 35937, 39304, 42875, 46656, 50653, 54872, 59319, 64000, 68921, 74088, 79507, 85184, 91125, 97336, 103823, 110592, 117649, 125000, 132651, 140608, 148877, 157464, 166375, 175616, 185193, 195112, 205379, 216000, 226981, 238328, 250047, 262144, 274625, 287496, 300763, 314432, 328509, 343000, 357911, 373248, 389017, 405224, 421875, 438976, 456533, 474552, 493039, 512000, 531441, 551368, 571787, 592704, 614125, 636056, 658503, 681472, 704969, 729000, 753571, 778688, 804357, 830584, 857375, 884736, 912673, 941192, 970299, 999999999999999999]
EXP_TABLE["Fast"] = [1, 2, 6, 21, 51, 100, 172, 274, 409, 583, 800, 1064, 1382, 1757, 2195, 2700, 3276, 3930, 4665, 5487, 6400, 7408, 8518, 9733, 11059, 12500, 14060, 15746, 17561, 19511, 21600, 23832, 26214, 28749, 31443, 34300, 37324, 40522, 43897, 47455, 51200, 55136, 59270, 63605, 68147, 72900, 77868, 83058, 88473, 94119, 100000, 106120, 112486, 119101, 125971, 133100, 140492, 148154, 156089, 164303, 172800, 181584, 190662, 200037, 209715, 219700, 229996, 240610, 251545, 262807, 274400, 286328, 298598, 311213, 324179, 337500, 351180, 365226, 379641, 394431, 409600, 425152, 441094, 457429, 474163, 491300, 508844, 526802, 545177, 563975, 583200, 602856, 622950, 643485, 664467, 685900, 707788, 730138, 752953, 776239, 999999999999999999]

const statValue = (raw, level) => {
  level = level || 1;
  return Math.floor((((raw + 50) * level) / (150)))
}

var Pokemons = {};
var PokemonPokedex = [];
var PokemonsPerCity = [];

var formatPokemonArray = function() {
  for (pdt in POKEDEX) {
    var p_name   = POKEDEX[pdt].pokemon[0]["Pokemon"];
    var p_catch  = POKEDEX[pdt].stats[0]["catch rate"];
    var p_growth = POKEDEX[pdt].stats[0]["growth rate"];
    var p_hp     = POKEDEX[pdt].stats[0]["hp"];
    var p_atk    = POKEDEX[pdt].stats[0]["attack"];
    var p_def    = POKEDEX[pdt].stats[0]["defense"];
    var p_spatk  = POKEDEX[pdt].stats[0]["sp atk"];
    var p_spdef  = POKEDEX[pdt].stats[0]["sp def"];
    var p_speed  = POKEDEX[pdt].stats[0]["speed"];
    var p_type1  = POKEDEX[pdt].stats[0]["types"][0];
    var p_type2  = POKEDEX[pdt].stats[0]["types"][1];
    var p_bexp   = POKEDEX[pdt].exp[0]["base exp"];
    var p_image  = POKEDEX[pdt].images.normal.front;
    var p_id     = parseInt(pdt) +1;
    Pokemons[p_name] = {
      name      : p_name,
      catch     : p_catch,
      growth    : p_growth,
      p_hp      : p_hp,
      atk       : p_atk,
      atklv1    : statValue(p_atk),
      atklv100  : statValue(p_atk,100),
      def       : p_def,
      deflv1    : statValue(p_def),
      deflv100  : statValue(p_def,100),
      spatk     : p_spatk,
      spatklv1  : statValue(p_spatk),
      spatklv100: statValue(p_spatk,100),
      spdef     : p_spdef,
      spdeflv1  : statValue(p_spdef),
      spdeflv100: statValue(p_spdef,100),
      speed     : p_speed,
      speedlv1  : Math.floor(1000 / (500 + statValue(p_speed)) * 800)/1000,
      speedlv100: Math.floor(1000 / (500 + statValue(p_speed, 100)) * 800)/1000,
      type1     : p_type1,
      type2     : p_type2 || '',
      bexp      : p_bexp,
      imgf      : p_image,
      id        : p_id
    };

    Pokemons[p_name].hardcappedspeedlv1   = (Pokemons[p_name].speedlv1 > 0.3 ? Pokemons[p_name].speedlv1 : 0.3);
    Pokemons[p_name].hardcappedspeedlv100 = (Pokemons[p_name].speedlv100 > 0.3 ? Pokemons[p_name].speedlv100 : 0.3);
    Pokemons[p_name].powerlv1   = (Pokemons[p_name].atklv1*(1/Pokemons[p_name].hardcappedspeedlv1))*(1/3) + Pokemons[p_name].deflv1*(1-1/3);
    Pokemons[p_name].powerlv100 = (Pokemons[p_name].atklv100*(1/Pokemons[p_name].hardcappedspeedlv100))*(1/3) + Pokemons[p_name].deflv100*(1-1/3);

    /* Evolution */
    if (EVOLUTIONS.hasOwnProperty(p_name)) {
      Pokemons[p_name].evolution = EVOLUTIONS[p_name].to;
      Pokemons[p_name].evollevel = EVOLUTIONS[p_name].level;
    };

    /* Routes */
    // see formatPokemonCity()

    //$("#pokemonspercity").append(p_name + "<br>");
  }
};

formatPokemonArray();



var formatPokemonCity = function(name, region, routename, min, max) {
  var PokemonCity = {
    name   : name,
    lvmin  : min,
    lvavg  : ((max + min) / 2),
    lvmax  : max,
    type1  : Pokemons[name].type1,
    type2  : Pokemons[name].type2,
    expmin : ((Pokemons[name].bexp / 16) + (min * 3)).toFixed(3),
    expavg : (((Pokemons[name].bexp / 16) + (max * 3) + (Pokemons[name].bexp / 16) + (min * 3)) / 2).toFixed(3),
    expmax : ((Pokemons[name].bexp / 16) + (max * 3)).toFixed(3),
    expteammin : ((Pokemons[name].bexp / 100) + (min / 10)).toFixed(3),
    expteamavg : (((Pokemons[name].bexp / 100) + (min / 10) + (Pokemons[name].bexp / 100) + (max / 10)) / 2).toFixed(3),
    expteammax : ((Pokemons[name].bexp / 100) + (max / 10)).toFixed(3),
    region : region,
    route  : routename,
  };

  /* Add route to pokedex pokemon */
  if (!Pokemons[name].hasOwnProperty('routes')) {
    Pokemons[name].routes = {};
  }
  if (!Pokemons[name].routes.hasOwnProperty(region)) {
    Pokemons[name].routes[region] = [];
  }
  Pokemons[name].routes[region].push({
    routename: routename,
    lvmin    : min,
    lvmax    : max
  });


  return PokemonCity;
};

var PokemonsToPokedex = function() {
  for (poke in Pokemons) {
    PokemonPokedex.push(Pokemons[poke]);
  }
};

var buildPokeByCityData = function() {
  for (region in ROUTES) {
    var pc_region = region;

    for (city in ROUTES[region]) {
      var pc_route = city;
      var pc_routename = ROUTES[region][city].name;
      var pc_minlv = ROUTES[region][city].minLevel;
      var pc_maxlv = ROUTES[region][city].maxLevel;

      for(var i = 0; i < ROUTES[region][city].pokes.length; i++){
        var pc_name = ROUTES[region][city].pokes[i];
        PokemonsPerCity.push(formatPokemonCity(pc_name, pc_region, pc_routename, pc_minlv, pc_maxlv));
      }
    }
  }
};

buildPokeByCityData();



/* update url */
function updateUrlParameter(uri, key, value) {
  // remove the hash part before operating on the uri
  var i = uri.indexOf('#');
  var hash = i === -1 ? ''  : uri.substr(i);
  uri = i === -1 ? uri : uri.substr(0, i);

  var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  var separator = uri.indexOf('?') !== -1 ? "&" : "?";

  if (!value) {
    // remove key-value pair if value is empty
    uri = uri.replace(new RegExp("([?&]?)" + key + "=[^&]*", "i"), '');
    if (uri.slice(-1) === '?') {
      uri = uri.slice(0, -1);
    }
    // replace first occurrence of & by ? if no ? is present
    if (uri.indexOf('?') === -1) uri = uri.replace(/&/, '?');
  } else if (uri.match(re)) {
    uri = uri.replace(re, '$1' + key + "=" + value + '$2');
  } else {
    uri = uri + separator + key + "=" + value;
  }
  return uri + hash;
}
function updateURL(key,value) {
  window.history.pushState(
    "object or string", 
    "My Colony Reference - Building, Vehicles &amp; Researchs", 
    updateUrlParameter(window.location.href, encodeURI(key), encodeURI(value)));
}

/* get the URL search variable and convert to object */
function searchToObject() {
  var pairs = window.location.search.substring(1).split("&"),
    obj = {},
    pair,
    i;

  for ( i in pairs ) {
    if ( pairs[i] === "" ) continue;

    pair = pairs[i].split("=");
    obj[ decodeURIComponent( pair[0] ) ] = decodeURIComponent( pair[1] );
  }

  return obj;
}
var searchObj = searchToObject();
var filterableColumnNames = [
    "Pokemon",
    "Region",
    "Route"];
$(document).ready(function() {
  /* *********************** *
   *  POKEMON PER CITY
   * *********************** */
  $('#pokemonspercity').DataTable({
    dom: '<"top">rt<"bottom"ip><"clear">',
    hideEmptyCols: true,
    lengthChange: true,
    paging: true,
    pageResize: true,
    scrollX: true,
    fixedColumns: {
      leftColumns: 1,
    },
    data: PokemonsPerCity,
    columns: [
      { /* 0 (Col 1) */
        data: null,
        searchable: false,
        orderable: false,
        className:      'row-index',
        width: "1em",
        targets: 0
      },
      { /* 1 (Col 2) */
        name: "Pokemon", data: "name" },
      { /* 2 (Col 3) */
        name: "Region", data: "region" },
      { /* 3 (Col 4) */
        name: "Route", data: "route",
      },
      { /* 4 (Col 5) */
        name: "Min Level", data: "lvmin", className: 'num',
      },
      { /* 4 (Col 5) */
        name: "Max Level", data: "lvmax", className: 'num',
      },
      { /* 5 (Col 6) */
        name: "Min Exp", data: "expmin", className: 'num', render: $.fn.dataTable.render.number( ',', '.', 0, '', 'EXP')
      },
      { /* 6 (Col 7) */
        name: "Max Exp", data: "expmax", className: 'num', render: $.fn.dataTable.render.number( ',', '.', 0, '', 'EXP')
      },
      { /* 7 (Col 8) */
        name: "Min Team Exp", data: "expteammin", className: 'num', render: $.fn.dataTable.render.number( ',', '.', 0, '', 'EXP')
      },
      { /* 8 (Col 9) */
        name: "Max Team Exp", data: "expteammax", className: 'num', render: $.fn.dataTable.render.number( ',', '.', 0, '', 'EXP')
      },
    ], 
    order: [[ 7, 'desc' ], [ 5, 'desc' ]],
    aoColumnDefs: [
      /*{ 
        "sType": "numeric", 
        "sClass": "currency",
        "defaultContent": '',
        "aTargets": [4, 5, 6, 7, 8, 9]
      }*/
    ],
    initComplete: function(settings, json) {
      /* Show the table after everything is loaded*/
      $( "#loading-overlay" ).hide( "fast" );

      /* Set the search field if in URL */
      if (searchObj['search']) {
        setSearchVal(decodeURI(searchObj['search']));
        this.api().search(decodeURI(searchObj['search'])).draw();
      }
      $.fn.dataTable.tables( {visible: true, api: true} ).columns.adjust();
    }
  });

  oTable = $('#pokemonspercity').DataTable(); 

  yadcf.init(oTable, [/*
    {column_number : 0 },*/
    {column_number : 1, filter_type: 'select', filter_default_label: 'All Pokemon', filter_reset_button_text: false},
    {column_number : 2, filter_type: 'select', filter_default_label: 'All Region', filter_reset_button_text: false},
    {column_number : 3, filter_type: 'select', filter_default_label: 'All Route', filter_reset_button_text: false}
      ], {filters_position: "footer", filters_tr_index: 2});
  oTable.on( 'order.dt search.dt', function () {
    oTable.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
      cell.innerHTML = i+1;
    } );
  } ).draw();

  if (searchObj) {
    var presetFilters = [];
    for (var filterName in searchObj){
      if (filterableColumnNames.indexOf(filterName) > -1) {
        var filterID = oTable.column(filterName+':name').index();
        presetFilters.push([filterID, searchObj[filterName]]);
      }
    }
    
    yadcf.exFilterColumn(oTable, presetFilters);
  }

  /* Update URL when filter selection */
  $(document).on('change', 'select.yadcf-filter', function() { 
    var colID = $(this).attr('id');
    colID = colID.replace('yadcf-filter--pokemonspercity-', '');
    var columns = oTable.settings().init().columns;
    var columnFilterName = columns[colID].name;
    var columnFilterVal = yadcf.exGetColumnFilterVal(oTable,colID);
    updateURL(columnFilterName, columnFilterVal);
  });

  /* Add a button to clear filters */
  $(document).on('click', 'button#clearf', function() { 
    yadcf.exResetAllFilters(oTable);
    if (searchObj['search']) {
      oTable.search(searchObj['search']).draw();
    }

    for (var i = 0; i < filterableColumnNames.length; i++) {
      updateURL(filterableColumnNames[i], '');
    };
    $('#searchdatalist').val("");
    updateURL('search', $(this).val());
  });

  /* *********************** *
   *  POKEDEX
   * *********************** */
  PokemonsToPokedex()
  $('#pokedex').DataTable({
    dom: '<"top">rt<"bottom"ip><"clear">',
    hideEmptyCols: true,
    lengthChange: true,
    paging: true,
    pageResize: true,
    scrollX: true,
    fixedColumns: {
      leftColumns: 1,
    },
    data: PokemonPokedex,
    columns: [
      { /* 0 (Col 1) */
        name: "#", data: "id" },
      { /* 1 (Col 2) */
        name: "Pokemon", data: "name" },
      { /* 2 (Col 3) */
        name: "Type", data: "type1"
      },
      { /* 3 (Col 4) */
        name: "ATK", data: "atklv100", className: 'num'
      },
      { /* 4 (Col 5) */
        name: "DEF", data: "deflv100", className: 'num'
      },
      { /* 5 (Col 6) */
        name: "SPD", data: "speedlv100", className: 'num'
      },
      { /* 6 (Col 7) */
        name: "Base Exp", data: "bexp", className: 'num', render: $.fn.dataTable.render.number( ',', '.', 0, '', 'EXP')
      },
      { /* 7 (Col 8) */
        name: "Catch Rate", data: "catch", className: 'num'
      },
      { /* 8 (Col 9) */
        name: "Growth Rate", data: "growth"
      },
      { /* 9 (Col 10) */
        name: "Evolution", data: "evolution", "defaultContent": ""
      },
      { /* 10 (Col 11) */
        name: "Routes", data: "routes", "defaultContent": ""
      },
      { /* 11 (Col 12) */
        name: "Power", data: "powerlv100", "defaultContent": ""
      }
    ], 
    order: [[ 0, 'asc' ]],
    aoColumnDefs: [
      {
        "aTargets": [3],
        "mData": "atklv100",
        "mRender": function ( data, type, full ) {
          return data.toLocaleString('en-US', {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
          });
        }
      },
      {
        "aTargets": [4],
        "mData": "deflv100",
        "mRender": function ( data, type, full ) {
          return data.toLocaleString('en-US', {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
          });
        }
      },
      {
        "aTargets": [5],
        "mData": "speedlv100",
        "mRender": function ( data, type, full ) {
          return (data > 0.3 ? data : 0.3).toLocaleString('en-US', {
              minimumFractionDigits: 1,
              maximumFractionDigits: 3
          });
        }
      },
      {
        "aTargets": [7],
        "mData": "catch",
        "mRender": function ( data, type, full ) {
          return (parseInt(data)/3).toLocaleString('en-US', {
              minimumFractionDigits: 1,
              maximumFractionDigits: 2
          }) + "%";
        }
      },
      {
        "aTargets": [10],
        "mData": "routes",
        "mRender": function ( data, type, full ) {
          var text = '';
          if (data && typeof data === 'object') {
            var i = 0;
            for (Region in data){
              if (i > 0)
                text += ', ';
              text += '<span>'+Region+' ('+ data[Region].length +')</span>';
              i++;
            };
          }
          return text;
        }
      },
      {
        "aTargets": [11],
        "mData": "powerlv100",
        "mRender": function ( data, type, full ) {
          return (parseInt(data)/3).toLocaleString('en-US', {
              minimumFractionDigits: 0,
              maximumFractionDigits: 1
          }) + "";
        }
      },
      /*{ 
        "sType": "numeric", 
        "sClass": "currency",
        "defaultContent": '',
        "aTargets": [4, 5, 6, 7, 8, 9]
      }*/
    ],
    initComplete: function(settings, json) {
      /* Show the table after everything is loaded*/
      $.fn.dataTable.tables( {visible: true, api: true} ).columns.adjust();
    }
  });

  var filterableColumnNamesPD = [
    "Pokemon",
    "Region",
    "Route"];
  oTablePD = $('#pokedex').DataTable(); 
  yadcf.init(oTablePD, [/*
    {column_number : 0 },*//*
    {column_number : 1, filter_type: 'select', filter_default_label: 'All Pokemon', filter_reset_button_text: false},
    {column_number : 2, filter_type: 'select', filter_default_label: 'All Region', filter_reset_button_text: false},*/
    {column_number : 9, filter_type: 'select', filter_default_label: 'Pokémons', filter_reset_button_text: false}
      ], {filters_position: "footer", filters_tr_index: 2});



  /* *********************** *
   *  GENERAL
   * *********************** */

  $(document).on('click', 'a.tofilter', function() { 
    var searchval = $(this).text();
    if (searchval == 'All')
      searchval = '';
    else
      searchval = '"'+searchval+'"';
    setSearchVal(searchval);
    $('#searchdatalist').trigger('input');
    $( "#item-description" ).hide( "slow" );
  });

  function setSearchVal(searchval) {
    $("#searchdatalist").val(searchval);
  }
  $('#searchdatalist').on('input', function() {
    // add search filter
    updateURL('search', $(this).val());
    oTable.search($(this).val()).draw();
  });



  var curTable = 'pokedex';

  $(document).on('click', 'a.showtable', function() { 
    var showtable = $(this).attr('id').replace("menu", "");;
    // remove selected menu class
    $(".showtable").removeClass("curtable");
    // remove current table class 
    $(".poketable").removeClass("curtable");

    // show selected menu
    $("#menu"+showtable).addClass( "curtable");
    // display current table
    $("#tc-"+showtable).addClass( "curtable");
    $.fn.dataTable.tables( {visible: true, api: true} ).columns.adjust();
    $("table.pokemonspercity").resize();
    $("table.pokedex").resize();
  });
  // load table from url
  // if no table, load default
  //$( "#menupokedex" ).trigger( "click" );
});

