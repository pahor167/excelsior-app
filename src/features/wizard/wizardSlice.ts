import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk, DI } from '../../app/store';
import { deployContractReal, fetchCount } from './wizardApi';
import { switchNetwork } from '@wagmi/core'

export interface Wizard {
  chainId: number;
  daoName: string;
  daoDescription: string;
  tokenName: string;
  tokenSymbol: string;

  // governorName: string;
  // votingDelayInBlocks: number;
  // votingPeriod: number;
  // proposalThreshold: number;
  // quorumPercent: number;


}

const initialState: Wizard = {
  chainId: 1,
  daoName: "",
  daoDescription: "",
  tokenName: "",
  tokenSymbol: "",
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const changeNetwork = createAsyncThunk(
  'wizard/changeNetwork',
  async (chainId: number, { getState, extra, dispatch}) => {
    const network = await switchNetwork({
      chainId: chainId,
    })
    dispatch(setChainId(network.id))
  }
);

export const deployERC20 = createAsyncThunk(
  'wizard/deployERC20',
  async (dummy: string, { getState, extra}) => {
    const state = getState() as RootState
    await deployContractReal(state.wizard.tokenName, state.wizard.tokenSymbol)
  }
);

export const configDashboard = createSlice({
  name: 'counter',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setChainId: (state, action: PayloadAction<number>) => {
      state.chainId = action.payload
    },
    setDaoName: (state, action: PayloadAction<string>) => {
      state.daoName = action.payload
    },
    setDaoDescription: (state, action: PayloadAction<string>) => {
      state.daoDescription = action.payload
    },
    setTokenName: (state, action: PayloadAction<string>) => {
      state.tokenName = action.payload
    },
    setTokenSymbol: (state, action: PayloadAction<string>) => {
      state.tokenSymbol = action.payload
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {    
  },
});

export const { setChainId, setDaoName, setDaoDescription, setTokenName, setTokenSymbol } = configDashboard.actions;

export const selectChainId = (state: RootState) => state.wizard.chainId;
export const selectDaoName = (state: RootState) => state.wizard.daoName;
export const selectDaoDescription = (state: RootState) => state.wizard.daoDescription;
export const selectTokenName = (state: RootState) => state.wizard.tokenName;
export const selectTokenSymbol = (state: RootState) => state.wizard.tokenSymbol;

export default configDashboard.reducer;
