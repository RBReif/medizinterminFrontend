import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CallIcon from '@material-ui/icons/Call';
import NavigationIcon from '@material-ui/icons/Navigation';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';


const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
}));

export default function AppointmentCard() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="doctor" className={classes.avatar}
                            src="https://cdn.shopify.com/s/files/1/1390/2701/t/5/assets/doctor.jpg?v=12170138145179114637">
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon/>
                    </IconButton>
                }
                title="Dr. Müller (Dentist)" //query doctor name + profession
                subheader="21.07.20, 08:30 AM"
            />
            <CardActions disableSpacing>
                <IconButton aria-label="call doctor">
                    <CallIcon/>
                </IconButton>
                <IconButton aria-label="navigate">
                    <NavigationIcon/>
                </IconButton>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon/>
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography color="textSecondary">Address: Lindwurmstraße 45, München</Typography>
                    <Typography color="textSecondary">Description: Yearly Checkup appointment
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}

