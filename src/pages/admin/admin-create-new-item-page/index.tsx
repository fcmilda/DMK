import React, { useEffect, useState } from 'react';
import { useFormik, FormikConfig } from 'formik';
import * as Yup from 'yup';
import {
  Box, Container, TextField, Typography, Paper, Button, CircularProgress,
} from '@mui/material';
import SectionTitle from 'components/sectiontitle';
import EditIcon from '@mui/icons-material/Edit';
import { useRootDispatch } from 'store/hooks';
import { CreateItem, Item } from 'types';
import { createItemsNewItemAction } from 'store/action-creators';

type CreateNewItemFormikConfig = FormikConfig<CreateItem>;

const validationSchema = Yup.object({
  title: Yup.string()
    .required('Privalomas laukas'),
  description: Yup.string()
    .required('Privalomas laukas')
    .max(44, 'Daugiausiai 44 simboliai'),
  price: Yup.number()
    .required('Privalomas laukas')
    .positive('Turi būti teigiamas skaičius'),
  weight: Yup.number()
    .required('Privalomas laukas')
    .positive('Turi būti teigiamas skaičius'),
  composition: Yup.string()
    .required('Privalomas laukas')
    .min(30, 'Mažiausiai 30 simbolių'),
});

const AdminCreateNewItemPage: React.FC = () => {
  const dispatch = useRootDispatch();
  const initialValues = {
    composition: '',
    description: '',
    img: '',
    price: 0,
    title: '',
    weight: 0,
  };

  const handleSubmitForm: CreateNewItemFormikConfig['onSubmit'] = (item) => {
    console.log(item);
    const createAction = createItemsNewItemAction(item);
    dispatch(createAction);
  };

  const {
    values,
    handleChange,
    handleSubmit,
    errors,
  } = useFormik<CreateItem>({
    initialValues,
    onSubmit: handleSubmitForm,
    validationSchema,
  });
  console.log(errors);
  return (
    <Container sx={{ my: 5 }}>
      <SectionTitle title="Sukurti naują produktą" description="" />
      <Paper
        component="form"
        elevation={3}
        sx={{
          display: 'flex',
          mx: 'auto',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
          p: 3,
          width: 400,
        }}
        onSubmit={handleSubmit}
      >
        <EditIcon color="primary" sx={{ fontSize: 45 }} />
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          width: 1 / 1,
          my: 2,
        }}
        >
          <TextField
            name="title"
            type="text"
            label="Pavadinimas"
            fullWidth
            inputProps={{ autoComplete: 'off' }}
            value={values.title}
            onChange={handleChange}
          // onBlur={ }
          // error={ }
          // helperText={ }
          // disabled={ }
          />
          <TextField
            name="description"
            type="text"
            label="Aprašymas"
            fullWidth
            inputProps={{ autoComplete: 'off' }}
            value={values.description}
            onChange={handleChange}
          // onBlur={ }
          // error={ }
          // helperText={ }
          // disabled={ }
          />
          <TextField
            name="price"
            type="number"
            label="Kaina, €"
            fullWidth
            inputProps={{ autoComplete: 'off' }}
            value={values.price}
            onChange={handleChange}
          />
          <TextField
            name="weight"
            type="number"
            label="Svoris, kg"
            fullWidth
            inputProps={{ autoComplete: 'off' }}
            value={values.weight}
            onChange={handleChange}
          />
          <TextField
            name="composition"
            type="text"
            label="Sudedamosios dalys"
            fullWidth
            inputProps={{ autoComplete: 'off' }}
            value={values.composition}
            onChange={handleChange}
          />
          {/* <TextField
            name="img"
            type="text"
            fullWidth
            inputProps={{ autoComplete: 'off' }}
            value={values.img}
            onChange={handleChange}
          /> */}
        </Box>
        <Button
          variant="contained"
          size="large"
          type="submit"
          // disabled={ }
          sx={{ width: '120px' }}
        >
          {/* {loading ? <CircularProgress size="26px" /> :  */}
          Sukurti
        </Button>
      </Paper>
    </Container>
  );
};

export default AdminCreateNewItemPage;
