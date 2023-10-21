"use client"
import React,{useState} from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const FormSend = () => {
  const [file,setfile] = useState(null)
  const [name,setName] = useState('')
  const [message,setMessage] =useState('')

 



  const handleSubmit = async(event) => {
    event.preventDefault();
    if(!file) return

    try{
      const data = new FormData()
      data.set('file' , file)

      const res = await fetch('/api/readPdf' ,{
        method:'POST',
        body:data
      })
      const response = await res.json()
      setName(response?.name || ''); 
      setMessage(response?.message || '');
      
    }catch(err){
      console.log(err.message);
    }
   
  };

  return (
    <Box sx={{
      display: 'flex',   
      flexDirection:'column',
      alignItems: 'center',
      justifyContent: 'center',
      height:'100vh',
      gap:'2rem'
    }}>
    <Box
      
    >
      <form onSubmit={handleSubmit} style={{display:'flex' ,alignItems:'center',justifyContent:'center',gap:'2rem'}}>
        
        
        <input
          type="file"
          id="file-upload"
          accept=".pdf,.doc,.docx"
          style={{ display: 'none' }}
          onChange={(e)=>setfile(e.target.files[0])}
        />
        
        <label htmlFor="file-upload">
          <Button
            variant="contained"
            color="primary"
            component="span"
          >
            Upload File
          </Button>
        </label>
        
        <Typography variant="subtitle1" marginRight='5rem' >
          Selected File: {file?.name}
        </Typography>
        
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Box>
    <Box sx={{display:'flex',gap:'2rem'}}>
      <TextField  
      label="Name"
      sx={{width:'200px'}}
      value={name}
      />
      <TextField 
      label="Message"
      
      InputProps={{
        style:{
          width:'200px',height:'300px',    
        }
      }}
      value={message}
      />
      
      </Box>
    </Box>
  );
};

export default FormSend;
