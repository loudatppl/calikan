import React from 'react'
import { StrictModeDroppable as Droppable } from '../helpers/StrictModeDroppable'

const NextColumn = ({ title, tasks, id}) => {
  return (
        <div className='max-w-xs w-[30%]'>
          <div className='flex flex-row max-w-sm px-6 py-1 bg-purple-800
            justify-between'>
              <h2 className='text-xl font-semibold text-purple-100'>
                {title}
              </h2>
          </div>
          <Droppable droppableId={id}>
            {(provided) => (
              <div
                className='border overflow-y-auto max-h-[35rem] column'
                ref={provided.innerRef}
                {...provided.droppableProps}

              >
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
  )
}

export default NextColumn