const {
    countByType,
    findByNumber
} = require("../src/02_make_it_double");

const pokemon = require("../data/poke");
const shuffledPokemon = require("../data/poke_remix");

describe("countByType()", () => {
    test("should return an object where the keys are types and the values are the number of Pokemon with that type", () => {
        const actual = countByType(pokemon);
        const expected = {
            Grass: 11,
            Poison: 14,
            Fire: 8,
            Flying: 12,
            Water: 22,
            Bug: 8,
            Normal: 14,
            Electric: 5,
            Ground: 10,
            Steel: 3,
            Fairy: 5,
            Fighting: 5,
            Psychic: 13,
            Rock: 4,
            Ice: 4,
            Ghost: 2,
            Dragon: 3
        };
        expect(actual).toEqual(expected);
    });
    test("should dynamically change depending on the pokemon inputted", () => {
        const actual = countByType(shuffledPokemon);
        const expected = {
            Grass: 1,
            Psychic: 1,
            Fighting: 2,
            Water: 2,
            Normal: 4,
            Bug: 1,
            Fire: 1,
            Flying: 2
        };
        expect(actual).toEqual(expected);
    });
    test("should return an empty object if there are no pokemon", () => {
        const actual = countByType([]);
        const expected = {};
        expect(actual).toEqual(expected);
    });
});

describe("findByNumber()", () => {
    test("should return the entire Pokemon based on the national number", () => {
        const number = "106";
        const actual = findByNumber(pokemon, number);
        expect(actual.national_number).toEqual("106");
        expect(actual.name).toEqual("Hitmonlee");
        expect(actual.sprites.animated).toEqual(
            "https://img.pokemondb.net/sprites/black-white/anim/normal/hitmonlee.gif"
        );
    });
    test("should dynamically change depending on the national number inputted", () => {
        const number = "052";
        const actual = findByNumber(pokemon, number);
        expect(actual.national_number).toEqual("052");
        expect(actual.name).toEqual("Meowth");
        expect(actual.sprites.animated).toEqual(
            "https://img.pokemondb.net/sprites/black-white/anim/normal/meowth.gif"
        );
    });
    test("should dynamically change depending on the pokemon inputted", () => {
        const number = "151";
        const expandedPokemon = [...shuffledPokemon, {
            "national_number": "151",
            "evolution": null,
            "sprites": {
                "normal": "https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/mew.png",
                "large": "https://img.pokemondb.net/artwork/mew.jpg",
                "animated": "https://img.pokemondb.net/sprites/black-white/anim/normal/mew.gif"
            },
            "name": "Mew",
            "type": [
                "Psychic"
            ],
            stats: [
                { category: "total", value: 600, },
                { category: "hp", value: 100 },
                { category: "attack", value: 100 },
                { categotry: "defense", value: 100 },
                { category: "sp_atk", value: 100 },
                { category: "sp_def", value: 100 },
                { category: "speed", value: 100 }
            ]
        }]
        const actual = findByNumber(expandedPokemon, number);
        expect(actual.national_number).toEqual("151");
        expect(actual.name).toEqual("Mew");
        expect(actual.sprites.animated).toEqual(
            "https://img.pokemondb.net/sprites/black-white/anim/normal/mew.gif"
        );
    });
    test("should return `null` if the pokemon cannot be found", () => {
        const number = "576";
        const actual = findByNumber(pokemon, number);
        const expected = null;
        expect(actual).toEqual(expected);
    });
    test("should return `null` if there are no pokemon", () => {
        const number = "122";
        const actual = findByNumber([], number);
        const expected = null;
        expect(actual).toEqual(expected);
    });
});