import React from "react";
import { Icon, Image } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import firebaseApp from "../../utils/firebase";
import { getAuth, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import UserImage from "../../assets/png/user.png";

import "./TopBar.scss";

export default function TopBar(props) {
    const { user } = props;

    const logout = () => {
        console.log("Cerrar sesión");
    }

    const goBack = () => {
        console.log('go back');
    }

    return (
        <div className="top-bar">
            <div className="top-bar__left">
                <Icon name="angle left" onClick={goBack} />
            </div>
            <div className="top-bar__right">
                <Link to="/settings">
                    <Image src={UserImage} />
                    {user.displayName}
                </Link>
                <Icon name="power off" onClick={logout} />
            </div>
        </div>
    )
}