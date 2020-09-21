import {makeStyles} from "@material-ui/core/styles";
import React from "react";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Collapse from "@material-ui/core/Collapse";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { BiCircle,BiSearchAlt } from "react-icons/bi";
import { AiOutlineMinus } from "react-icons/ai";
import Divider from "@material-ui/core/Divider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {ThemeProvider} from "@material-ui/styles";
import {purple} from "@material-ui/core/colors";
import {HiOutlineArrowNarrowRight} from "react-icons/hi";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { SiMatrix } from "react-icons/si";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const drawerWidth = 250;
const useStyles = makeStyles(theme =>({

    drawerPaper: {
        width: drawerWidth,
    },

    space:{
        marginTop: '12px'
    },

    buttonStyle:{
        marginTop: '10px',
        color:'#9c27b0',
    },

    distance:{
        marginTop:'12px',
        marginLeft:'10px',
        marginRight:'10px',
        color:'#9c27b0',
    },

    margins:{
        marginTop:'-10px',
        marginBottom:'-10px',
        marginLeft:'-15px'
    },

    marginTopClose:{
      marginTop:'-14px'
    },

    marginTopSecondOpen:{
        marginTop:'-15px',
        backgroundColor:'#9c27b0',
    },


    marginTopOpen:{
        marginTop:'20px',
        backgroundColor:'#9c27b0',
    },


    colorOpen:{
        backgroundColor:'#9c27b0',
    },

    colorClose:{

    },

    partsFont:{
        fontFamily: "Helvetica",
        color:'#a2a2a2',
        fontSize: 12
    },

    optionsFontClose:{
      color:'#838383',
        fontSize: 21,
        fontFamily:"Oswald",
        fontWeight: 'normal'
    },

    optionsFontOpen:{
        color:'#838383',
        fontSize: 19,
        fontFamily:"Oswald",
        fontWeight: 'bold'
    }



}));

const theme = createMuiTheme({
    palette: {
        primary: purple,
    },
});
const LeftBar = () =>{
    let styles = useStyles();

    const [state, setState] = React.useState({
        gilad: true,
        jason: false,
        antoine: false,
    });


    const handleChange2 = (event) => {
        setState2({ ...state2, [event.target.name]: event.target.checked });
    };

    const [state2, setState2] = React.useState({
        gilad: true,
        jason: false,
        antoine: false,
    });


    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };
    const [addVertex,setAddVertex] = React.useState(false);

    const handleOnClickAddVertex = () => {
        setAddVertex(!addVertex);
    };

    const [addEdge,setAddEdge] = React.useState(false);

    const handleOnClickAddEdge = () => {
        setAddEdge(!addEdge);
    };

    const [addBow,setAddBow] = React.useState(false);

    const handleOnClickAddBow = () => {
        setAddBow(!addBow);
    };

    const [showMatrixOptions,setShowMatrixOptions] = React.useState(false);

    const handleOnClickShowMatrixOptions = () => {
        setShowMatrixOptions(!showMatrixOptions);
    };

    const [searchOptions,setSearchOptions] = React.useState(false);

    const handleOnClickSearchOptions = () => {
        setSearchOptions(!searchOptions);
    };

    const [removeVertex,setRemoveVertex] = React.useState(false);

    const handleOnClickRemoveVertex = () => {
        setRemoveVertex(!removeVertex);
    };

    const [removeEdge,setRemoveEdge] = React.useState(false);

    const handleOnClickRemoveEdge = () => {
        setRemoveEdge(!removeEdge);
    };

    const [removeBow,setRemoveBow] = React.useState(false);

    const handleOnClickRemoveBow = () => {
        setRemoveBow(!removeBow);
    };

    return(
        <div >
            <Drawer
                variant="permanent"
                classes={{
                paper: styles.drawerPaper,
            }}>
                <Toolbar/>
                <div >
                    <List>
                        <ListItem>
                            <h5 className={styles.partsFont}>ADICIONAR</h5>
                        </ListItem>

                        <Divider className={addVertex ? styles.colorOpen :styles.colorClose}/>

                        <ListItem  button onClick={handleOnClickAddVertex}>
                            <ListItemIcon>
                                <BiCircle/>
                            </ListItemIcon>
                            <div className={styles.margins}>
                                <h1 className={addVertex ? styles.optionsFontOpen : styles.optionsFontClose}>Vertice</h1>
                            </div>
                        </ListItem>

                        <ListItem >
                            <Collapse in={addVertex}>
                                <div>
                                    <ThemeProvider theme={theme}>
                                        <TextField
                                            id="vertexName"
                                            label="Nome"
                                            type="text"
                                            variant="outlined"
                                            size={"small"}
                                            className={styles.distance}
                                            color={"primary"}
                                        />
                                    </ThemeProvider>
                                </div>

                                    <div align={"center"}>
                                        <Button
                                            color={"primary"}
                                            onClick={handleOnClickAddVertex}
                                            size={"small"}
                                            className={styles.buttonStyle} >
                                            Adicionar
                                        </Button>
                                    </div>
                            </Collapse>
                        </ListItem>
                        <Divider hidden={addEdge} className={addVertex? styles.marginTopOpen : styles.marginTopClose}/>

                        <Divider hidden={!addEdge} className={addEdge ? addVertex ? styles.marginTopOpen  : styles.marginTopSecondOpen : styles.marginTopClose}/>
                        <ListItem button onClick={handleOnClickAddEdge}>
                            <ListItemIcon>
                                <HiOutlineArrowNarrowRight/>
                            </ListItemIcon>
                            <div className={styles.margins} align={"center"}>
                                <h1 className={addEdge ? styles.optionsFontOpen : styles.optionsFontClose}>Aresta</h1>
                            </div>
                        </ListItem>

                        <ListItem >
                            <Collapse in={addEdge}>
                                <div>
                                    <ThemeProvider theme={theme}>
                                        <TextField
                                            id="edgeName"
                                            label="Nome"
                                            type="text"
                                            variant="outlined"
                                            size={"small"}
                                            className={styles.distance}
                                            color={"primary"}
                                        />
                                        <TextField
                                            id="edgeBegin"
                                            label="Inicio"
                                            type="text"
                                            variant="outlined"
                                            size={"small"}
                                            className={styles.distance}
                                            color={"primary"}
                                        />
                                        <TextField
                                            id="edgeEnd"
                                            label="Fim"
                                            type="text"
                                            variant="outlined"
                                            size={"small"}
                                            className={styles.distance}
                                            color={"primary"}
                                        />
                                        <TextField
                                            id="edgeWeight"
                                            label="Peso"
                                            type="text"
                                            variant="outlined"
                                            size={"small"}
                                            className={styles.distance}
                                            color={"primary"}
                                        />
                                    </ThemeProvider>
                                </div>

                                <div align={"center"}>
                                    <Button
                                        color={"primary"}
                                        onClick={handleOnClickAddEdge}
                                        size={"small"}
                                        className={styles.buttonStyle} >
                                        Adicionar
                                    </Button>
                                </div>
                            </Collapse>
                        </ListItem>
                        <Divider hidden={addBow} className={addEdge ? styles.marginTopOpen : styles.marginTopClose}/>

                        <Divider hidden={!addBow} className={addBow ? addEdge ? styles.marginTopOpen  : styles.marginTopSecondOpen : styles.marginTopClose}/>
                        <ListItem button onClick={handleOnClickAddBow}>
                            <ListItemIcon>
                                <AiOutlineMinus/>
                            </ListItemIcon>
                            <div className={styles.margins} align={"center"}>
                                <h1 className={addBow ? styles.optionsFontOpen : styles.optionsFontClose}>Arco</h1>
                            </div>
                        </ListItem>

                        <ListItem>
                            <Collapse in={addBow}>
                                <div>
                                    <ThemeProvider theme={theme}>
                                        <TextField
                                            id="bowName"
                                            label="Nome"
                                            type="text"
                                            variant="outlined"
                                            size={"small"}
                                            className={styles.distance}
                                            color={"primary"}
                                        />
                                        <TextField
                                            id="bowBegin"
                                            label="Inicio"
                                            type="text"
                                            variant="outlined"
                                            size={"small"}
                                            className={styles.distance}
                                            color={"primary"}
                                        />
                                        <TextField
                                            id="bowEnd"
                                            label="Fim"
                                            type="text"
                                            variant="outlined"
                                            size={"small"}
                                            className={styles.distance}
                                            color={"primary"}
                                        />
                                        <TextField
                                            id="bowWeight"
                                            label="Peso"
                                            type="text"
                                            variant="outlined"
                                            size={"small"}
                                            className={styles.distance}
                                            color={"primary"}
                                        />
                                    </ThemeProvider>
                                </div>

                                <div align={"center"}>
                                    <Button
                                        color={"primary"}
                                        onClick={handleOnClickAddEdge}
                                        size={"small"}
                                        className={styles.buttonStyle} >
                                        Adicionar
                                    </Button>
                                </div>
                            </Collapse>
                        </ListItem>
                        <Divider className={addBow ? styles.marginTopOpen : styles.marginTopClose}/>


                        <ListItem>
                            <h5 className={styles.partsFont}>REMOVER</h5>
                        </ListItem>

                        <Divider className={removeVertex ? styles.colorOpen :styles.colorClose}/>
                        <ListItem  button onClick={handleOnClickRemoveVertex}>
                            <ListItemIcon>
                                <BiCircle/>
                            </ListItemIcon>
                            <div className={styles.margins}>
                                <h1 className={removeVertex ? styles.optionsFontOpen : styles.optionsFontClose}>Vertice</h1>
                            </div>
                        </ListItem>

                        <ListItem >
                            <Collapse in={removeVertex}>
                                <div>
                                    <ThemeProvider theme={theme}>
                                        <TextField
                                            id="removeVertexName"
                                            label="Nome"
                                            type="text"
                                            variant="outlined"
                                            size={"small"}
                                            className={styles.distance}
                                            color={"primary"}
                                        />
                                    </ThemeProvider>
                                </div>

                                <div align={"center"}>
                                    <Button
                                        color={"primary"}
                                        onClick={handleOnClickRemoveVertex}
                                        size={"small"}
                                        className={styles.buttonStyle} >
                                        Remover
                                    </Button>
                                </div>
                            </Collapse>
                        </ListItem>
                        <Divider hidden={removeEdge} className={removeVertex ? styles.marginTopOpen : styles.marginTopClose}/>

                        <Divider hidden={!removeEdge} className={removeEdge ? removeVertex ? styles.marginTopOpen  : styles.marginTopSecondOpen : styles.marginTopClose}/>
                        <ListItem button onClick={handleOnClickRemoveEdge}>
                            <ListItemIcon>
                                <HiOutlineArrowNarrowRight/>
                            </ListItemIcon>
                            <div className={styles.margins} align={"center"}>
                                <h1 className={removeEdge ? styles.optionsFontOpen : styles.optionsFontClose}>Aresta</h1>
                            </div>
                        </ListItem>

                        <ListItem >
                            <Collapse in={removeEdge}>
                                <div>
                                    <ThemeProvider theme={theme}>
                                        <TextField
                                            id="removeEdgeName"
                                            label="Nome"
                                            type="text"
                                            variant="outlined"
                                            size={"small"}
                                            className={styles.distance}
                                            color={"primary"}
                                        />
                                    </ThemeProvider>
                                </div>

                                <div align={"center"}>
                                    <Button
                                        color={"primary"}
                                        onClick={handleOnClickRemoveEdge}
                                        size={"small"}
                                        className={styles.buttonStyle} >
                                        Remover
                                    </Button>
                                </div>
                            </Collapse>
                        </ListItem>
                        <Divider hidden={removeBow} className={removeEdge ? styles.marginTopOpen : styles.marginTopClose}/>

                        <Divider hidden={!removeBow} className={removeBow ? removeEdge ? styles.marginTopOpen  : styles.marginTopSecondOpen : styles.marginTopClose}/>
                        <ListItem button onClick={handleOnClickRemoveBow}>
                            <ListItemIcon>
                                <AiOutlineMinus/>
                            </ListItemIcon>
                            <div className={styles.margins} align={"center"}>
                                <h1 className={removeBow ? styles.optionsFontOpen : styles.optionsFontClose}>Arco</h1>
                            </div>
                        </ListItem>

                        <ListItem >
                            <Collapse in={removeBow}>
                                <div>
                                    <ThemeProvider theme={theme}>
                                        <TextField
                                            id="removeBowName"
                                            label="Nome"
                                            type="text"
                                            variant="outlined"
                                            size={"small"}
                                            className={styles.distance}
                                            color={"primary"}
                                        />
                                    </ThemeProvider>
                                </div>

                                <div align={"center"}>
                                    <Button
                                        color={"primary"}
                                        onClick={handleOnClickRemoveBow}
                                        size={"small"}
                                        className={styles.buttonStyle} >
                                        Remover
                                    </Button>
                                </div>
                            </Collapse>
                        </ListItem>
                        <Divider className={removeBow ? styles.marginTopOpen : styles.marginTopClose}/>

                        <ListItem>
                            <h5 className={styles.partsFont}>EXIBIR</h5>
                        </ListItem>

                        <Divider className={showMatrixOptions ? styles.colorOpen :styles.colorClose}/>

                        <ListItem  button onClick={handleOnClickShowMatrixOptions}>
                            <ListItemIcon>
                                <SiMatrix/>
                            </ListItemIcon>
                            <div className={styles.margins}>
                                <h1 className={showMatrixOptions ? styles.optionsFontOpen : styles.optionsFontClose}>Matrizes</h1>
                            </div>
                        </ListItem>

                        <ListItem >
                            <Collapse in={showMatrixOptions}>
                                <div>
                                    <FormGroup>
                                        <FormControlLabel
                                            control={<Checkbox checked={state.gilad} name="Matriz de Incidência" onChange={handleChange}/>}
                                            label="Matriz de Incidência"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox checked={state.jason} name="Matriz de Adjacência" />}
                                            label="Matriz de Adjacência"
                                        />
                                    </FormGroup>
                                </div>
                            </Collapse>
                        </ListItem>
                        <Divider hidden={searchOptions} className={showMatrixOptions ? styles.marginTopOpen : styles.marginTopClose}/>

                        <Divider hidden={!searchOptions} className={searchOptions ? showMatrixOptions ? styles.marginTopOpen  : styles.marginTopSecondOpen : styles.marginTopClose}/>
                        <ListItem  button onClick={handleOnClickSearchOptions}>
                            <ListItemIcon>
                                <BiSearchAlt/>
                            </ListItemIcon>
                            <div className={styles.margins}>
                                <h1 className={searchOptions ? styles.optionsFontOpen : styles.optionsFontClose}>Busca</h1>
                            </div>
                        </ListItem>

                        <ListItem >
                            <Collapse in={searchOptions}>
                                <div>
                                    <FormGroup>
                                        <FormControlLabel
                                            control={<Checkbox checked={state2.gilad} name="Largura" onChange={handleChange2}/>}
                                            label="Largura"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox checked={state2.jason} name="Profundidade" onChange={handleChange2}/>}
                                            label="Profundidade"
                                        />
                                    </FormGroup>
                                </div>
                            </Collapse>
                        </ListItem>
                        <Divider  className={searchOptions ? styles.marginTopOpen : styles.marginTopClose}/>

                    </List>
                </div>

            </Drawer>
        </div>
    )
};

export default LeftBar;