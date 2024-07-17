"use client"

import { useState} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import LoginInputs from  './LoginInputs';
import UseAth from '../../hooks/UseAth';
import { useContext } from 'react';
import { AuthContext } from './context/AthContext';
import { Alert } from '@mui/material';
import {CircularProgress} from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function LoginModal({isSignin}:{isSignin:boolean}) {
  const {data , error , loading} = useContext(AuthContext)
  const [open, setOpen] =useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {SignIn} = UseAth()
  let [inputs , setinputs] = useState({
    firstname:"",
    lastname:"",
    email:"",
    phone:"",
    city:"",
    password:""

  })
  const handelchange = (event:React.ChangeEvent<HTMLInputElement>)=>{
    setinputs({
      ...inputs,
      [event.target.name]:event.target.value
    })
  }

  return (
    <div>
   <button
            className={` ${isSignin ? 'bg-blue-400 text-white border p-1 px-4 rounded mr-3': 'border p-1 px-4 rounded'}`}
     onClick={handleOpen}     >
           {isSignin ? "SignIn" : "SignUp"}
          </button>
          {error ? <Alert severity="error">{error}</Alert> : null}
     {loading ? <div><CircularProgress /></div>: 
     
     
     <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h4 style={{textAlign:"center"}}>{isSignin ? 'SignIn' : 'Create Your Account'}</h4>
         <LoginInputs  inputs={inputs} handelchange={handelchange} isSignin={isSignin} />
       
        </Box>
      </Modal>
  
   
 }
   </div>

  );
}