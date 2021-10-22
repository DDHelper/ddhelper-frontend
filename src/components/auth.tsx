import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { Button, Paper, Box, Stack } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

const FormWithHookForm: React.FC<{}> = () => {
  const { handleSubmit, reset, control } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
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
          component="form"
          noValidate
          sx={{ mt: 1 }}
        >
          <form>
            <Stack spacing={2}>
              <Controller
                name={"uid"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    onChange={onChange}
                    value={value}
                    label={"User ID"} />
                )}
              />
              <Controller
                name={"passwd"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    onChange={onChange}
                    value={value}
                    label={"Password"} />
                )}
              />
              <Button
                onClick={handleSubmit(onSubmit)}
              >
                Submit
              </Button>
              <Button onClick={() => reset()} variant={"outlined"}>Reset</Button>
            </Stack>
          </form>
        </Box>
      </Box>
    </Paper>
  );
};

const AuthView = () => {
  return (
    <FormWithHookForm />
  );
};

export default AuthView;