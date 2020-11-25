import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import OptionTextField from "./option/optionType/OptionTextFields";
import {BiCircle} from "react-icons/bi";
import {AiOutlineMinus} from "react-icons/ai";
import {HiOutlineArrowNarrowRight} from "react-icons/hi";
import Option from "./option/Option";

const useStyles = makeStyles(theme =>({
    partsFont:{
        fontFamily: "Helvetica",
        color:'#858585',
        fontSize: 13
    },
}));


const Add = ({graph, update}) =>{
    let styles = useStyles();

    const [adds, setAdds] = React.useState({addVertex: false, addBow: false, addEdge: false});

    const handleOnClickAdd = (name) => {
        setAdds({ ...adds, [name]: !adds[name]});
    };

    const handleAddVertex = (vertex) => {
        handleOnClickAdd("addVertex");
        graph.addVertex(vertex.name);
        update();
    };

    const handleAddLink = (link, type) => {
        handleOnClickAdd(type);
        graph[type](link.initial, link.final, link.weight, link.name);
        update();
    };

    return(
        <div>
            <ListItem>
                <h5 className={styles.partsFont}>ADICIONAR</h5>
            </ListItem>

            <Option open={adds.addVertex}
                    openNext={adds.addEdge}
                    handleOnOpen={() => handleOnClickAdd("addVertex")}
                    titleLabel={"Vértice"}
                    icon={<BiCircle/>}>
                <OptionTextField onClickCall={handleAddVertex}
                                 fieldsLabel={["Nome"]}
                                 fieldsName={["name"]}
                                 buttonLabel={"Adicionar"}/>
            </Option>

            <Option open={adds.addEdge}
                    openPreview={adds.addVertex}
                    openNext={adds.addBow}
                    handleOnOpen={() => handleOnClickAdd("addEdge")}
                    titleLabel={"Aresta"}
                    icon={<AiOutlineMinus/>}>
                <OptionTextField onClickCall={(link) => handleAddLink(link, "addEdge")}
                                 fieldsLabel={["Nome", "Inicio", "Fim", "Peso"]}
                                 fieldsName={["name", "initial", "final", "weight"]}
                                 buttonLabel={"Adicionar"}/>
            </Option>

            <Option open={adds.addBow}
                    openPreview={adds.addEdge}
                    handleOnOpen={() => handleOnClickAdd("addBow")}
                    titleLabel={"Arco"}
                    icon={<HiOutlineArrowNarrowRight/>}>
                <OptionTextField onClickCall={(link) => handleAddLink(link, "addBow")}
                                 fieldsLabel={["Nome", "Inicio", "Fim", "Peso"]}
                                 fieldsName={["name", "initial", "final", "weight"]}
                                 buttonLabel={"Adicionar"}/>
            </Option>
        </div>
    )
};
export default Add;