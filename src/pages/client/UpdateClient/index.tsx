import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Chip, FormControl, FormControlLabel, FormLabel, IconButton, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import { Formik, Form, FieldArray, Field } from 'formik';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import * as Yup from 'yup';
import ContentWrapper from '../../../components/ContentWrapper';
import { useGetClientByIdQuery, useUpdateClientMutation } from '../../../api/client';
import PocMember from '../PocMember';
import { Add as AddIcon } from '@mui/icons-material';

const validationSchema = Yup.object({
    companyName: Yup.string().required('Company name is required'),
    legalName: Yup.string().required('Legal name is required'),
    contractStartDate: Yup.date().required('Contract start date is required'),
    contractEndDate: Yup.date().required('Contract end date is required'),
    gstNumber: Yup.string().required('Gst Number is required'),
    poc: Yup.array().of(
        Yup.object().shape({
            name: Yup.string().required('Name is required'),
            email: Yup.string().email().required('Email is required'),
            contact: Yup.string().required('Contact is required').matches(/^[6-9]\d{9}$/, 'Please enter a valid mobile number'),
            designation: Yup.string().required('Designation is required')
        })
    ).min(1, 'At least one Point of Contact is required')
        .test('is-required', 'At least one Point of Contact is required', function (value) {
            return value && value.length > 0;
        }),
    active: Yup.boolean().required('Active status is required'),
    apiIntegrated: Yup.boolean().required('Active status is required')
});


interface Poc {
    name: string,
    email: string,
    contact: string,
    designation: string
}

const UpdateClient: React.FC = () => {
    const { uuid } = useParams<{ uuid: string }>();
    const { data: client, isLoading, isError, refetch } = useGetClientByIdQuery(uuid || '');
    const [updateClientMutation] = useUpdateClientMutation();
    const [open, setOpen] = useState(false);
    const [clickedPoc, setClickedPoc] = useState<number>(-1);


    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>Error loading data</p>;
    }

    if (!client) {
        return <p>No user details found</p>;
    }

    const handleSubmit = async (values: any) => {
        console.log(values);
        try {
            const payload = {
                ...values,
                contractStartDate: values.contractStartDate.toISOString().split('T')[0],
                contractEndDate: values.contractEndDate.toISOString().split('T')[0]
            };
            const apiRes = await updateClientMutation({ uuid: uuid || '', payload });
            console.log(apiRes);
            window.location.reload();
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
                    companyName: '' + client.data.companyName,
                    legalName: '' + client.data.legalName,
                    contractStartDate: new Date(client.data.contractStartDate),
                    contractEndDate: new Date(client.data.contractEndDate),
                    gstNumber: client.data.gstNumber,
                    mou: client.data.mou,
                    active: Boolean(client.data.active),
                    poc: [...client.data.poc],
                    apiIntegrated: Boolean(client.data.apiIntegrated)
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    handleSubmit(values);
                }}
            >
                {({ errors, touched, handleChange, values, setFieldValue }) => (
                    <Box maxWidth='400px' margin='auto'>
                        <Form>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    rowGap: '18px'
                                }}
                            >
                                <TextField
                                    fullWidth
                                    variant='outlined'
                                    id='companyName'
                                    name='companyName'
                                    label='Company Name'
                                    value={values.companyName}
                                    onChange={handleChange}
                                    InputProps={{
                                        color: values.companyName !== client.data.companyName ? 'warning' : 'primary'
                                    }}
                                    focused={values.companyName !== client.data.companyName} // Set focused prop based on the condition
                                    error={touched.companyName && Boolean(errors.companyName)}
                                    helperText={!!touched.companyName && errors.companyName}
                                />
                                <TextField
                                    fullWidth
                                    variant='outlined'
                                    id='legalName'
                                    name='legalName'
                                    label='Legal Name'
                                    value={values.legalName}
                                    onChange={handleChange}
                                    error={touched.legalName && Boolean(errors.legalName)}
                                    helperText={touched.legalName && errors.legalName}
                                    InputProps={{
                                        color: values.legalName !== client.data.legalName ? 'warning' : 'primary'
                                    }}
                                    focused={values.legalName !== client.data.legalName}
                                />
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label='Contract Start Date'
                                        value={dayjs(values.contractStartDate)}
                                        onChange={(newValue: any) => {
                                            setFieldValue('contractStartDate', newValue);
                                        }}

                                    />
                                </LocalizationProvider>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label='Contract End Date'
                                        value={dayjs(values.contractEndDate)}
                                        onChange={(newValue: any) => {
                                            setFieldValue('contractEndDate', newValue);
                                        }}
                                    />
                                </LocalizationProvider>
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
                                {values.poc.length === 0 ? (
                                    <Typography variant='body2' color='error'>
                                        At least one Point of Contact is required
                                    </Typography>
                                ) : null}
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
                                {errors.apiIntegrated && touched.apiIntegrated && (
                                    <Typography variant='body2' color='error'>
                                        {errors.apiIntegrated}
                                    </Typography>
                                )}

                                <Box mt={2}>
                                    <Button
                                        type='submit'
                                        variant='contained'
                                        color='primary'
                                        sx={{ width: '100%' }}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Submitting' : 'Submit'}
                                    </Button>
                                </Box>
                            </Box>
                        </Form>
                    </Box>
                )}
            </Formik>
        </ContentWrapper>
    );
};

export default UpdateClient;
