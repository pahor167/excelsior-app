import * as React from 'react';
import Box from '@mui/material/Box';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { generateUri, selectCheck, selectUri, selectCode, setCode } from './walletSlice';
import { TextField } from '@mui/material';

export default function Wallet() {

  const dispatch = useAppDispatch();

  const check = useAppSelector(selectCheck);
  const uri = useAppSelector(selectUri);
  const code = useAppSelector(selectCode);

  React.useEffect(() => {
    dispatch(generateUri(0))
  }, [])

  return (
    <div>
      <Box sx={{ width: '100%' }} minHeight={300}>
        Wallet aa
        <br />
        {check}
        <br />
        {uri}
        <br />
        bb
      </Box>

      <form>
              <TextField
                  type="text"
                  variant='outlined'
                  color='secondary'
                  label="Code"
                  onChange={e => dispatch(setCode(e.target.value))}
                  value={code}
                  fullWidth
                  required
                  sx={{mb: 4}}
              />
            </form>
    </div>
  );
}
