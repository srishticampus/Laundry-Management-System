import React from 'react'
import '../../Styles/TopComponent.css'
import first from '../../Assets/how.gif'
function Working() {
  return (
    <div>
      <div className='working-head1-div'>
        <h2 className='working-head1'>HOW IT WORKS?</h2>
        <div className='working-head1-gif-div'>
        <img src={first} alt="How it works" className="working-head1-gif" />

        </div>
      </div>
    </div>
  )
}

export default Working