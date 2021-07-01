import axios from 'axios';
import React from 'react';
import { SymbolOverview, AdvancedChart } from 'react-tradingview-embed'

class StockComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stockData: []
        }

        this.nyse = ['TSLA', 'PG', 'AAL', 'AAPL', 'NVDA', 'GOOGL', 'UL', 'SLB', 'PFE', 'MSFT']
    }

    componentDidMount() {
        this.getStockData()
    }

    getStockData = async () => {
        try {
            let res
            let data = []
            let options = `TSLA,PG,AAL,AAPLM,NVDA,GOOGL,UL,SLB,PFE,MSFT`
            res = await axios.get(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-spark?symbols=TSLA,PG,AAL,AAPLM,NVDA,GOOGL,UL,SLB,PFE,MSFT&interval=1m&range=1d`, {
                headers: {
                    'x-rapidapi-key': '38dd82fc8fmsh54c84491efc066ep118323jsn94680a4ae595',
                    'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
                }
            })
            console.log("respon data: ", res.data)
        } catch (error) {
            console.log(error)
        }
    }

    render() {

        return (
            <div style={{ width: '100%', padding:"1%", marginTop:'6%', border: '1px solid #eaeae8'}} >
                <SymbolOverview widgetPropsAny={{ "newProp": true, symbols: this.nyse }} widgetProps={{colorTheme: 'light'}}/>
            </div>
        );
    }
}

export default StockComp;