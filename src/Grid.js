import { toBeChecked } from '@testing-library/jest-dom/dist/matchers'
import { useState,useCallback,useRef } from 'react'
import produce from 'immer'
const Grid = ({col,row,grid,setgrid,isRunning}) => {

 

    //styles for grid
    const gridTemplate ={
        display:'grid',
        gridTemplateColumns:`repeat(${col},26px)`,
        background:'#0d1117',
        width:'100vw',
        justifyContent:'center'
        // gridTemplateRows:`repeat(${row},20px)`,
    }
    //styles for box
    const box ={
        width:'20px',
        height:'20px',
        borderRadius:'5px',
        margin:'5px',
        opacity:'0.5'
       
    }

  return (
    <>
       
        <div   style={gridTemplate}>
           {
               grid.map((col,x)=>{
                   return col.map((row,w)=>{
                     return  <div key={ `${w}--${x}`} onClick={
                         ()=>{
                             if(grid[x][w] == 0){
                                const newGrid = produce(grid, gridCopy =>{
                                    gridCopy[x][w]=1
                                    
                                 })
                                 setgrid(newGrid)
                             }else{
                                const newGrid = produce(grid, gridCopy =>{
                                    gridCopy[x][w]=0
                                    
                                 })
                                 setgrid(newGrid)
                             }
                          
                         }
                     } style={{...box, background:`${grid[x][w] ? "#237235":"#444"}`}}>{
                       
                     }</div>
                   })
               })
           }
        </div>

    </>
  )
}

export default Grid