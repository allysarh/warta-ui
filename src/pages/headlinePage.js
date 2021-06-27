import React from 'react';
import { InputText } from 'primereact/inputtext'
import { TabMenu } from 'primereact/tabmenu';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';

class HeadlinePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
        this.menu = [
            { label: 'Home' },
            { label: 'Politik' },
            { label: 'Kesehatan' },
            { label: 'Bisnis' },
            { label: 'Olahraga' },
            { label: 'Teknologi' },
            { label: 'Global' },
            { label: 'Ekonomi' }
        ]
    }

    onClickKategori = (e) =>{
        this.setState({ activeIndex: e.index })
        let kategori = e.value.label
        console.log("kategori: ",kategori)
    }
    render() { 
        return (
            <div style={{height:'100vh', width: '100%'}} className="container-fluid">
                <TabMenu
                style={{ height: '10%', width: '65vw', margin: 'auto', padding: 'auto' }}
                model={this.menu}
                activeIndex={this.state.activeIndex}
                onTabChange={e => this.onClickKategori(e) }
            />
                
            </div>
        );
    }
}
 
export default HeadlinePage;