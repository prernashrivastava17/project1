import React from 'react';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({

    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },


    ul: {
        display: 'flex',
        margin: '25px auto',
        width: '100%',
        justifyContent: 'space-between',
        position: 'realtive',
        listStyleType: 'none'
    },


    // ul: {
    //     display: 'flex',
    //     margin: '25px auto',
    //     width: '40%',
    //     justifyContent: 'space-between',
    //     position: 'realtive',
    //     listStyleType: 'none',

    //     '&::before': {
    //         content: "",
    //         display: 'block',
    //         width: '120px',
    //         height: '2px',
    //         background: '#191970;',
    //         left: '0',
    //         top: '50%',
    //         position: 'absolute',
    //     },
    //     '&::after': {
    //         content: "",
    //         display: 'block',
    //         width: '120px',
    //         height: '2px',
    //         background: '#191970;',
    //         right: '0',
    //         top: '50%',
    //         position: 'absolute',

    //     }

    // },

    li: {
        display: 'flex',
        justifyContent: 'center',
        width: '35px',
        height: '35px',
        borderRadius: '45px',
        background: '#fff',
        marginLeft: '17%'
    },


})