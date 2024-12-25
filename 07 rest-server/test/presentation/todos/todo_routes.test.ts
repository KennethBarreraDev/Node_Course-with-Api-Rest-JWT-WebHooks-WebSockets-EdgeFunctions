const request = require('supertest');
import { Server } from '../../../src/presentation/server'
import { AppRoutes } from '../../../src/presentation/routes'
import { TodoEntity } from '../../../src/domain/entities/todo.entity';
import { prisma } from '../../../src/data/postgres';


describe("todo_routes.test.ts", () => {
    const testServer = new Server(
        {
            port: 3001,
            router: AppRoutes.routes
        }
    );

    beforeAll(async () => {
        await testServer.start()
        await prisma.todo.deleteMany(
            {
                where: {
                    id: {
                        not: 6
                    }
                }
            }
        )
    })
    afterAll(() => {
        testServer.close()
    })



    test("Should create todo", async () => {
        const text = "Visit mom 333";
        const response = await request(testServer.app)
            .post('/api/todos/create')
            .send({ "name": text })
            .expect(201)

        expect(response.body).toEqual(expect.objectContaining({
            data: expect.objectContaining({
                id: expect.any(Number),
                text: text,
            }),
        }))
    })


    test("Should update todo", async () => {
        const text = "Visit mom 444";
        const response = await request(testServer.app)
            .put('/api/todos/update/6')
            .send({ "name": text })
            .expect(200)

        expect(response.body).toEqual(expect.objectContaining({
            text: expect.any(String),
        }))
    })

    test("Should get todo", async () => {
        const response = await request(testServer.app)
            .get('/api/todos/6')
            .expect(200)

        expect(response.body).toEqual(expect.objectContaining({
            id: 6,
            text: expect.any(String),
        }))
    })

    test("Should return todos", async () => {
        const response = await request(testServer.app)
            .get('/api/todos')
            .expect(200)
        console.log(response.body);
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    text: expect.any(String),
                }),
            ])
        );

    })

    test("Should delete todo", async () => {
        await prisma.todo.create({
            data: {
                id: 999,
                name: 'probe'
            }
        })

        const response = await request(testServer.app)
            .delete('/api/todos/delete/999')
            .expect(200)
        console.log(response.body);

        expect(response.body).toEqual(expect.objectContaining({
            id: 999,
            text: expect.any(String),
        }))
    })
})