import React, {Component} from "react";
import "../styles/style.css"

class History extends Component {
    render() {
        return (
            <div className="history">
                <p className="history__header">Ваши запросы</p>
                <div className="history__list">
                    {
                        this.props.history.map(query => (
                            <div className="history__list__item">{query}</div>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default History;