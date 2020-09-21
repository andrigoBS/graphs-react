import {makeStyles} from "@material-ui/core/styles";
import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from "@material-ui/core/Typography";
import AccordionDetails from "@material-ui/core/AccordionDetails";


const useStyles = makeStyles(theme => ({
    accordion:{
        width:'200px'
    }
}));
const AccordionLeftBar = ({title,children}) =>{
    let styles = useStyles();
    return(
            <div >
                <Accordion className={styles.accordion}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                    >
                        <Typography >{title}</Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        {children}
                    </AccordionDetails>
                </Accordion>
            </div>
    )
};

export default AccordionLeftBar;