import * as React from 'react';
import { TextField } from '@mui/material'
import Button from '@mui/material/Button';
import './App.css'
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function createData(stage, stands, calories) {
  return { stage, stands, calories };
}

const rows = [
  createData('You need to feed your body', 'Underweight', 'Below 18.5'),
  createData('You got a good body', 'Normal', '18.5 – 24.9'),
  createData('Your body need more healthy habits', 'Overweight', '25 - 29.9'),
  createData('Your body consumed too much, take control', 'Obesity ', 'Above 29.9')
];

function App() {

  const [weight, setWeight] = useState("")
  const [height, setHeight] = useState("")
  const [isWeight, setIsWeight] = useState(true)
  const [isHeight, setIsHeight] = useState(true)
  const [bmi, setBmi] = useState(0)
  const [bmiCategory, setBmiCategory] = useState("");


  const getColor = () => {
    if (bmi < 18.5) return "blue"; // Weak - Blue
    if (bmi >= 18.5 && bmi <= 24.9) return "green"; // Normal - Green
    if (bmi >= 25 && bmi <= 29.9) return "orange"; // Overweight - Orange
    return "red"; // Obese - Red
  };


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const validate = (e) => {
    const { name, value } = e.target
    console.log(name);
    console.log(value);

    if (!!value.match('^[0-9.]*$')) {
      if (name == 'weight') {
        setWeight(value)
        setIsWeight(true)

      }
      else {
        setHeight(value)
        setIsHeight(true)
      }
    }
    else {
      if (name == 'weight') {
        setWeight(value)
        setIsWeight(false)

      }
      else {
        setHeight(value)
        setIsHeight(false)
      }

    }


  }




  const handleReset = () => {
    setWeight("")
    setHeight("")
    setIsWeight(true)
    setIsHeight(true)
    setBmi(0)
    setBmiCategory("");
  }

  const calculate = () => {
    const calculatedBmi = Math.floor((weight / ((height / 100) ** 2)) * 100) / 100
    setBmi(calculatedBmi);

    let category = "";
    if (calculatedBmi < 18.5) {
      category = "You need to feed your body";
    } else if (calculatedBmi >= 18.5 && calculatedBmi <= 24.9) {
      category = "You got a good body";
    } else if (calculatedBmi >= 25 && calculatedBmi <= 29.9) {
      category = "Your body need more healthy habits";
    } else {
      category = "Your body consumed too much, take control";
    }
    setBmiCategory(category);

  }


  return (
    <>
      <div className="row container-fluid p-0 m-0" style={{ backgroundColor: 'white' }}>
        <div className="col-md-6" style={{ backgroundColor: 'rgb(229, 185, 185)', height: '100vh', textAlign: 'center' }} >
          <h1 style={{ fontSize: "80px", fontWeight: '800', paddingTop: '100px', color: 'rgb(255, 255, 255);', textShadow: '1px 1px 1px black' }}>Know Your Body</h1>
          <p style={{ fontSize: "40px", fontWeight: '600', paddingTop: '10px', color: 'black', textShadow: '1px 1px 1px white' }}>BMI Calculator</p>
          <div className='flex-column ' style={{ height: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className='bg-black  p-4 d-flex justify-content-center align-items-center flex-column rounded' style={{ height: '200px', width: '50%' }}>
              <p className='text-white' >Your BMI</p>
              <h2 className='text-white' style={{ fontWeight: '600' }}>{bmi}</h2>
              <h5 style={{ color: getColor() }}>{bmiCategory}</h5>
            </div>
            <div className='mt-3  w-50'>
              <TextField id="outlined-basic" value={weight} name='weight' className='w-100' label="Weight in kg" variant="outlined" onChange={(e) => validate(e)} />
              {!isWeight && <p className='text-danger text-start '>*Invalid Input</p>}
            </div>
            <div className='mt-3 flex-column w-50'>
              <TextField id="outlined-basic" value={height} name='height' className='w-100' label="Height in cm" variant="outlined" onChange={(e) => validate(e)} />
              {!isHeight && <p className='text-danger text-start '>*Invalid Input</p>}
            </div>
            <div className='mt-3 d-flex justify-content-between w-50'>
              <Button disabled={isWeight && isHeight ? false : true} variant="contained" className='p-3' style={{ color: 'white', backgroundColor: 'black' }} onClick={calculate} >Calculate</Button>
              <Button variant="outlined" className='p-3' style={{ color: 'black', border: '1px solid black' }} onClick={handleReset} >Clear</Button>

            </div>

          </div>

        </div>



        <div className="col-md-6 ">
          <div className='p-5 d-flex justify-content-center align-items-baseline' style={{ backgroundImage: 'url("https://www.billabonghighschool.com/wp-content/uploads/2024/08/Top-Nutrition-Questions-from-Moms.jpg")', width: '100%', height: '100vh', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'contain' }}>


            <Button onClick={handleOpen} className='mt-5' style={{ fontSize: '30px', color: 'pink', border: '1px solid pink', textShadow: '0px 0px 1px black' }}>Check BMI Levels</Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" style={{ color: 'black' }}>
                  BMI Check
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 250 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Stage</TableCell>
                          <TableCell>Stands</TableCell>
                          <TableCell align="right">BMI Levels</TableCell>

                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => (
                          <TableRow
                            key={row.stage}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="row">
                              {row.stage}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {row.stands}
                            </TableCell>
                            <TableCell align="right">{row.calories}</TableCell>

                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Typography>
              </Box>
            </Modal>


          </div>
          <p style={{ position: 'absolute', bottom: '10px', right: '10px', margin: 0, color: 'black' }}>
            Copyright ©️ 2024 Chandana Balachandran. All rights reserved.
          </p>
        </div>
      </div>

    </>
  )
}

export default App
