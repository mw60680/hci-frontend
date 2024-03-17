import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { applyFilters } from './filter'; // Import the filtering logic

interface User {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const HomePage = () => {
  const [userID, setUserID] = React.useState<string>('');
  const [data, setData] = useState<User[]>([]);
  const [filtering, setFiltering] = useState(false);
  const [filterSelectData, setFilterSelectData] = useState('0');
  const [searchData, setSearchData] = useState('');
  const [page, setPage] = useState(1);
  const [originalData, setOriginalData] = useState<User[]>([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos').then((res) => {
      if (!filtering) {
        setOriginalData(res.data as User[]);
        setData(res.data as User[]);
        setFiltering(true);
      }
    });
  }, [filtering]);

  const handleSelect = (event: SelectChangeEvent) => {
    setFilterSelectData(event.target.value as string);
    setUserID(event.target.value as string);
    const filteredData = applyFilters(originalData, event.target.value as string, searchData);
    setData(filteredData);
    setPage(1);
  };

  const handlePage = (event: any, p: any) => {
    setPage(p);
  };

  const handleSearch = (event: any) => {
    setSearchData(event.target.value);
    const filteredData = applyFilters(originalData, filterSelectData, event.target.value);
    setData(filteredData);
    setPage(1);
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <TableContainer component={Paper}>
        <Box sx={{ display: 'flex', flexDirection: 'row', marginLeft: '1%', marginTop: '2%', gap: '10%' }}>
          <TextField id='outlined-basic' label='Search' variant='outlined' onChange={handleSearch} size='small' />
          <Box sx={{ width: '10%' }}>
            <FormControl fullWidth size='small'>
              <InputLabel id='demo-simple-select-label'>UserID</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={userID}
                label='UserId'
                onChange={handleSelect}>
                <MenuItem value={0}>All</MenuItem>
                {[...Array(10)].map((_, index) => (
                  <MenuItem key={index + 1} value={String(index + 1)}>
                    {index + 1}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align='center'>ID</TableCell>
              <TableCell align='center'>UserID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(10 * (page - 1), (page - 1) * 10 + 10).map((row) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component='th' scope='row'>
                  {row.title}
                </TableCell>
                <TableCell align='center'>{row.id}</TableCell>
                <TableCell align='center'>{row.userId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <Pagination count={Math.ceil(data.length / 10)} color='primary' onChange={handlePage} page={page} />
      </div>
    </Box>
  );
};

export default HomePage;
