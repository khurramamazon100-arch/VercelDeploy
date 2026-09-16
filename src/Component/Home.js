import React, { useEffect, useState,useRef } from "react";


import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios'
import Swal from "sweetalert2";

export const Home = () => {
    const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const [transcribedText, setTranscribedText] = useState('یہاں اردو متن ظاہر ہو گا...');
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
    const [Name,Set_Name] = useState('');
    const [Email,Set_Email] = useState('');
const baseurl = 'https://691b26ba2d8d78557571be7e.mockapi.io/user'

    const [mydata,Set_Data] = useState([]);

    useEffect(() =>{


    })
    const handleSubmit = (e) =>{
        e.preventDefault();
Axios.post(baseurl,{
    Name,
    Email
})
.then((response) =>{
Set_Data(response.data )


    
}).catch(error =>{
    console.log(error + 'api ka error')
})
alert(mydata.Name)
    }
    // return (
    //     <>
    //     <form onSubmit={handleSubmit}>
    //     <div className="col-6">
    //             <label className="text-success">Name</label>
    //             <input
    //               type="text"
    //               className="form-control"
                  
    //               value={Name}
    //               onChange={(e) =>
    //                 Set_Name(e.target.value)
    //               }
    //             />
    //           </div>
    //           <button >submit</button>
    //           </form>
    //     <h1>{Name} </h1>
            
    //     </>
    // );
    return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h1>اردو اسپیچ ٹو ٹیکسٹ (STT)</h1>
      
      <p style={{ margin: '20px 0', fontSize: '1.2em', color: isRecording ? 'red' : 'green' }}>
        {isRecording ? '🔴 ریکارڈنگ...' : 'll🟢 تیار'}
      </p>

      {/* بٹن */}
      <div style={{ marginBottom: '20px' }}>
        <button 
        //   onClick={isRecording ? stopRecording : startRecording} 
          disabled={!navigator.mediaDevices} // اگر براؤزر میں مائیکروفون دستیاب نہ ہو تو غیر فعال کر دیں
          style={{ 
            padding: '10px 20px', 
            fontSize: '1em', 
            backgroundColor: isRecording ? '#dc3545' : '#28a745', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer'
          }}
        >
          {isRecording ? 'ریکارڈنگ روکیں ⏹️' : 'ریکارڈنگ شروع کریںBJ 🎤'}
        </button>
      </div>

      {/* آؤٹ پٹ ٹیکسٹ ایریا */}
      <div style={{ marginTop: '30px', border: '1px solid #ccc', padding: '15px', borderRadius: '5px', minHeight: '100px', backgroundColor: '#f9f9f9' }}>
        <h3>تبدیل شدہ اردو متن:</h3>
        <p style={{ fontSize: '1.5em', fontWeight: 'bold', direction: 'rtl', textAlign: 'right' }}>
          {transcribedText}
        </p>
      </div>

      {/* ریکارڈ شدہ آڈیو چلانے کے لیے (اختیاری) */}
      {audioURL && !isRecording && (
        <div style={{ marginTop: '20px' }}>
          <h3>ریکارڈ شدہ آڈیو:</h3>
          <audio src={audioURL} controls />
        </div>
      )}
    </div>
  );
}




    
    // constructor(props){
    //     super(props)

    //     this.state = {
    //         name: this.props.name,
    //         age: this.props.age,
    //         surname: this.props.surname

    //     }
    
    // }
    //ChangeName(){
    // this.setState({
    //     name: "welcome",
    //     age:42,
    //     surname: "qureshi"
    // })


    //}

    

