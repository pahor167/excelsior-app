import { TextField} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectDaoDescription, selectDaoName, setDaoDescription, setDaoName } from '../wizardSlice';

export default function Deploy() {
    const dispatch = useAppDispatch();
    const daoName = useAppSelector(selectDaoName);
    const daoDescription = useAppSelector(selectDaoDescription);
  
    return (
        <>
          DEPLOY
     
        </>)
}
