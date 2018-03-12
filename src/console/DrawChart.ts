/**
 * @file DrawChart
 * @author Jordane CURÉ
 */

const blessed = require('blessed')
const contrib = require('blessed-contrib')

export class DrawChart {


    private screen: any = blessed.screen()
    private line: any = contrib.line(
        {
            style: {
                line: 'yellow',
                text: 'green',
                baseline: 'black',
            },
            xLabelPadding: 3,
            xPadding: 5,
            label: 'Resultat',
        })

    private line2: any = contrib.line(
        {
            style: {
                line: 'yellow',
                text: 'green',
                baseline: 'black',
            },
            xLabelPadding: 3,
            xPadding: 5,
            label: 'Resultat',
        })

    private line3: any = contrib.line(
        {
            style: {
                line: 'yellow',
                text: 'green',
                baseline: 'black',
            },
            xLabelPadding: 3,
            xPadding: 5,
            label: 'Resultat',
        })

    private defaultData: any = {
        x: ['0', '1', '2'],
        y: [0, 1, 1],
    }

    constructor() {
        this.screen.append(this.line)
        this.screen.append(this.line2)
        this.screen.append(this.line3)

        this.line.setData([this.defaultData])
        this.line2.setData([this.defaultData])
        this.line3.setData([this.defaultData])

        this.screen.key(['escape', 'q', 'C-c'], () => {
            return process.exit(0)
        })
        this.screen.render()
    }


    public setData(coinValue: { x: string[], y: number[] }, cashValue: { x: string[], y: number[] }, coinStock: { x: string[], y: number[] }): void {
        // this.line.setData([this.data, this.otherData])
    }

}
