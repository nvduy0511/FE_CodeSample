import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Exercise.module.css';
import BaiTapCodeAPI from '../../apis/baiTapCodeAPI'
import BaiTapTN from '../../apis/baiTapTN_API'

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



function Exercise(props) {
    const [rows, setRows] = useState([])
    const [rowsTN, setRowsTN] = useState([])
    const navigate = useNavigate();

    const [open, setOpen] = React.useState(false);
    const [deleteAction,setDeleteAction] = useState({
        isBTCode:false,
        id: 1
    });

    useEffect(() => {
        const getAllBTCode = async () => {
            try {
                const response = await BaiTapCodeAPI.getAll();
                setRows(response.data)
            } catch (error) {
                console.log("Fetch data error: ", error);
            }
        }
        getAllBTCode();

        const getAllBTTN = async () => {
            try {
                const response = await BaiTapTN.getAll();
                setRowsTN(response.data)
            } catch (error) {
                console.log("Fetch data error: ", error);
            }
        }
        getAllBTTN();
    }, []);

    const deleteBTCode = (id) => {
        setOpen(true);
        setDeleteAction({
            isBTCode:true,
            id: id
        });
        
    };

    const deleteBTTN = (id) => {
        setOpen(true);
        setDeleteAction({
            isBTCode:false,
            id: id
        });
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        if(deleteAction.isBTCode)
        {
            const dBTCode = async () => {
                try {
                    const response = await BaiTapCodeAPI.deleteBaiTapCode(deleteAction.id);
                    if(response.data)
                    {
                        console.log("Xo??a ba??i t????p TN tha??nh c??ng!");
                        setRows(pre => pre.filter( item => item.id !== deleteAction.id))
                    }
                    
                } catch (error) {
                    console.log("Fetch data error: ", error);
                }
            }
            dBTCode();
            console.log("Xo??a ba??i t????p code id = ",deleteAction.id);
        }
        else
        {
            const dBTTN = async () => {
                try {
                    const response = await BaiTapTN.deleteBaiTapTN(deleteAction.id);
                    if(response.data)
                    {
                        console.log("Xo??a ba??i t????p TN tha??nh c??ng!");
                        setRowsTN(pre => pre.filter( item => item.id !== deleteAction.id))
                    }
                } catch (error) {
                    console.log("Fetch data error: ", error);
                }
            }
            dBTTN();
            console.log("Xo??a ba??i t????p tr????c nghi????m id = ",deleteAction.id);
        }
        setOpen(false);
    }
  

    return (
        <>
            <div className={styles.container}>

                {/* table c??u ho??i code */}
                <div className={styles.TableCauHoiCode}>
                    <div>
                        <h2>C??u ho??i code</h2>
                        <Button sx={{ marginBottom: "20px", float: "right" }} variant="contained"
                            endIcon={<AddCircleOutlinedIcon />}
                            onClick={() => {
                                navigate('/exercise/create')
                            }}>
                            Ta??o ba??i t????p code
                        </Button>
                    </div>
                    <TableContainer component={Paper} style={{ maxHeight: 350 }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ width: 40, fontWeight: "700" }}>ID</TableCell>
                                    <TableCell sx={{ fontWeight: "700" }} align="center">Ti??u ??????</TableCell>
                                    <TableCell sx={{ fontWeight: "700" }} align="center">C????p ??????</TableCell>
                                    <TableCell sx={{ width: 40, fontWeight: "700" }} align="center">Xo??a</TableCell>
                                    <TableCell sx={{ width: 40, fontWeight: "700" }} align="center">S????a</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                        <TableCell component="th" scope="row" >{row.id}</TableCell>
                                        <TableCell align="center" >{row.tieuDe}</TableCell>
                                        <TableCell align="center" >
                                            {row.doKho === 1 ? "D????" :
                                                (row.doKho === 2 ? "Trung bi??nh" : "Kho??")}
                                        </TableCell>
                                        <TableCell align="center" >
                                            <DeleteIcon sx={{ cursor: "pointer", color: "#f04530" }}
                                                onClick={() => deleteBTCode(row.id)}
                                            />
                                        </TableCell>
                                        <TableCell align="center" >
                                            <ModeEditIcon sx={{ cursor: "pointer" }}
                                                onClick={() => console.log("Edit - ", row.id)} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>

                {/* table c??u ho??i tr????c nghi????m */}
                <div className={styles.TableCauHoiCode}>
                    <div>
                        <h2>C??u ho??i tr????c nghi????m</h2>
                        <Button sx={{ marginBottom: "20px", float: "right" }} variant="contained"
                            endIcon={<AddCircleOutlinedIcon />}
                            onClick={() => {
                                navigate('/exercise/multiplechoice')
                            }}
                        >
                            Ta??o ba??i t????p tr????c nghi????m
                        </Button>
                    </div>
                    <TableContainer component={Paper} style={{ maxHeight: 350 }}>
                        <Table sx={{ minWidth: 800 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ width: 40, fontWeight: "700" }}>ID</TableCell>
                                    <TableCell sx={{ fontWeight: "700" }} align="center">C??u ho??i</TableCell>
                                    <TableCell sx={{ fontWeight: "700" }} align="center">??a??p a??n</TableCell>
                                    <TableCell sx={{ width: 40, fontWeight: "700" }} align="center">Xo??a</TableCell>
                                    <TableCell sx={{ width: 40, fontWeight: "700" }} align="center">S????a</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rowsTN.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                        <TableCell component="th" scope="row" >{row.id}</TableCell>
                                        <TableCell className={styles.conten_cell} align="center" style={{ minWidth: "200px" }} dangerouslySetInnerHTML={{ __html: row.cauHoi }} />
                                        <TableCell align="center" >{row.dapAn}</TableCell>
                                        <TableCell align="center" >
                                            <DeleteIcon sx={{ cursor: "pointer", color: "#f04530" }}
                                                onClick={() => deleteBTTN(row.id)}
                                            />
                                        </TableCell>
                                        <TableCell align="center" >
                                            <ModeEditIcon sx={{ cursor: "pointer" }}
                                                onClick={() => console.log("Edit TN - ", row.id)}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Ba??n co?? th????t s???? mu????n xo??a?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Sau khi xo??a 
                            {deleteAction.isBTCode ? " ba??i t????p code ":" ba??i t????p tr????c nghi????m "} co?? 
                            <span style={{fontWeight:"bold",color:"#f04530"}}> ID: { deleteAction.id} </span>
                             ba??n se?? kh??ng th???? kh??i phu??c la??i. Ba??n co?? ??????ng y?? v????i ??i????u na??y?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Hu??y</Button>
                        <Button onClick={handleDelete} autoFocus>
                            ??????ng y??
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>

    );
}

export default Exercise;