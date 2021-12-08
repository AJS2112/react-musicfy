import React, { useState } from "react";
import { Button, Icon, Form, Input } from 'semantic-ui-react';
import firebaseApp from "../../../utils/firebase";
import { getAuth } from "firebase/auth";

import './RegisterForm.scss';

export default function RegisterForm(props) {
    const { setSelectedForm } = props;
    const [formData, setFormData] = useState(defaultValueForm);
    const [showPassword, setShowPassword] = useState(false);

    const showPasswordHandler = () => {
        setShowPassword(!showPassword);
    }

    const onChange = event => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const onSubmitHandler = () => {
        console.log('Formulario enviado');
        console.log(formData)
    }
    return (
        <div className="register-form">
            <h1>Empieza a escuchar con una cuenta de Musicfy gratis</h1>
            <Form onSubmit={onSubmitHandler} onChange={onChange}>
                <Form.Field>
                    <Input
                        type="text"
                        name="email"
                        placeholder="Correo electronico"
                        icon="mail outline"
                    //error={}
                    />
                </Form.Field>
                <Form.Field>
                    <Input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Constraseña"
                        icon={showPassword ? (
                            <Icon name="eye slash outline" link onClick={showPasswordHandler} />
                        ) : (
                            <Icon name="eye" link onClick={showPasswordHandler} />
                        )}
                    //error={}
                    />
                </Form.Field>
                <Form.Field>
                    <Input
                        type="text"
                        name="username"
                        placeholder="Como deberiamos llamarte?"
                        icon="user circle outline"
                    //error={}
                    />
                </Form.Field>
                <Button type="submit">Continuar</Button>
            </Form>
            <div className="register-form__options">
                <p onClick={() => setSelectedForm(null)}>Volver</p>
                <p>
                    Ya tienes Musicfy? {""}
                    <span onClick={() => setSelectedForm("login")}>Iniciar sesión</span>
                </p>
            </div>
        </div>
    )
}

function defaultValueForm() {
    return {
        email: "",
        password: "",
        username: ""
    }
}