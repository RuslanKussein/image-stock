import React, {PureComponent} from "react";
import "../styles/style.css"
import {popularSearchTags} from "../constants/other";

class DescentSearch extends PureComponent {
    render() {
        return (
            <div className="descent-search">
                <div className="descent-search__list">
                    {
                        popularSearchTags.map(tag => (
                            <div className="descent-search__list__item">{tag}</div>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default DescentSearch;