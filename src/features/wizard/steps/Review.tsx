import React, { useState } from 'react';
import { CardContent, ListItem, ListItemIcon, ListItemText, TextField, Typography } from '@mui/material';
import { useAppSelector } from '../../../app/hooks';
import { selectChainId, selectDaoDescription, selectDaoName, selectTokenName, selectTokenSymbol } from '../wizardSlice';
import Card from '@mui/material/Card';
import { getChainName } from '../../../utils';

export default function Review() {
    const daoName = useAppSelector(selectDaoName);
    const daoDescription = useAppSelector(selectDaoDescription);
    const tokenName = useAppSelector(selectTokenName);
    const tokenSymbol = useAppSelector(selectTokenSymbol);
    const chainId = useAppSelector(selectChainId);

    return (
        <>
            <form >
            <Card variant="outlined">
                    <CardContent>
                        <Typography variant='h6'>
                            Chain
                        </Typography>
                        <br />
                        {getChainName(chainId)}
                    </CardContent>
                </Card>

                <Card variant="outlined">
                    <CardContent>
                        <Typography variant='h6'>
                            Dao info
                        </Typography>
                        <br />
                        <TextField
                            type="text"
                            variant='outlined'
                            color='secondary'
                            label="DAO name"
                            disabled
                            value={daoName}
                            fullWidth
                            required
                            sx={{ mb: 4 }}
                        />
                        <TextField
                            type="text"
                            variant='outlined'
                            color='secondary'
                            disabled
                            label="Description"
                            value={daoDescription}
                            fullWidth
                            required
                            sx={{ mb: 4 }}
                        />
                    </CardContent>
                </Card>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant='h6'>
                            Token info
                        </Typography>
                        <br />
                        <TextField
                            type="text"
                            variant='outlined'
                            color='secondary'
                            label="Token name"
                            disabled
                            value={tokenName}
                            fullWidth
                            required
                            sx={{ mb: 4 }}
                        />
                        <TextField
                            type="text"
                            variant='outlined'
                            color='secondary'
                            disabled
                            label="Token symbol"
                            value={tokenSymbol}
                            fullWidth
                            required
                            sx={{ mb: 4 }}
                        />
                    </CardContent>
                </Card>

            </form>

        </>)
}
