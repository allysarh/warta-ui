import axios from 'axios';
import React from 'react';

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
            this.nyse.forEach(async (item) => {
                try {
                    let options = {
                        method: 'GET',
                        url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary',
                        params: { symbol: item, region: 'US' },
                        headers: {
                            'x-rapidapi-key': '38dd82fc8fmsh54c84491efc066ep118323jsn94680a4ae595',
                            'x-rapidapi-host': 'aapidojo-yahoo-finance-v1.p.rapidapi.com'
                        }
                    };
                    res = await axios.request(options)
                    data.push({
                        currentPrice: res.data.financialData.currentPrice,
                        profitMargins: res.data.financialData.profitMargins,
                        previousClose: res.data.summaryDetail.previousClose
                    })
                    this.setState({ stockData: data })
                } catch (error) {

                }

            })
            console.log("data stock", data)
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <div style={{width: '100%', backgroundColor:'black',height: '100px', marginTop: '5px'}}>
                {/* <h6>{this.state.stockData.currentPrice}</h6>
                <div>
                    <h5>{this.state.stockData.previousClose}</h5>
                    <h5>{this.state.stockData.profitMargins}</h5>
                </div> */}
            </div>
        );
    }
}

export default StockComp;