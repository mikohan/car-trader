import { GetServerSideProps } from 'next';
import { openDB } from '~/openDB';
import { CarModel } from 'api/Car';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

interface CarDetailsProps {
  car: CarModel | undefined | null;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: '100%',
    },
    image: {
      width: '100%',
      height: '100%',
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  })
);

export default function CarDetails({ car }: CarDetailsProps) {
  const classes = useStyles();
  if (!car) {
    return <h1>Sorry car is not found</h1>;
  }
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={7}>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={car.photoUrl} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h5">
                  {`${car.make} ${car.model}`}
                </Typography>
                <Typography variant="h4" gutterBottom>
                  {`$ ${car.price}`}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Year: {car.year}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  ID: {car.id}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Milege: {car.kilometers}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Fuel: {car.fuelType}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Fuel: {car.details}
                </Typography>
              </Grid>
              <Grid item></Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;
  const db = await openDB();
  const car = await db.get<CarModel | undefined>(
    'SELECT * FROM Car WHERE id = ?',
    [id]
  );

  return {
    props: { car: car || null },
  };
};
