import React from 'react';
import { FiUserCheck } from 'react-icons/fi'

import './styles.css';

import meucLogo from '../../assets/meuc.svg';

export default function Landing() {
    return (
        <div className="register-container">
            <img src={meucLogo} alt="logo"/>

            <section className="form">
                <form>
                    <h1>Confirmação de Presença</h1>
                    <input placeholder="Seu nome" />
                    <input placeholder="Quant. de presentes" />

                    <button className="button" type="submit">
                        Vamos Lá!
                        <FiUserCheck className="icon" size={16} color="#e3e3e3" />
                    </button>
                </form>
            </section>
        </div>
    )
}
