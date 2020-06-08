import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FaWhatsapp, FaSignInAlt } from 'react-icons/fa'

import api from '../../services/api';

import './styles.css';

import meucLogo from '../../assets/meuc.svg';

export default function Landing() {
    const [reunioes, setReunioes] = useState([]);

    const history = useHistory();

    useEffect(() => {
        api.get('/', {

        }).then(res => {
            setReunioes(res.data)
        })
    })

    console.log(reunioes);

    return (
        <div className="landing-container">
            <img src={meucLogo} alt="logo"/>

            <h1>Encontros Disponíveis</h1>

            <ul>
                {reunioes.map(reunioes => (
                    <li key={reunioes.id}>
                        <strong><p>{reunioes.nome}</p></strong>

                        <strong>Horário</strong>
                        <p>{reunioes.horario}</p>

                        <strong>Limite de Pessoas:</strong>
                        <p>{reunioes.max_pessoas}</p>

                        <strong>Limite de Pessoas:</strong>
                        <p>{reunioes.max_pessoas}</p>

                        <strong>Vagas Disponíveis:</strong>
                        <p>{reunioes.max_pessoas-reunioes.qtd_pessoas}</p>

                    </li>
                ))}
                
            </ul>
        </div>
    )
}
