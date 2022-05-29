import React, {useEffect} from 'react'
import classNames from 'classnames/bind'
import {  useSelector } from 'react-redux';
import styles from './styles/resultTest.module.css'
import AceEditor from 'react-ace-builds';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import BaiLamkiemTraAPI from '../../apis/baiLamKiemTraAPI';

const cx = classNames.bind(styles);

function ResultView({idDeKiemTra}) {

  const dapAn ={ '1':'A','2':'B','3':'C','4':'D'};
  let answers = useSelector((state) => state.doTest.answer);
  answers = [...answers].sort((a,b) => a.stt-b.stt);
  const totalScore = answers.reduce((sum, answer) => sum+answer.diemDatDuoc, 0);

  useEffect(() => {
    const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
              const saveBaiLamKiemTra = async()=>{
                try {
                  const response = await BaiLamkiemTraAPI.add({
                    tongDiem : totalScore,
                    uId: user.uid,
                    idDeKiemTra: idDeKiemTra,
                    lsCauTraLoi: answers.map((answer) => ({
                                              id: answer.id,
                                              dapAn: answer.dapAn,
                                              loaiCauHoi: answer.loaiCauHoi,
                                              diem: answer.diemDatDuoc}))
                  });
                  console.log(response.data)
                  if(response.data)
                    alert("Lưu bài làm kiểm tra thành công!");
                } catch (error) {
                  console.log(error)
                }
              }
          
              saveBaiLamKiemTra();
            }
        });
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className={cx('content')}>
      <div className={cx('TotalScore')}>
        <h2>Tổng điểm: {totalScore} điểm</h2>
      </div>
      {
        answers.map((answer,index) =>(
          <div key={index}>
            {answer.loaiCauHoi === 0 
            ?(<div className={cx('item')}>
                <h2>Câu {answer.stt}</h2>
                <div className={cx('questionTitle')}>
                    {answer.cauHoi}
                </div>
                <div className={cx('answer')}>
                  { answer.diemDatDuoc === 0 ?  <FontAwesomeIcon className={cx('error')} icon={faCircleXmark}/>
                    :<FontAwesomeIcon className={cx('success')} icon={faCircleCheck}/>
                  }
                  <p>Đáp án {dapAn[answer.dapAn]}</p>
                </div>
  
                <div className={cx('score')}>
                <p>Điểm đạt được: <span style={{color:"#d72929"}}>{answer.diemDatDuoc||0}</span>{'/'}<span >{answer.diemToiDa}</span></p>
                </div>
              </div>)
            :(<div className={cx('item')}>
                <h2>Câu {answer.stt}</h2>
                <div className={cx('questionTitle')}>
                    {answer.cauHoi}
                </div>
                <div className={cx('score')}>
                  <p>Điểm đạt được: <span style={{color:"#d72929"}}>{answer.diemDatDuoc||0}</span>{'/'}<span>{answer.diemToiDa}</span></p>
                </div>
  
                <div className={cx('answer')}>
                  <AceEditor 
                      value={answer.dapAn}
                      mode="c_cpp"
                      theme='one_dark'
                      fontSize='12pt'
                      name="UNIQUE_ID_OF_DIV"
                      width='90%'
                      height='400px'
                      maxLines={Infinity}
                      showPrintMargin={false}
                      readOnly
                      editorProps={{
                          $blockScrolling: true,
                      }}
                      setOptions={{
                          enableBasicAutocompletion: true,
                          enableLiveAutocompletion: true,
                          enableSnippets: true,
                          showLineNumbers: true,
                      }}
                  />
                </div>
              </div>)
              }

          </div>  
        ))
      }
    </div>
  )
}

export default ResultView;