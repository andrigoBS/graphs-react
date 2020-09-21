import {makeStyles} from "@material-ui/core/styles";
import React from "react";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Collapse from "@material-ui/core/Collapse";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

const drawerWidth = 200;
const useStyles = makeStyles(theme =>({

    drawerPaper: {
        width: drawerWidth,
    },

    space:{
        marginTop: '12px'
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
                    <List >
                        <ListItem button onClick={handleOnClickAddVertex}>
                          ADICIONAR VERTICE
                        </ListItem>
                        <ListItem>
                            <Collapse in={addVertex}>
                                <TextField
                                    id="vertextName"
                                    label="Nome"
                                    type="text"
                                    variant="outlined"
                                    size={"small"}
                                />
                                <TextField
                                    id="vertextName"
                                    label="Peso"
                                    type="text"
                                    variant="outlined"
                                    size={"small"}
                                    className={styles.space}
                                />
                                <div align={"center"}>
                                    <Button size={"small"} className={styles.space} >
                                        Adicionar
                                    </Button>
                                </div>

                            </Collapse>
                        </ListItem>

                        <ListItem button>
                            ADICIONAR ARESTA
                        </ListItem>
                        <ListItem button>
                            ADICIONAR ARCO
                        </ListItem>
                    </List>
                </div>

            </Drawer>
        </div>
    )
};

export default LeftBar;