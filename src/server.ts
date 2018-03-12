
/**
 * @file	Entry point of the server
 * @author	Jordane CURÉ
 */

import { coreAI } from './logic/CoreAI'


const startServer = async () => {
    for (let i = 0; i < 10; i++) {
        await coreAI.startSimulation()
    }
}

startServer()
