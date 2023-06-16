import { Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Column from '../components/Column'
import { DragDropContext } from 'react-beautiful-dnd'
import NextColumn from '../components/NextColumn'


const KanbanBoard = () => {
  const [taskList, setTaskList] = useState([])

  useEffect(() => {
    let array = localStorage.getItem('taskList')

    if (array) {
      setTaskList(JSON.parse(array))
    }
  }, [])

  const handleOnDragEnd = (result) => {
    if(!result.destination) return;
    console.log(result)
    
    const tasks = [...taskList]

    // Removes the dragged item from the array
    const [reorderedItem] = tasks.splice(result.source.index, 1); 

    // Inserts the dragged item at the new index
    tasks.splice(result.destination.index, 0, reorderedItem); 

    setTaskList(tasks)
  }

  return (
    <Container
      maxWidth='lg'
    >
      <h2 className=' text-4xl font-bold text-center mt-20 mb-32'>Workspace</h2>

      <div className='flex justify-between'>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Column title={'To do:'} id={'column-1'}/>
          <NextColumn title={'Doing:'} id={'column-2'}/>
          <NextColumn title={'Done:'} id={'column-3'}/>
        </DragDropContext>
      </div>
    </Container>
  )
}

export default KanbanBoard