import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Button} from '@material-ui/core';
import { getData } from '../../Services/NodeServices';

const AccordionStyle = {
  '&:before': {
    backgroundColor: 'transparent !important',
    border: 'none',

  },
};

export default function FilterComponent(props) {

  const fetchAllProductsLowToHigh = async () => {

    var result = await getData('userinterface/display_all_products_LTH')
    props.setProductList(result.data)

  }

  const handleRadioLTH = () => {
    fetchAllProductsLowToHigh()
  }

  const fetchAllProductsHighToLow = async () => {

    var result = await getData('userinterface/display_all_products_HTL')
    props.setProductList(result.data)

  }

  const handleRadioHTL = () => {
    fetchAllProductsHighToLow()
  }

  return (
    <Box
      sx={{
        
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 260,
          height: 600,
        },
      }}
    >
      <Paper elevation={1} style={{background:'#121212'}}>

        <div style={{ fontSize: '18px', letterSpacing: '1px', fontWeight: 600, textTransform: 'uppercase', marginLeft: '3%',color:'#fff' }}>
          <p>SORT BY</p>
        </div>


        

        <Accordion sx={AccordionStyle} elevation={0}  >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon color='#fff' />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >

            <div style={{ fontSize: '14px', fontWeight: 600, letterSpacing: '1px', color: '#434343', textTransform: 'uppercase', marginLeft:'10px',color:'#000' }}>
              <p>PRICE</p>
            </div>

          </AccordionSummary>
          <AccordionDetails>
            <div>
              
              <FormControl>
                
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                  
                >
                  <FormControlLabel value="LTH" color='#fff' control={<Radio onChange={() => handleRadioLTH()} />} label="Low to High"/>
                  <FormControlLabel value="HTL" control={<Radio onChange={() => handleRadioHTL()} />} label="High to Low" />
                  
                </RadioGroup>
              </FormControl>


            </div>
          </AccordionDetails>
        </Accordion>

      </Paper>
    </Box>
  );
}

