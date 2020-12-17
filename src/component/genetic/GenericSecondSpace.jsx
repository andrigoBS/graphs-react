import {makeStyles} from "@material-ui/core/styles";
import React from "react";
import CardContent from "@material-ui/core/CardContent";
import Collapse from '@material-ui/core/Collapse';
import { CgMoreO } from "react-icons/cg";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import FlexTable from "../graphspace/tables/FlexTable";
import GenerationTable from "../graphspace/tables/GenerationTable";
import IndividualTable from "../graphspace/tables/IndividualTable";
// import GraphView from "../graphspace/graphview/GraphView";
// import NodeTable from "../graphspace/tables/NodeTable";
// import LinksTable from "../graphspace/tables/LinksTable";
// import {Typography} from "@material-ui/core";
// import OptionTextField from "../toolbar/leftBarOptions/option/optionType/OptionTextFields";

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

const GeneticSecondSpace = ({generationObject}) =>{
    let styles = useStyles();

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return(
        <React.Fragment>

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
                    <FlexTable
                        tableTitle={"Dados do melhor individuo"}
                        hidden={false}
                        header={["Número do individuo","Aptidão"]}
                        body={["",""]}
                    />

                    <IndividualTable
                        tableTitle={"Histórico de individuos"}
                        hidden={false}
                        header={["Aptidão"]}
                        object={generationObject}
                    />
                </CardContent>
            </Collapse>
        </React.Fragment>
    )
};

export default GeneticSecondSpace;
