import { useField } from 'formik';

import MenuItem from '@material-ui/core/MenuItem';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select, { SelectProps } from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { IModel } from '~/interfaces/Car';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      margin: 'auto',
      maxWidth: 800,
      padding: theme.spacing(3),
    },
    formControl: {
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

interface ModelSelectProps extends SelectProps {
  name: string;
  models: IModel[];
}

export function ModelSelect(props: ModelSelectProps) {
  const { models, name } = props;
  const classes = useStyles();
  const [field] = useField({ name: props.name });
  return (
    <FormControl fullWidth variant="outlined" className={classes.formControl}>
      <InputLabel id="model">Model</InputLabel>
      <Select name={name} labelId="model" label="Model" {...field} {...props}>
        <MenuItem value="all">
          <em>All Models</em>
        </MenuItem>
        {models.map((model: IModel) => (
          <MenuItem key={model.model} value={model.model}>
            {model.model}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
