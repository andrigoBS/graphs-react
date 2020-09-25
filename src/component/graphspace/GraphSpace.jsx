import {makeStyles} from "@material-ui/core/styles";
import React from "react";
import CardContent from "@material-ui/core/CardContent";
import Collapse from '@material-ui/core/Collapse';
import Typography from "@material-ui/core/Typography";
import { CgMoreO } from "react-icons/cg";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import GraphView from "../graphview/GraphView";

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

const GraphSpace = ({nodes, links}) =>{
    let styles = useStyles();

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return(
        <React.Fragment>
            <GraphView links={links} nodes={nodes} height={"300px"}/>
            <Divider/>
            <div className={styles.divPosition} align={"right"}>
                <Button className={styles.buttonColor} onClick={handleExpandClick} startIcon={ <CgMoreO />}>
                    Ver detalhes
                </Button>
            </div>
            <Divider/>
            <Collapse in={expanded} timeout="auto" unmountOnExit  addEndListener={""}>
                <CardContent>
                    <Typography component="h4" variant="h4">Nodos: {nodes.map((node, index) =>
                        node.element + (index !== nodes.length-1? ", " : "")
                    )}</Typography>
                    <br/>
                    <Divider/>
                    <br/>
                    <Typography component="h4" variant="h4">Ligações:</Typography>
                    <br/>
                    {links.map(link =>
                        <Typography component="h5" variant="h5">
                            {link.id + ": "}
                            {link.initialVertex}
                            {link.directed? " -"+link.weight+"-> " : " --"+link.weight+"-- "}
                            {link.finalVertex}
                        </Typography>
                    )}
                </CardContent>
            </Collapse>
        </React.Fragment>
    )
};

export default GraphSpace;