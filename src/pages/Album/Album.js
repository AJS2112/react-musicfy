import React from 'react';
import { withRouter } from 'react-router-dom';

import './Album.scss';

function Album(props) {
    const { match } = props;

    return (
        <div>
            <h1>Album...</h1>
        </div>
    )
}

export default withRouter(Album);