import { ServerApp } from "./presentation/server-app";
import { yarg } from "./config/plugins/yargs.plugin";



(async ()=>{
    main()
})()

async function main (){
    ServerApp.run({base: yarg.base, limit: yarg.limit, show: yarg.show, name: yarg.destination, destination: yarg.destination })
}