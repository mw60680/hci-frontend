import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, IconButton, MenuItem, Radio, RadioGroup, TextField, Typography, popoverClasses } from '@mui/material';
import * as Yup from 'yup';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Formik, Form } from 'formik';
import React, { useState } from 'react';
import ContentWrapper from '../../../components/ContentWrapper';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useAddClientsMutation } from '../../../api/client';
import PocMember from '../PocMember';
import { Add as AddIcon } from '@mui/icons-material';

const validationSchema = Yup.object({
  companyName: Yup.string().required('Company name is required'),
  legalName: Yup.string().required('Legal name is required'),
  contractStartDate: Yup.date().required('Contract start date is required'),
  contractEndDate: Yup.date().required('Contract end date is required'),
  gstNumber: Yup.string().required('Gst Number is required'),
  mou: Yup.string().required('Mou Number is required'),
  poc: Yup.array().min(1, 'At least one Point of Contact is required'),
  active: Yup.boolean().required('Active status is required'),
  apiDocuments: Yup.string()
});

interface Poc {
  name: string,
  email: string,
  contact: string,
  designation: string
}
const AddClient: React.FC = () => {
  const [addUserMutation, { isLoading }] = useAddClientsMutation();
  const [clickedPoc, setClickedPoc] = useState<number>(-1);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (values: any) => {
    try {
      console.log(values.contractStartDate.toISOString().split('T')[0]);
      const payload = {
        ...values,
        contractStartDate: values.contractStartDate.toISOString().split('T')[0],
        contractEndDate: values.contractEndDate.toISOString().split('T')[0]
      };
      console.log(payload);
      const apiRes = await addUserMutation(payload);

      if ('error' in apiRes) {
        throw apiRes.error;
      }
      // console.log(apiRes);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChipClick = (clickedPoc: number) => {
    setClickedPoc(clickedPoc); // Set the clicked POC object in the state
  };

  return (
    <ContentWrapper>
      <Formik
        initialValues={{
          companyName: '',
          legalName: '',
          contractStartDate: new Date(),
          contractEndDate: new Date(),
          gstNumber: '',
          mou: '',
          destigation: 'Test',
          active: true,
          apiIntegrated: true,
          apidocuments: [],
          poc: []
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          console.log('hi');
          handleSubmit(values);
          resetForm();
        }}>
        {({ errors, touched, handleChange, values, setFieldValue, handleBlur }) => (
          <Box maxWidth='400px' margin='auto'>
            <Form>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  rowGap: '18px'
                }}>
                <TextField
                  fullWidth
                  variant='standard'
                  id='companyName'
                  name='companyName'
                  label='Company Name'
                  value={values.companyName}
                  onChange={handleChange}
                  error={touched.companyName && Boolean(errors.companyName)}
                  helperText={!!touched.companyName && errors.companyName}
                />
                <TextField
                  fullWidth
                  variant='standard'
                  id='legalName'
                  name='legalName'
                  label='Legal Name'
                  onChange={handleChange}
                  value={values.legalName}
                  error={touched.legalName && Boolean(errors.legalName)}
                  helperText={!!touched.legalName && errors.legalName}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label='ContractStartDate'
                    value={dayjs(values.contractStartDate)}
                    onChange={(newValue: any) => setFieldValue('contractStartDate', newValue)}
                  />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label='ContractEndDate'
                    value={dayjs(values.contractEndDate)}
                    onChange={(newValue: any) => setFieldValue('contractEndDate', newValue)}
                  />
                </LocalizationProvider>
                <TextField
                  fullWidth
                  variant='standard'
                  id='gstNumber'
                  name='gstNumber'
                  label='Gst Number'
                  onChange={handleChange}
                  value={values.gstNumber}
                  error={touched.gstNumber && Boolean(errors.gstNumber)}
                  helperText={!!touched.gstNumber && errors.gstNumber}
                />
                <TextField
                  fullWidth
                  variant='standard'
                  id='mou'
                  name='mou'
                  label='MOU'
                  onChange={handleChange}
                  value={values.mou}
                  error={touched.mou && Boolean(errors.mou)}
                  helperText={!!touched.mou && errors.mou}
                />
                <Typography variant='h4' component='h1'>

                  <IconButton
                    color='primary'
                    onClick={() => setOpen(true)}
                    sx={{ marginLeft: 'auto', fontSize: '1rem' }}
                  >
                    <AddIcon />
                  </IconButton>
                  POC Details
                </Typography>
                {errors.poc && touched.poc && (
                  <Typography variant='body2' color='error'>
                    {errors.poc}
                  </Typography>
                )}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {values.poc.map((poc: Poc, index: number) => (
                    <><Chip
                      key={index}
                      label={poc.name}
                      onClick={() => {
                        setOpen(true);
                        handleChipClick(index);
                      }}
                      onDelete={() => {
                        const updatedPoc = [...values.poc];
                        updatedPoc.splice(index, 1);
                        setFieldValue('poc', updatedPoc);
                      }} />
                    </>
                  ))}
                </Box>
                <PocMember
                  open={open}
                  setOpen={setOpen}
                  poc={values.poc}
                  setFieldValue={setFieldValue}
                  editPoc={values.poc[clickedPoc]}
                  editPocIndex={clickedPoc}
                  setEditPocIndex={setClickedPoc}
                />
                <FormControl>
                  <FormLabel id='demo-row-radio-buttons-group-label'>Active</FormLabel>
                  <RadioGroup
                    aria-labelledby='demo-row-radio-buttons-group-label'
                    name='active'
                    value={values.active.toString()}
                    onChange={handleChange}
                    sx={{ flexDirection: 'row' }}
                  >
                    <FormControlLabel value={true} control={<Radio />} label='True' />
                    <FormControlLabel value={false} control={<Radio />} label='False' />
                  </RadioGroup>
                </FormControl>
                {errors.active && touched.active && (
                  <Typography variant='body2' color='error'>
                    {errors.active}
                  </Typography>
                )}
                <FormControl>
                  <FormLabel id='demo-row-radio-buttons-group-label'>Api Integrated</FormLabel>
                  <RadioGroup
                    aria-labelledby='demo-row-radio-buttons-group-label'
                    name='apiIntegrated'
                    value={values.apiIntegrated.toString()}
                    onChange={handleChange}
                    sx={{ flexDirection: 'row' }}
                  >
                    <FormControlLabel value={true} control={<Radio />} label='True' />
                    <FormControlLabel value={false} control={<Radio />} label='False' />
                  </RadioGroup>
                </FormControl>
                {errors.active && touched.active && (
                  <Typography variant='body2' color='error'>
                    {errors.active}
                  </Typography>
                )}
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  sx={{ width: '50%', margin: 'auto' }}
                  disabled={isLoading}>
                  {isLoading ? 'Submitting' : 'Submit'}
                </Button>
              </Box>
            </Form>
          </Box>
        )}
      </Formik>
    </ContentWrapper>
  );
};




export default AddClient;
