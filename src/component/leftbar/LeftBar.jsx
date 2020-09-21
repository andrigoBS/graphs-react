import {makeStyles} from "@material-ui/core/styles";
import React from "react";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Collapse from "@material-ui/core/Collapse";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { BiCircle } from "react-icons/bi";
import { AiOutlineMinus } from "react-icons/ai";
import Divider from "@material-ui/core/Divider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {ThemeProvider} from "@material-ui/styles";
import {purple} from "@material-ui/core/colors";
import {HiOutlineArrowNarrowRight} from "react-icons/hi";
import ListItemIcon from "@material-ui/core/ListItemIcon";

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
                    </List>
                </div>

            </Drawer>
        </div>
    )
};

export default LeftBar;