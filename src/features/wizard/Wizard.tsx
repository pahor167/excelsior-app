import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import BlockChainStep from './steps/BlockChainStep';
import DaoStep from './steps/DaoStep';
import TokenStep from './steps/TokenStep';
import Review from './steps/Review';
import { useAppDispatch } from '../../app/hooks';
import { deployContract } from '../configDashboard/configDashboardSlice';
import { deployERC20 } from './wizardSlice';
import Deploy from './steps/Deploy';
import GovernanceStep from './steps/GovernanceStep';

const steps = ["Select blockchain", "DAO name", 'Decide token', 'Decide governance', 'Review'];

export default function Wizard() {

  const dispatch = useAppDispatch();

  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
    if (completedSteps() === totalSteps() - 1) {
      dispatch(deployERC20(""))
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const showStep = (step: number) => {
    switch(step) {

      case 1:   return <BlockChainStep />;
      case 2:   return <DaoStep />;
      case 3:   return <TokenStep />;
      case 4:   return <GovernanceStep />;
     
      case totalSteps(): return <Review />
      default:      return <h1>No step match</h1>
    }
  }

  return (
    <Box sx={{ width: '100%' }} minHeight={300}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Deploy />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography variant="caption" sx={{ display: 'inline-block' }}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ? 'Deploy'
                      : 'Complete Step'}
                  </Button>
                ))}
            </Box>
            <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
             {showStep(activeStep + 1)}
            </Typography>
          </React.Fragment>
        )}
      </div>
    </Box>
  );
}
