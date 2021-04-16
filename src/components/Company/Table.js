import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import httpClient from '../../utils/axios';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Form from './Form';

function createData(name, description, logo1, logo2, action) {
    return { name, description, logo1, logo2, action };
}

const rows = [
    createData('Company1', "this is company1's description.", "/img/virtualium.png", "/img/logo-virtualium-footer.png"),
    createData('Company2', "this is company1's description.", "/img/virtualium.png", "/img/logo-virtualium-footer.png"),
    createData('Company3', "this is company1's description.", "/img/virtualium.png", "/img/logo-virtualium-footer.png"),
    createData('Company4', "this is company1's description.", "/img/virtualium.png", "/img/logo-virtualium-footer.png"),
    createData('Company5', "this is company1's description.", "/img/virtualium.png", "/img/logo-virtualium-footer.png"),
    createData('Company6', "this is company1's description.", "/img/virtualium.png", "/img/logo-virtualium-footer.png"),
    createData('Company7', "this is company1's description.", "/img/virtualium.png", "/img/logo-virtualium-footer.png"),
    createData('Company8', "this is company1's description.", "/img/virtualium.png", "/img/logo-virtualium-footer.png"),
    createData('Company9', "this is company1's description.", "/img/virtualium.png", "/img/logo-virtualium-footer.png"),
    createData('Company10', "this is company1's description.", "/img/virtualium.png", "/img/logo-virtualium-footer.png"),
    createData('Company11', "this is company1's description.", "/img/virtualium.png", "/img/logo-virtualium-footer.png"),
    createData('Company12', "this is company1's description.", "/img/virtualium.png", "/img/logo-virtualium-footer.png"),
    createData('Company13', "this is company1's description.", "/img/virtualium.png", "/img/logo-virtualium-footer.png"),
    createData('Company14', "this is company1's description.", "/img/virtualium.png", "/img/logo-virtualium-footer.png"),
    createData('Company15', "this is company1's description.", "/img/virtualium.png", "/img/logo-virtualium-footer.png"),
    createData('Company16', "this is company1's description.", "/img/virtualium.png", "/img/logo-virtualium-footer.png"),
    createData('Company17', "this is company1's description.", "/img/virtualium.png", "/img/logo-virtualium-footer.png"),
    createData('Company18', "this is company1's description.", "/img/virtualium.png", "/img/logo-virtualium-footer.png"),
    createData('Company19', "this is company1's description.", "/img/virtualium.png", "/img/logo-virtualium-footer.png"),
    createData('Company20', "this is company1's description.", "/img/virtualium.png", "/img/logo-virtualium-footer.png"),
    createData('Company21', "this is company1's description.", "/img/virtualium.png", "/img/logo-virtualium-footer.png"),
];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    { id: 'name', numeric: 'left', disablePadding: true, label: 'Name' },
    { id: 'description', numeric: 'center', disablePadding: false, label: 'Description' },
    { id: 'logo1', numeric: 'center', disablePadding: false, label: 'Logo1' },
    { id: 'logo2', numeric: 'center', disablePadding: false, label: 'Logo2' },
    { id: 'action', numeric: 'right', disablePadding: false, label: 'Action' },
];

function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric === 'right' ? 'right' : headCell.numeric === 'left' ? 'left' : 'center'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
        width: '100%'
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected } = props;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                    Company
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton aria-label="filter list">
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

export default function EnhancedTable() {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    useEffect(() => {
        handleGetCompaies();
    }, [handleGetCompaies])

    const handleGetCompaies = () => {
        const companies = httpClient.apiCompanyGet('/brands');
        console.log('compaies--->', companies.brands)
        localStorage.setItem('companies', []);
    }

    const [open, setOpen] = React.useState(false);
    const [delopen, setDelopen] = React.useState(false);
    const [delid, setDelID] = React.useState('');
    const [data, setData] = React.useState([]);

    const handleEdit = (id) => {
        let brand_id = httpClient.apiCompanyGet(`/brand/${id}`);
        setOpen(true)
        setData({
            "id": 2,
            "brand_name": "Virtualium Shows Live",
            "brand_description": "the best site in the world",
            "logo1": "/img/virtualium.png",
            "logo2": "/img/logo-virtualium-footer.png"
        })
    }
    const handleRemove = () => {
        httpClient.delete(`/brand/${delid}`);
        alert(delid)
    }

    return (
        <div className={classes.root}>
            <div>
                <Dialog
                    open={delopen}
                    onClose={() => { setDelopen(false) }}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure to delete?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { setDelopen(false) }} color="primary" autoFocus>
                            Disagree
                        </Button>
                        <Button onClick={() => { setDelopen(false); handleRemove(); }} color="primary">
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <div>
                <Dialog
                    open={open}
                    onClose={() => { setOpen(false) }}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <Form update data={data} />
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { setOpen(false) }} color="primary" autoFocus>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <Paper className={classes.paper}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.name);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.name}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox"
                                                onClick={(event) => handleClick(event, row.name)}
                                            >
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </TableCell>
                                            <TableCell align="left"
                                                onClick={(event) => handleClick(event, row.name)}
                                            >{row.name}</TableCell>
                                            <TableCell align="center"
                                                onClick={(event) => handleClick(event, row.name)}
                                            >{row.description}</TableCell>
                                            <TableCell align="center">
                                                <img src={row.logo1} alt={row.logo1} />
                                            </TableCell>
                                            <TableCell align="center">
                                                <img src={row.logo2} alt={row.logo2} style={{ width: 100 }} />
                                            </TableCell>
                                            <TableCell align="right">
                                                <EditIcon style={{ cursor: 'pointer' }} onClick={() => { handleEdit(row.id) }} />
                                                <DeleteForeverIcon style={{ cursor: 'pointer' }} onClick={() => { setDelID(row.id); setDelopen(true); }} />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 20, 50]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}
