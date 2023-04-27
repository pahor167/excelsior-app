import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Stack, FormLabel, RadioGroup, FormControl, FormControlLabel, Radio } from '@mui/material';
import { Link } from "react-router-dom"
import { FormEvent } from 'react';
import { useNetwork, useSwitchNetwork} from "wagmi"
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { changeNetwork, selectChainId } from '../wizardSlice';

export default function BlockChainStep() {
    const { chain, chains } = useNetwork()

    const chainId = useAppSelector(selectChainId);
    const dispatch = useAppDispatch();

    // useEffect(() => {
    //     if (chain != null && chainId != chain.id) {
    //         dispatch(changeNetwork(chain?.id))
    //     }
    // }, [chain])

    return (
        <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Blockchain</FormLabel>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                value={chainId}
                onChange={(e, val) => {
                    dispatch(changeNetwork(parseInt(val)))
                }}
                name="radio-buttons-group"
            >
                <FormControlLabel value="137" control={<Radio />} label="Polygon" />
                <FormControlLabel value="1" control={<Radio />} label="Ethereum" />
                <FormControlLabel value="44787" control={<Radio />} label="Alfajores" />
            </RadioGroup>
        </FormControl>)
}
