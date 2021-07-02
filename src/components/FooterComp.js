import React from 'react';

class FooterComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <div style={{backgroundColor: 'black', height: '30vh'}}>
                <p>Footer</p>
            </div>
        );
    }
}

export default FooterComp;