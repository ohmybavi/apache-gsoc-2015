import React from "react"
import Tag from "tag"
import style from "./index.styl"

export default React.createClass({
  render() {
    const activeLabels = this.props.activeLabels
    const labelMap = this.props.labels
    const labels = Object.keys(labelMap)
    
    return (
      <ul className={this.props.className} style={this.props.style}>
        {labels
          .sort((x, y) => labelMap[x] > labelMap[y]? -1 : 1)
          .map(x => 
            <Tag className="tag-list--tag" 
              label={x} 
              value={labelMap[x]} 
              active={activeLabels.indexOf(x) > -1}/>)}
      </ul>
    )
  }
})
