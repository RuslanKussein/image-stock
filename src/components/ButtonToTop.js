import React, {Component} from 'react';
import '../styles/style.css';

class ButtonToTop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isTop: true
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
        if (window.scrollY === 0) {
            this.setState({
                isTop: true
            });
        } else {
            this.setState({
                isTop: false
            });
        }
    }

    render() {
        return (
            <div id="toTop" onClick={() => window.scrollTo(0, 0)} hidden={this.state.isTop}>
                <i className="fas fa-arrow-up"></i>
            </div>
        )
    }
}

export default ButtonToTop;