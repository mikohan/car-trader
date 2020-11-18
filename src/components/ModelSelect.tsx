import { useField, useFormikContext } from 'formik';

import MenuItem from '@material-ui/core/MenuItem';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select, { SelectProps } from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { IModel } from '~/interfaces/Car';
import useSWR from 'swr';

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
  make: string;
}

export function ModelSelect(props: ModelSelectProps) {
  const { setFieldValue } = useFormikContext();
  const { models, name, make } = props;
  const classes = useStyles();
  const [field] = useField({ name: props.name });
  const { data } = useSWR(`/api/models?make=${make}`, {
    dedupingInterval: 600000,
    onSuccess: (newValues) => {
      if (!newValues.map((a: any) => a.model).includes(field.value)) {
        // we want to make this field.value = 'all'
        setFieldValue('model', 'all');
      }
    },
  });
  const newModels = data || models;
  return (
    <FormControl fullWidth variant="outlined" className={classes.formControl}>
      <InputLabel id="model">Model</InputLabel>
      <Select name={name} labelId="model" label="Model" {...field} {...props}>
        <MenuItem value="all">
          <em>All Models</em>
        </MenuItem>
        {newModels.map((model: IModel) => (
          <MenuItem key={model.model} value={model.model}>
            {model.model}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
