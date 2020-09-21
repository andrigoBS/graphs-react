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
import Divider from "@material-ui/core/Divider";

const drawerWidth = 200;
const useStyles = makeStyles(theme =>({

    drawerPaper: {
        width: drawerWidth,
    },

    space:{
        marginTop: '12px'
    },

    buttonStyle:{
        marginTop: '12px',
        color:'#9c27b0',
        marginBottom: '12px'
    },

    distance:{
        marginTop:'12px',
        marginLeft:'10px',
        marginRight:'10px',
        color:'#9c27b0',
    },

    margins:{
        marginTop:'-10px',
        marginBottom:'-10px'
    },

    marginTopClose:{
      marginTop:'-15px'
    },

    marginTopOpen:{
        marginTop:'20px',
        backgroundColor:'#9c27b0',
    },


    colorOpen:{
        backgroundColor:'#9c27b0',
        weight:'5px'
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
const LeftBar = () =>{
    let styles = useStyles();

    const [addVertex,setAddVertex] = React.useState(false);

    const handleOnClickAddVertex = () => {
        setAddVertex(!addVertex);
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
                            <div className={styles.margins}>
                                <h1 className={addVertex ? styles.optionsFontOpen : styles.optionsFontClose}>Vertice</h1>
                            </div>
                        </ListItem>

                        <ListItem >
                            <Collapse  in={addVertex}>
                                <Paper variant={"outlined"}>
                                        <TextField
                                            id="vertextName"
                                            label="Nome"
                                            type="text"
                                            variant="outlined"
                                            size={"small"}
                                            className={styles.distance}
                                            color={"primary"}
                                        />


                                    <div align={"center"}>
                                        <Button

                                            color={"primary"}
                                            onClick={handleOnClickAddVertex}
                                            size={"small"}
                                            className={styles.buttonStyle} >
                                            Adicionar
                                        </Button>
                                    </div>
                                </Paper>
                            </Collapse>
                        </ListItem>

                        <Divider className={addVertex ? styles.marginTopOpen : styles.marginTopClose}/>
                        <ListItem button>
                            <div className={styles.margins} align={"center"}>
                                <h1 className={addVertex ? styles.optionsFontOpen : styles.optionsFontClose}>Aresta</h1>
                            </div>
                        </ListItem>


                        <ListItem button>
                            <div className={styles.margins} align={"center"}>
                                <h1 className={addVertex ? styles.optionsFontOpen : styles.optionsFontClose}>Arco</h1>
                            </div>
                        </ListItem>
                    </List>
                </div>

            </Drawer>
        </div>
    )
};

export default LeftBar;