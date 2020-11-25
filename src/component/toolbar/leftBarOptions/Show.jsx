import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import Option from "./option/Option";
import OptionCheckBox from "./option/optionType/OptionCheckBox";
import {SiMatrix} from "react-icons/si";
import {ImTree, BiSearchAlt, BiNetworkChart, RiPaintBrushLine, TiFlowParallel, GiTeacher} from "react-icons/all";
import OptionTextField from "./option/optionType/OptionTextFields";

const useStyles = makeStyles(theme =>({
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
        searchAOptions: false,
        componentOptions: false,
        colorOptions: false,
        exampleOptions: false,
        flowOptions: false
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

            <Option open={shows.matrixOptions}
                    openNext={shows.treeOptions}
                    handleOnOpen={() => handleOnClickShow("matrixOptions")}
                    titleLabel={"Matrizes"}
                    icon={<SiMatrix/>}>
                <OptionCheckBox actives={actives}
                                labels={["Matriz de Adjacência", "Matriz de Incidência"]}
                                names={["adjacent", "incidence"]}
                                onActive={onChange}/>
            </Option>

            <Option open={shows.treeOptions}
                    openPreview={shows.matrixOptions}
                    openNext={shows.searchOptions}
                    handleOnOpen={() => handleOnClickShow("treeOptions")}
                    titleLabel={"AGM"}
                    icon={<ImTree/>}>
                <OptionCheckBox actives={actives}
                                labels={["Árvore geradora mínima - Prim"]}
                                names={["prim"]}
                                onActive={onChange}/>
            </Option>

            <Option open={shows.searchOptions}
                    openPreview={shows.treeOptions}
                    openNext={shows.searchAOptions}
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

            <Option open={shows.searchAOptions}
                    openPreview={shows.searchOptions}
                    openNext={shows.componentOptions}
                    handleOnOpen={() => handleOnClickShow("searchAOptions")}
                    titleLabel={"Buscas A*"}
                    icon={<BiSearchAlt/>}>
                <OptionTextField buttonLabel={"Buscar"}
                                 fieldsLabel={["Inicio", "Fim"]}
                                 fieldsName={["start", "end"]}
                                 onClickCall={({start, end}) => onChange({start, end}, "aStar")}/>
            </Option>

            <Option open={shows.componentOptions}
                    openPreview={shows.searchAOptions}
                    openNext={shows.colorOptions}
                    handleOnOpen={() => handleOnClickShow("componentOptions")}
                    titleLabel={"Componentes"}
                    icon={<BiNetworkChart/>}>
                <OptionCheckBox actives={actives}
                                labels={["Fortemente Conexo - Roy"]}
                                names={["roy"]}
                                onActive={onChange}/>
            </Option>

            <Option open={shows.colorOptions}
                    openPreview={shows.componentOptions}
                    openNext={shows.flowOptions}
                    handleOnOpen={() => handleOnClickShow("colorOptions")}
                    titleLabel={"Coloração"}
                    icon={<RiPaintBrushLine/>}>
                <OptionCheckBox actives={actives}
                                labels={["Colorir com Welsh-Powell (Estrela)"]}
                                names={["welshPowell"]}
                                onActive={onChange}/>
            </Option>

            <Option open={shows.flowOptions}
                    openPreview={shows.colorOptions}
                    openNext={shows.exampleOptions}
                    handleOnOpen={() => handleOnClickShow("flowOptions")}
                    titleLabel={"Ford e Fulkerson"}
                    icon={<TiFlowParallel/>}>
                <OptionTextField buttonLabel={"Calcular"}
                                 fieldsLabel={["Inicio", "Fim"]}
                                 fieldsName={["start", "end"]}
                                 onClickCall={({start, end}) => onChange({start, end}, "fordFulkerson")}/>
            </Option>

            <Option open={shows.exampleOptions}
                    openPreview={shows.flowOptions}
                    handleOnOpen={() => handleOnClickShow("exampleOptions")}
                    titleLabel={"Exemplos"}
                    icon={<GiTeacher/>}>
                <OptionCheckBox actives={actives}
                                labels={["Exemplo Trabalho M2"]}
                                names={["exampleM2"]}
                                onActive={onChange}/>
            </Option>
        </div>
    )
};

export default Show;