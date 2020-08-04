import React,{Component} from 'react';
import '../styles/style.css'

class SearchHistory extends Component {
    render() {
        return (
            <div>
                Ваши запросы
                <div className="search-elements">
                    {this.props.searchHistory.map(query => (
                        <div className="search-elements__element">
                            query
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default SearchHistory;