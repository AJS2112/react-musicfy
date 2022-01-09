import React, { useEffect, useState } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';

import "./MenuLeft.scss";

function MenuLeft(props) {
    const { user } = props;

    const [activeMenu, setActiveMenu] = useState("/");

    const handlerMenu = (e, menu) => {
        setActiveMenu(menu.to);
    }


    return (
        <Menu className='menu-left' vertical>
            <div className='top'>
                <Menu.Item
                    as={Link}
                    to="/"
                    active={activeMenu === "/"}
                    onClick={handlerMenu}
                >
                    <Icon name='home' /> Inicio
                </Menu.Item>
                <Menu.Item
                    as={Link}
                    to="/artists"
                    active={activeMenu === "/artists"}
                    onClick={handlerMenu}
                >
                    <Icon name='music' /> Artistas
                </Menu.Item>
            </div>
            <div className='footer'>
                <Menu.Item>
                    <Icon name='plus square outline' /> Nuevo Artista
                </Menu.Item>
                <Menu.Item>
                    <Icon name='plus square outline' /> Nueva Canción
                </Menu.Item>
            </div>
        </Menu>
    )
}

export default withRouter(MenuLeft);