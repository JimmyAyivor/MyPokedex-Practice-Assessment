const {
    filterByType,
    getPokemonNamesMostEffectiveAgainstType,
} = require("../src/03_surrender_now");
const pokemon = require("../data/poke");
const shuffledPokemon = require("../data/poke_remix");
const weaknesses = require("../data/weaknesses");
describe("filterByType()", () => {
    test("should default to a type of 'Normal' if no type is passed in", () => {
        const actual = filterByType(pokemon);
        const expected = [
            pokemon[11], // Pidgey
            pokemon[12], // Pidgeotto
            pokemon[13], // Pidgeot
            pokemon[14], // Spearow
            pokemon[15], // Fearow
            pokemon[25], // Jigglypuff
            pokemon[26], // Wigglytuff
            pokemon[33], // Meowth
            pokemon[34], // Persian
            pokemon[74], // Chansey
            pokemon[85], // Tauros
            pokemon[89], // Ditto
            pokemon[90], // Porygon
            pokemon[91], // Snorlax
        ];
        expect(actual).toEqual(expected);
    });
    test("should return the names of pokemon with matching type", () => {
        const type = "Grass";
        const actual = filterByType(pokemon, type);
        const expected = [
            pokemon[0], // Bulbasaur 
            pokemon[1], // Ivysaur
            pokemon[2], // Venusaur
            pokemon[27], // Paras
            pokemon[28], // Parasect
            pokemon[47], // Bellsprout
            pokemon[48], // Weepinbell 
            pokemon[49], // Victreebel
            pokemon[66], // Exeggcute
            pokemon[67], // Exeggutor
            pokemon[75] // Tangela
        ];
        expect(actual).toEqual(expected);
    });
    test("should dynamically change depending on the type inputted", () => {
        const type = "Ghost";
        const actual = filterByType(pokemon, type);
        const expected = [
            pokemon[57], // Haunter
            pokemon[58] // Gengar
        ];
        expect(actual).toEqual(expected);
    });
    test("should dynamically change depending on the pokemon inputted", () => {
        const type = "Fighting";
        const actual = filterByType(shuffledPokemon, type);
        const expected = [
            shuffledPokemon[1], // Primeape
            shuffledPokemon[9], // Mankey
        ];
        expect(actual).toEqual(expected);
    });
    test("should be case-insensitive", () => {
        const type = "GRASS";
        const actual = filterByType(pokemon, type);
        const expected = [
            pokemon[0], // Bulbasaur 
            pokemon[1], // Ivysaur
            pokemon[2], // Venusaur
            pokemon[27], // Paras
            pokemon[28], // Parasect
            pokemon[47], // Bellsprout
            pokemon[48], // Weepinbell 
            pokemon[49], // Victreebel
            pokemon[66], // Exeggcute
            pokemon[67], // Exeggutor
            pokemon[75] // Tangela
        ];
        expect(actual).toEqual(expected);
    });
    test("should return an empty array if there are no pokemon of that type", () => {
        const type = "Shadow";
        const actual = filterByType(pokemon, type);
        const expected = [];
        expect(actual).toEqual(expected);
    });
    test("should return an empty array if there are no Pokemon", () => {
        const type1 = "Grass";
        const actual1 = filterByType([], type1);
        const type2 = "Fire";
        const actual2 = filterByType([], type2);
        const expected = [];
        expect(actual1).toEqual(expected);
        expect(actual2).toEqual(expected);
    });
});
describe("getPokemonNamesMostEffectiveAgainstType()", () => {
    test("should return the names of pokemon that are weak to the given type", () => {
        const type = "Water";
        const actual = getPokemonNamesMostEffectiveAgainstType(pokemon, weaknesses, type);
        const expected = [
            "Pikachu",
            "Raichu",
            "Voltorb",
            "Electrode",
            "Zapdos",
            "Bulbasaur",
            "Ivysaur",
            "Venusaur",
            "Paras",
            "Parasect",
            "Bellsprout",
            "Weepinbell",
            "Victreebel",
            "Exeggcute",
            "Exeggutor",
            "Tangela",
        ];
        expect(actual).toEqual(expect.arrayWithExactContents(expected));
    });
    test("should dynamically change depending on the type inputted", () => {
        const type = "Fairy";
        const actual = getPokemonNamesMostEffectiveAgainstType(pokemon, weaknesses, type);
        const expected = [
            'Sandshrew', 
            'Diglett',
            'Dugtrio', 
            'Bulbasaur',
            'Ivysaur', 
            'Venusaur',
            'Weedle', 
            'Arbok',
            'Venonat', 
            'Venomoth',
            'Bellsprout', 
            'Weepinbell',
            'Victreebel', 
            'Gastly',
            'Haunter', 
            'Koffing',
            'Weezing'
        ];
        expect(actual).toEqual(expect.arrayWithExactContents(expected));
    });
    test("should dynamically change depending on the pokemon inputted", () => {
        const type = "Water";
        const actual = getPokemonNamesMostEffectiveAgainstType(shuffledPokemon, weaknesses, type);
        const expected = ["Exeggcute"];
        expect(actual).toEqual(expect.arrayWithExactContents(expected));
    });
    test("should not contain duplicates", () => {
        const type = "Rock";
        const actual = getPokemonNamesMostEffectiveAgainstType(pokemon, weaknesses, type);
        const expected = [
            'Mankey', 'Primeape', 'Poliwrath', 'Hitmonlee',
            'Hitmonchan', 'Bulbasaur', 'Ivysaur', 'Venusaur',
            'Paras', 'Parasect', 'Bellsprout', 'Weepinbell',
            'Victreebel', 'Exeggcute', 'Exeggutor', 'Tangela',
            'Sandshrew', 'Sandslash', 'Diglett', 'Dugtrio',
            'Geodude', 'Graveler', 'Golem', 'Onix',
            'Cubone', 'Marowak', 'Squirtle', 'Wartortle',
            'Blastoise', 'Psyduck', 'Golduck', 'Poliwag',
            'Poliwhirl', 'Slowpoke', 'Slowbro', 'Shellder',
            'Cloyster', 'Krabby', 'Kingler', 'Horsea',
            'Goldeen', 'Seaking', 'Staryu', 'Starmie',
            'Magikarp', 'Gyarados', 'Lapras'
        ];
        expect(actual).toEqual(expect.arrayWithExactContents(expected));
    });
    test("should return an error message if type is not valid", () => {
        const type = "Hot Sauce";
        const actual = getPokemonNamesMostEffectiveAgainstType(pokemon, weaknesses, type);
        const expected = `No Pokemon found of type: '${type}'.`;
        expect(actual).toEqual(expected);
    });
    test("should return an empty array if there are no Pokemon", () => {
        const type1 = "Grass";
        const actual1 = getPokemonNamesMostEffectiveAgainstType([], weaknesses, type1);
        const type2 = "Fire";
        const actual2 = getPokemonNamesMostEffectiveAgainstType([], weaknesses, type2);
        const expected = [];
        expect(actual1).toEqual(expected);
        expect(actual2).toEqual(expected);
    });
});

