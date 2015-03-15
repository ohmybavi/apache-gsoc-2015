import React from "react"
import {addLabel, removeLabel} from "../../util/getData.js"
import style from "./index.styl"

export default React.createClass({
  clickHandler(cb, x) {
    return e => {
      e.stopPropagation()
      cb(x)
    }
  },
  render() {
    const {label, active, value} = this.props
    const cb = active? removeLabel : addLabel
    const activeClass = active? " is-active" : ""
    return (
      <li className={this.props.className + activeClass}>
        <label className={"tag--card" + activeClass}
          onClick={this.clickHandler(cb, label)}>
          {label} <span className="tag--card--value">{value}</span>
        </label>
      </li>
    )
  }
})


