import { makeStyles } from '@mui/styles'; 
export const useStyles = makeStyles({
    mainContainer:{
        width:'100wh',
        height:'100vh',
        background:'#f5f6fa',
        display:'flex',
        justifyContent:'center',
        
    },
    box:{
        width:'50%',
        height:'370px',
        marginTop:'5%',
        background:'#fff',
        borderRadius:'5px'      

    },
    heading:{
        padding:'15px',
        fontSize:'20px',
        fontWeight:'bold',
        
    },
    gridStyle:{
        padding:20,
    },
    center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }

});
