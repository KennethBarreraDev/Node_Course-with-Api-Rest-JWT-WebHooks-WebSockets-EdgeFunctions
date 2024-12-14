import { CreateTable } from "../domain/use-cases/create-table.use.case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";

interface RunOptions{
    base: number,
    limit: number,
    show: boolean,
    fileName?: string,
    destination?: string
}

export class ServerApp{
    static run({base, limit, fileName, destination, show}: RunOptions){
        console.log('Server running...');
        const table = new CreateTable().execute({base: base, limit: limit});
        const wasCreated = new SaveFile().execute({fileContent: table, fileName: fileName, destination: destination})
        wasCreated ?
        console.log('File has been created'):
        console.log('An error has occurred while saving file');

    }
}