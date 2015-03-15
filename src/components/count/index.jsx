import React from "react"
import style from "./index.styl"

export default React.createClass({
  render: function() {
    return (
      <div className={this.props.className}>
        <label className="count--title">{this.props.children}</label>
        <label className="count--value">{this.props.data}</label>
      </div>
    )
  }
})
