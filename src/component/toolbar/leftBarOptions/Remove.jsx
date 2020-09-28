import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import {BiCircle} from "react-icons/bi";
import OptionTextField from "./option/optionType/OptionTextFields";
import Option from "./option/Option";
import {AiOutlineMinus} from "react-icons/ai";
import {HiOutlineArrowNarrowRight} from "react-icons/hi";

const useStyles = makeStyles(theme =>({
    marginTopClose:{
        marginTop:'-14px'
    },

    marginTopSecondOpen:{
        marginTop:'-15px',
        backgroundColor: theme.palette.primary.main,
    },

    marginTopOpen:{
        marginTop:'20px',
        backgroundColor: theme.palette.primary.main,
    },

    colorOpen:{
        backgroundColor: theme.palette.primary.main,
    },

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

            <Divider className={removes.removeVertex ? styles.colorOpen : ""}/>
            <Option open={removes.removeVertex}
                    handleOnOpen={() => handleOnClickRemove("removeVertex")}
                    titleLabel={"Vértice"}
                    icon={<BiCircle/>}>
                <OptionTextField onClickCall={({name}) => handleRemove(name, "removeVertex")}
                                 fieldsLabel={["Nome"]}
                                 fieldsName={["name"]}
                                 buttonLabel={"Remover"}/>
            </Option>
            <Divider hidden={removes.removeEdge} className={removes.removeVertex ? styles.marginTopOpen : styles.marginTopClose}/>

            <Divider hidden={!removes.removeEdge} className={removes.removeEdge ? removes.removeVertex ? styles.marginTopOpen  : styles.marginTopSecondOpen : styles.marginTopClose}/>
            <Option open={removes.removeEdge}
                    handleOnOpen={() => handleOnClickRemove("removeEdge")}
                    titleLabel={"Aresta"}
                    icon={<AiOutlineMinus/>}>
                <OptionTextField onClickCall={({name}) => handleRemove(name, "removeEdge")}
                                 fieldsLabel={["Nome"]}
                                 fieldsName={["name"]}
                                 buttonLabel={"Remover"}/>
            </Option>
            <Divider hidden={removes.removeBow} className={removes.removeEdge ? styles.marginTopOpen : styles.marginTopClose}/>

            <Divider hidden={!removes.removeBow} className={removes.removeBow ? removes.removeEdge ? styles.marginTopOpen  : styles.marginTopSecondOpen : styles.marginTopClose}/>
            <Option open={removes.removeBow}
                    handleOnOpen={() => handleOnClickRemove("removeBow")}
                    titleLabel={"Arco"}
                    icon={<HiOutlineArrowNarrowRight/>}>
                <OptionTextField onClickCall={({name}) => handleRemove(name, "removeBow")}
                                 fieldsLabel={["Nome"]}
                                 fieldsName={["name"]}
                                 buttonLabel={"Remover"}/>
            </Option>
            <Divider className={removes.removeBow ? styles.marginTopOpen : styles.marginTopClose}/>
        </div>
    )
};

export default Remove;