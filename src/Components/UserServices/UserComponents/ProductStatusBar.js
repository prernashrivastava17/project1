
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PaymentRoundedIcon from '@mui/icons-material/PaymentRounded';
import { useStyles } from "./ProductStatusBarCss";

export default function ProductStatusBar() {

    var classes = useStyles()

    return (
        <div style={{display:'flex',width:'100%',}} >  
            <div className={classes.container} >
                <ul className={classes.ul}>
                    <span>
                        <li className={classes.li}><ShoppingCart style={{ marginTop: '15%' }} /></li>
                        MyCart
                    </span>
                    <span>
                        <li className={classes.li} ><HomeRoundedIcon style={{ marginTop: '15%' }} /></li>
                        Address
                    </span>
                    <span>
                        <li className={classes.li} ><PaymentRoundedIcon style={{ marginTop: '15%' }} /></li>
                        Payment
                    </span>

                </ul>
            </div>
        </div>
    )
}