import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import {BiCircle} from "react-icons/bi";
import OptionTextField from "./option/optionType/OptionTextFields";
import Option from "./option/Option";
import {AiOutlineMinus} from "react-icons/ai";
import {HiOutlineArrowNarrowRight} from "react-icons/hi";

const useStyles = makeStyles(theme =>({
    partsFont:{
        fontFamily: "Helvetica",
        color:'#858585',
        fontSize: 13
    },
}));


const Remove = ({graph, update}) =>{
    let styles = useStyles();

    const [removes, setRemoves] = React.useState({removeVertex: false, removeBow: false, removeEdge: false});

    const handleOnClickRemove = (name) => {
        setRemoves({ ...removes, [name]: !removes[name]});
    };

    const handleRemove = (name, type) => {
        handleOnClickRemove(type);
        graph[type](name);
        update();
    };

    return(
        <div>
            <ListItem>
                <h5 className={styles.partsFont}>REMOVER</h5>
            </ListItem>

            <Option open={removes.removeVertex}
                    openNext={removes.removeEdge}
                    handleOnOpen={() => handleOnClickRemove("removeVertex")}
                    titleLabel={"Vértice"}
                    icon={<BiCircle/>}>
                <OptionTextField onClickCall={({name}) => handleRemove(name, "removeVertex")}
                                 fieldsLabel={["Nome"]}
                                 fieldsName={["name"]}
                                 buttonLabel={"Remover"}/>
            </Option>

            <Option open={removes.removeEdge}
                    openPreview={removes.removeVertex}
                    openNext={removes.removeBow}
                    handleOnOpen={() => handleOnClickRemove("removeEdge")}
                    titleLabel={"Aresta"}
                    icon={<AiOutlineMinus/>}>
                <OptionTextField onClickCall={({name}) => handleRemove(name, "removeEdge")}
                                 fieldsLabel={["Nome"]}
                                 fieldsName={["name"]}
                                 buttonLabel={"Remover"}/>
            </Option>

            <Option open={removes.removeBow}
                    openPreview={removes.removeEdge}
                    handleOnOpen={() => handleOnClickRemove("removeBow")}
                    titleLabel={"Arco"}
                    icon={<HiOutlineArrowNarrowRight/>}>
                <OptionTextField onClickCall={({name}) => handleRemove(name, "removeBow")}
                                 fieldsLabel={["Nome"]}
                                 fieldsName={["name"]}
                                 buttonLabel={"Remover"}/>
            </Option>
        </div>
    )
};

export default Remove;