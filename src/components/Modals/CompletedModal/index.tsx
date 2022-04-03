import * as React from 'react';
import { Dispatch, SetStateAction } from 'react';

import { useDispatch } from 'react-redux';

import { completeCargoAction } from '../../../store/reducers/transits-reducer/action';
import { cargoType } from '../../../store/reducers/cargos-reducer/types';

import { transitCargoType } from '../../../store/reducers/transits-reducer/types';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Input, InputLabel } from '@mui/material';

import styles from './styles.modules.scss';
import { buttonStyles } from '../../../pages/StatisticPage/components/ButtonStyles';

const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type Props = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    selectedCargo: cargoType;
    setSelectedCargo: Dispatch<React.SetStateAction<cargoType>>;
    setCompletedCargo: Dispatch<React.SetStateAction<transitCargoType>>;
    completedCargo: transitCargoType;
    setError: Dispatch<React.SetStateAction<string>>;
};

const inputFieldStyles = {
    marginBottom: '20px',
};

const CompletedModal = ({
    open,
    setOpen,
    completedCargo,
    setCompletedCargo,
}: Props) => {
    const dispatch = useDispatch();

    const onChangeHandler = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        const { name, value } = e.target;

        setCompletedCargo({ ...completedCargo, [name]: value });
    };

    const onCloseCompletedHandler = () => {
        setOpen(false);
    };

    const completeHandler = () => {
        dispatch(completeCargoAction(completedCargo));

        onCloseCompletedHandler();
    };

    return (
        <Modal
            onClose={onCloseCompletedHandler}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            open={open}
        >
            <Box sx={style}>
                <h2 style={{ marginBottom: '30px' }}>Confirm cargo transit</h2>
                <InputLabel
                    className={styles.textField}
                    htmlFor="destinationFrom"
                >
                    Destination From
                </InputLabel>
                <Input
                    name="destinationFrom"
                    type="string"
                    value={completedCargo.destinationFrom}
                    readOnly
                    className={styles.textField}
                    style={inputFieldStyles}
                />
                <InputLabel
                    className={styles.textField}
                    htmlFor="destinationTo"
                >
                    Destination To
                </InputLabel>
                <Input
                    name="destinationTo"
                    type="string"
                    value={completedCargo.destinationTo}
                    readOnly
                    className={styles.textField}
                    style={inputFieldStyles}
                />
                <InputLabel className={styles.textField} htmlFor="position">
                    Position
                </InputLabel>
                <Input
                    name="position"
                    type="string"
                    value={completedCargo.position}
                    readOnly
                    style={inputFieldStyles}
                    className={styles.textField}
                />
                <InputLabel htmlFor="category">Category</InputLabel>
                <Input
                    name="category"
                    type="string"
                    defaultValue={completedCargo.category}
                    readOnly
                    style={inputFieldStyles}
                    className={styles.textField}
                />
                <InputLabel className={styles.textField} htmlFor="quantity">
                    Confirm quantity
                </InputLabel>
                <Input
                    name="quantity"
                    type="number"
                    style={inputFieldStyles}
                    defaultValue={completedCargo.quantity}
                    onChange={(e) => onChangeHandler(e)}
                />
                <div style={{ marginTop: '20px' }}>
                    <Button
                        style={buttonStyles}
                        className={styles.button}
                        onClick={completeHandler}
                        variant="outlined"
                    >
                        Confirm transit
                    </Button>
                </div>
            </Box>
        </Modal>
    );
};

export default CompletedModal;