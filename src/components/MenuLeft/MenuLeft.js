import React, { useEffect, useState } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';

import "./MenuLeft.scss";

function MenuLeft(props) {
    const { user } = props;

    return (
        <Menu className='menu-left' vertical>
            <div className='top'>
                <Menu.Item as={Link} to="/" name='home'>
                    <Icon name='home' /> Inicio
                </Menu.Item>
                <Menu.Item as={Link} to="/artists" name='artists'>
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