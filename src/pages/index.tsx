import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { getMakes } from '~/database/getMakes';
import { IMake, IModel } from '~/interfaces/Car';
import { Formik, Form, Field } from 'formik';
import { Paper } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useRouter } from 'next/router';
import { getAsString } from '~/helpers';
import { getModels } from '~/database/getModel';

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

interface HomeProps {
  makes: IMake[];
  models: IModel[];
}

const prices = [500, 1000, 5000, 15000, 25000, 50000, 250000];

export default function Home({ makes, models }: HomeProps) {
  console.log(models);
  const classes = useStyles();
  const { query } = useRouter();
  const initialValues = {
    make: query.make || 'all',
    model: query.model || 'all',
    min: query.min || 'all',
    max: query.max || 'all',
  };

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={() => {}}>
        {({ values }) => (
          <Form>
            <Paper className={classes.paper} elevation={3}>
              <Grid container spacing={3}>
                <Grid xs={12} sm={6} item>
                  <FormControl
                    fullWidth
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="make">Make</InputLabel>
                    <Field name="make" as={Select} labelId="make" label="Make">
                      <MenuItem value="all">
                        <em>All Makes</em>
                      </MenuItem>
                      {makes.map((make: IMake) => (
                        <MenuItem key={make.make} value={make.make}>
                          {`${make.make} (${make.count})`}
                        </MenuItem>
                      ))}
                    </Field>
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} item>
                  <FormControl
                    fullWidth
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="model">Model</InputLabel>
                    <Select labelId="model" label="Model">
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} item>
                  <FormControl
                    fullWidth
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="min">Min Price</InputLabel>
                    <Field name="min" as={Select} labelId="min" label="Min">
                      <MenuItem value="all">
                        <em>All Prices</em>
                      </MenuItem>
                      {prices.map((price: number) => (
                        <MenuItem key={price} value={price}>
                          {price}
                        </MenuItem>
                      ))}
                    </Field>
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} item>
                  <FormControl
                    fullWidth
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="max">Max Price</InputLabel>
                    <Field
                      name="max"
                      as={Select}
                      labelId="max"
                      label="Max Price"
                    >
                      <MenuItem value="all">
                        <em>None</em>
                      </MenuItem>
                      {prices.map((price: number) => (
                        <MenuItem key={price} value={price}>
                          {price}
                        </MenuItem>
                      ))}
                    </Field>
                  </FormControl>
                </Grid>
              </Grid>
            </Paper>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const param = context.query!.make;

  const make = getAsString(param);
  const [makes, models] = await Promise.all([getMakes(), getModels(make)]);
  return {
    props: {
      makes: makes,
      models: models,
    },
  };
};
