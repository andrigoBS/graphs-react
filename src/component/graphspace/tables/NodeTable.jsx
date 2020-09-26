import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import React from "react";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import Typography from "@material-ui/core/Typography";
import TableRow from "@material-ui/core/TableRow";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
    root: {
        backgroundColor: theme.palette.action.hover,
    },
}))(TableCell);

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

const NodeTable = ({nodes}) =>{
    let classes = useStyles();
  return(
      <TableContainer component={Paper} className={classes.table}>
          <div className={classes.divStyle}>
              <Typography className={classes.font}>Nodos</Typography>
          </div>

          <Table aria-label="customized table" size="small">
              <TableBody>
                  <TableRow>
                      {nodes.map((node) =>(
                          <StyledTableCell align={"center"} component="th" scope="row" key={node.element}>
                              {node.element}
                          </StyledTableCell>
                      ))}
                  </TableRow>
              </TableBody>
          </Table>
      </TableContainer>
  )
};
export default NodeTable;