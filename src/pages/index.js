import * as React from 'react';
import TextField from '@mui/material/TextField';
import '../styles/styles.css';
import {
  Box,
  Button,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { useStaticQuery, graphql } from 'gatsby';
import Navbar from '../components/Navbar';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const imageLink = 'https://g3yw4g18.directus.app/assets/';

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query MyQuery {
      directus {
        students {
          student_id
          student_name
          student_image {
            filename_disk
          }
          registrations {
            registrations_id {
              course_id
              course_name
              day
              schedule
            }
          }
        }
      }
    }
  `);
  console.log(data.directus.students[0]);

  const [stdId, setStdId] = React.useState('');
  const [stdName, setStdName] = React.useState('');
  const [selectedStd, setSelectedStd] = React.useState(null);
  const [renderProfile, setRenderProfile] = React.useState(false);
  const [renderTable, setRenderTable] = React.useState(true);

  const handleSubmit = () => {
    if (stdName.length === 0 || stdId.length === 0) return;
    console.log(stdName);
  };

  console.log(selectedStd);

  return (
    <>
      <div>
        <Navbar />
      </div>
      {/* <div className="container">
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '50ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="std-id"
            label="Student ID"
            variant="outlined"
            onChange={(e) => setStdId(e.target.value)}
          />
          <br />
          <TextField
            id="std-name"
            label="Student Name"
            variant="outlined"
            onChange={(e) => setStdName(e.target.value)}
          />
          <br />
        </Box>
        <div className="btn-group">
          <Button variant="contained" onClick={handleSubmit}>
            Search
          </Button>
        </div>
      </div> */}

      {renderTable && (
        <div className="table">
          {/* <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Student ID</TableCell>
              <TableCell align="center">Student Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.directus.students.map((student) => (
              <TableRow
                key={student.student_id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {student.student_id}
                </TableCell>
                <TableCell align="center">{student.student_name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Student ID</StyledTableCell>
                  <StyledTableCell align="left">Student Name</StyledTableCell>
                  <StyledTableCell align="left">Information</StyledTableCell>
                  {/* <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.directus.students.map((student) => (
                  <StyledTableRow key={student.student_id}>
                    <StyledTableCell component="th" scope="row">
                      {student.student_id}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {student.student_name}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <Button
                        onClick={() => {
                          setSelectedStd(student);
                          setRenderTable(false);
                          setRenderProfile(true);
                        }}
                      >
                        See more
                      </Button>
                    </StyledTableCell>
                    {/* <StyledTableCell align="right">
                    {student.student_id}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {student.student_id}
                  </StyledTableCell> */}
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}

      {renderProfile && (
        <div className="profile-container">
          <div className="img-container">
            <img
              src={`${imageLink}${selectedStd.student_image.filename_disk}`}
              alt="student image"
              height={300}
            />
          </div>
          <div className="type-container">
            <Box sx={{ width: '100%', maxWidth: 500, mt: '60px', ml: '50px' }}>
              <Typography variant="h5" component="div" gutterBottom>
                Student ID: {selectedStd.student_id}
              </Typography>
              <Typography variant="h5" component="div" gutterBottom>
                Student Name: {selectedStd.student_name}
              </Typography>
              <Typography variant="h5" component="div" gutterBottom>
                Courses:
              </Typography>
              {selectedStd.registrations.map((course) => {
                return (
                  <Typography key={course.registrations_id.course_id} variant="h5" component="div" gutterBottom>
                    {course.registrations_id.course_id}{' '}
                    {course.registrations_id.course_name}
                  </Typography>
                );
              })}
            </Box>
            <Button
              sx={{ ml: '250px', mt: '50px' }}
              variant="contained"
              color="error"
              onClick={() => {
                setRenderProfile(false)
                setRenderTable(true)
              }}
            >
              Back
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default IndexPage;
