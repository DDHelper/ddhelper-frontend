import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import axios from 'axios';
import { useApi } from '../utils/apiClient';
import { Button, Paper, Box, Stack } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { InterfaceType } from 'typescript';


const FormWithHookForm: React.FC<{}> = () => {
  const { handleSubmit, reset, control } = useForm();
  const { postLogin } = useApi();
  const onSubmit = (data: any) => {
    console.log(data);
    let value = Object.assign(data, {});
    const response = postLogin(data);
    console.log(response)
  };

  return (
    <Paper>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          component='form'
          noValidate
          sx={{ mt: 1 }}
        >
          <form>
            <Stack spacing={2}>
              <Controller
                name={'username'}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    margin='normal'
                    required
                    fullWidth
                    onChange={onChange}
                    value={value}
                    label={'User ID'} />
                )}
              />
              <Controller
                name={'password'}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    margin='normal'
                    required
                    fullWidth
                    onChange={onChange}
                    value={value}
                    label={'Password'} />
                )}
              />
              <Button
                onClick={handleSubmit(onSubmit)}
              >
                Submit
              </Button>
              <Button onClick={() => reset()} variant={'outlined'}>Reset</Button>
            </Stack>
          </form>
        </Box>
      </Box>
    </Paper>
  );
};


const AuthView = () => {
  return (
    <div>
      <FormWithHookForm />
    </div>
  );
};

export default AuthView;