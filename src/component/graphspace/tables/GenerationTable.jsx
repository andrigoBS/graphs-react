import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import React from "react";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import Typography from "@material-ui/core/Typography";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        width: "90%",
        marginBottom: "5%"
    },
    font:{
        fontSize:20,
        color: "#ffffff",
        fontWeight:'bold'
    },
    divStyle:{
        backgroundColor: "#9c27b0"
    }
});


const GenerationTable = ({header,object,tableTitle, hidden, handlerShow}) =>{
    let classes = useStyles();

    let handleOnClick = (index) =>{
        handlerShow(object[index], "generation");
    }

    return(
        <TableContainer component={Paper} className={classes.table}>
            <div className={classes.divStyle} hidden={hidden}>
                <Typography className={classes.font}>{tableTitle}</Typography>
            </div>

            <Table aria-label="customized table" size="small">
                <TableHead>
                    <TableRow>
                        {header.map((currentHeader)=>(
                            <StyledTableCell align={"center"}>{currentHeader}</StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {object.map((currentObject, index)=>(
                        <StyledTableRow onClick={() => handleOnClick(index)}>
                            <StyledTableCell align={"center"} component="th" scope="row">
                                {currentObject.generation}
                            </StyledTableCell>
                        </StyledTableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
};
export default GenerationTable;
