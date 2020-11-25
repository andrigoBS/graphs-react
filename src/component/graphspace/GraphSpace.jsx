import {makeStyles} from "@material-ui/core/styles";
import React from "react";
import CardContent from "@material-ui/core/CardContent";
import Collapse from '@material-ui/core/Collapse';
import { CgMoreO } from "react-icons/cg";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import GraphView from "./graphview/GraphView";
import NodeTable from "./tables/NodeTable";
import LinksTable from "./tables/LinksTable";
import {Typography} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    buttonColor:{
        marginBottom: '1%',
        marginRight:'3%',
        color:'#918f8e',
        fontSize:13,
    },

    divPosition:{
        marginTop: '1%'
    }
}));

const GraphSpace = ({nodes, links, totalWeight, colors}) =>{
    let styles = useStyles();

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return(
        <React.Fragment>
            <GraphView links={links} nodes={nodes} height={"400px"} colors={colors}/>
            <Divider/>
            <div className={styles.divPosition} align={"right"}>
                <Button className={styles.buttonColor} onClick={handleExpandClick} startIcon={ <CgMoreO />}>
                    {expanded ?"Ocultar detalhes"  : "Exibir detalhes"}
                </Button>
            </div>
            <Divider/>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <br/>
                    <NodeTable nodes={nodes}/>
                    <LinksTable links={links}/>
                    {totalWeight && <Typography>Peso Total: {totalWeight}</Typography>}
                </CardContent>
            </Collapse>
        </React.Fragment>
    )
};

export default GraphSpace;