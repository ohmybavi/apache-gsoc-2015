import React from "react"
import style from "./index.styl"

export default React.createClass({
  render: function() {
    const {data, children} = this.props
    return (
      <div className={this.props.className}>
        <span className="count--value">{data}</span>
        <span> </span>
        <span className="count--title">
          {data == 1? children : children + "s"}
        </span>
      </div>
    )
  }
})
