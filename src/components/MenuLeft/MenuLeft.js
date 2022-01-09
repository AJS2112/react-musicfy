import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { Link, withRoute } from 'react-router-dom';

import "./MenuLeft.scss";

export default function MenuLeft(props) {
    const { user } = props;

    return (
        <Menu className='menu-left' vertical>
            <div className='top'>
                <Menu.Item name='home'>
                    <Icon name='home' /> Inicio
                </Menu.Item>
                <Menu.Item name='artists'>
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