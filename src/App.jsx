
import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [length,setLength]=useState(8);
  //using slidebar we can change length
  const [numAllowed,setNumAllowed]=useState(false)
  const [charAllowed,setCharAllowed]=useState(false)
  //if Numbers checkbox is ticked , then allow numbers, similar for special characters
  const [password,setPassword]=useState("")

  // useRef hook
  const passwordRef=useRef(null)


  // here we want to call this passwordGenerator function depending upon length and checkboxes
  // So we use another hook aka useCallback
  //SYNTAX: useCallback(function,dependancies ka array)
  //useCallback is not responsible for run your function BUT to memoize the function by placing that function in cache
  const passwordGenerator=useCallback(()=>{
    let pass=""
    let str="ASDFGHJKLZXCVBNMQWERTYUIOPasdfghjklzxcvbnmqwertyuiop"
    if(numAllowed) str+="0123456789"
    if(charAllowed) str+="{}()!@#$%^&*"

    for (let i = 0; i < length; i++) {
      let char=str[Math.floor(Math.random()*str.length)]
      pass+=char;
    }

    setPassword(pass)
  },[length,numAllowed,charAllowed,setPassword])

  const copyPasswordToClipboard=useCallback(()=>{
    passwordRef.current?.select()
    //this will select password whenever you click the copy btn
    window.navigator.clipboard.writeText(password)//It will copy password on clipboard
  },[password])

  //SYNTAX: useEffect(function,dependancies ka array)
  useEffect(()=>{
    passwordGenerator()
  },[length, numAllowed, charAllowed, passwordGenerator])
  //lengthBar,numbers checkbox ya firr characters ka checkbox inn mei se kisi ko bhi chhed dunga to ye run hoga

  return (
    <>
      <div className="w-full max-w-md mx-auto rounded-lg px-4 my-8 text-orange-500 bg-gray-800">
      <h1 className=" text-white text-center my-3">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input 
        type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="password"
          readOnly
          ref={passwordRef} //passing reference of input text to passwordRef
        />
        <button
        onClick={copyPasswordToClipboard} //this function will get activated
        className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
        >copy</button>
      </div> 
      <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        type="range" //for slider
        min={6}
        max={100}
        value={length}
         className='cursor-pointer'
        onChange={(e)=>setLength(e.target.value)}
         />
         <label>Length:{length}</label>
      </div>
      <div className="flex items-center gap-x-1">
        <input
          type='checkbox'
          defaultChecked={numAllowed}
          id='numberInput'
          onChange={()=>{
            setNumAllowed((prev)=>!prev)
          }}
        />
        <label htmlFor='numberInput'>Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
        <input
          type='checkbox'
          defaultChecked={charAllowed}
          id='charInput'
          onChange={()=>{
            setCharAllowed((prev)=>!prev)
          }}
        />
        <label htmlFor='charInput'>Characters</label>
      </div>
      </div>
      </div>
    </>
  )
}

export default App


// HOOKS: we used in this project
// 1)useState()
// 2)useCallback(): to memoize the function
// 3)useEffect(): to run function when dependancies are changed
// 4)useRef(): whenever we want to use referenceof something