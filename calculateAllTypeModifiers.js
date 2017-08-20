/* ***************************** * 
 * Exec this once
 * AND De-comment the "Format double types" function calls in script.js
 * AND type this in console to get the json :
 * 		copy(JSON.stringify(SimpleDoubleTypeModifiersByModDealt))
 * 		copy(JSON.stringify(SimpleDoubleTypeModifiersByModTaken))
 * ***************************** */
const calculateDamageMultiplier = (attackingTypes, defendingTypes) => {
  const typeEffectiveness = (attackingType, defendingTypes) => {
    //console.log(attackingType);
    return TYPES[attackingType][defendingTypes[0]] * (defendingTypes[1] && TYPES[attackingType][defendingTypes[1]] || 1)
  }
  return Math.max(
    typeEffectiveness(attackingTypes[0], defendingTypes),
    attackingTypes[1] && typeEffectiveness(attackingTypes[1], defendingTypes) || 0
   )
}

var listOfComboTypes = [];
var SimpleDoubleTypeModifiers = {};
var SimpleDoubleTypeModifiersByModDealt = {};
var SimpleDoubleTypeModifiersByModTaken = {};

/* get all types possible from pokemons, so I don't have to calculate for all (256*256=65k) */
var formatListOfComboTypes = function() {
  for (Pokename in Pokemons) {
    if (Pokemons[Pokename].type2.length > 0) {
      if (listOfComboTypes.indexOf(Pokemons[Pokename].type1 + "-" + Pokemons[Pokename].type2) == -1 
        && listOfComboTypes.indexOf(Pokemons[Pokename].type2 + "-" + Pokemons[Pokename].type1) == -1) {
        //console.log("ADD NEW COMBO TYPE : " + Pokemons[Pokename].type1 + "-" + Pokemons[Pokename].type2);
        listOfComboTypes.push(Pokemons[Pokename].type1 + "-" + Pokemons[Pokename].type2);
      }
    } else {
      if (listOfComboTypes.indexOf(Pokemons[Pokename].type1) == -1) {
        //console.log("ADD NEW SIMPLE TYPE : " + Pokemons[Pokename].type1);
        listOfComboTypes.push(Pokemons[Pokename].type1);
      }
    }
  }
};
formatListOfComboTypes();

var formatSimpleDoubleTypeModifiers = function(callback) {
  for (var iatk = 0; iatk < listOfComboTypes.length; iatk++) {
    SimpleDoubleTypeModifiers[listOfComboTypes[iatk]] = {};
    var atkTypes = listOfComboTypes[iatk].split("-");
    for (var idef = 0; idef < listOfComboTypes.length; idef++) {
      var defTypes = listOfComboTypes[idef].split("-");
      //console.log(atkTypes, defTypes);
      SimpleDoubleTypeModifiers[listOfComboTypes[iatk]][listOfComboTypes[idef]] = calculateDamageMultiplier(atkTypes,defTypes);
    };
  };
  callback();
};

var formatSimpleDoubleTypeModifiersByModDealt = function() {
  for (atkmod in SimpleDoubleTypeModifiers) {

    /* Create object for this Attacker type */
    SimpleDoubleTypeModifiersByModDealt[atkmod] = {};

    var allPossibleValues = [];
    for (defmod in SimpleDoubleTypeModifiers[atkmod]) {
    	/* Don't need modifiers for x1, it's useless */
      if (SimpleDoubleTypeModifiers[atkmod][defmod] != 1 && allPossibleValues.indexOf(SimpleDoubleTypeModifiers[atkmod][defmod]) == -1) {
        allPossibleValues.push(SimpleDoubleTypeModifiers[atkmod][defmod]);
      }
    };

    /* Sort descending */
    var orderedPossibleValues = allPossibleValues.sort(function(a,b) { return b - a;});
    for (var i = 0; i < orderedPossibleValues.length; i++) {
      /* Create array to store all Modifiers with the same value */
      SimpleDoubleTypeModifiersByModDealt[atkmod]["x"+orderedPossibleValues[i].toString()] = [];

      for (defmod in SimpleDoubleTypeModifiers[atkmod]) {
      	/* Don't have modifiers for x1, it's useless */
        if (orderedPossibleValues[i] != 1 && SimpleDoubleTypeModifiers[atkmod][defmod] == orderedPossibleValues[i]) {
          SimpleDoubleTypeModifiersByModDealt[atkmod]["x"+orderedPossibleValues[i].toString()].push(defmod);
        }
      };
    };
  };
};

var formatSimpleDoubleTypeModifiersByModTaken = function() {
	for (var i = 0; i < listOfComboTypes.length; i++) {
		var thisDef = listOfComboTypes[i];
		/* Create object for this Defenser type */
		SimpleDoubleTypeModifiersByModTaken[thisDef] = {};

		var allPossibleValues = [];
		for (atkmod in SimpleDoubleTypeModifiers) {
			/* Don't need modifiers for x1, it's useless */
	    if (SimpleDoubleTypeModifiers[atkmod][thisDef] != 1 && allPossibleValues.indexOf(SimpleDoubleTypeModifiers[atkmod][thisDef]) == -1) {
	      allPossibleValues.push(SimpleDoubleTypeModifiers[atkmod][thisDef]);
	    }
		};

		/* Sort descending */
		var orderedPossibleValues = allPossibleValues.sort(function(a,b) { return a - b;});
		for (var u = 0; u < orderedPossibleValues.length; u++) {
		  /* Create array to store all Modifiers with the same value */
		  SimpleDoubleTypeModifiersByModTaken[thisDef]["x"+orderedPossibleValues[u].toString()] = [];

		  for (atkmod in SimpleDoubleTypeModifiers) {
		  	/* Don't have modifiers for x1, it's useless */
		    if (orderedPossibleValues[u] != 1 && SimpleDoubleTypeModifiers[atkmod][thisDef] == orderedPossibleValues[u]) {
		      SimpleDoubleTypeModifiersByModTaken[thisDef]["x"+orderedPossibleValues[u].toString()].push(atkmod);
		    }
		  };
		};
	};
};
