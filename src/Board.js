import React from 'react'
import Grid from './Grid'
import { useState,useCallback,useRef } from 'react';
import produce from 'immer'
const Board = ({active,setactive}) => {
    //setting states
    
    const [row, setrow] = useState(50);
    const [col, setcol] = useState(50)
    const [isRunning, setisRunning] = useState(false)
    
    const randomize =()=>{
        const arr = new Array()
        for(let i=0;i<=row;i++){
           arr.push(Array.from(Array(col), ()=> {
               const random = Math.random()
               if(random>0.7){
                   return 1
               }else{
                   return 0
               }
           }))
        }
        return arr
    }
   
    const createGrid =()=>{
        const arr = new Array()
        for(let i=0;i<=row;i++){
           arr.push(Array.from(Array(col), ()=> 0))
        }
        return arr
    }
  
    const operation =[
        [0, -1],
        [0, 1],
        [1, 0],
        [-1, 0],
        [-1, 1],
        [1, -1],
        [1, 1],
        [-1, -1]
    ]
    const [speed, setspeed] = useState(100)
    const runningRef = useRef(isRunning)
    runningRef.current = isRunning
    
     const runSimulation = useCallback(
       () => {
        if(!runningRef.current){
            return;
        }
        //simulate
                setgrid((g)=>{
                    return produce(g, gridCopy =>{
                        for(let i=0; i<row; i++){
                            for(let j=0; j<col; j++){
                                    let neighbors = 0;
                                        operation.map(([x,y])=>{
                                            const newi = i+x;
                                            const newj = j+y;
                                            if(newi >=0 && newi < row && newj>=0 && newj<col){
                                                    neighbors += g[newi][newj]
                                                    
                                                   
                                            }      
                                            //my own alogorithm                                   
                                            // if(g[i][j] === 1  && neighbors < 2 ){
                                            //     gridCopy[i][j]= 0
                                              
                                            // }else if(neighbors === 3 || neighbors ===2){
                                              
                                            //     gridCopy[i][j]= 1
                                            // }else if(neighbors > 3){
                                            //     gridCopy[i][j]= 0
                                              
                                            // }
                                            // else if(g[i][j] === 0 && neighbors === 3){
                                            //     gridCopy[i][j] = 1
                                              
                                            // }
                                            if(g[i][j] === 1 && neighbors<2 || neighbors > 3){
                                                gridCopy[i][j] =0
                                            }else if(g[i][j] === 1 && neighbors===2 || neighbors === 3){
                                             gridCopy[i][j] =1
                                            }else if(g[i][j] === 0 && neighbors === 3){
                                             gridCopy[i][j] =1
                                            } 
                                           
                                        })
                                }
                            }
                    })
                })
        setTimeout(runSimulation,speed)
       },
       [],
     )
    
     const [gen, setgen] = useState(1)
    //setting the grid into a state
    const [grid, setgrid] = useState(()=> createGrid())
    const button ={
    // width: '60px',
    // height: '40px',
    padding: '20px',
    margin: '20px',
    background: '#237235',
    border: '0',
    color: '#fff',
    borderRadius: '5px'
    }
    const buttonwithcolor ={
        padding: '20px',
        margin: '20px',
        background: `${!isRunning ? '#237235' : '#ff0000cc' }`,
        border: '0',
        color: '#fff',
        borderRadius: '5px'
    }
  return (
    <div style={{ background:'#0d1117'}}>
      <div style={{background:'#333'}}></div>
        <div style={{display:'flex',justifyContent:'center'}}>
        <button style={ buttonwithcolor}  onClick={()=>{
                setisRunning(!isRunning)
              if(!isRunning){
                  runningRef.current = true
                return  runSimulation()
              }
            }}>{!isRunning ? "start" : "stop"}</button>
            <button style= {button} onClick={()=>{
                setrow(50)
                setcol(50)
            }}>50X50</button>
            <button style={button} onClick={()=>{
                setrow(40)
                setcol(40)
            }}>40X40</button>
            <button style={button}  onClick={()=>{
                setrow(30)
                setcol(30)
            }}>30X30</button>
            <button style={button}  onClick={()=>{
                setrow(20)
                setcol(20)
            }}>20X20</button>
            <button style={ buttonwithcolor} onClick={()=>{
                   setisRunning(false)
                setgrid(createGrid)
            }}>clear</button>
            <button style={button} onClick={()=>{
                 setgrid(randomize())
            }}>Random</button>
            <button style={button} onClick={
                ()=>{
                    setspeed(speed+100)
                }
            }>Speed +100 millseconds</button>
            <button style={button} onClick={()=>{
               if(speed != 0){
                setspeed(speed-100)
               }
            }}>Speed -100 millseconds</button>
           <div style={button}>{speed}mill seconds</div>
        </div>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <Grid isRunning={isRunning} row={row} col={col} grid={grid}setgrid={setgrid}/>
        </div>
        <div style={{color:'#fff'}}>{console.log(grid)}</div>
    </div>
  )
}

export default Board