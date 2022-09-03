import React from 'react';
import { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
const Word = ({word, onLoad=()=>{}})=>{
    const [showTranslateBtn, setShowTranslateBtn]=useState(false)
    return(
        <div className='relative h-[80px] group'>
            {showTranslateBtn&&<div className='absolute top-0 left-0' >click</div>}
            <div onClick={()=>{
                onLoad(word)
            }} onMouseEnter={()=>{
                    setShowTranslateBtn(true)
                }} 
                    onMouseLeave={()=>{
                        setShowTranslateBtn(false)
                    }}
            className="text-xl mt-4 leader-3 h-[50px] link-underline link-underline-black transform transition group-hover:text-pink-500">{word}</div>

        </div>
        
    )
}
const Writer=()=>{
    const [tempWord, setTempWord]=useState([])
    const [selectedWord, setSelectedWord]=useState('')
    const [loading, setLoading]=useState(false);
    const getWord =async(word)=>{
        setLoading(true)
        setTempWord([])
        setSelectedWord(word)
        axios.get(`https://readerb.vercel.app/getWord?word=${word}`)
        .then(re=>{
            console.log(re );
            setTempWord(re.data.result)
            setLoading(false)
        })
        .catch((e)=>{
            console.log("e ", e);
            setLoading(false)
        });
    }
    const [enableEdit, setEnableEdit]=useState(false);
    const [text, setText]=useState('')
    return(
        
        <form onSubmit={()=>{
            setEnableEdit(false)
        }} className="flex flex-col  flex-1 relative mx-auto px-5 pb-5 w-[90%] md:w-[700px] bg-pink-400 my-2 md:mb-20 drop-shadow-2xl rounded-lg border-1  max-h-[90%] ">
            {loading&&<div style={{zIndex:1000}} className='fixed top-0 bottom-0 left-0 right-0 bg-green-100 opacity-40  z-100'>{loading}</div>}
            <div className='flex flex-row py-3 items-start'>
                <div onClick={()=>{
                    setEnableEdit(!enableEdit)
                }} className='border-1 bg-pink-400 mt-1 bg-white text-pink-500 px-2 py-1 h-8 rounded-md'>{enableEdit?'Start Reading':'Edit Text'}</div>
                
                {enableEdit==false&&<div className='flex-1'>
                    <div className='text-white text-bold ml-4'>{selectedWord}</div>
                    <div className='flex flex-row'>
                        {loading==false&&<div className='ml-4 text-gray-700'>{tempWord.join(", ")}</div>}
                        {loading&&<div className='ml-4 text-white'>please wait...</div>}
                    </div>
                    
                </div>}
                {enableEdit==true&&
                    <div className='flex-1 ml-4 text-white'>
                        Please Edit text. Once you completed text click 'Start Reading'
                    </div>
                }
            </div>
            {
                enableEdit||text.length==0?

                <textarea className='p-3 rounded-lg' value={text}  style={{width:"100%", height:"90%"}} onChange={(e)=>{
                    let tt = e.target.value;
                    setText(tt);
                    if(tt.substring(0,1)=='"'){
                        tt=tt.substring(1);
                    }
                    if(tt.substring(tt.length-1)=='"'){
                        tt=tt.substring(1);
                    }
                }}></textarea>
                
                :
                <div className='p-3 bg-white rounded-lg flex-1 flex flex-row justify-start flex-wrap overflow-y-auto '>
                    {text.split(" ").map((mm, mid)=>{
                        return(
                            <div  key = {mid} className=" flex flex-row  ">
                                {mid>0? <span>&nbsp; </span>:<span></span>}
                                <Word onLoad={(word)=>{getWord(word)}} word={mm} key={mid}/>
                            </div>
                        )
                    })}
                </div>
            }
            
            
        </form>
    );
}
export default Writer;