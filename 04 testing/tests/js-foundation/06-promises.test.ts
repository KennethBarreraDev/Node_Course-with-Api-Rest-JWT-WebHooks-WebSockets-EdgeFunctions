import { getPokemonById } from '../../src/js-foundation/06-promises'


describe('js-foundation/06-promises', ()=>{
    test('Should return a pokemon', async()=>{
        const pokemonId = 1
        const pokemon = await getPokemonById(pokemonId)
        console.log('Pokemon is ');
        console.log(pokemon);
        
        
        expect(pokemon).toBe('bulbasaur')
    })

    test('Should return an error if pokemon does not exist', async()=>{
        const pokemonId = 10000000
        const pokemon = await getPokemonById(pokemonId)
        console.log('Pokemon is ');
        console.log(pokemon);
        expect(pokemon).toBe('Pokemon not found')
    })
})