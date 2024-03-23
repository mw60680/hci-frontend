import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

interface Poc {
  name: string;
  email: string;
  contact: string;
  designation: string;
}

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email().required('Email is required'),
  contact: Yup.string().required('Contact is required').matches(/^[6-9]\d{9}$/, 'Please enter a valid mobile number'),
  designation: Yup.string().required('Designation is required')
});

const PocMember: React.FC<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  poc: Poc[];
  editPoc:Poc | null;
  editPocIndex:number | null;
  setEditPocIndex: React.Dispatch<React.SetStateAction<number>>;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void; // Added setFieldValue
}> = ({ open, setOpen, poc, setFieldValue ,editPoc,editPocIndex,setEditPocIndex}) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>POC Details</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            name: editPoc ? editPoc.name : '',
            email: editPoc ? editPoc.email : '',
            contact: editPoc ? editPoc.contact : '',
            designation: editPoc ? editPoc.designation : ''
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            resetForm();
            if (editPocIndex !== null) {
              const updatedPoc = [...poc.slice(0, editPocIndex), values, ...poc.slice(editPocIndex + 1)];
              setFieldValue('poc', updatedPoc);
            } else {
              const updatedPoc = [...poc, values];
              setFieldValue('poc', updatedPoc); 
            }
            setEditPocIndex(-1);
            setOpen(false);
            
          }}>
          {({ errors, touched, handleChange, values }) => (
            <Form>
              <TextField
                fullWidth
                variant='standard'
                label='Name'
                name='name'
                value={values.name}
                onChange={handleChange}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
              <TextField
                fullWidth
                variant='standard'
                label='Email'
                name='email'
                value={values.email}
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <TextField
                fullWidth
                variant='standard'
                label='Contact'
                name='contact'
                value={values.contact}
                onChange={handleChange}
                error={touched.contact && Boolean(errors.contact)}
                helperText={touched.contact && errors.contact}
              />
              <TextField
                fullWidth
                variant='standard'
                label='Designation'
                name='designation'
                value={values.designation}
                onChange={handleChange}
                error={touched.designation && Boolean(errors.designation)}
                helperText={touched.designation && errors.designation}
              />
              <DialogActions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button type='submit'>{
                  editPoc ? 'Edit' : 'Add'
                }</Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default PocMember;
