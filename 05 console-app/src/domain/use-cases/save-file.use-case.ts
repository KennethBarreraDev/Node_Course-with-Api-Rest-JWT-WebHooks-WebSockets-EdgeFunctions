import { mkdirSync, writeFileSync } from "fs";

export interface SaveFileOptions {
    fileContent: string;
    destination?: string;
    fileName?: string
}

export interface SaveFileUseCase {
    execute: (options: SaveFileOptions) => boolean
}

export class SaveFile implements SaveFileUseCase {
    constructor() {

    }

    execute({ fileContent, destination = 'files', fileName = 'table' }: SaveFileOptions): boolean {
        try {
            mkdirSync(`./${destination}`, { recursive: true })
            writeFileSync(`./${destination}/${fileName}.txt`, fileContent)
            return true
        } catch (error) {
            return false
        }
    }
}