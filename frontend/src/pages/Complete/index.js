import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { FaArrowCircleLeft } from 'react-icons/fa';

import './styles.css';

// Images
import meucLogo from '../../assets/meuc.svg';

export default function Complete() {
    const history = useHistory();
    const nome = localStorage.getItem('nome');

    async function handleStartOver(e) {
        e.preventDefault();

        try {
            history.push('/');
        } catch (err) {
            alert('Não foi possível realizar o pedido no momento. Tente mais tarde');
            console.log(err);
        }
    }

    return (
        <div className="complete-container">
            <img src={meucLogo} className="logo" alt="logo"/>

            <section className="form">
                <form onSubmit={handleStartOver}>
                    <h1>Presença Confirmada!</h1>
                    <div className="complete-content">
                        <b>{nome}</b>, sua presença esta confirmada!<br></br>
                        Muito obrigado pela informação!
                    </div>
                    <div className="complete-content continue">
                        Dúvidas? Entre em contato com os missionários <br/>
                        Ou com as lideranças!
                    </div>
                    <Link className="alterbutton" to="/">
                        Voltar
                        <FaArrowCircleLeft className="icon" size={16} color="#e3e3e3" />
                    </Link>
                </form>
            </section>
        </div>
    )
}
