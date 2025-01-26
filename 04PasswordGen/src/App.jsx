import { useCallback, useEffect, useState , useRef} from 'react'


function App() {
  const [length, setLength] = useState(8)
  const[numberallowed, setNumberallowed]=useState(false)
  const[charallowed, setCharallowed]=useState(false)
  const[password, setPassword]=useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
      let pass = ""
      let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

      if(numberallowed){
        str=str+"0123456789"
      }
      if(charallowed){
          str=str+"{}[]@#$%^&*!"
      }

      for (let i = 1; i <=length; i++) {
        let char = Math.floor(Math.random()*str.length+1)
        pass =pass+ str.charAt(char)
      }
      setPassword(pass)
  }
  ,[length,numberallowed,charallowed,setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 100);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberallowed, charallowed, passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-64 py-3 text-orange-600 bg-gray-700 '>
        <h1 className='text-white text-center my-3 '>Password Generator </h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
        type="text"
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='password'
        readOnly
        ref={passwordRef}
        />
        <button 
        onClick={copyPasswordToClipboard}
        className='outline-none bg-orange-600 text-white px-3 py-0.5 shrink-0'
        >Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range" 
          min={5}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{setLength(e.target.value)}}
          />
          <label>Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox"
          defaultChecked={numberallowed}
          id="numberInput"
          onChange={()=>{
            setNumberallowed((prev)=>!prev);
          }}
           />
           <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox" 
          defaultChecked={numberallowed}
          id="characterInput"
          onChange={()=>{
            setCharallowed((prev)=>!prev);
          }}
          />
          <label htmlFor="characterInput">Characters</label>  
        </div>
      </div>
    </div>
   </>
  )
}

export default App
