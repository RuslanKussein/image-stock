import React, {Component} from 'react';
import '../styles/style.css';


class ButtonToTop extends Component {
    componentDidMount() {
        window.addEventListener("scroll", function () {
            if (window.scrollY === 0) {
                document.getElementById('toTop').setAttribute('hidden', true);
            } else {
                document.getElementById('toTop').removeAttribute('hidden');
            }
        })
    };

    render() {
        return (
            <div id="toTop" onClick={() => window.scrollTo(0, 0)}>
                <i className="fas fa-arrow-up"></i>
            </div>
        )
    }
}

export default ButtonToTop;