import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme =>({
    distance:{
        marginTop:'12px',
        marginLeft:'10px',
        marginRight:'10px',
    },

    buttonStyle:{
        marginTop: '10px',
    },
}));

const initState = (fieldsName) => {
    let init = {};
    fieldsName.forEach((name) => {
        init[name] = "";
    });
    return init;
};

const OptionTextField = ({onClickCall, fieldsName, fieldsLabel, buttonLabel}) =>{
    let styles = useStyles();

    let [values, setValues] = useState(initState(fieldsName));

    const save = (event) => {
        event.preventDefault();
        setValues({ ...values, [event.target.name]: event.target.value});
    };

    const onClickBt = (event) => {
        event.preventDefault();
        onClickCall(values);
    };

    return(
        <React.Fragment>
            <div>
                {fieldsLabel.map((label, index) =>
                    <TextField
                        key={fieldsName[index]}
                        name={fieldsName[index]}
                        label={label}
                        type="text"
                        variant="outlined"
                        size={"small"}
                        className={styles.distance}
                        color={"primary"}
                        onChange={save}
                    />
                )}
            </div>

            <div align={"center"}>
                <Button
                    color={"primary"}
                    onClick={onClickBt}
                    size={"small"}
                    className={styles.buttonStyle} >
                    {buttonLabel}
                </Button>
            </div>
        </React.Fragment>
    )
};

export default OptionTextField;