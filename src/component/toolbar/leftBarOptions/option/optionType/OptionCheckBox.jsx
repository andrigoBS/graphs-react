import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";

const OptionCheckBox = ({onActive, names, labels, actives}) => {
    const save = (event) => {
        onActive(event.target.checked, event.target.name);
    }

    return <FormGroup>
        {names.map((name, index) =>
            <FormControlLabel
                key={name}
                label={labels[index]}
                control={<Checkbox color={"primary"}
                                   checked={actives[name]}
                                   name={name}
                                   onChange={save}/>}
            />
        )}
    </FormGroup>
}

export default OptionCheckBox;