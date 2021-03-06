import React, { useState } from "react";
import { Button, Icon, Form, Input } from 'semantic-ui-react';
import firebaseApp from "../../../utils/firebase";
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { toast } from 'react-toastify'

import { validateEmail } from '../../../utils/Validations';
import './RegisterForm.scss';

export default function RegisterForm(props) {
    const { setSelectedForm } = props;
    const [formData, setFormData] = useState(defaultValueForm);
    const [showPassword, setShowPassword] = useState(false);
    const [formError, setFormError] = useState({});
    const [isLoading, setIsLoading] = useState(false);

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

        setFormError({});
        let errors = {};
        let formOk = true;

        if (!validateEmail(formData.email)) {
            errors.email = true;
            formOk = false;
        }

        if (formData.password.length < 6) {
            errors.password = true;
            formOk = false;
        }

        if (!formData.username) {
            errors.username = true;
            formOk = false;
        }

        setFormError(errors);

        if (formOk) {
            setIsLoading(true);
            const auth = getAuth(firebaseApp);

            createUserWithEmailAndPassword(auth, formData.email, formData.password)
                .then((userCredential) => {
                    // Signed in
                    changeUserName();
                    sendVerificationEmail();
                    const user = userCredential.user;
                    // ...
                })
                .catch((error) => {
                    toast.error("Error al crear la cuenta");
                    // const errorCode = error.code;
                    // const errorMessage = error.message;
                    // ..
                })
                .finally(() => {
                    setIsLoading(false);
                    setSelectedForm(null);
                });
        }
    }

    const changeUserName = () => {
        const auth = getAuth();
        updateProfile(auth.currentUser, {
            displayName: formData.username
        }).catch((error) => {
            toast.error("Error al asignar el nombre del usuario");
        });
    }

    const sendVerificationEmail = () => {
        const auth = getAuth();
        sendEmailVerification(auth.currentUser)
            .then(() => {
                toast.success("Se ha enviado el email de verificacion");
            }).catch((error) => {
                toast.error("Error al enviar el email de verificacion");
            });
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
                        error={formError.email}
                    />
                    {formError.email && (
                        <span className="error-text">
                            Por favor, introduce un email valido
                        </span>
                    )}
                </Form.Field>
                <Form.Field>
                    <Input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Constrase??a"
                        icon={showPassword ? (
                            <Icon name="eye slash outline" link onClick={showPasswordHandler} />
                        ) : (
                            <Icon name="eye" link onClick={showPasswordHandler} />
                        )}
                        error={formError.password}
                    />
                    {formError.password && (
                        <span className="error-text">
                            Por favor, elige una constrase??a superior a 5 caracteres
                        </span>
                    )}
                </Form.Field>
                <Form.Field>
                    <Input
                        type="text"
                        name="username"
                        placeholder="Como deberiamos llamarte?"
                        icon="user circle outline"
                        error={formError.username}
                    />
                    {formError.username && (
                        <span className="error-text">
                            Por favor, introduce un nombre
                        </span>
                    )}
                </Form.Field>
                <Button type="submit" loading={isLoading}>Continuar</Button>
            </Form>
            <div className="register-form__options">
                <p onClick={() => setSelectedForm(null)}>Volver</p>
                <p>
                    Ya tienes Musicfy? {""}
                    <span onClick={() => setSelectedForm("login")}>Iniciar sesi??n</span>
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