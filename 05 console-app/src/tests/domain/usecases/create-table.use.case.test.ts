import { CreateTable, CreateTableUseCase } from "../../../domain/use-cases/create-table.use.case"

describe(
    "CreateTableUseCase",
    () => {
        test("Should create table with default values", () => {
            const createTable = new CreateTable()

            const table = createTable.execute({ base: 2, limit: 10 })

            const rows = table.split("\n")

            expect(createTable).toBeInstanceOf(CreateTable)
            expect(table).toContain(" 2 x 1 = 2")
            expect(table).toContain(" 2 x 10 = 20")
            expect(rows.length).toBe(14)
        })

        test('Should create table with custom values', () => {
            const options = {
                base: 3,
                limit: 10
            }

            const table = new CreateTable().execute(options)

            let baseCounter = 0
            const tableArray = table.split("\n");

            tableArray.forEach((element) => {
                if (element.includes(String(element))) {
                    baseCounter++
                }
            })

            expect(baseCounter)
                .toBe(14)
        })
    }
)