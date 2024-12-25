import {AppRoutes} from '../../src/presentation/routes'


describe("routes.test.ts", ()=>{
    test("Should return an app route instance", ()=>{
        const appRoutes = new AppRoutes()
        expect(appRoutes).toBeInstanceOf(AppRoutes)    
    })
})