import { TextField} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectDaoDescription, selectDaoName, setDaoDescription, setDaoName } from '../wizardSlice';

export default function Step2() {
    const dispatch = useAppDispatch();
    const daoName = useAppSelector(selectDaoName);
    const daoDescription = useAppSelector(selectDaoDescription);
  
    return (
        <>
            <form>
                <TextField
                    type="text"
                    variant='outlined'
                    color='secondary'
                    label="DAO name"
                    onChange={e => dispatch(setDaoName(e.target.value))}
                    value={daoName}
                    fullWidth
                    required
                    sx={{mb: 4}}
                />
               <TextField
                    type="text"
                    variant='outlined'
                    color='secondary'
                    label="Description"
                    onChange={e => dispatch(setDaoDescription(e.target.value))}
                    value={daoDescription}
                    fullWidth
                    required
                    sx={{mb: 4}}
                />
                
            </form>
     
        </>)
}
