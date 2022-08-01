import React from 'react'

const Alert = (props) => {
  const capitalize = (word) =>{
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase()+lower.slice(1);
  }
  return (
    <div >
    {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissable fade show`} style={{marginBottom:"0px"}}>
      <strong> {capitalize(props.alert.type)}</strong>: {props.alert.msg}
    </div> }
    </div>
  )
}

export default Alert