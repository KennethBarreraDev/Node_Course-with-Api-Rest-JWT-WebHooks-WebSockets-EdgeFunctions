import { generateId } from '../../src/adapters/uuid.adapter'

describe(
    "adapters/uuid.adapters",
    () => {
        test("generateId should return an UUID", () => {
            const uuid = generateId()
            expect(typeof uuid).toBe('string')
            expect(uuid.length).toBe(36)
        })
    }
)
