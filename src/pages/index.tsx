import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { getMakes } from '~/database/getMakes';
import { IMake } from '~/interfaces/Car';
import { Formik, Form } from 'formik';
import { Paper } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

interface HomeProps {
  makes: IMake[];
}

export default function Home({ makes }: HomeProps) {
  const classes = useStyles();

  return (
    <div>
      <Formik initialValues={{}} onSubmit={() => {}}>
        {({ values }) => (
          <Form>
            <Paper elevation={3}>
              <Grid container>
                <Grid xs={12} sm={6} item>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="make">Make</InputLabel>
                    <Select labelId="make" label="Make">
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} item>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="model">Model</InputLabel>
                    <Select labelId="model" label="Model">
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} item>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="min">Min Price</InputLabel>
                    <Select labelId="min" label="Make">
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} item>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="max">Max Price</InputLabel>
                    <Select labelId="max" label="Max Price">
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
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
  const makes: IMake[] = await getMakes();
  return {
    props: {
      makes: makes,
    },
  };
};
