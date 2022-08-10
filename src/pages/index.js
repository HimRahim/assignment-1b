import * as React from 'react';
import '../styles/styles.css';
import {
  Box,
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

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="table">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Student ID</StyledTableCell>
                <StyledTableCell align="left">Student Name</StyledTableCell>
                <StyledTableCell align="left">Information</StyledTableCell>
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
                    <Link underline="none" href={`#${student.student_id}`}>
                      See more
                    </Link>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {data.directus.students.map((student) => (
        <div className="profile-container" id={student.student_id}>
          <div className="img-container">
            <img
              src={`${imageLink}${student.student_image.filename_disk}`}
              alt="student"
              height={300}
            />
          </div>
          <div className="typo-container">
            <Box sx={{ width: '100%', maxWidth: 500, mt: '60px', ml: '50px' }}>
              <Typography variant="h5" component="div" gutterBottom>
                Student ID: {student.student_id}
              </Typography>
              <Typography variant="h5" component="div" gutterBottom>
                Student Name: {student.student_name}
              </Typography>
              <Typography variant="h5" component="div" gutterBottom>
                Courses:
              </Typography>
              {student.registrations.map((course) => {
                return (
                  <Typography
                    key={course.registrations_id.course_id}
                    variant="h5"
                    component="div"
                    gutterBottom
                  >
                    {course.registrations_id.course_id}{' '}
                    {course.registrations_id.course_name}
                  </Typography>
                );
              })}
            </Box>
          </div>
        </div>
      ))}
    </>
  );
};

export default IndexPage;
