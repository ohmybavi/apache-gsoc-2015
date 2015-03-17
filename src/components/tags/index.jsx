import React from "react"
import Tag from "tag"
import style from "./index.styl"

export default React.createClass({
  render() {
    const activeLabels = this.props.activeLabels
    const labelMap = this.props.labels
    const labels = this.props.labelKeys
    
    return (
      <ul className={this.props.className} style={this.props.style}>
        {labels.map(x => 
          <Tag className="tag-list--tag" 
            key={x} 
            label={x} 
            value={labelMap[x]} 
            active={activeLabels.indexOf(x) > -1}/>
          )}
      </ul>
    )
  }
})
