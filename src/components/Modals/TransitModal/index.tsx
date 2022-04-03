import * as React from 'react';
import { ChangeEvent, Dispatch } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {
    FormControl,
    Input,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material';

import { AppRootStateType } from '../../../store/reducers';
import { addTransitCargoAction } from '../../../store/reducers/transits-reducer/action';
import {
    cargoType,
    commonCargosTypes,
} from '../../../store/reducers/cargos-reducer/types';
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
    outline: '#d99f2c',
};

type Props = {
    open: boolean;
    setOpen: Dispatch<React.SetStateAction<boolean>>;
    selectedCargo: cargoType;
    setSelectedCargo: Dispatch<React.SetStateAction<cargoType>>;
    setError: Dispatch<React.SetStateAction<string>>;
};

const TransitModal = ({
    selectedCargo,
    setSelectedCargo,
    open,
    setOpen,
}: Props) => {
    const commonCargos = useSelector<AppRootStateType, commonCargosTypes>(
        (state) => state.cargos
    );

    const { destinations } = commonCargos;

    const selectedCargoHandler = (
        e:
            | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            | SelectChangeEvent
    ) => {
        const { name, value } = e.target;
        setSelectedCargo({
            ...selectedCargo,
            id: Date.now(),
            [name]: value,
            status: 'In transit',
            attention: '-',
        });
    };

    const dispatch = useDispatch();

    const addTransitHandler = () => {
        selectedCargo.id && dispatch(addTransitCargoAction(selectedCargo));

        setSelectedCargo({
            category: '',
            id: 0,
            position: '',
            cargoNumber: '',
            status: '',
            destination: '',
            attention: '',
        });

        setOpen(false);
    };

    const onCloseModalHandler = () => {
        setOpen(false);
    };

    const inputFieldStyles = {
        marginBottom: '20px',
    };

    return (
        <div>
            <Modal
                onClose={() => onCloseModalHandler()}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                open={open}
            >
                <Box sx={style}>
                    <InputLabel htmlFor="name">Name</InputLabel>
                    <Input
                        name="position"
                        type="string"
                        value={selectedCargo.position}
                        readOnly={true}
                        style={inputFieldStyles}
                    />
                    <InputLabel htmlFor="category">Category</InputLabel>
                    <Input
                        name="category"
                        type="string"
                        defaultValue={selectedCargo.category}
                        readOnly={true}
                        style={inputFieldStyles}
                    />
                    <InputLabel htmlFor="quantity">Choose quantity</InputLabel>
                    <Input
                        name="quantity"
                        type="number"
                        onChange={(e) => selectedCargoHandler(e)}
                        style={inputFieldStyles}
                    />
                    <FormControl fullWidth>
                        <InputLabel id="destination">
                            Choose destination from
                        </InputLabel>
                        <Select
                            labelId="destination"
                            id="destination"
                            name="destinationFrom"
                            label="Choose department"
                            onChange={(e: SelectChangeEvent) =>
                                selectedCargoHandler(e)
                            }
                            defaultValue=""
                            style={inputFieldStyles}
                        >
                            {destinations?.map((destination, i) => (
                                <MenuItem key={i} value={destination}>
                                    {destination}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="destination">
                            Choose destination to
                        </InputLabel>
                        <Select
                            labelId="destinationTo"
                            id="destination"
                            name="destinationTo"
                            label="Choose department"
                            onChange={(e: SelectChangeEvent) =>
                                selectedCargoHandler(e)
                            }
                            defaultValue=""
                            style={inputFieldStyles}
                        >
                            {destinations?.map((destination, i) => (
                                <MenuItem key={i} value={destination}>
                                    {destination}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <div style={{ marginTop: '20px' }}>
                        <Button
                            style={buttonStyles}
                            onClick={addTransitHandler}
                            variant="outlined"
                        >
                            Add transit
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default TransitModal;
