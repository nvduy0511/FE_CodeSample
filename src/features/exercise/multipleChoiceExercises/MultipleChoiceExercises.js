import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import styles from './MultipleChoiceExercises.module.css';
import Backdrop from '../../../components/Backdrop';
import { getAuth, onAuthStateChanged } from "firebase/auth";


import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

import BaiTapTN from '../../../apis/baiTapTN_API';

function MultipleChoiceExercises({ data }) {

    const [exerciseName, setExerciseName] = useState('');
    const [answerOne, setAnswerOne] = useState('');
    const [answerSecond, setAnswerSecond] = useState('');
    const [answerThree, setAnswerThree] = useState('');
    const [answerFour, setAnswerFour] = useState('');

    const [valueInputAnswer, setValueInputAnswer] = useState('');
    const [trueAnswer, setTrueAnswer] = useState(1);
    const [open, setOpen] = useState({ value: false, answer: 0 });

    const handleSaveAnswer = (numberAnswer) => {
        switch (numberAnswer) {
            case 1:
                setAnswerOne(valueInputAnswer);
                break;
            case 2:
                setAnswerSecond(valueInputAnswer);
                break;
            case 3:
                setAnswerThree(valueInputAnswer);
                break;
            case 4:
                setAnswerFour(valueInputAnswer);
                break;
            default:
                break;
        }
        setOpen(false);
    }

    const handleDisplayValueAnswer = (numberAnswer) => {
        if (numberAnswer === 1) {
            return answerOne;
        }
        if (numberAnswer === 2) {
            return answerSecond;
        }
        if (numberAnswer === 3) {
            return answerThree;
        }
        if (numberAnswer === 4) {
            return answerFour;
        }
    }

    const handleSave = () => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                let ob= 
                {
                    cauHoi: exerciseName,
                    cauTraLoi1: answerOne,
                    cauTraLoi2: answerSecond,
                    cauTraLoi3: answerThree,
                    cauTraLoi4: answerFour,
                    dapAn: trueAnswer,
                    uIdNguoiTao: user.uid
                }
                const addBTTN = async () => {
                    try {
                        const response = await BaiTapTN.postAddBaiTapTN(ob);
                        console.log(response.data);
                    } catch (error) {
                        console.log("Fetch data error: ", error);
                    }
                }
                addBTTN();
            }
        });
        
    }
    
    
    // useEffect(() => {
    //     if (open === true) {
    //         const originalStyle = window.getComputedStyle(document.body).overflow;
    //         document.body.style.overflow = 'hidden';
    //         return () => document.body.style.overflow = originalStyle;
    //     }
    // },[open])

    return (
        <div>
            <div className={styles.content} >

                <div className={styles.exxercise_disciption} >
                    <h2>C??u h???i</h2>
                    <CKEditor
                        height="500px"
                        editor={ClassicEditor}
                        data={exerciseName}
                        onReady={(editor) => {
                            editor.editing.view.change((writer) => {
                                writer.setStyle(
                                    "height",
                                    "400px",
                                    editor.editing.view.document.getRoot()
                                );
                            });
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setExerciseName(data);
                            
                        }}
                    />
                </div>
            </div>

            <div className={styles.content_answer} >
                <div className={styles.exercise_input} >
                    <h2>C??u tr??? l???i</h2>
                    <div className={styles.input_items} >
                        <div className={styles.input_item} onClick={() => setOpen({ value: true, answer: 1 })}  >
                            C??u tr??? l???i 1:
                            <div className={styles.conten_input} dangerouslySetInnerHTML={{__html: answerOne}} />
                            <FontAwesomeIcon className={styles.icon_edit} icon={faPencil} />
                        </div>

                        <div className={styles.input_item} onClick={() => setOpen({ value: true, answer: 2 })}>
                            C??u tr??? l???i 2:
                            <div className={styles.conten_input} dangerouslySetInnerHTML={{__html: answerSecond}} />
                            <FontAwesomeIcon className={styles.icon_edit} icon={faPencil}  />
                        </div>

                        <div className={styles.input_item} onClick={() => setOpen({ value: true, answer: 3 })} >
                            C??u tr??? l???i 3:
                            <div className={styles.conten_input} dangerouslySetInnerHTML={{__html: answerThree}} />
                            <FontAwesomeIcon className={styles.icon_edit} icon={faPencil} />
                        </div>

                        <div className={styles.input_item} onClick={() => setOpen({ value: true, answer: 4 })} >
                            C??u tr??? l???i 4:
                            <div className={styles.conten_input} dangerouslySetInnerHTML={{__html: answerFour}} />
                            <FontAwesomeIcon className={styles.icon_edit} icon={faPencil}  />
                        </div>
                    </div>
                </div>
                <h2>??a??p a??n</h2>
                <FormControl fullWidth style={{marginTop:"10px"}}>
                    <InputLabel id="level-label">??a??p a??n</InputLabel>
                    <Select
                        labelId="level-label"
                        value={trueAnswer}
                        label="C????p ??????"
                        onChange={e => setTrueAnswer(e.target.value)}
                    >
                        <MenuItem value={1}>C??u 1</MenuItem>
                        <MenuItem value={2}>C??u 2</MenuItem>
                        <MenuItem value={3}>C??u 3</MenuItem>
                        <MenuItem value={4}>C??u 4</MenuItem>
                    </Select>
                </FormControl>
                
            </div>

            <div className={styles.exercise_btn} >
                <Button  variant="contained" style={{backgroundColor:"ButtonShadow"}}
                    endIcon={<CancelIcon />}
                >
                    Hu??y
                </Button>

                <Button  variant="contained" style={{marginLeft:"20px"}}
                    endIcon={<SaveIcon />}
                    onClick={handleSave}
                >
                    L??u
                </Button>
            </div>

            {open.value && <Backdrop onClick={() => setOpen(false)} />}
            {open.value && 
            <div className={styles.answer_input}  >
                <h2>N???i dung</h2>
                <CKEditor
                    height="500px"
                    editor={ClassicEditor}
                    data={handleDisplayValueAnswer(open.answer)}
                    onReady={(editor) => {
                        editor.editing.view.change((writer) => {
                            writer.setStyle(
                                "height",
                                "400px",
                                editor.editing.view.document.getRoot()
                            );
                        });
                    }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        setValueInputAnswer(data)
                    }}/>

                <div className={styles.btn_answer_input} >
                    <Button  variant="contained" style={{backgroundColor:"ButtonShadow"}}
                        endIcon={<CancelIcon />}
                        onClick={() => setOpen(false)}>
                        Hu??y
                    </Button>

                    <Button  variant="contained" style={{marginLeft:"20px"}}
                        endIcon={<SaveIcon />}
                        onClick={() => handleSaveAnswer(open.answer)}>
                        L??u
                    </Button>
                </div>
            </div>
            }
        </div>
    );
}

export default MultipleChoiceExercises;