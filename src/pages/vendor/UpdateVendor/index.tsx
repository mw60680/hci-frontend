import {
  Box,
  Button,
  Chip,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from '@mui/material';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import React, { useState } from 'react';
import ContentWrapper from '../../../components/ContentWrapper';
import PocMember from '../VendorPocMember';
import { Add as AddIcon } from '@mui/icons-material';
import Pincodes from '../Pincodes';
import HomeCollectionCharges from '../HomeCollectionCharges';
import { useGetVendorByIdQuery, useUpdateVendorMutation } from '../../../api/vendor';
import { useParams } from 'react-router-dom';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  type: Yup.string().required('Type is required'),
  address: Yup.string().required('Type is required'),
  locality: Yup.string().required('Type is required'),
  city: Yup.string().required('Type is required'),
  state: Yup.string().required('Type is required'),
  supportedPincodes: Yup.array().min(1, 'At least one Supported Pincodes is required'),
  homeCollectionCharges: Yup.array().min(1, 'At least one Home Collection Charges is required'),
  poc: Yup.array().min(1, 'At least one Poc Member is required')
});

interface Poc {
  name: string;
}
const UpdateVendor: React.FC = () => {
  const { uuid } = useParams<{ uuid: string }>();
  const { data: vendor, isError, isLoading, refetch } = useGetVendorByIdQuery(uuid || '');
  const [updateVendorMutation] = useUpdateVendorMutation();
  const [clickedItemIndex, setClickedItemIndex] = useState<number>(-1);
  const [open, setOpen] = useState(false);
  const [clickedItem, setClickedItem] = useState<string>('');
  const handleSubmit = async (values: any) => {
    try {
      const payload = {
        ...values
      };
      console.log(payload);
      const apiRes = await updateVendorMutation({ uuid: uuid || '', payload });
      console.log(apiRes);
      if ('error' in apiRes) {
        throw apiRes.error;
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading data</p>;
  }

  if (!vendor) {
    return <p>No user details found</p>;
  }

  const handleChipClick = (clicked: number) => {
    setClickedItemIndex(clicked); // Set the clicked POC object in the state
  };

  return (
    <ContentWrapper>
      <Formik
        initialValues={{
          name: '' + vendor.data.name,
          type: '' + vendor.data.type,
          address: '' + vendor.data.address,
          locality: '' + vendor.data.locality,
          city: '' + vendor.data.city,
          state: '' + vendor.data.state,
          active: Boolean(vendor.data.active),
          supportedPincodes: [...vendor.data.supported_pincodes],
          homeCollectionCharges: [...vendor.data.home_collection_charges],
          poc: [...vendor.data.poc]
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
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
                  InputProps={{
                    color: values.name !== vendor.data.name ? 'warning' : 'primary'
                  }}
                  focused={values.name !== vendor.data.name}
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
                  InputProps={{
                    color: values.address !== vendor.data.address ? 'warning' : 'primary'
                  }}
                  focused={values.address !== vendor.data.address}
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
                  InputProps={{
                    color: values.locality !== vendor.data.locality ? 'warning' : 'primary'
                  }}
                  focused={values.locality !== vendor.data.locality}
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
                  InputProps={{
                    color: values.city !== vendor.data.city ? 'warning' : 'primary'
                  }}
                  focused={values.city !== vendor.data.city}
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
                  InputProps={{
                    color: values.state !== vendor.data.state ? 'warning' : 'primary'
                  }}
                  focused={values.state !== vendor.data.state}
                />
                <Typography variant='h4' component='h1'>
                  <IconButton
                    color='primary'
                    sx={{ marginLeft: 'auto', fontSize: '1rem' }}
                    onClick={() => {
                      setOpen(true);
                      setClickedItem('supported_pincodes');
                    }}>
                    <AddIcon />
                  </IconButton>
                  Supported Pincodes
                </Typography>
                {values.supportedPincodes.length === 0 ? (
                  <Typography variant='body2' color='error'>
                    At least one Supported Pincodes is required
                  </Typography>
                ) : null}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {values.supportedPincodes.map((pincode: string, index: number) => (
                    <>
                      <Chip
                        key={index}
                        label={pincode}
                        onClick={() => {
                          setOpen(true);
                          handleChipClick(index);
                          setClickedItem('supported_pincodes');
                        }}
                        onDelete={() => {
                          const updatedPincodes = [...values.supportedPincodes];
                          updatedPincodes.splice(index, 1);
                          setFieldValue('supportedPincodes', updatedPincodes);
                        }}
                      />
                    </>
                  ))}
                </Box>
                <Pincodes
                  open={open && clickedItem === 'supported_pincodes' ? true : false}
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
                    onClick={() => {
                      setOpen(true);
                      setClickedItem('homeCollectionCharges');
                    }}>
                    <AddIcon />
                  </IconButton>
                  Home Collection Charges
                </Typography>
                {values.homeCollectionCharges.length === 0 ? (
                  <Typography variant='body2' color='error'>
                    At least one Home Collection Charges is required
                  </Typography>
                ) : null}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {values.homeCollectionCharges.map((row: any, index: number) => (
                    <>
                      <Chip
                        key={index}
                        label={row?.city}
                        onClick={() => {
                          setOpen(true);
                          handleChipClick(index);
                          setClickedItem('homeCollectionCharges');
                        }}
                        onDelete={() => {
                          const updatedHomeCollectionCharges = [...values.homeCollectionCharges];
                          updatedHomeCollectionCharges.splice(index, 1);
                          setFieldValue('homeCollectionCharges', updatedHomeCollectionCharges);
                        }}
                      />
                    </>
                  ))}
                </Box>
                <HomeCollectionCharges
                  open={open && clickedItem === 'homeCollectionCharges' ? true : false}
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
                    onClick={() => {
                      setOpen(true);
                      setClickedItem('poc');
                    }}>
                    <AddIcon />
                  </IconButton>
                  POC
                </Typography>
                {values.poc.length === 0 ? (
                  <Typography variant='body2' color='error'>
                    At least one Point of Contact is required
                  </Typography>
                ) : null}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {values.poc.map((row: any, index: number) => (
                    <>
                      <Chip
                        key={index}
                        label={row?.name}
                        onClick={() => {
                          setOpen(true);
                          handleChipClick(index);
                          setClickedItem('poc');
                        }}
                        onDelete={() => {
                          const updatedPoc = [...values.poc];
                          updatedPoc.splice(index, 1);
                          setFieldValue('poc', updatedPoc);
                        }}
                      />
                    </>
                  ))}
                </Box>
                <PocMember
                  open={open && clickedItem === 'poc' ? true : false}
                  setOpen={setOpen}
                  poc={values.poc}
                  setFieldValue={setFieldValue}
                  editPoc={values.poc[clickedItemIndex]}
                  editPocIndex={clickedItemIndex}
                  setEditPocIndex={setClickedItemIndex}
                />
                <FormControl>
                  <FormLabel id='demo-row-radio-buttons-group-label'>Active</FormLabel>
                  <RadioGroup
                    aria-labelledby='demo-row-radio-buttons-group-label'
                    name='active'
                    value={values.active.toString()}
                    onChange={handleChange}
                    sx={{ flexDirection: 'row' }}>
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

export default UpdateVendor;
