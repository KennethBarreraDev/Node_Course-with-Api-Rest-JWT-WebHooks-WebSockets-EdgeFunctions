import { getAge } from '../../src/adapters/get-age.dapater'

describe('adapters/get-age', () => {
    test('getAge should return the age of a person', () => {
        const birthdate = '2000-08-09'
        const age = getAge(birthdate)
        expect(typeof age).toBe('number')
    })

    test("getAge should return zero years", () => {
         const spy = jest.spyOn(Date.prototype, 'getFullYear').mockReturnValue(2000)
         const birthDate = '2000-08-09'
         const age = getAge(birthDate)
         console.log(age);
         expect(age).toBe(0)
         
    })
}
)