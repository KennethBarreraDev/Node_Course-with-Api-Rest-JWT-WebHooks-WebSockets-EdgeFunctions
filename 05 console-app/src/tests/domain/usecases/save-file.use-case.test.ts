import { SaveFile, SaveFileUseCase } from "../../../domain/use-cases/save-file.use-case"
import fs from 'fs'

describe(

    'SaveFileUseCase', () => {


            test("Sould sabe file with default values", () => {
                const saveFile = new SaveFile()

                const options = {
                    fileContent: 'test content'
                }
                const result = saveFile.execute(options)

                const file = fs.existsSync('./files/table.txt')
                const fileContent = fs.readFileSync("./files/table.txt", { encoding: 'utf8' })
                expect(result).toBe(true)
                expect(file).toBeTruthy()
                expect(fileContent).toBe(options.fileContent)
            }),
            test('Should save file with custom values', ()=>{
                const options = {
                    fileContent: 'Custom content',
                    destination: 'custom-options',
                    fileName: 'test'
                }

                const saveFile = new SaveFile()
                const file = saveFile.execute(options)
                const fileExists = fs.existsSync(`./${options.destination}/${options.fileName}.txt`)
                const fileContent = fs.readFileSync(`./${options.destination}/${options.fileName}.txt`)
                
                expect(file).toBeTruthy()
                expect(fileExists).toBeTruthy()
                expect(fileContent).toBe(fileContent)
            })

            test('Should retun false if directory could not be created', ()=>{

                const options = {
                    fileContent: 'test content'
                }
                const saveFile = new SaveFile()
                const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(()=>{
                    throw new Error('error')
                })
                const result = saveFile.execute(options)
                expect(result).toBeFalsy() 
                mkdirSpy.mockRestore();
            })
    }
)