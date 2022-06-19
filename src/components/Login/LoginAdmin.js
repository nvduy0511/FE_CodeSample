import React, { useState } from "react";
import styles from './styles/LoginAdmin.module.css'
import md5 from 'md5';
import AdminAPI from '../../apis/adminAPI';
import {useNavigate} from 'react-router-dom';
import companyLogo from '../../images/logo_transparent.png';

import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';

function LoginAdmin() {
    const [values, setValues] = useState({
                                    username:'',
                                    password: '',
                                    showPassword: false,
                                });
    const navigate = useNavigate();

    const handleClickShowPassword = () => {
        setValues({
          ...values,
          showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
    };

    const handleLogin = async () => {
        console.log(values)
        if(check(values.username, values.password) === true){
            const account = {
                taiKhoan: values.username,
                matKhau: md5(values.password)
            }
            try {
                const response = await AdminAPI.login(account);
                console.log(response.data);
                if(response.data === true){
                    sessionStorage.setItem('Admin', JSON.stringify(true));
                    sessionStorage.setItem('AdminName', JSON.stringify(values.username));
                    navigate('/admin/home');
                }
            } catch (error) {
                console.log("Login false", error);
            }

        }
    }


    const check = (userName, password) => {
        if (userName.length === 0 && password.length === 0) {
            alert("Vui lòng nhập tài khoản và mật khẩu");
            return false;
        }
        if (userName.length === 0) {
            alert("Vui lòng nhập tài khoản");
            return false;

        }
        if (password.length === 0) {
            alert("Vui lòng nhập mật khẩu");
            return false;
        }
        return true;
    }

    return (
        <div className={styles.container}>
                <div className={styles.content}>
                    <span>Đăng nhập</span>
                    <div style={{textAlign:"center", margin:"10px 0"}}>
                        <img src={companyLogo} alt="Logo" />
                    </div>
                    
                    <TextField autoComplete="off" sx={{width:'100%'}} id="standard-search" type='search' label="Tài khoản" variant="standard" onChange={handleChange('username')} />
                    <FormControl sx={{ width: '100%', marginTop:"20px" }} variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">Mật khẩu</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                >
                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                        />
                    </FormControl>
                    <div className={styles.btnDangNhap}>
                        <Button size="large" variant="contained" onClick={() => handleLogin()}>Đăng Nhập</Button>
                    </div>
                    <p>Quên mật khẩu?</p>
                </div>
        </div>
    )
}
export default LoginAdmin;