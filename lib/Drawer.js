const asciichart = require ('asciichart')
const padding = '0.000751733138179';
class Drawer {

    constructor(data) {
        this.data = data
    }
    init() {
        var config = {
            colors: [
                asciichart.blue,
                asciichart.green,
                asciichart.default, // default color
                undefined, // equivalent to default
            ],
            offset:  5,
            height: 20,
            padding: '       ',
            format:  function (x, i) { return x.toFixed (12) }

        }

        return this._plotWithXaxis(this.data,null, config);
    }

    _plotWithXaxis(yArray,xArray,config = {}) {
        if (!xArray) xArray = yArray.map((v,i) => i)
        const plot = asciichart.plot(yArray,config)
        // determine the overall width of the plot (in characters)
        const fullWidth = plot.split('\n')[0].length
        // get the number of characters reserved for the y-axis legend
        const reservedYLegendWidth = plot.split('\n')[0].split(/┤|┼╮|┼/)[0].length + 2
        // the difference between the two is the actual width of the x axis
        const widthXaxis = fullWidth - reservedYLegendWidth
        // get the number of characters of the longest x-axis label
        const longestXLabel = xArray.map(l => l.toString().length).sort((a,b) => b - a)[0]
        // get maximum amount of decimals in the labels 
        const maxDecimals = !isNaN(config.decimals) ? config.decimals : xArray.map(l => this.countDecimals(l)).sort((a,b) => b - a)[0]
        // considering a single whitespace left and right (for readibility), the formula for
        // determining the maximum amount of (readable) labels boils down to the following:
        const maxNoXLabels = Math.floor(widthXaxis / (longestXLabel + 2))
        
        const valueBetweenLabels = (xArray[xArray.length - 1] - xArray[0]) / (maxNoXLabels - 2)
        // add labels with fixed distance, however always include first and last position
        const factor = Math.pow(10,maxDecimals)
        const labels = [Math.round(xArray[0] * factor)/factor]
        for (let i = 0; i < maxNoXLabels - 2; ++i) {
          labels.push(Math.round((labels[labels.length - 1] + valueBetweenLabels) * factor) / factor)
        }
        // labels.push(Math.round(xArray[xArray.length - 1] * factor)/factor)
        // calculate the position of the x-label ticks
        const tickPositions = labels.map(value => Math.round((value - xArray[0]) / (xArray[xArray.length - 1] - xArray[0]) * widthXaxis))
      
        let tickString = [...new Array(reservedYLegendWidth)].join(" ") + [...new Array(widthXaxis)].map((v,i) => tickPositions.indexOf(i) > -1 ? "┬" : "─").join("")
      
        const tickLabelStartPosition = tickPositions.map((pos,i) => pos - Math.floor(labels[i].toString().length / 2 ))
      
        const reservedWhitespace = [...new Array(reservedYLegendWidth - 1)].map((v,i) => {
          if ((i - reservedYLegendWidth + 1) == tickLabelStartPosition[0]) return labels[0]
          else return " "
        }).join("")
      
        const startIndex = reservedWhitespace.length + 1 - reservedYLegendWidth
        const tickLabels = []
        for (let i = startIndex; i < widthXaxis; ++i) {
          if (tickLabelStartPosition.indexOf(i) > -1) {
            tickLabels.push(labels[tickLabelStartPosition.indexOf(i)])
            i = startIndex + tickLabels.join("").length - 1
          }
          else tickLabels.push(" ")
        }
        return `${'\n' + plot + '\n' + tickString + '\n' +  reservedWhitespace + tickLabels.join("")}`
      }

      countDecimals (value) { 
        if ((value % 1) != 0) 
            return value.toString().split(".")[1].length;  
        return 0;
    };

}

module.exports = Drawer