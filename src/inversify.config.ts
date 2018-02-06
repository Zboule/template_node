/**
 * @file	The container for IOC
 * @author	Jordane CURÉ
 */

import 'reflect-metadata'

import { Container } from 'inversify'
import { TestRoute } from './routes/TestRoute'

export const container = new Container()

container.bind(TestRoute).toSelf()
