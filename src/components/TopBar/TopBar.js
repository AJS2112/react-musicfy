import React from "react";
import { Icon, Image } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import firebaseApp from "../../utils/firebase";
import { getAuth } from "firebase/auth";
import UserImage from "../../assets/png/user.png";

import "./TopBar.scss";

function TopBar(props) {
    const { user, history } = props;

    const logout = () => {
        getAuth(firebaseApp).signOut();
    }

    const goBack = () => {
        history.goBack();
    }

    return (
        <div className="top-bar">
            <div className="top-bar__left">
                <Icon name="angle left" onClick={goBack} />
            </div>
            <div className="top-bar__right">
                <Link to="/settings">
                    <Image src={user.photoURL ? user.photoURL : UserImage} />
                    {user.displayName}
                </Link>
                <Icon name="power off" onClick={logout} />
            </div>
        </div>
    )
}

export default withRouter(TopBar);