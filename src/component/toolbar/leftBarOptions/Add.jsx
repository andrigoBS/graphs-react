import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import OptionTextField from "./option/optionType/OptionTextFields";
import {BiCircle} from "react-icons/bi";
import {AiOutlineMinus} from "react-icons/ai";
import {HiOutlineArrowNarrowRight} from "react-icons/hi";
import Option from "./option/Option";

const useStyles = makeStyles(theme =>({
    marginTopClose:{
        marginTop:'-14px'
    },

    marginTopSecondOpen:{
        marginTop:'-15px',
        backgroundColor:theme.palette.primary.main,
    },


    marginTopOpen:{
        marginTop:'20px',
        backgroundColor:theme.palette.primary.main,
    },


    colorOpen:{
        backgroundColor:theme.palette.primary.main,
    },

    colorClose:{
        backgroundColor:'#e1e1e1'
    },


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

            <Divider className={adds.addVertex ? styles.colorOpen :styles.colorClose}/>
            <Option open={adds.addVertex}
                    handleOnOpen={() => handleOnClickAdd("addVertex")}
                    titleLabel={"Vértice"}
                    icon={<BiCircle/>}>
                <OptionTextField onClickCall={handleAddVertex}
                                 fieldsLabel={["Nome"]}
                                 fieldsName={["name"]}
                                 buttonLabel={"Adicionar"}/>
            </Option>
            <Divider hidden={adds.addEdge} className={adds.addVertex? styles.marginTopOpen : styles.marginTopClose}/>

            <Divider hidden={!adds.addEdge}
                     className={adds.addEdge ? adds.addVertex ? styles.marginTopOpen  : styles.marginTopSecondOpen : styles.marginTopClose}/>
            <Option open={adds.addEdge}
                    handleOnOpen={() => handleOnClickAdd("addEdge")}
                    titleLabel={"Aresta"}
                    icon={<AiOutlineMinus/>}>
                <OptionTextField onClickCall={(link) => handleAddLink(link, "addEdge")}
                                 fieldsLabel={["Nome", "Inicio", "Fim", "Peso"]}
                                 fieldsName={["name", "initial", "final", "weight"]}
                                 buttonLabel={"Adicionar"}/>
            </Option>
            <Divider hidden={adds.addBow} className={adds.addEdge ? styles.marginTopOpen : styles.marginTopClose}/>

            <Divider hidden={!adds.addBow}
                     className={adds.addBow ? adds.addEdge ? styles.marginTopOpen  : styles.marginTopSecondOpen : styles.marginTopClose}/>
            <Option open={adds.addBow}
                    handleOnOpen={() => handleOnClickAdd("addBow")}
                    titleLabel={"Arco"}
                    icon={<HiOutlineArrowNarrowRight/>}>
                <OptionTextField onClickCall={(link) => handleAddLink(link, "addBow")}
                                 fieldsLabel={["Nome", "Inicio", "Fim", "Peso"]}
                                 fieldsName={["name", "initial", "final", "weight"]}
                                 buttonLabel={"Adicionar"}/>
            </Option>
            <Divider className={adds.addBow ? styles.marginTopOpen : styles.marginTopClose}/>
        </div>
    )
};
export default Add;