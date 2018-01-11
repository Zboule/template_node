
/**
 * @file	Class that wrap an express app
 * @author	Jordane CURÉ
 */
import * as express from 'express'
import { PathParams, RequestHandler } from 'express-serve-static-core'

export class ExpressApp {

    private expressApp: express.Express

    constructor() {
        this.expressApp = express()
        this.expressApp.disable('x-powered-by')
    }

    public startApp(port: number): void {
        this.expressApp.listen(port, () => {
            console.log('Express running on ' + port)
        })
    }

    public addGet(path: PathParams, requestHandler: RequestHandler): void {
        this.expressApp.get(path, requestHandler)
    }

    public addPost(path: PathParams, requestHandler: RequestHandler): void {
        this.expressApp.post(path, requestHandler)
    }

    public addMiddleWare(requestHandler: RequestHandler, route?: string): void {
        if (route) {
            this.expressApp.use(route, requestHandler)
        }
        else {
            this.expressApp.use(requestHandler)
        }
    }
}

