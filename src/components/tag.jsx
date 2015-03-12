import React from "react"
import {addLabel, removeLabel} from "../util/getData.js"

export default React.createClass({
  clickHandler(cb, x) {
    return e => {
      e.stopPropagation() 
      cb(x)
    }
  },
  render() {
    const {label, active, value} = this.props
    return (
      <li className={this.props.className}> 
        <label className="tag--remove" 
          onClick={this.clickHandler(removeLabel, label)}>
          {active? "× " : "  "}
        </label>
        <label className="tag--add"
          onClick={this.clickHandler(addLabel, label)}>
          {label} ({value})
        </label>
      </li>
    )
  }
})
