/**
 * @file	Entry point of the server
 * @author	Jordane CURÉ
 */

import { container } from 'inversify.config'

import { ExpressApp } from 'express/ExpressApp'
import { TestRoute } from 'routes/testRoute'

const server = new ExpressApp()

server.addGet('/', container.get(TestRoute).requestHandler)

server.startApp(9691)

