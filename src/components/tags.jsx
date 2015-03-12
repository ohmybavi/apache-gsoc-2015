import React from "react"
import Tag from "./tag.jsx"

export default React.createClass({
  render() {
    const activeLabels = this.props.activeLabels
    const labelMap = this.props.labels
    const labels = Object.keys(labelMap)
    return (
      <ul className={this.props.className}>
        {labels
          .sort((x, y) => labelMap[x] < labelMap[y])
          .map(x => 
            <Tag className="tag-list--tag" 
              value={labelMap[x]} 
              label={x} 
              active={activeLabels.indexOf(x) > -1}/>)}
      </ul>
    )
  }
})
