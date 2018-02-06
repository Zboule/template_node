/**
 * @file	Summary of the component / file
 * @author	Jordane CURÉ
 */

import 'reflect-metadata'

import { assert } from 'chai'
import { TestRoute } from '../src/routes/TestRoute'
import { IRequestHandlerParams, RequestObjectGenerator } from './tools/RequestObjectGenerator'


describe('CouchdbRouterHandler', () => {

    let testRoute: TestRoute

    before(() => {
        testRoute = new TestRoute()
    })

    it('Should be initialized', () => {
        assert.isDefined(testRoute, 'It\'s is undefined')
    })

    it('Should have a defined requestHandler', () => {
        assert.isDefined(testRoute.requestHandler, 'RequestHandler is undefined')
    })

    describe('requestHandler()', () => {

        let reqHandlerParams: IRequestHandlerParams

        beforeEach((done) => {
            RequestObjectGenerator.getRequestHandlerParams()
                .then((resReqHandlerParams) => {
                    reqHandlerParams = resReqHandlerParams
                    done()
                })
        })

        it('Should send an ', (done) => {
            reqHandlerParams.res.send = (resValue) => {
                assert.isTrue(resValue === 'Yeahhhhhhhh you did it', 'Request handler return wrong value')
                done()
                return reqHandlerParams.res
            }
            testRoute.requestHandler(reqHandlerParams.req, reqHandlerParams.res, reqHandlerParams.next)

        }).timeout(500)

    })
})
