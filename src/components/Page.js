import React from 'react';
import NavigationBar from './Navigation/NavigationBar';
import Footer from "./Footer/Footer.js"


export default class Page extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: ''
        }
    }

    componentDidMount(){
       this.setState({
           title: document.title
       });
    }

    render() {
        return (
            <section>
                <NavigationBar/>
                {this.props.children}
                {/* <Footer /> */}
            </section>
        );
    }
}