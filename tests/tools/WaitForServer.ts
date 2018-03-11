
/**
 * @file WaitForServer
 * @author Jordane CURÉ
 */

import fetch from 'node-fetch'


export class WaitForServer {

    private healthCheckURL: string

    constructor(healthCheckURL: string) {
        this.healthCheckURL = healthCheckURL
    }

    public wait = (waitingTime: number) => {
        return new Promise((resolve, reject) => {
            this.isUp()
                .then((isUp: boolean) => {
                    if (isUp === true) {
                        resolve()
                    }
                    else {
                        const sleepTime = 1000
                        if (waitingTime > sleepTime) {
                            setTimeout(
                                () => {
                                    this.wait(waitingTime - sleepTime)
                                        .then(() => {
                                            resolve()
                                        })
                                        .catch(() => {
                                            reject('server ' + this.healthCheckURL + ' is game over since ' + waitingTime)
                                        })
                                },
                                1000
                            )
                        }
                        else {
                            reject('server ' + this.healthCheckURL + ' is game over since ' + waitingTime)
                        }
                    }
                })
        })
    }

    private isUp(): Promise<boolean> {
        return fetch(this.healthCheckURL)
            .then(() => {
                return true
            })
            .catch((error) => {
                if (error.code === 'ECONNREFUSED') {
                    return true
                }
                else {
                    return false
                }
            })
    }

}
