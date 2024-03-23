import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, IconButton, MenuItem, Radio, RadioGroup, TextField, Typography, popoverClasses } from '@mui/material';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import React, { useState } from 'react';
import ContentWrapper from '../../../components/ContentWrapper';
import PocMember from '../VendorPocMember';
import { Add as AddIcon } from '@mui/icons-material';
import Pincodes from '../Pincodes';
import HomeCollectionCharges from '../HomeCollectionCharges';
import { useAddVendorMutation } from '../../../api/vendor';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  type: Yup.string().required('Type is required'),
  address: Yup.string().required('Type is required'),
  locality: Yup.string().required('Type is required'),
  city: Yup.string().required('Type is required'),
  state: Yup.string().required('Type is required'),
  supportedPincodes: Yup.array().min(1, 'At least one Supported Pincodes is required'),
  homeCollectionCharges: Yup.array().min(1, 'At least one Home Collection Charges is required'),
  poc: Yup.array().min(1, 'At least one Poc Member is required'),
});

interface Poc {
  name: string
}
const AddVendor: React.FC = () => {
  const [addVendorMutation, { isLoading }] = useAddVendorMutation();
  const [clickedItemIndex, setClickedItemIndex] = useState<number>(-1);
  const [open, setOpen] = useState(false);
  const [clickedItem,setClickedItem] = useState<String>("");

  const handleSubmit = async (values: any) => {
    try {
      console.log(values);
        const payload = {
          ...values
        };
        console.log(payload);
        const apiRes = await addVendorMutation(payload);

        if ('error' in apiRes) {
          throw apiRes.error;
        }
        // console.log(apiRes);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChipClick = (clicked: number) => {
    setClickedItemIndex(clicked); // Set the clicked POC object in the state
  };

  return (
    <ContentWrapper>
      <Formik
        initialValues={{
          name: '',
          type: 'THIRD_PARTY',
          address: '',
          locality: '',
          city: '',
          state: '',
          active:true,
          supportedPincodes:[],
          homeCollectionCharges:[],
          poc:[]
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
                  id='name'
                  name='name'
                  label='Name'
                  value={values.name}
                  onChange={handleChange}
                  error={touched.name && Boolean(errors.name)}
                  helperText={!!touched.name && errors.name}
                />
                <TextField
                  fullWidth
                  variant='standard'
                  id='type'
                  name='type'
                  label='Type'
                  disabled
                  value={values.type}
                  onChange={handleChange}
                  error={touched.type && Boolean(errors.type)}
                  helperText={!!touched.type && errors.type}
                />
                <TextField
                  fullWidth
                  variant='standard'
                  id='address'
                  name='address'
                  label='Address'
                  value={values.address}
                  onChange={handleChange}
                  error={touched.address && Boolean(errors.address)}
                  helperText={!!touched.address && errors.address}
                />
                <TextField
                  fullWidth
                  variant='standard'
                  id='locality'
                  name='locality'
                  label='Locality'
                  value={values.locality}
                  onChange={handleChange}
                  error={touched.locality && Boolean(errors.locality)}
                  helperText={!!touched.locality && errors.locality}
                />
                <TextField
                  fullWidth
                  variant='standard'
                  id='city'
                  name='city'
                  label='City'
                  value={values.city}
                  onChange={handleChange}
                  error={touched.city && Boolean(errors.city)}
                  helperText={!!touched.city && errors.city}
                />
                <TextField
                  fullWidth
                  variant='standard'
                  id='state'
                  name='state'
                  label='State'
                  value={values.state}
                  onChange={handleChange}
                  error={touched.state && Boolean(errors.state)}
                  helperText={!!touched.state && errors.state}
                />
                <Typography variant='h4' component='h1'>
                  <IconButton
                    color='primary'
                    sx={{ marginLeft: 'auto', fontSize: '1rem' }}
                    onClick={()=>{setOpen(true); setClickedItem("supported_pincodes");}}
                  >
                    <AddIcon />
                  </IconButton>
                  Supported Pincodes
                </Typography>
                {errors.supportedPincodes && touched.supportedPincodes && (
                  <Typography variant='body2' color='error'>
                    {errors.supportedPincodes}
                  </Typography>
                )}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {values.supportedPincodes.map((pincode: string, index: number) => (
                    <><Chip
                      key={index}
                      label={pincode}
                      onClick={() => {
                        setOpen(true);
                        handleChipClick(index);
                        setClickedItem("supported_pincodes");
                      }}
                      onDelete={() => {
                        const updatedPincodes = [...values.supportedPincodes];
                        updatedPincodes.splice(index, 1);
                        setFieldValue('supportedPincodes', updatedPincodes);
                      }} />
                    </>
                  ))}
                </Box>
                <Pincodes 
                  open={open && clickedItem === "supported_pincodes" ? true : false}
                  setOpen={setOpen}
                  supported_pincodes={values.supportedPincodes}
                  setFieldValue={setFieldValue}
                  editSupportedPincode={values.supportedPincodes[clickedItemIndex]}
                  editSupportedPincodeIndex={clickedItemIndex}
                  setEditSupportedPincodeIndex={setClickedItemIndex}
                />
                <Typography variant='h4' component='h1'>
                  <IconButton
                    color='primary'
                    sx={{ marginLeft: 'auto', fontSize: '1rem' }}
                    onClick={()=>{setOpen(true); setClickedItem("homeCollectionCharges");}}
                  >
                    <AddIcon />
                  </IconButton>
                  Home Collection Charges
                </Typography>
                {errors.homeCollectionCharges && touched.homeCollectionCharges && (
                  <Typography variant='body2' color='error'>
                    {errors.homeCollectionCharges}
                  </Typography>
                )}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {values.homeCollectionCharges.map((row :any, index: number) => (
                    <><Chip
                      key={index}
                      label={row?.city}
                      onClick={() => {
                        setOpen(true);
                        handleChipClick(index);
                        setClickedItem("homeCollectionCharges");
                      }}
                      onDelete={() => {
                        const updatedHomeCollectionCharges = [...values.homeCollectionCharges];
                        updatedHomeCollectionCharges.splice(index, 1);
                        setFieldValue('homeCollectionCharges', updatedHomeCollectionCharges);
                      }} />
                    </>
                  ))}
                </Box>
                <HomeCollectionCharges 
                  open={open && clickedItem === "homeCollectionCharges" ? true : false}
                  setOpen={setOpen}
                  homeCollectionCharges={values.homeCollectionCharges}
                  setFieldValue={setFieldValue}
                  editHomeCollectionCharge={values.homeCollectionCharges[clickedItemIndex]}
                  editHomeCollectionChargeIndex={clickedItemIndex}
                  setEditHomeCollectionChargeIndex={setClickedItemIndex}
                />
                <Typography variant='h4' component='h1'>
                  <IconButton
                    color='primary'
                    sx={{ marginLeft: 'auto', fontSize: '1rem' }}
                    onClick={()=>{setOpen(true); setClickedItem("poc");}}
                  >
                    <AddIcon />
                  </IconButton>
                  POC
                </Typography>
                {errors.poc && touched.poc && (
                  <Typography variant='body2' color='error'>
                    {errors.poc}
                  </Typography>
                )}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {values.poc.map((row :any, index: number) => (
                    <><Chip
                      key={index}
                      label={row?.name}
                      onClick={() => {
                        setOpen(true);
                        handleChipClick(index);
                        setClickedItem("poc");
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
                  open={open  && clickedItem === "poc" ? true : false}
                  setOpen={setOpen}
                  poc={values.poc}
                  setFieldValue={setFieldValue}
                  editPoc={values.poc[clickedItemIndex]}
                  editPocIndex={clickedItemIndex}
                  setEditPocIndex={setClickedItemIndex}
                />
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




export default AddVendor;
