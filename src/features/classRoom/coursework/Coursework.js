import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';
import Backdrop from '../.././../components/Backdrop';
import { faChevronRight, faCirclePlus, faMagnifyingGlass, faTableList, faFilter } from '@fortawesome/free-solid-svg-icons';
import styles from "./CourseWork.module.css"
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import RoomApi from '../../../apis/roomApi';


function Coursework(props) {

    const [courseWorks, setCourseWorks] = useState([]);
    const params = useParams();
    const [draft, setDarft] = useState(false);
    const [open, setOpen] = useState(true);
    const [close, setClose] = useState(true);
    const [mobileOpen, setMobileOpen] = useState();
    const navigate = useNavigate();


    const [filter, setFilter] = useState({
        draft: false,
        open: false,
        close: false,
        code: false,
        mutiple_question: false,
    });

    // const role = 'giangvien'

    useEffect(() => {
        const data = async () => {
            try {
                const respone = await RoomApi.getRoomInfo();
                setCourseWorks(respone.data);
            } catch (error) {
                console.log("Fetch data false");
            }
        }
        data();
    }, [])

    const handleSwitch = (name) => {
        if(props.role === "giangvien"){
            navigate(`/courseworkdetail/${name}`);
        }
        if(props.role === "hocvien"){
            navigate(`/assignment/${name}`);
        }
    }

    const handleFilterChange = (event) => {
        setFilter({
            // copy filter
            ...filter,
            // thay đổi giá trị
            [event.target.name]: event.target.checked,
        })

    }

    return (
        <div className={props.type === 'Bài tập' ? styles.courseWork : styles.none} >

            {/*Start Mobile  */}
            <div className={styles.mobile_btn} >
                <NavLink to={`/room/${params.roomId}/create`} className={styles.btn_mobile} >
                    <FontAwesomeIcon icon={faCirclePlus} />
                    <span>Tạo bài tập</span>
                </NavLink>

                <div className={styles.btn_mobile} onClick={() => setMobileOpen("find")} >
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    <span>Tìm kiếm</span>
                </div>


                <div className={styles.btn_mobile} onClick={() => setMobileOpen("filter")} >
                    <FontAwesomeIcon icon={faFilter} />
                    <span>Lọc</span>
                </div>
            </div>

            {mobileOpen === "find" && <div className={styles.frame}  >
                <Backdrop className={styles.backdrop} onClick={() => setMobileOpen('')}
                />
                <div className={styles.mobile_find_content} >
                    <input type="text" placeholder='Nhập tên bài cần tìm' />
                </div>
            </div>}

            {mobileOpen === "filter" && <div className={styles.frame} >
                <Backdrop onClick={() => setMobileOpen('')} open={true} />
                <div className={styles.mobile_filter_content} >

                    <FormControl component="fieldset" >
                        <FormLabel>Lọc theo trạng thái:</FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox onChange={handleFilterChange} name="draft" />
                                }
                                label="Nháp"
                            />

                            <FormControlLabel
                                control={
                                    <Checkbox name="open" />
                                }
                                label="Mở"
                            />

                            <FormControlLabel
                                control={
                                    <Checkbox name="close" />
                                }
                                label="Đóng"
                            />
                        </FormGroup>
                    </FormControl>

                    <FormControl component="fieldset" >
                        <FormLabel>Lọc theo loại:</FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox name="code" />
                                }
                                label="Code"
                            />

                            <FormControlLabel
                                control={
                                    <Checkbox name="mutiple_question" />
                                }
                                label="Trắc nghiệm"
                            />
                        </FormGroup>
                    </FormControl>
                </div>
            </div>}
            {/*End:  Mobile */}

            <div className={styles.courseWork_left_content}>
                
                {props.role === "giangvien" && 
                <div className={styles.courseWork_draft} onClick={() => setDarft(!draft)}  >
                    <div className={styles.header}  >
                        <p>Nháp</p>
                        <FontAwesomeIcon className={draft ? styles.icon_active : styles.icon} icon={faChevronRight} />
                    </div>
                </div>}

                {draft && <div className={styles.coursework_content} >

                    {courseWorks.map(courseWork => (
                        <div key={courseWork.id} className={styles.coursework_content_item}>
                            <div className={styles.item_info}>
                                <FontAwesomeIcon icon={faTableList} />
                                <a className={styles.item_name} onClick={() => handleSwitch(courseWork.name)} >{courseWork.name}</a>
                            </div>

                            <p className={styles.item_draft}>Nháp</p>
                        </div>
                    ))}

                </div>}

                <div className={styles.courseWork_open} onClick={() => setOpen(!open)} >
                    <div className={styles.header}>
                        <p>Mở</p>
                        <FontAwesomeIcon className={open ? styles.icon_active : styles.icon} icon={faChevronRight} />
                    </div>
                </div>
                {open && <div className={styles.coursework_content} >

                    {courseWorks.map(courseWork => (
                        <div key={courseWork.id} className={styles.coursework_content_item}>
                            <div className={styles.item_info}>
                                <FontAwesomeIcon icon={faTableList} />
                                <a className={styles.item_name} onClick={() => handleSwitch(courseWork.name)} >{courseWork.name}</a>
                                <p className={styles.item_time}>Bắt đầu lúc 09:00 AM 29/04/2022 kết thúc lúc: 09:00 AM 30/04/2022</p>
                            </div>

                            <p className={styles.item_open}>Mở</p>
                        </div>
                    ))}

                </div>}

                <div className={styles.courseWork_close} onClick={() => setClose(!close)} >
                    <div className={styles.header}>
                        <p>Kết thúc</p>
                        <FontAwesomeIcon className={close ? styles.icon_active : styles.icon} icon={faChevronRight} />
                    </div>
                </div>
                {close && <div className={styles.coursework_content} >

                    {courseWorks.map(courseWork => (
                        <div key={courseWork.id} className={styles.coursework_content_item}>
                            <div className={styles.item_info}>
                                <FontAwesomeIcon icon={faTableList} />
                                <NavLink className={styles.item_name} to="/" >{}courseWork.name</NavLink>
                                <p className={styles.item_time}>Đã kết thúc vào lúc: 09:00 AM 30/04/2022</p>
                            </div>

                            <p className={styles.item_close}>Kết thúc</p>
                        </div>
                    ))}
                </div>}
            </div>

            <div className={styles.courseWork_right_content}>

                {props.role === "giangvien" && 
                <NavLink to={`/room/${params.roomId}/create`} className={styles.btn_}>
                    <FontAwesomeIcon icon={faCirclePlus} size="2x" />
                    <p>Tạo bài tập</p>
                </NavLink>}

                <div className={styles.btn_} id={styles.find}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} size="2x" />
                    <input placeholder='Tìm kiếm' />
                </div>

                <div className={styles.btn_fillter}>
                    <div className={styles.fillter_}>
                        <p>Tìm kiếm theo trạng thái:</p>

                        <div className={styles.status}>
                            <input name='Draft' type="checkbox" value="Nháp" />
                            <label id={styles.draft} htmlFor="Draft">Nháp</label>
                        </div>

                        <div className={styles.status}>
                            <input name='Open' type="checkbox" value="Nháp" />
                            <label id={styles.open} htmlFor="Open">Mở</label>
                        </div>

                        <div className={styles.status} >
                            <input name='Close' type="checkbox" value="Nháp" />
                            <label id={styles.close} htmlFor="Close">Đóng</label>
                        </div>
                    </div>
                    <div className={styles.fillter_type}>
                        <p>Tìm kiếm theo loại bài tập:</p>

                        <div className={styles.type}>
                            <input name='Draft' type="checkbox" value="Nháp" />
                            <label htmlFor="Draft">Trắc nghiệm</label>
                        </div>

                        <div className={styles.type}>
                            <input name='code' type="checkbox" value="code" />
                            <label htmlFor="code">Viết code</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Coursework;