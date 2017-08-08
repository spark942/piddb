
const EXP_TABLE = {}
EXP_TABLE["Slow"] = [1, 2, 10, 33, 80, 156, 270, 428, 640, 911, 1250, 1663, 2160, 2746, 3430, 4218, 5120, 6141, 7290, 8573, 10000, 11576, 13310, 15208, 17280, 19531, 21970, 24603, 27440, 30486, 33750, 37238, 40960, 44921, 49130, 53593, 58320, 63316, 68590, 74148, 80000, 86151, 92610, 99383, 106480, 113906, 121670, 129778, 138240, 147061, 156250, 165813, 175760, 186096, 196830, 207968, 219520, 231491, 243890, 256723, 270000, 283726, 297910, 312558, 327680, 343281, 359370, 375953, 393040, 410636, 428750, 447388, 466560, 486271, 506530, 527343, 548720, 570666, 593190, 616298, 640000, 664301, 689210, 714733, 740880, 767656, 795070, 823128, 851840, 881211, 911250, 941963, 973360, 1005446, 1038230, 1071718, 1105920, 1140841, 1176490, 1212873, 999999999999999999]
EXP_TABLE["Medium Slow"] = [1, 2, 9, 57, 96, 135, 179, 236, 314, 419, 560, 742, 973, 1261, 1612, 2035, 2535, 3120, 3798, 4575, 5460, 6458, 7577, 8825, 10208, 11735, 13411, 15244, 17242, 19411, 21760, 24294, 27021, 29949, 33084, 36435, 40007, 43808, 47846, 52127, 56660, 61450, 66505, 71833, 77440, 83335, 89523, 96012, 102810, 109923, 117360, 125126, 133229, 141677, 150476, 159635, 169159, 179056, 189334, 199999, 211060, 222522, 234393, 246681, 259392, 272535, 286115, 300140, 314618, 329555, 344960, 360838, 377197, 394045, 411388, 429235, 447591, 466464, 485862, 505791, 526260, 547274, 568841, 590969, 613664, 636935, 660787, 685228, 710266, 735907, 762160, 789030, 816525, 844653, 873420, 902835, 932903, 963632, 995030, 1027103, 999999999999999999]
EXP_TABLE["Medium Fast"] = [1, 2, 8, 27, 64, 125, 216, 343, 512, 729, 1000, 1331, 1728, 2197, 2744, 3375, 4096, 4913, 5832, 6859, 8000, 9261, 10648, 12167, 13824, 15625, 17576, 19683, 21952, 24389, 27000, 29791, 32768, 35937, 39304, 42875, 46656, 50653, 54872, 59319, 64000, 68921, 74088, 79507, 85184, 91125, 97336, 103823, 110592, 117649, 125000, 132651, 140608, 148877, 157464, 166375, 175616, 185193, 195112, 205379, 216000, 226981, 238328, 250047, 262144, 274625, 287496, 300763, 314432, 328509, 343000, 357911, 373248, 389017, 405224, 421875, 438976, 456533, 474552, 493039, 512000, 531441, 551368, 571787, 592704, 614125, 636056, 658503, 681472, 704969, 729000, 753571, 778688, 804357, 830584, 857375, 884736, 912673, 941192, 970299, 999999999999999999]
EXP_TABLE["Fast"] = [1, 2, 6, 21, 51, 100, 172, 274, 409, 583, 800, 1064, 1382, 1757, 2195, 2700, 3276, 3930, 4665, 5487, 6400, 7408, 8518, 9733, 11059, 12500, 14060, 15746, 17561, 19511, 21600, 23832, 26214, 28749, 31443, 34300, 37324, 40522, 43897, 47455, 51200, 55136, 59270, 63605, 68147, 72900, 77868, 83058, 88473, 94119, 100000, 106120, 112486, 119101, 125971, 133100, 140492, 148154, 156089, 164303, 172800, 181584, 190662, 200037, 209715, 219700, 229996, 240610, 251545, 262807, 274400, 286328, 298598, 311213, 324179, 337500, 351180, 365226, 379641, 394431, 409600, 425152, 441094, 457429, 474163, 491300, 508844, 526802, 545177, 563975, 583200, 602856, 622950, 643485, 664467, 685900, 707788, 730138, 752953, 776239, 999999999999999999]

const statValue = (raw, level) => {
  level = level || 1;
  return Math.floor((((raw + 50) * level) / (150)))
}
const statHp = (rawHp, level) => {
  return Math.floor(((rawHp * level) / 40))
}

var Pokemons = {};
var PokemonPokedex = [];
var PokemonFamily = [];
var PokemonsPerCity = [];
var PokemonPokedexRankingHp = [];
var PokemonPokedexRankingAtk = [];
var PokemonPokedexRankingDef = [];
var PokemonPokedexRankingSpeed = [];
var PokemonPokedexRankingPower = [];
var PokemonPokedexRankingDps = [];

var PokemonPokedexPerType = {};
var PokemonPokedexRankingHpPerType = [];
var PokemonPokedexRankingAtkPerType = [];
var PokemonPokedexRankingDefPerType = [];
var PokemonPokedexRankingSpeedPerType = [];
var PokemonPokedexRankingPowerPerType = [];
var PokemonPokedexRankingDpsPerType = [];

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
    var p_imageb  = POKEDEX[pdt].images.normal.back;
    var p_simage  = POKEDEX[pdt].images.shiny.front;
    var p_simageb  = POKEDEX[pdt].images.shiny.back;
    var p_id     = parseInt(pdt) +1;
    Pokemons[p_name] = {
      name      : p_name,
      className : p_name.replace(' ','_'),
      catch     : p_catch,
      growth    : p_growth,
      hp        : p_hp,
      hplv1     : statHp(p_hp,1),
      hplv100   : statHp(p_hp,100),
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
      imgb      : p_imageb,
      simgf     : p_simage,
      simgb     : p_simageb,
      id        : p_id
    };

    Pokemons[p_name].hardcappedspeedlv1   = (Pokemons[p_name].speedlv1 > 0.3 ? Pokemons[p_name].speedlv1 : 0.3);
    Pokemons[p_name].hardcappedspeedlv100 = (Pokemons[p_name].speedlv100 > 0.3 ? Pokemons[p_name].speedlv100 : 0.3);
    Pokemons[p_name].powerlv1   = (Pokemons[p_name].atklv1*(1/Pokemons[p_name].hardcappedspeedlv1))*(1/3) + Pokemons[p_name].deflv1*(1-1/3);
    Pokemons[p_name].powerlv100 = (Pokemons[p_name].atklv100*(1/Pokemons[p_name].hardcappedspeedlv100))*(1/3) + Pokemons[p_name].deflv100*(1-1/3);

    Pokemons[p_name].dpslv1   = (Pokemons[p_name].atklv1*(1/Pokemons[p_name].hardcappedspeedlv1))/100;
    Pokemons[p_name].dpslv100 = (Pokemons[p_name].atklv100*(1/Pokemons[p_name].hardcappedspeedlv100))/100;

    /* Evolution */
    if (EVOLUTIONS.hasOwnProperty(p_name)) {
      Pokemons[p_name].evolution = EVOLUTIONS[p_name].to;
      Pokemons[p_name].evollevel = EVOLUTIONS[p_name].level;
    };
    for (pokefrom in EVOLUTIONS) {
      if (EVOLUTIONS[pokefrom].to == p_name) {
        Pokemons[p_name].evolfrom = pokefrom;
        Pokemons[p_name].evolfromlv = EVOLUTIONS[pokefrom].level;
      }
    }

    /* Routes */
    // see formatPokemonCity()

    //$("#pokemonspercity").append(p_name + "<br>");
  }
};

formatPokemonArray();

var formatPokemonFamily = function() {
  for (poke in Pokemons) {
    var exists = false;
    for (var i = 0; i < PokemonFamily.length; i++) {
      if (PokemonFamily[i].hasOwnProperty(poke)) {
        // should never come here
      } else {
        for (fam in PokemonFamily[i]) {
          if (PokemonFamily[i][fam].evolution == poke) {
            PokemonFamily[i][poke] = Pokemons[poke];
            exists = true;
          }
        }
      }
    };
    if (!exists) {
      var family = {};
      family[poke] = Pokemons[poke];
      PokemonFamily.push(family);
    }
  }
}

var formatPokemonCity = function(name, type, region, routename, min, max) {
  var PokemonCity = {
    name   : name,
    className   : name.replace(' ','_'),
    type   : type,
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
    Pokemons[name].routenames = [];
  }
  if (!Pokemons[name].routes.hasOwnProperty(region)) {
    Pokemons[name].routes[region] = [];
    if (Pokemons[name].routenames.indexOf(region) == -1) {
      Pokemons[name].routenames.push(region);
    }
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

var setPokemonRankings = function() {
  PokemonPokedexRankingHp = sortByAttribute(PokemonPokedex, '-hplv100');
  PokemonPokedexRankingAtk = sortByAttribute(PokemonPokedex, '-atklv100');
  PokemonPokedexRankingDef = sortByAttribute(PokemonPokedex, '-deflv100');
  PokemonPokedexRankingSpeed = sortByAttribute(PokemonPokedex, 'hardcappedspeedlv100');
  PokemonPokedexRankingPower = sortByAttribute(PokemonPokedex, '-powerlv100');
  PokemonPokedexRankingDps = sortByAttribute(PokemonPokedex, '-dpslv100');

  /* set rankings per types */
  /* separate all pokemons per types */
  for (tt in TYPES){
    PokemonPokedexPerType[tt] = [];
    for (var i = 0; i < PokemonPokedex.length; i++) {
      if (PokemonPokedex[i].type1 == tt)
        PokemonPokedexPerType[tt].push(PokemonPokedex[i]);
    };
  }
  /* now sort all type groups */
  for (ttr in PokemonPokedexPerType) {
    PokemonPokedexRankingHpPerType[ttr] = sortByAttribute(PokemonPokedexPerType[ttr], '-hplv100');
    PokemonPokedexRankingAtkPerType[ttr] = sortByAttribute(PokemonPokedexPerType[ttr], '-atklv100');
    PokemonPokedexRankingDefPerType[ttr] = sortByAttribute(PokemonPokedexPerType[ttr], '-deflv100');
    PokemonPokedexRankingSpeedPerType[ttr] = sortByAttribute(PokemonPokedexPerType[ttr], 'hardcappedspeedlv100');
    PokemonPokedexRankingPowerPerType[ttr] = sortByAttribute(PokemonPokedexPerType[ttr], '-powerlv100');
    PokemonPokedexRankingDpsPerType[ttr] = sortByAttribute(PokemonPokedexPerType[ttr], '-dpslv100');
  }
}

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
        var pc_type = Pokemons[pc_name].type1;
        PokemonsPerCity.push(formatPokemonCity(pc_name, pc_type, pc_region, pc_routename, pc_minlv, pc_maxlv));
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
      { /* 1 (Col 2) */
        name: "Type", data: "type" },
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
      {
        "aTargets": [1],
        "mData": "name",
        "mRender": function ( data, type, full ) {
          return '<a class="item-details-link" href="#'+full.className+'">'+data+'</a>';
        }
      },
      {
        "aTargets": [2],
        "mData": "type",
        "mRender": function ( data, type, full ) {
          return ' <span class="typebadge type'+data+'">'+data+'</span>';
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
    {column_number : 2, filter_type: 'select', filter_default_label: 'All Types', filter_reset_button_text: false},
    {column_number : 3, filter_type: 'select', filter_default_label: 'All Region', filter_reset_button_text: false},
    {column_number : 4, filter_type: 'select', filter_default_label: 'All Route', filter_reset_button_text: false}
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
      rightColumns: 2,
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
        name: "Base Exp", data: "bexp", className: 'num', render: $.fn.dataTable.render.number( ',', '.', 0, '', ' EXP')
      },
      { /* 7 (Col 8) */
        name: "Catch Rate", data: "catch", className: 'num'
      },
      { /* 8 (Col 9) */
        name: "Growth Rate", data: "growth", className: 'tsmall'
      },
      { /* 9 (Col 10) */
        name: "Evolution", data: "evolution", "defaultContent": ""
      },
      { /* 10 (Col 11) */
        name: "Routes", data: "routenames", "defaultContent": ""
      },
      { /* 11 (Col 12) */
        name: "Power", data: "powerlv100", "defaultContent": ""
      },
      { /* 12 (Col 13) */
        name: "DPS", data: "dpslv100", "defaultContent": ""
      },
    ], 
    order: [[ 0, 'asc' ]],
    aoColumnDefs: [
      {
        "aTargets": [1],
        "mData": "name",
        "mRender": function ( data, type, full ) {
          return '<a class="item-details-link" href="#'+full.className+'">'+data+'</a>'
        }
      },
      {
        "aTargets": [2],
        "mData": "type1",
        "mRender": function ( data, type, full ) {
          return '<span class="typebadge type'+data+'">'+data+'</span>';
        }
      },
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
          var catchrate = '';
          if (full.hasOwnProperty('routes')) {
            catchrate = (parseInt(data)/3).toLocaleString('en-US', {
                minimumFractionDigits: 1,
                maximumFractionDigits: 2
            }) + "%";
          }
          return catchrate;
        }
      },
      {
        "aTargets": [9],
        "mData": "evolution",
        "mRender": function ( data, type, full ) {
          if (data) {
            return data + ' <span class="tsmall">('+full.evollevel+')</span>';
          } else {
            if (full.hasOwnProperty('evolfrom')) {
              return '<span class="evolfrom">from</span> ' + full.evolfrom + ''+ ' <span class="tsmall">('+full.evolfromlv+')</span>';
            } else {
              return '';
            }
          }
        }
      },
      {
        "aTargets": [10],
        "mData": "routenames",
        "mRender": function ( data, type, full ) {
          var text = '';
          if (data && typeof data === 'object') {
            var i = 0;
            for (var i = 0; i < data.length; i++){
              if (i > 0)
                text += ', ';
              text += '<span><a class="pokemonregion" href="#" data-pokemon="'+full.name+'" data-region="'+data[i]+'">'+data[i]+'</a> <span class="tsmall">('+ full.routes[data[i]].length +')</span></span>';
              i++;
            };
            return text;
          } else {
            return '';
          }
        }
      },
      {
        "aTargets": [11],
        "mData": "powerlv100",
        "mRender": function ( data, type, full ) {
          return data.toLocaleString('en-US', {
              minimumFractionDigits: 0,
              maximumFractionDigits: 1
          });
        }
      },
      {
        "aTargets": [12],
        "mData": "dpslv100",
        "mRender": function ( data, type, full ) {
          return data.toLocaleString('en-US', {
              minimumFractionDigits: 0,
              maximumFractionDigits: 1
          });
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
    "PD1",
    "PD2",
    "PD3"];
  oTablePD = $('#pokedex').DataTable(); 
  yadcf.init(oTablePD, [/*
    {column_number : 0 },*/
    {column_number : 1, filter_type: 'select', filter_default_label: 'All Pokémons', filter_reset_button_text: false},
    {column_number : 2, filter_type: 'select', filter_default_label: 'All Types', filter_reset_button_text: false},
    {column_number : 9, filter_type: 'select', filter_default_label: 'Pokémons', filter_reset_button_text: false},
    {column_number : 10, text_data_delimiter: ",", filter_default_label: 'All Regions', filter_reset_button_text: false}
      ], {filters_position: "footer", filters_tr_index: 1});



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
    var showtable = $(this).attr('id').replace("menu", "");
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
    $( "#item-description" ).hide( "slow" );
  });

  $(document).on('click', 'a.pokemonregion', function() { 
    var thisPokemon = $(this).attr('data-pokemon');
    var thisRegion = $(this).attr('data-region');
    $( "#item-description" ).hide( "slow" );
    $( "#menupokemonspercity" ).trigger( "click" );

    var thisFilter = {
      Region: thisRegion,
      Pokemon: thisPokemon
    }
    var presetFilters = [];
    for (var filterName in thisFilter){
      if (filterableColumnNames.indexOf(filterName) > -1) {
        var filterID = oTable.column(filterName+':name').index();
        presetFilters.push([filterID, thisFilter[filterName]]);
      }
    }
    yadcf.exFilterColumn(oTable, presetFilters);
  });
  $(document).on('click', 'a.pokemonroute', function() { 
    var thisRegion = $(this).attr('data-region');
    var thisRoute = $(this).attr('data-route');
    $( "#item-description" ).hide( "slow" );
    $( "#menupokemonspercity" ).trigger( "click" );

    var thisFilter = {
      Region: thisRegion,
      Route: thisRoute
    }
    var presetFilters = [];
    for (var filterName in thisFilter){
      if (filterableColumnNames.indexOf(filterName) > -1) {
        var filterID = oTable.column(filterName+':name').index();
        presetFilters.push([filterID, thisFilter[filterName]]);
      }
    }
    yadcf.exFilterColumn(oTable, presetFilters);
  });

  // load table from url
  // if no table, load default
  //$( "#menupokedex" ).trigger( "click" );
  setPokemonRankings();

  var className = window.location.hash.substring(1);
  console.log(className.length);
  if (className.length > 0) 
    openItemDesc(className);
  displayCookiedex()
});

function setCookiedex(pokemonclass) {
  var cookiedex = getCookiedex() || [];
  if (cookiedex.length >= 20) {
    while (cookiedex.length >= 20)
      cookiedex.shift();
  }
  if (cookiedex.indexOf(pokemonclass) == -1 && pokemonclass.length)
    cookiedex.push(pokemonclass);
  var cookiestring = cookiedex.join();
  setCookie('cookiedex',cookiestring, 60);
}

function getCookiedex() {
  return getCookie('cookiedex').split(',');
}

function displayCookiedex() {
  var cdex = getCookiedex();
  console.log(cdex);
  var thtml = '';
  for (var i = cdex.length - 1; i >= 0; i--) {
    thtml += '<a class="item-details-link" href="#'+cdex[i]+'">'+cdex[i].replace('_',' ')+'</a>';
  };
  $('#cookiedex').html(thtml);
}

/* *********************** *
 *  POKEMON DESCRIPTION
 * *********************** */
var meta = {
  dataVersion: '1.8.0',
  imgSource:   'https://richardpaulastley.github.io/'
};
function formatProperty(propertyType, propertyData, orientation, parentname) {
  var propertyType = propertyType || 'unknown';
  var orientation = orientation || 'vertical';
  var parentname = parentname || 'missingno';

  var tHtml = '';

  /* property specific formattage */

  /* Characteristics */
  if (propertyType == 'typemodstrong' && propertyData) {
    for (defpoke in TYPES[propertyData.type1]) {
      if (TYPES[propertyData.type1][defpoke] > 1) {
        tHtml += '<div class="btn-group" role="group" aria-label="poketypemod">';
        tHtml += '<button id="item-type" type="button" class="btn btn-default btn-xs disabled type'+defpoke+'">'+defpoke+'</button>';
        tHtml += '<button type="button" class="btn btn-default btn-xs disabled">x'+TYPES[propertyData.type1][defpoke]+'</button>';
        tHtml += '</div>';
      }
    }
  }
  if (propertyType == 'typemodweak' && propertyData) {
    for (defpoke in TYPES[propertyData.type1]) {
      if (TYPES[propertyData.type1][defpoke] < 1) {
        tHtml += '<div class="btn-group" role="group" aria-label="poketypemod">';
        tHtml += '<button id="item-type" type="button" class="btn btn-default btn-xs disabled type'+defpoke+'">'+defpoke+'</button>';
        tHtml += '<button type="button" class="btn btn-default btn-xs disabled">x'+TYPES[propertyData.type1][defpoke]+'</button>';
        tHtml += '</div>';
      }
    }
  }

  if (propertyType == 'stats' && propertyData) {
    var cellb = '<td>';
    var cella = '</td>';


    /* ***** *
     * HP 
     * ***** */
    tHtml += '<tr>';
    tHtml += cellb+'HP'+cella;
    tHtml += cellb+propertyData.hplv100.toLocaleString('en-US', {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
          })+cella;
    /* HP RANK */
    var hprankfirst = 0;
    var hplast = 0;
    var hpranklast = 0;
    /* Find value of the pokemon */
    for (var i = 0; i < PokemonPokedexRankingHp.length; i++) {
      if (PokemonPokedexRankingHp[i].name == propertyData.name)
        hpval = PokemonPokedexRankingHp[i].hplv100;
    };
    /* Find highest and lowest rank for the value */
    for (var i = 0; i < PokemonPokedexRankingHp.length; i++) {
      if (PokemonPokedexRankingHp[i].hplv100 == hpval) {
        if (hprankfirst == 0)
          hprankfirst = (i+1);
        hpranklast = (i+1);
      }
    };
    var colorfirstratio =  hprankfirst / PokemonPokedexRankingHp.length;
    var colorlastratio =  hpranklast / PokemonPokedexRankingHp.length;
    var colorfirst = '';
    var colorlast = '';
    if (colorfirstratio < 0.05)
      colorfirst = 'Best';
    else if (colorfirstratio < 0.25)
      colorfirst = 'Great';
    else if (colorfirstratio < 0.5) 
      colorfirst = 'Good';
    else if (colorfirstratio < 0.5) 
      colorfirst = 'Average';
    else 
      colorfirst = 'Bad';

    if (colorlastratio < 0.05)
      colorlast = 'Best';
    else if (colorlastratio < 0.25)
      colorlast = 'Great';
    else if (colorlastratio < 0.5) 
      colorlast = 'Good';
    else if (colorlastratio < 0.5) 
      colorlast = 'Average';
    else 
      colorlast = 'Bad';

    if (hprankfirst == hpranklast)
      tHtml += cellb+'<span class="rank'+colorfirst+'">'+hprankfirst+'</span> / '+PokemonPokedexRankingHp.length+cella;
    else
      tHtml += cellb+'<span class="rank'+colorfirst+'">'+hprankfirst+'</span>-<span class="rank'+colorlast+'">'+hpranklast+'</span> / '+PokemonPokedexRankingHp.length+cella;

    /* HP RANK TYPE */
    var hprankfirst = 0;
    var hplast = 0;
    var hpranklast = 0;
    /* Find value of the pokemon */
    for (var i = 0; i < PokemonPokedexRankingHpPerType[propertyData.type1].length; i++) {
      if (PokemonPokedexRankingHpPerType[propertyData.type1][i].name == propertyData.name)
        hpval = PokemonPokedexRankingHpPerType[propertyData.type1][i].hplv100;
    };
    /* Find highest and lowest rank for the value */
    for (var i = 0; i < PokemonPokedexRankingHpPerType[propertyData.type1].length; i++) {
      if (PokemonPokedexRankingHpPerType[propertyData.type1][i].hplv100 == hpval) {
        if (hprankfirst == 0)
          hprankfirst = (i+1);
        hpranklast = (i+1);
      }
    };
    var colorfirstratio =  hprankfirst / PokemonPokedexRankingHpPerType[propertyData.type1].length;
    var colorlastratio =  hpranklast / PokemonPokedexRankingHpPerType[propertyData.type1].length;
    var colorfirst = '';
    var colorlast = '';
    if (colorfirstratio < 0.05)
      colorfirst = 'Best';
    else if (colorfirstratio < 0.25)
      colorfirst = 'Great';
    else if (colorfirstratio < 0.5) 
      colorfirst = 'Good';
    else if (colorfirstratio < 0.5) 
      colorfirst = 'Average';
    else 
      colorfirst = 'Bad';

    if (colorlastratio < 0.05)
      colorlast = 'Best';
    else if (colorlastratio < 0.25)
      colorlast = 'Great';
    else if (colorlastratio < 0.5) 
      colorlast = 'Good';
    else if (colorlastratio < 0.5) 
      colorlast = 'Average';
    else 
      colorlast = 'Bad';

    if (hprankfirst == hpranklast)
      tHtml += cellb+'<span class="rank'+colorfirst+'">'+hprankfirst+'</span> / '+PokemonPokedexRankingHpPerType[propertyData.type1].length+cella;
    else
      tHtml += cellb+'<span class="rank'+colorfirst+'">'+hprankfirst+'</span>-<span class="rank'+colorlast+'">'+hpranklast+'</span> / '+PokemonPokedexRankingHpPerType[propertyData.type1].length+cella;
    tHtml += '</tr>';

    /* ***** *
     * ATK 
     * ***** */
    tHtml += '<tr>';
    tHtml += cellb+'ATK'+cella;
    tHtml += cellb+propertyData.atklv100.toLocaleString('en-US', {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
          })+cella;
    /* ATK RANK */
    var atkrankfirst = 0;
    var atklast = 0;
    var atkranklast = 0;
    /* Find value of the pokemon */
    for (var i = 0; i < PokemonPokedexRankingAtk.length; i++) {
      if (PokemonPokedexRankingAtk[i].name == propertyData.name)
        atkval = PokemonPokedexRankingAtk[i].atklv100;
    };
    /* Find highest and lowest rank for the value */
    for (var i = 0; i < PokemonPokedexRankingAtk.length; i++) {
      if (PokemonPokedexRankingAtk[i].atklv100 == atkval) {
        if (atkrankfirst == 0)
          atkrankfirst = (i+1);
        atkranklast = (i+1);
      }
    };
    var colorfirstratio =  atkrankfirst / PokemonPokedexRankingAtk.length;
    var colorlastratio =  atkranklast / PokemonPokedexRankingAtk.length;
    var colorfirst = '';
    var colorlast = '';
    if (colorfirstratio < 0.05)
      colorfirst = 'Best';
    else if (colorfirstratio < 0.25)
      colorfirst = 'Great';
    else if (colorfirstratio < 0.5) 
      colorfirst = 'Good';
    else if (colorfirstratio < 0.5) 
      colorfirst = 'Average';
    else 
      colorfirst = 'Bad';

    if (colorlastratio < 0.05)
      colorlast = 'Best';
    else if (colorlastratio < 0.25)
      colorlast = 'Great';
    else if (colorlastratio < 0.5) 
      colorlast = 'Good';
    else if (colorlastratio < 0.5) 
      colorlast = 'Average';
    else 
      colorlast = 'Bad';

    if (atkrankfirst == atkranklast)
      tHtml += cellb+'<span class="rank'+colorfirst+'">'+atkrankfirst+'</span> / '+PokemonPokedexRankingAtk.length+cella;
    else
      tHtml += cellb+'<span class="rank'+colorfirst+'">'+atkrankfirst+'</span>-<span class="rank'+colorlast+'">'+atkranklast+'</span> / '+PokemonPokedexRankingAtk.length+cella;

    /* ATK RANK TYPE */
    var atkrankfirst = 0;
    var atklast = 0;
    var atkranklast = 0;
    /* Find value of the pokemon */
    for (var i = 0; i < PokemonPokedexRankingAtkPerType[propertyData.type1].length; i++) {
      if (PokemonPokedexRankingAtkPerType[propertyData.type1][i].name == propertyData.name)
        atkval = PokemonPokedexRankingAtkPerType[propertyData.type1][i].atklv100;
    };
    /* Find highest and lowest rank for the value */
    for (var i = 0; i < PokemonPokedexRankingAtkPerType[propertyData.type1].length; i++) {
      if (PokemonPokedexRankingAtkPerType[propertyData.type1][i].atklv100 == atkval) {
        if (atkrankfirst == 0)
          atkrankfirst = (i+1);
        atkranklast = (i+1);
      }
    };
    var colorfirstratio =  atkrankfirst / PokemonPokedexRankingAtkPerType[propertyData.type1].length;
    var colorlastratio =  atkranklast / PokemonPokedexRankingAtkPerType[propertyData.type1].length;
    var colorfirst = '';
    var colorlast = '';
    if (colorfirstratio < 0.05)
      colorfirst = 'Best';
    else if (colorfirstratio < 0.25)
      colorfirst = 'Great';
    else if (colorfirstratio < 0.5) 
      colorfirst = 'Good';
    else if (colorfirstratio < 0.5) 
      colorfirst = 'Average';
    else 
      colorfirst = 'Bad';

    if (colorlastratio < 0.05)
      colorlast = 'Best';
    else if (colorlastratio < 0.25)
      colorlast = 'Great';
    else if (colorlastratio < 0.5) 
      colorlast = 'Good';
    else if (colorlastratio < 0.5) 
      colorlast = 'Average';
    else 
      colorlast = 'Bad';

    if (atkrankfirst == atkranklast)
      tHtml += cellb+'<span class="rank'+colorfirst+'">'+atkrankfirst+'</span> / '+PokemonPokedexRankingAtkPerType[propertyData.type1].length+cella;
    else
      tHtml += cellb+'<span class="rank'+colorfirst+'">'+atkrankfirst+'</span>-<span class="rank'+colorlast+'">'+atkranklast+'</span> / '+PokemonPokedexRankingAtkPerType[propertyData.type1].length+cella;
    tHtml += '</tr>';

    /* ***** *
     * DEF 
     * ***** */
    tHtml += '<tr>';
    tHtml += cellb+'DEF'+cella;
    tHtml += cellb+propertyData.deflv100.toLocaleString('en-US', {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
          })+cella;
    /* DEF RANK */
    var defrankfirst = 0;
    var deflast = 0;
    var defranklast = 0;
    /* Find value of the pokemon */
    for (var i = 0; i < PokemonPokedexRankingDef.length; i++) {
      if (PokemonPokedexRankingDef[i].name == propertyData.name)
        defval = PokemonPokedexRankingDef[i].deflv100;
    };
    /* Find highest and lowest rank for the value */
    for (var i = 0; i < PokemonPokedexRankingDef.length; i++) {
      if (PokemonPokedexRankingDef[i].deflv100 == defval) {
        if (defrankfirst == 0)
          defrankfirst = (i+1);
        defranklast = (i+1);
      }
    };
    var colorfirstratio =  defrankfirst / PokemonPokedexRankingDef.length;
    var colorlastratio =  defranklast / PokemonPokedexRankingDef.length;
    var colorfirst = '';
    var colorlast = '';
    if (colorfirstratio < 0.05)
      colorfirst = 'Best';
    else if (colorfirstratio < 0.25)
      colorfirst = 'Great';
    else if (colorfirstratio < 0.5) 
      colorfirst = 'Good';
    else if (colorfirstratio < 0.5) 
      colorfirst = 'Average';
    else 
      colorfirst = 'Bad';

    if (colorlastratio < 0.05)
      colorlast = 'Best';
    else if (colorlastratio < 0.25)
      colorlast = 'Great';
    else if (colorlastratio < 0.5) 
      colorlast = 'Good';
    else if (colorlastratio < 0.5) 
      colorlast = 'Average';
    else 
      colorlast = 'Bad';

    if (defrankfirst == defranklast)
      tHtml += cellb+'<span class="rank'+colorfirst+'">'+defrankfirst+'</span> / '+PokemonPokedexRankingDef.length+cella;
    else
      tHtml += cellb+'<span class="rank'+colorfirst+'">'+defrankfirst+'</span>-<span class="rank'+colorlast+'">'+defranklast+'</span> / '+PokemonPokedexRankingDef.length+cella;

    /* DEF RANK TYPE */
    var defrankfirst = 0;
    var deflast = 0;
    var defranklast = 0;
    /* Find value of the pokemon */
    for (var i = 0; i < PokemonPokedexRankingDefPerType[propertyData.type1].length; i++) {
      if (PokemonPokedexRankingDefPerType[propertyData.type1][i].name == propertyData.name)
        defval = PokemonPokedexRankingDefPerType[propertyData.type1][i].deflv100;
    };
    /* Find highest and lowest rank for the value */
    for (var i = 0; i < PokemonPokedexRankingDefPerType[propertyData.type1].length; i++) {
      if (PokemonPokedexRankingDefPerType[propertyData.type1][i].deflv100 == defval) {
        if (defrankfirst == 0)
          defrankfirst = (i+1);
        defranklast = (i+1);
      }
    };
    var colorfirstratio =  defrankfirst / PokemonPokedexRankingDefPerType[propertyData.type1].length;
    var colorlastratio =  defranklast / PokemonPokedexRankingDefPerType[propertyData.type1].length;
    var colorfirst = '';
    var colorlast = '';
    if (colorfirstratio < 0.05)
      colorfirst = 'Best';
    else if (colorfirstratio < 0.25)
      colorfirst = 'Great';
    else if (colorfirstratio < 0.5) 
      colorfirst = 'Good';
    else if (colorfirstratio < 0.5) 
      colorfirst = 'Average';
    else 
      colorfirst = 'Bad';

    if (colorlastratio < 0.05)
      colorlast = 'Best';
    else if (colorlastratio < 0.25)
      colorlast = 'Great';
    else if (colorlastratio < 0.5) 
      colorlast = 'Good';
    else if (colorlastratio < 0.5) 
      colorlast = 'Average';
    else 
      colorlast = 'Bad';

    if (defrankfirst == defranklast)
      tHtml += cellb+'<span class="rank'+colorfirst+'">'+defrankfirst+'</span> / '+PokemonPokedexRankingDefPerType[propertyData.type1].length+cella;
    else
      tHtml += cellb+'<span class="rank'+colorfirst+'">'+defrankfirst+'</span>-<span class="rank'+colorlast+'">'+defranklast+'</span> / '+PokemonPokedexRankingDefPerType[propertyData.type1].length+cella;
    tHtml += '</tr>';

    /* ***** *
     * SPEED 
     * ***** */
    tHtml += '<tr>';
    tHtml += cellb+'SPEED'+cella;
    tHtml += cellb+propertyData.hardcappedspeedlv100.toLocaleString('en-US', {
              minimumFractionDigits: 0,
              maximumFractionDigits: 3
          })+cella;
    /* SPEED RANK */
    var hardcappedspeedrankfirst = 0;
    var hardcappedspeedlast = 0;
    var hardcappedspeedranklast = 0;
    /* Find value of the pokemon */
    for (var i = 0; i < PokemonPokedexRankingSpeed.length; i++) {
      if (PokemonPokedexRankingSpeed[i].name == propertyData.name)
        hardcappedspeedval = PokemonPokedexRankingSpeed[i].hardcappedspeedlv100;
    };
    /* Find highest and lowest rank for the value */
    for (var i = 0; i < PokemonPokedexRankingSpeed.length; i++) {
      if (PokemonPokedexRankingSpeed[i].hardcappedspeedlv100 == hardcappedspeedval) {
        if (hardcappedspeedrankfirst == 0)
          hardcappedspeedrankfirst = (i+1);
        hardcappedspeedranklast = (i+1);
      }
    };
    var colorfirstratio =  hardcappedspeedrankfirst / PokemonPokedexRankingSpeed.length;
    var colorlastratio =  hardcappedspeedranklast / PokemonPokedexRankingSpeed.length;
    var colorfirst = '';
    var colorlast = '';
    if (colorfirstratio < 0.05)
      colorfirst = 'Best';
    else if (colorfirstratio < 0.25)
      colorfirst = 'Great';
    else if (colorfirstratio < 0.5) 
      colorfirst = 'Good';
    else if (colorfirstratio < 0.5) 
      colorfirst = 'Average';
    else 
      colorfirst = 'Bad';

    if (colorlastratio < 0.05)
      colorlast = 'Best';
    else if (colorlastratio < 0.25)
      colorlast = 'Great';
    else if (colorlastratio < 0.5) 
      colorlast = 'Good';
    else if (colorlastratio < 0.5) 
      colorlast = 'Average';
    else 
      colorlast = 'Bad';

    if (hardcappedspeedrankfirst == hardcappedspeedranklast)
      tHtml += cellb+'<span class="rank'+colorfirst+'">'+hardcappedspeedrankfirst+'</span> / '+PokemonPokedexRankingSpeed.length+cella;
    else
      tHtml += cellb+'<span class="rank'+colorfirst+'">'+hardcappedspeedrankfirst+'</span>-<span class="rank'+colorlast+'">'+hardcappedspeedranklast+'</span> / '+PokemonPokedexRankingSpeed.length+cella;

    /* SPEED RANK TYPE */
    var hardcappedspeedrankfirst = 0;
    var hardcappedspeedlast = 0;
    var hardcappedspeedranklast = 0;
    /* Find value of the pokemon */
    for (var i = 0; i < PokemonPokedexRankingSpeedPerType[propertyData.type1].length; i++) {
      if (PokemonPokedexRankingSpeedPerType[propertyData.type1][i].name == propertyData.name)
        hardcappedspeedval = PokemonPokedexRankingSpeedPerType[propertyData.type1][i].hardcappedspeedlv100;
    };
    /* Find highest and lowest rank for the value */
    for (var i = 0; i < PokemonPokedexRankingSpeedPerType[propertyData.type1].length; i++) {
      if (PokemonPokedexRankingSpeedPerType[propertyData.type1][i].hardcappedspeedlv100 == hardcappedspeedval) {
        if (hardcappedspeedrankfirst == 0)
          hardcappedspeedrankfirst = (i+1);
        hardcappedspeedranklast = (i+1);
      }
    };
    var colorfirstratio =  hardcappedspeedrankfirst / PokemonPokedexRankingSpeedPerType[propertyData.type1].length;
    var colorlastratio =  hardcappedspeedranklast / PokemonPokedexRankingSpeedPerType[propertyData.type1].length;
    var colorfirst = '';
    var colorlast = '';
    if (colorfirstratio < 0.05)
      colorfirst = 'Best';
    else if (colorfirstratio < 0.25)
      colorfirst = 'Great';
    else if (colorfirstratio < 0.5) 
      colorfirst = 'Good';
    else if (colorfirstratio < 0.5) 
      colorfirst = 'Average';
    else 
      colorfirst = 'Bad';

    if (colorlastratio < 0.05)
      colorlast = 'Best';
    else if (colorlastratio < 0.25)
      colorlast = 'Great';
    else if (colorlastratio < 0.5) 
      colorlast = 'Good';
    else if (colorlastratio < 0.5) 
      colorlast = 'Average';
    else 
      colorlast = 'Bad';

    if (hardcappedspeedrankfirst == hardcappedspeedranklast)
      tHtml += cellb+'<span class="rank'+colorfirst+'">'+hardcappedspeedrankfirst+'</span> / '+PokemonPokedexRankingSpeedPerType[propertyData.type1].length+cella;
    else
      tHtml += cellb+'<span class="rank'+colorfirst+'">'+hardcappedspeedrankfirst+'</span>-<span class="rank'+colorlast+'">'+hardcappedspeedranklast+'</span> / '+PokemonPokedexRankingSpeedPerType[propertyData.type1].length+cella;
    tHtml += '</tr>';

    /* ***** *
     * POWER 
     * ***** */
    tHtml += '<tr>';
    tHtml += cellb+'POWER'+cella;
    tHtml += cellb+propertyData.powerlv100.toLocaleString('en-US', {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
          })+cella;
    /* POWER RANK */
    var powerrankfirst = 0;
    var powerlast = 0;
    var powerranklast = 0;
    /* Find value of the pokemon */
    for (var i = 0; i < PokemonPokedexRankingPower.length; i++) {
      if (PokemonPokedexRankingPower[i].name == propertyData.name)
        powerval = PokemonPokedexRankingPower[i].powerlv100;
    };
    /* Find highest and lowest rank for the value */
    for (var i = 0; i < PokemonPokedexRankingPower.length; i++) {
      if (PokemonPokedexRankingPower[i].powerlv100 == powerval) {
        if (powerrankfirst == 0)
          powerrankfirst = (i+1);
        powerranklast = (i+1);
      }
    };
    var colorfirstratio =  powerrankfirst / PokemonPokedexRankingPower.length;
    var colorlastratio =  powerranklast / PokemonPokedexRankingPower.length;
    var colorfirst = '';
    var colorlast = '';
    if (colorfirstratio < 0.05)
      colorfirst = 'Best';
    else if (colorfirstratio < 0.25)
      colorfirst = 'Great';
    else if (colorfirstratio < 0.5) 
      colorfirst = 'Good';
    else if (colorfirstratio < 0.5) 
      colorfirst = 'Average';
    else 
      colorfirst = 'Bad';

    if (colorlastratio < 0.05)
      colorlast = 'Best';
    else if (colorlastratio < 0.25)
      colorlast = 'Great';
    else if (colorlastratio < 0.5) 
      colorlast = 'Good';
    else if (colorlastratio < 0.5) 
      colorlast = 'Average';
    else 
      colorlast = 'Bad';

    if (powerrankfirst == powerranklast)
      tHtml += cellb+'<span class="rank'+colorfirst+'">'+powerrankfirst+'</span> / '+PokemonPokedexRankingPower.length+cella;
    else
      tHtml += cellb+'<span class="rank'+colorfirst+'">'+powerrankfirst+'</span>-<span class="rank'+colorlast+'">'+powerranklast+'</span> / '+PokemonPokedexRankingPower.length+cella;

    /* POWER RANK TYPE */
    var powerrankfirst = 0;
    var powerlast = 0;
    var powerranklast = 0;
    /* Find value of the pokemon */
    for (var i = 0; i < PokemonPokedexRankingPowerPerType[propertyData.type1].length; i++) {
      if (PokemonPokedexRankingPowerPerType[propertyData.type1][i].name == propertyData.name)
        powerval = PokemonPokedexRankingPowerPerType[propertyData.type1][i].powerlv100;
    };
    /* Find highest and lowest rank for the value */
    for (var i = 0; i < PokemonPokedexRankingPowerPerType[propertyData.type1].length; i++) {
      if (PokemonPokedexRankingPowerPerType[propertyData.type1][i].powerlv100 == powerval) {
        if (powerrankfirst == 0)
          powerrankfirst = (i+1);
        powerranklast = (i+1);
      }
    };
    var colorfirstratio =  powerrankfirst / PokemonPokedexRankingPowerPerType[propertyData.type1].length;
    var colorlastratio =  powerranklast / PokemonPokedexRankingPowerPerType[propertyData.type1].length;
    var colorfirst = '';
    var colorlast = '';
    if (colorfirstratio < 0.05)
      colorfirst = 'Best';
    else if (colorfirstratio < 0.25)
      colorfirst = 'Great';
    else if (colorfirstratio < 0.5) 
      colorfirst = 'Good';
    else if (colorfirstratio < 0.5) 
      colorfirst = 'Average';
    else 
      colorfirst = 'Bad';

    if (colorlastratio < 0.05)
      colorlast = 'Best';
    else if (colorlastratio < 0.25)
      colorlast = 'Great';
    else if (colorlastratio < 0.5) 
      colorlast = 'Good';
    else if (colorlastratio < 0.5) 
      colorlast = 'Average';
    else 
      colorlast = 'Bad';

    if (powerrankfirst == powerranklast)
      tHtml += cellb+'<span class="rank'+colorfirst+'">'+powerrankfirst+'</span> / '+PokemonPokedexRankingPowerPerType[propertyData.type1].length+cella;
    else
      tHtml += cellb+'<span class="rank'+colorfirst+'">'+powerrankfirst+'</span>-<span class="rank'+colorlast+'">'+powerranklast+'</span> / '+PokemonPokedexRankingPowerPerType[propertyData.type1].length+cella;
    tHtml += '</tr>';


    /* ***** *
     * DPS 
     * ***** */
    tHtml += '<tr>';
    tHtml += cellb+'DPS'+cella;
    tHtml += cellb+propertyData.dpslv100.toLocaleString('en-US', {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
          })+cella;
    /* DPS RANK */
    var dpsrankfirst = 0;
    var dpslast = 0;
    var dpsranklast = 0;
    /* Find value of the pokemon */
    for (var i = 0; i < PokemonPokedexRankingDps.length; i++) {
      if (PokemonPokedexRankingDps[i].name == propertyData.name)
        dpsval = PokemonPokedexRankingDps[i].dpslv100;
    };
    /* Find highest and lowest rank for the value */
    for (var i = 0; i < PokemonPokedexRankingDps.length; i++) {
      if (PokemonPokedexRankingDps[i].dpslv100 == dpsval) {
        if (dpsrankfirst == 0)
          dpsrankfirst = (i+1);
        dpsranklast = (i+1);
      }
    };
    var colorfirstratio =  dpsrankfirst / PokemonPokedexRankingDps.length;
    var colorlastratio =  dpsranklast / PokemonPokedexRankingDps.length;
    var colorfirst = '';
    var colorlast = '';
    if (colorfirstratio < 0.05)
      colorfirst = 'Best';
    else if (colorfirstratio < 0.25)
      colorfirst = 'Great';
    else if (colorfirstratio < 0.5) 
      colorfirst = 'Good';
    else if (colorfirstratio < 0.5) 
      colorfirst = 'Average';
    else 
      colorfirst = 'Bad';

    if (colorlastratio < 0.05)
      colorlast = 'Best';
    else if (colorlastratio < 0.25)
      colorlast = 'Great';
    else if (colorlastratio < 0.5) 
      colorlast = 'Good';
    else if (colorlastratio < 0.5) 
      colorlast = 'Average';
    else 
      colorlast = 'Bad';

    if (dpsrankfirst == dpsranklast)
      tHtml += cellb+'<span class="rank'+colorfirst+'">'+dpsrankfirst+'</span> / '+PokemonPokedexRankingDps.length+cella;
    else
      tHtml += cellb+'<span class="rank'+colorfirst+'">'+dpsrankfirst+'</span>-<span class="rank'+colorlast+'">'+dpsranklast+'</span> / '+PokemonPokedexRankingDps.length+cella;

    /* DPS RANK TYPE */
    var dpsrankfirst = 0;
    var dpslast = 0;
    var dpsranklast = 0;
    /* Find value of the pokemon */
    for (var i = 0; i < PokemonPokedexRankingDpsPerType[propertyData.type1].length; i++) {
      if (PokemonPokedexRankingDpsPerType[propertyData.type1][i].name == propertyData.name)
        dpsval = PokemonPokedexRankingDpsPerType[propertyData.type1][i].dpslv100;
    };
    /* Find highest and lowest rank for the value */
    for (var i = 0; i < PokemonPokedexRankingDpsPerType[propertyData.type1].length; i++) {
      if (PokemonPokedexRankingDpsPerType[propertyData.type1][i].dpslv100 == dpsval) {
        if (dpsrankfirst == 0)
          dpsrankfirst = (i+1);
        dpsranklast = (i+1);
      }
    };
    var colorfirstratio =  dpsrankfirst / PokemonPokedexRankingDpsPerType[propertyData.type1].length;
    var colorlastratio =  dpsranklast / PokemonPokedexRankingDpsPerType[propertyData.type1].length;
    var colorfirst = '';
    var colorlast = '';
    if (colorfirstratio < 0.05)
      colorfirst = 'Best';
    else if (colorfirstratio < 0.25)
      colorfirst = 'Great';
    else if (colorfirstratio < 0.5) 
      colorfirst = 'Good';
    else if (colorfirstratio < 0.5) 
      colorfirst = 'Average';
    else 
      colorfirst = 'Bad';

    if (colorlastratio < 0.05)
      colorlast = 'Best';
    else if (colorlastratio < 0.25)
      colorlast = 'Great';
    else if (colorlastratio < 0.5) 
      colorlast = 'Good';
    else if (colorlastratio < 0.5) 
      colorlast = 'Average';
    else 
      colorlast = 'Bad';

    if (dpsrankfirst == dpsranklast)
      tHtml += cellb+'<span class="rank'+colorfirst+'">'+dpsrankfirst+'</span> / '+PokemonPokedexRankingDpsPerType[propertyData.type1].length+cella;
    else
      tHtml += cellb+'<span class="rank'+colorfirst+'">'+dpsrankfirst+'</span>-<span class="rank'+colorlast+'">'+dpsranklast+'</span> / '+PokemonPokedexRankingDpsPerType[propertyData.type1].length+cella;
    tHtml += '</tr>';
  }

  if (propertyType == 'forms' && propertyData) {
    for (poke in propertyData) {
      var cellb = '<td>';
      var cella = '</td>';
      if (parentname == propertyData[poke].name) {
        cellb = '<td><strong>';
        var cella = '</strong></td>';
      }

      tHtml += '<tr>';
      tHtml += cellb+propertyData[poke].id+cella;
      if (parentname != propertyData[poke].name)
        tHtml += cellb+'<a class="item-details-link" href="#'+propertyData[poke].className+'">'+propertyData[poke].name+'</a>'+cella;
      else
        tHtml += cellb+propertyData[poke].name+cella;
      tHtml += cellb+'<span class="typebadge type'+propertyData[poke].type1+'">'+propertyData[poke].type1+'</span>'+cella;
      if (propertyData[poke].hasOwnProperty('routes'))
        tHtml += cellb+(propertyData[poke].catch/3).toLocaleString('en-US', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2
            })+'%'+cella;
      else
        tHtml += cellb+'Not catchable'+cella;
      if (propertyData[poke].evolution)
        tHtml += cellb+propertyData[poke].evolution+' ('+propertyData[poke].evollevel+')'+cella;
      else
        tHtml += cellb+cella;
      tHtml += '</tr>';
    }
  }

  if (propertyType == 'routes' && propertyData) {
    var cellb = '<td>';
    var cellbnum = '<td class="num">';

    var cella = '</td>';
    if (propertyData.hasOwnProperty('routes')) {
      for (region in propertyData.routes) {
        for (var i = 0; i < propertyData.routes[region].length; i++) {
          tHtml += '<tr>';
          tHtml += cellb+'<a class="pokemonregion" href="#" data-pokemon="'+propertyData.name+'" data-region="'+region+'">'+region+'</a>'+cella;
          tHtml += cellb+'<a class="pokemonroute" href="#"  data-region="'+region+'" data-route="'+propertyData.routes[region][i].routename+'">'+propertyData.routes[region][i].routename+'</a>'+cella;
          tHtml += cellbnum+propertyData.routes[region][i].lvmin+' - '+propertyData.routes[region][i].lvmax+cella;
          tHtml += '</tr>';
        };
      }
    } else {
      tHtml += '<tr><td colspan="4">'+propertyData.name+' can\'t be captured. See other forms</td></tr>';
    }
    
  }


  /* End of the property */
  if (tHtml.length == 0)
    return tHtml;
  /*if (orientation == 'vertical')
    tHtml = '<dl class="item-property">' + tHtml;
  else
    tHtml = '<dl class="dl-horizontal item-property">' + tHtml;
  tHtml += '</dl>';*/
  return tHtml;
}
function printDescription(className) {
  var className = className || 'unknown';
  for (var i = PokemonPokedex.length - 1; i >= 0; i--) {
    if (className == PokemonPokedex[i].className) {
      console.log('found item', PokemonPokedex[i]);
      var descData = PokemonPokedex[i];
      var imgfsrc = descData.imgf.includes('http') ? descData.imgf : (meta.imgSource + descData.imgf);
      var imgbsrc = descData.imgb.includes('http') ? descData.imgb : (meta.imgSource + descData.imgb);
      var simgfsrc = descData.simgf.includes('http') ? descData.simgf : (meta.imgSource + descData.simgf);
      var simgbsrc = descData.simgb.includes('http') ? descData.simgb : (meta.imgSource + descData.simgb);
      $('#item-image').attr('src', imgfsrc);
      $('#item-image2').attr('src', imgbsrc);
      $('#item-simage').attr('src', simgfsrc);
      $('#item-simage2').attr('src', simgbsrc);


      $('#item-number').html('#'+descData.id);

      var thisName = descData.name + ' <small>';
      if (descData.requiPremium == true)
        thisName += '<span class="premium">Premium</span> ';
      $('#item-name').html(thisName);

      $('#item-type').removeClass();
      $('#item-type').addClass('btn btn-default disabled type'+descData.type1);
      $('#item-type').html(descData.type1);

      /* Pokemon Type Modifier */
      $('#item-typemod').html(descData.type1);
      $('#item-typemod-strong').html(formatProperty('typemodstrong', descData));
      $('#item-typemod-weak').html(formatProperty('typemodweak', descData));

      /* Pokemon Stats */

      $('#item-stat-typerank').html('<span class="typebadge type'+descData.type1+'">'+descData.type1+'</span> Rank');
      $('#item-stats').html(formatProperty('stats', descData));

      /* Poke Type bonuses */

      /* Pokemon Forms */
      if (descData.evolution || descData.evolfrom) {
        var thisFamily = {};
        for (fam in PokemonFamily) {
          if (PokemonFamily[fam].hasOwnProperty(descData.name)) {
            thisFamily = PokemonFamily[fam];
          }
        }
        $('#item-forms').html(formatProperty('forms', thisFamily, 'h', descData.name));
      } else {
        $('#item-forms').html('<tr><td colspan="5">'+descData.name+' doesn\'t have any other form</td></tr>');
      }

      /* Pokemon Routes */
      $('#item-routes').html(formatProperty('routes', descData, 'h'));

      /* Characteristics */
      $('#item-requirements-buildlimit .item-properties').html(formatProperty('buildLimit', descData.buildLimit));


      $('#item-requirements-buildlimit .item-properties').html(formatProperty('buildLimit', descData.buildLimit));

      $('#item-requirements-workerneeded .item-properties').html(formatProperty('requiresWorkers', descData.requiresWorkers));

      $('#item-requirements-storage .item-properties').html(formatProperty('storesObj', descData.storesObj, 'h'));
    }
  };
}

/* Open Item Description */
function openItemDesc(className) { 
  var className = className || null;
  $('.item-properties').html('');

  printDescription(className);
  if ($("#item-description").is(":visible")) {
    $('html, body').animate({
      scrollTop: $("#item-description").offset().top -20
    }, 600);
  } else {
    $( "#item-description" ).show( "slow" );
  }

  setCookiedex(className);
  /* Update Cookiedex */
  displayCookiedex();
};
$(document).on('click', 'a.item-details-link', function(){
  var className = $(this).attr('href').substring(1);
  openItemDesc(className);
});
/* Close Item Description */
$(document).on('click', 'a.item-details-close', function() { 
  $( "#item-description" ).hide( "slow" );
});
$(document).keyup(function(e) {
  if (e.keyCode == 27) { // escape key maps to keycode `27`
    $( "#item-description" ).hide( "slow" );
  }
});


formatPokemonFamily();