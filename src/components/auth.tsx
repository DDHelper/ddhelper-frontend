import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import axios from 'axios';
import { Button, Paper, Box, Stack } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

const FormWithHookForm: React.FC<{}> = () => {
  const { handleSubmit, reset, control } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
    let url: string = 'http://yapi.phystack.top/mock/11/auth/login';
    let config = {};
    const response = axios.post(url, data, config);
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