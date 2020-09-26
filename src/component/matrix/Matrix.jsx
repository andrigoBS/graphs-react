import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.primary.main,
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
});

const Matrix = ({heads, lines, data}) => {
    const classes = useStyles();

    return (
        <TableContainer component={Paper} className={classes.table}>
            <Table aria-label="customized table" size="small">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>{":)"}</StyledTableCell>
                        {heads.map(item => <StyledTableCell align="center" key={item}>{item}</StyledTableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (
                        <StyledTableRow key={lines[index]}>
                            <StyledTableCell component="th" scope="row">
                                {lines[index]}
                            </StyledTableCell>
                            {row.map(value => <StyledTableCell align="center" key={value}>{value}</StyledTableCell>)}
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Matrix;