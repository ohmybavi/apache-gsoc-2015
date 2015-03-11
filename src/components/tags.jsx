import React from "react"
import Tag from "./tag.jsx"

export default React.createClass({
  render() {
    const labelMap = this.props.labels
    const labels = Object.keys(labelMap)
    return (
      <ul className="tags">
        {labels.map(x => <Tag label={x} active={labelMap[x]}/>)}
      </ul>
    )
  }
})
