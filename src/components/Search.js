import React from 'react';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isTop: false
        };
        this.handleScroll = this.handleScroll.bind(this);
    }
    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
        document.querySelector('.form').addEventListener('submit', (event) => event.preventDefault());
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll() {
        if (window.scrollY === 0) {
            this.setState({
                isTop: false
            });
        } else {
            this.setState({
                isTop: true
            });
        }
    }

    render() {
        const {value, onChange: handleChange, onSubmit: handleSubmit} = this.props;
        return (
            <form action="" className="form" onSubmit={(event) => handleSubmit(event)} hidden={this.state.isTop}>
                <input type="text" placeholder="Поиск" className="form__input"
                       value={value}
                       onChange={handleChange}/>

            </form>
        )
    }
}

export default Search;