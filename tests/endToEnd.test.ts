/**
 * @file	Summary of the component / file
 * @author	Jordane CURÉ
 */

import axios from 'axios'
import { WaitForServer } from './tools/WaitForServer'


describe('EndToEndTest', () => {

    const url = 'http://cryptoaijs/aijs'

    before(() => {
        const waitForServer = new WaitForServer(url)
        // That look's to don't work
        return waitForServer.wait(30000).then(() => { console.log('Server is up, starting tests') })
    })

    describe('Route /random', () => {

        const routeUnderTest = '/random'

        it('Should send a reply', () => {
            return axios.post(url + routeUnderTest, { ticks: ['ouai les ticks ne sont pas encore la'] })
                .then((response) => console.log(response.data))
        })
    })
})
