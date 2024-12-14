export interface CreateTableUseCase {
    execute: (options: CreateTableOptions) => string
}
export interface CreateTableOptions {
    base: number,
    limit: number
}


export class CreateTable implements CreateTableUseCase {
    constructor() {

    }

    execute({ base, limit }: CreateTableOptions) {


        const header = "================================================="

        let content = `${header}\n`;
        content = `${content} Tabla del ${base}\n`

        content = `${content} ${header}\n`;


        for (let index = 1; index <= limit; index++) {
            content = `${content} ${base} x ${index} = ${base * index}\n`
        }
        return content;
    }
}