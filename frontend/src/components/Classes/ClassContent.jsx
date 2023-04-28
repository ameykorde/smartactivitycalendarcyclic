import React from 'react'

export default function ClassContent(props) {
  // Render each class item in a card layout
  return (
    <>
      <div className='classes-card'>
        {/* Display the semester and section of the class */}
        <div className='d-flex justify-content-between'>
          <h6>Sem : {props.semester}</h6>
          <h6>Sec : {props.section}</h6>
        </div>
        {/* Display the subject and teacher of the class */}
        <h2>{props.subject}</h2>
        <h2>{props.teacher}</h2>
      </div>
    </>
  )
}
