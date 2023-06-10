import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios';
import "./table.css"
import YourComponent from './text';
import InsightsIcon from '@mui/icons-material/Insights';
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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function CustomizedTables() {
  const [url, setUrl] = React.useState("")
  const [urldata,setUrldata] = React.useState([])
  const setData = async () => {
   await axios.post('http://127.0.0.1:8000/webcount/word_count',{'url': url,"like": true})
      .then(response => {
        // Handle successful response
        console.log(response.data?.message);
        window.location.reload();
      })
      .catch(error => {
        // Handle error
        console.error(error);
      });
  }
  const getData = async () => {
   await axios.get('http://127.0.0.1:8000/webcount/fetch')
      .then(response => {
        // Handle successful response
        console.log(response.data['message']);
        setUrldata(response.data['message'])
      })
      .catch(error => {
        // Handle error
        console.error(error);
      });
  }
  const updateLikes = async (url,likes) => {
    await axios.put(`http://127.0.0.1:8000/webcount/update_likes?url=${url}&like=${likes}`)
    .then(response => {
      // Handle successful response
      console.log(response.data?.message);
      window.location.reload();
    })
    .catch(error => {
      // Handle error
      console.error(error);
    });
   }
   const Deletedata = async (url,likes) => {
    await axios.delete(`http://127.0.0.1:8000/webcount/delete?url=${url}`)
    .then(response => {
      // Handle successful response
      console.log(response.data?.message);
      window.location.reload();
    })
    .catch(error => {
      // Handle error
      console.error(error);
    });
   }
  React.useEffect(() => {
    getData()
      }, [])

    console.log(urldata);
  return (
    <div>
      <div className='input'>
      <TextField id="outlined-basic" label="Enter Url" variant="outlined" onChange={e=>setUrl(e.target.value)}/>
      <Button variant="outlined"   align="right" onClick={setData} startIcon={<InsightsIcon />}>
  get insites
</Button>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Domain</StyledTableCell>

              <StyledTableCell align="right">Word count</StyledTableCell>
              <StyledTableCell align="right">Favorite</StyledTableCell>
              <StyledTableCell align="right">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
           
            {
           
                    urldata?.map((key) => (
          
                        <StyledTableRow key={key.url}>
                          <StyledTableCell component="th" scope="row">
                            {key.url}
                          </StyledTableCell>
                          <StyledTableCell align="right">{key.word_count}</StyledTableCell>
                          {/* <StyledTableCell align="right">{row.fat}</StyledTableCell> */}
                   
                          <StyledTableCell component="th" scope="row">
                          <Button variant="outlined" align="right" onClick={()=>updateLikes(key?.url,key.like)}>
                {key.like ? "True " : "False"}
                 </Button>
                          </StyledTableCell>
                          <StyledTableCell component="th" scope="row">
                          <Button variant="outlined" align="right" onClick={()=>Deletedata(key?.url)} startIcon={<DeleteIcon />}>
                 Delete
                </Button>
                          </StyledTableCell>
              
            
                        </StyledTableRow>
           
                        
                    ))
                  
          
            
            
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
