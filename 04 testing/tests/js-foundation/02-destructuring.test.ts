import { characters } from '../../src/js-foundation/02-destructuring'

describe('js-foundation/02-destructuring.ts', ()=>{
    test('Characters should contains Flash, Superman', ()=>{
        expect(characters).toContainEqual('Flash')
        expect(characters).toContainEqual('Superman')
    })

    test('First character should be Flash and second Superman', ()=>{
        const [flash, superman] = characters
        expect(flash).toBe('Flash')
        expect(superman).toBe('Superman')
    })
})