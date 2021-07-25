import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog(props) {
    //const [open, setOpen] = React.useState(true);

    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {props.text}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {props.secondButton ? [<Button onClick={props.onCancel}>
                            Cancel
                        </Button>, <Button onClick={props.onClose} color="primary">
                            Ok
                        </Button>]
                        : [< Button onClick={props.onClose} color="primary">
                            Ok
                        </Button>]
                    }
                </DialogActions>
            </Dialog>
        </div>
    );
}
