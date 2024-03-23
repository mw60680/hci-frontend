import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, IconButton, Box } from '@mui/material';
import { Formik, FieldArray, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

interface Poc {
  name: string;
  email: string[];
  contact: string[];
  designation: string;
}

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.array()
    .of(Yup.string().email('Invalid email address').required('Email is required')),
  contact: Yup.array()
    .of(Yup.string().required('Contact is required').matches(/^[6-9]\d{9}$/, 'Please enter a valid mobile number')),
  designation: Yup.string().required('Designation is required')
});

const PocMember: React.FC<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  poc: Poc[];
  editPoc: Poc;
  editPocIndex: number;
  setEditPocIndex: React.Dispatch<React.SetStateAction<number>>;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}> = ({ open, setOpen, poc, setFieldValue, editPoc, editPocIndex, setEditPocIndex }) => {
  return (
    <Dialog open={open} onClose={() => {setEditPocIndex(-1); setOpen(false)}} fullWidth>
      <DialogTitle>POC Details</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            name: editPoc ? editPoc.name : '',
            email: editPoc ? editPoc.email : [''],
            contact: editPoc ? editPoc.contact : [''],
            designation: editPoc ? editPoc.designation : ''
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            resetForm();
            if (editPocIndex !== -1) {
              poc[editPocIndex] = values;
              setFieldValue('poc', poc);  
            } else {
              console.log("hii");
              const updatedPoc = [...poc, values];
              setFieldValue('poc', updatedPoc);
              console.log(poc);
            }
            setEditPocIndex(-1);
            setOpen(false);
          }}>
          {({ errors, touched, handleChange, values, validateForm }) => (
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
              <FieldArray name="email">
                {({ push, remove }) => (
                  <div>
                    {values.email.map((email, index) => (
                      <Box key={index} display="flex" alignItems="center">
                        <Field name={`email.${index}`}>
                          {({ field }: { field: any }) => (
                            <TextField
                              fullWidth
                              variant='standard'
                              label={`Email ${index + 1}`}
                              {...field}
                              error={touched.email && errors.email && errors.email[index]}
                              helperText={touched.email && errors.email && errors.email[index]}
                            />
                          )}
                        </Field>
                        {index !== 0 && (
                          <IconButton onClick={() => remove(index)}>
                            <DeleteIcon />
                          </IconButton>
                        )}
                      </Box>
                    ))}
                    <IconButton onClick={async () => {
                      await validateForm();
                      push('');
                    }} sx={{ fontSize: 'small' }}>
                      <AddIcon /> Add Email
                    </IconButton>
                  </div>
                )}
              </FieldArray>
              <FieldArray name="contact">
                {({ push, remove }) => (
                  <div>
                    {values.contact.map((contact, index) => (
                      <Box key={index} display="flex" alignItems="center">
                        <Field name={`contact.${index}`}>
                          {({ field }: { field: any }) => (
                            <TextField
                              fullWidth
                              variant='standard'
                              label={`Contact ${index + 1}`}
                              {...field}
                              error={touched.contact && errors.contact && errors.contact[index]}
                              helperText={touched.contact && errors.contact && errors.contact[index]}
                            />
                          )}
                        </Field>
                        {index !== 0 && (
                          <IconButton onClick={() => remove(index)}>
                            <DeleteIcon />
                          </IconButton>
                        )}
                      </Box>
                    ))}
                    <IconButton onClick={async () => {
                      await validateForm();
                      push('');
                    }} sx={{ fontSize: 'small' }}>
                      <AddIcon /> Add Contact
                    </IconButton>
                  </div>
                )}
              </FieldArray>
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
                <Button onClick={() => { setEditPocIndex(-1); setOpen(false) }}>Cancel</Button>
                <Button type='submit'>{editPoc ? 'Edit' : 'Add'}</Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default PocMember;
