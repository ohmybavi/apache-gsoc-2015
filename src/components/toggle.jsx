import React from "react"

export default React.createClass({
  render() {
    const {children, type, className, fn} = this.props
    
    const Tag = type || "div"
    const container = {
      className: className
    }

    const _id = Math.random() + "-toggle"
    const _className = className.split("--")[1]
    const input = {
      id: _id,
      type: fn.toLowerCase() == "and"? "checkbox" : "radio",
      className: _className + "--toggle" 
    }

    const label = {
      htmlFor: _id,
      className: _className + "--trigger"
    }

    return (
      <Tag {...container}>
        <input {...input}/>
        <label {...label}></label>
        {children}
      </Tag>
    )
  }
})
