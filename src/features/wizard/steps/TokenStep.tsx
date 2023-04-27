import { TextField} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {selectTokenName, selectTokenSymbol, setDaoDescription, setDaoName, setTokenName, setTokenSymbol } from '../wizardSlice';

export default function TokenStep() {
    const dispatch = useAppDispatch();
    const tokenName = useAppSelector(selectTokenName);
    const tokenSymbol = useAppSelector(selectTokenSymbol);
  
    return (
        <>
            <form>
                <TextField
                    type="text"
                    variant='outlined'
                    color='secondary'
                    label="Token name"
                    onChange={e => dispatch(setTokenName(e.target.value))}
                    value={tokenName}
                    fullWidth
                    required
                    sx={{mb: 4}}
                />
               <TextField
                    type="text"
                    variant='outlined'
                    color='secondary'
                    label="Token Symbol"
                    onChange={e => dispatch(setTokenSymbol(e.target.value))}
                    value={tokenSymbol}
                    fullWidth
                    required
                    sx={{mb: 4}}
                />
            </form>
     
        </>)
}
