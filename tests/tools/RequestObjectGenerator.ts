/*
* @file	Summary of the component / file
* @author	Jordane CURÉ
*/

import * as express from 'express'
import { Request, Response } from 'express-serve-static-core'
const runMiddleware = require('run-middleware')

export interface IRequestHandlerParams {
    req: Request,
    res: Response,
    next: (param: any) => void,
}

export class RequestObjectGenerator {

    public static getRequestHandlerParams(): Promise<IRequestHandlerParams> {
        return new Promise((resolve) => {
            const newExpress: any = express()
            newExpress.use((req: Request, res: Response, next: any) => {
                resolve({
                    req,
                    res,
                    next,
                })
            })
            runMiddleware(newExpress)
            newExpress.runMiddleware('/')
        })
    }

}
