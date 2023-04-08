import React from 'react';
import { makeStyles } from '@material-ui/core'


export const useStyles = makeStyles({

    mainFooterContainer: {
    width: '100%',
    background: '#000;',
  },


  linkContainer: {
    display: 'flex',
    width: '100%',
    flexWrap: 'wrap'
  },


  links: {
    display: 'flex',
    flexDirection: 'column',
    padding: '4%',
    paddingTop: '1%'
  },

  linksColumn: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: '1%',
   
  },


  links2: {
    display: 'flex',
    padding: '5%',
    paddingTop: '5%',


  },

  aStyles: {
    textDecoration: 'none',
    color:'#434343',
    '&:hover': {
      color: '#fff'
    },
    lineHeight: '180%'
  },


  iconStyles: {
    color:'#434343',
    textDecoration: 'none',
  },

  
  bottom: {
    textAlign: 'center',
    padding: '1%'
  },
})  