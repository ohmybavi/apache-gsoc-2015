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
    const {label, active} = this.props
    return (
      <li className="tag" > 
        <label className="tag-remove" 
          onClick={this.clickHandler(removeLabel, label)}>
          {active? "× " : "  "}
        </label>
        <label className="tag-add"
          onClick={this.clickHandler(addLabel, label)}>
          {label}
        </label>
      </li>
    )
  }
})
