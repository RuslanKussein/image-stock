import React, {Component, PureComponent} from 'react';
import '../styles/style.css';

class Footer extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            onTop: true
        };
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll() {
        this.setState({
            onTop: window.scrollY === 0
        })
    }

    render() {
        console.log("footer");
        return (
            <footer className="footer"
                    onClick={() => window.scrollTo(0, 0)}
                    hidden={this.state.onTop}>
                <i className="fas fa-arrow-up"></i>
            </footer>
        )
    }
}

export default Footer;