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
import { AiOutlineMinus } from "react-icons/ai";
import {HiOutlineArrowNarrowRight} from "react-icons/hi";

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

const LinksTable = ({links}) =>{
    let classes = useStyles();
  return(
      <TableContainer component={Paper} className={classes.table}>
          <div className={classes.divStyle}>
              <Typography className={classes.font}>Ligações</Typography>
          </div>

          <Table aria-label="customized table" size="small">
              <TableHead>
                  <TableRow>
                      <StyledTableCell align={"center"}>Tipo</StyledTableCell>
                      <StyledTableCell align={"center"}>Nome</StyledTableCell>
                      <StyledTableCell align={"center"}>Peso</StyledTableCell>
                      <StyledTableCell align={"center"}>Inicio</StyledTableCell>
                      <StyledTableCell align={"center"}>Fim</StyledTableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                  {links.map((link)=>(
                      <StyledTableRow>
                          <StyledTableCell align={"center"} component="th" scope="row">
                              {link.directed? <AiOutlineMinus size={20}/> : <HiOutlineArrowNarrowRight size={20}/> }
                          </StyledTableCell>
                          <StyledTableCell align={"center"} component="th" scope="row">
                              {link.id}
                          </StyledTableCell>
                          <StyledTableCell align={"center"} component="th" scope="row">
                              {link.weight}
                          </StyledTableCell>
                          <StyledTableCell align={"center"} component="th" scope="row">
                              {link.initialVertex}
                          </StyledTableCell>
                          <StyledTableCell align={"center"} component="th" scope="row">
                              {link.finalVertex}
                          </StyledTableCell>
                      </StyledTableRow>
                  ))}
              </TableBody>
          </Table>
      </TableContainer>
  )
};
export default LinksTable;