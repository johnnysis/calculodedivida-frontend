import React, { useState, useEffect } from 'react';
import NumberFormat from 'react-number-format';
import Axios from 'axios';
import {url} from '../../util/constants';

import { Select, MenuItem, Container, TextField, Grid, InputLabel, FormControl, Button } from '@material-ui/core';
 
  
const ConfiguracaoCalculo = () => {
    const [maximoParcelas, setMaximoParcelas] = useState("");
    const [tipoDeJuros, setTipoDeJuros] = useState("");
    const [porcentagemValorJuros, setPorcentagemValorJuros] = useState(0);
    const [porcentagemComissao, setPorcentagemComissao] = useState(0);
    
    function handleChangeDefault(e, callback) {
        callback(e.target.value);
    }

    useEffect(() =>
    { 
        Axios.get(`${url}/configuracaocalculo`)
        .then(response => {
            setMaximoParcelas(response.data.maximoParcelas);
            setTipoDeJuros(response.data.tipoDeJuros);
            setPorcentagemValorJuros(response.data.porcentagemValorJuros);
            setPorcentagemComissao(response.data.porcentagemComissao);
        });
    }, []);


    const save = () => {
        Axios.post(`${url}/configuracaocalculo`,
                {
                    maximoParcelas: parseInt(maximoParcelas),
                    tipoDeJuros,
                    porcentagemValorJuros: parseFloat(porcentagemValorJuros),
                    porcentagemComissao: parseFloat(porcentagemComissao)
                }
            )
        .then(
            res => {
                console.log(res);
            },
            err => console.log(err)
        );
    }

    return(
        <>
        <Container>
            <h2>Configuração do cálculo</h2>
            <form>
                <Grid
                    container
                    direction="column"
                    spacing={3}
                    sm="12"
                    md="3"
                >
                    <Grid item x5>
                        <NumberFormat
                            decimalScale={0}
                            label="Máximo de parcelas"
                            value={maximoParcelas}
                            onChange={e => handleChangeDefault(e, setMaximoParcelas)}
                            customInput={TextField}
                            fullWidth
                        >
                        </NumberFormat>
                    </Grid>
                    <Grid item x5>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Tipo de Juros</InputLabel>
                            <Select
                                value={tipoDeJuros}
                                onChange={e => handleChangeDefault(e, setTipoDeJuros)}
                            >
                                <MenuItem value={"S"}>Simples</MenuItem>
                                <MenuItem value={"C"}>Composto</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item x5>
                        <NumberFormat
                            decimalScale={2}
                            label="Valor dos juros (%)"
                            value={porcentagemValorJuros}
                            onChange={e => handleChangeDefault(e, setPorcentagemValorJuros)}
                            customInput={TextField}
                            fullWidth
                        >
                        </NumberFormat>
                    </Grid>
                    <Grid item x5>
                        <NumberFormat
                            decimalScale={2}
                            label="Comissão (%)"
                            value={porcentagemComissao}
                            onChange={e => handleChangeDefault(e, setPorcentagemComissao)}
                            customInput={TextField}
                            fullWidth
                        >
                        </NumberFormat>
                    </Grid>
                    <Grid item x4>
                        <Button variant="contained" color="primary" onClick={save}>Gravar</Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
        
        </>
    );
}

export default ConfiguracaoCalculo;