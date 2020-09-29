import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Option from "./option/Option";
import OptionCheckBox from "./option/optionType/OptionCheckBox";
import {SiMatrix} from "react-icons/si";
import {ImTree, BiSearchAlt, BiNetworkChart} from "react-icons/all";
import OptionTextField from "./option/optionType/OptionTextFields";

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

    colorClose:{
        backgroundColor:'#e1e1e1'
    },

    partsFont:{
        fontFamily: "Helvetica",
        color:'#858585',
        fontSize: 13
    },
}));


const Show = ({onChange, actives}) =>{
    const [shows, setShows] = React.useState({
        matrixOptions: false,
        treeOptions: false,
        searchOptions: false,
        componentOptions: false
    });

    const handleOnClickShow = (name) => {
        setShows({ ...shows, [name]: !shows[name]});
    };

    let styles = useStyles();

    return(
        <div>
            <ListItem>
                <h5 className={styles.partsFont}>EXIBIR</h5>
            </ListItem>

            <Divider className={shows.matrixOptions ? styles.colorOpen :styles.colorClose}/>
            <Option open={shows.matrixOptions}
                    handleOnOpen={() => handleOnClickShow("matrixOptions")}
                    titleLabel={"Matrizes"}
                    icon={<SiMatrix/>}>
                <OptionCheckBox actives={actives}
                                labels={["Matriz de Adjacência", "Matriz de Incidência"]}
                                names={["adjacent", "incidence"]}
                                onActive={onChange}/>
            </Option>
            <Divider hidden={shows.treeOptions} className={shows.matrixOptions ? styles.marginTopOpen : styles.marginTopClose}/>

            <Divider hidden={!shows.treeOptions}
                     className={shows.treeOptions ? shows.matrixOptions ? styles.marginTopOpen  : styles.marginTopSecondOpen : styles.marginTopClose}/>
            <Option open={shows.treeOptions}
                    handleOnOpen={() => handleOnClickShow("treeOptions")}
                    titleLabel={"AGM"}
                    icon={<ImTree/>}>
                <OptionCheckBox actives={actives}
                                labels={["Árvore geradora mínima - Prim"]}
                                names={["prim"]}
                                onActive={onChange}/>
            </Option>
            <Divider hidden={shows.searchOptions} className={shows.treeOptions ? styles.marginTopOpen : styles.marginTopClose}/>

            <Divider hidden={!shows.searchOptions}
                     className={shows.searchOptions ? shows.treeOptions ? styles.marginTopOpen  : styles.marginTopSecondOpen : styles.marginTopClose}/>
            <Option open={shows.searchOptions}
                    handleOnOpen={() => handleOnClickShow("searchOptions")}
                    titleLabel={"Buscas"}
                    icon={<BiSearchAlt/>}>
                <OptionTextField buttonLabel={"Buscar"}
                                 fieldsLabel={["Em Largura"]}
                                 fieldsName={["widthSearch"]}
                                 onClickCall={({widthSearch}) => onChange(widthSearch, "widthSearch")}/>
                <OptionTextField buttonLabel={"Buscar"}
                                 fieldsLabel={["Em Profundidade"]}
                                 fieldsName={["depthSearch"]}
                                 onClickCall={({depthSearch}) => onChange(depthSearch, "depthSearch")}/>
            </Option>
            <Divider hidden={shows.componentOptions} className={shows.searchOptions ? styles.marginTopOpen : styles.marginTopClose}/>

            <Divider hidden={!shows.componentOptions}
                     className={shows.componentOptions ? shows.searchOptions ? styles.marginTopOpen  : styles.marginTopSecondOpen : styles.marginTopClose}/>
            <Option open={shows.componentOptions}
                    handleOnOpen={() => handleOnClickShow("componentOptions")}
                    titleLabel={"Componentes"}
                    icon={<BiNetworkChart/>}>
                <OptionCheckBox actives={actives}
                                labels={["Fortemente Conexo - Roy"]}
                                names={["roy"]}
                                onActive={onChange}/>
            </Option>
            <Divider className={shows.componentOptions ? styles.marginTopOpen : styles.marginTopClose}/>
        </div>
    )
};
export default Show;