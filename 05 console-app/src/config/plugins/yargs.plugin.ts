import yargs, { alias, demandOption, number } from "yargs";
import {hideBin} from 'yargs/helpers'

export const yarg = yargs(process.argv.slice(2))
.usage("App to multiplicate a number")
.help('help').alias('help', 'h')
.version('version', '1.0.1').alias('version', 'V')
.options(
    {
        base:{
            type: 'number',
            alias: 'b',
            demandOption: true,
        },
        limit:{
            type: 'number',
            alias: 'l',
            default: 10
        },
        show:{
            type: 'boolean',
            alias: 's',
            default: false
        },
        name:{
            type: 'string',
            alias: 'n',
            default: 'table'
        },
        destination: {
            type: 'string',
            alias: 'd',
            default: 'files'
        }
    }
    
)
.check((argv, options)=>{
    if(argv.base<0){
        throw "Base must be greater than cero"
    }
    if(argv.limit<0){
        throw "Base must be greater than cero"
    }
    return options
})
.parseSync()