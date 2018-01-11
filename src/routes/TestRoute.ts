/**
 * @file	Test route, should be delete soon or later
 * @author	Jordane CURÉ
 */


import { NextFunction, Request, Response } from 'express-serve-static-core'

import { injectable } from 'inversify'

@injectable()
export class TestRoute {

    public requestHandler = (_req: Request, res: Response, _next: NextFunction): void => {
        res.send('Yeahhhhhhhh you did it')

    }
}
