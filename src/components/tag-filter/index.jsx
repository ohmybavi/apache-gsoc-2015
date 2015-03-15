import React from "react"
import Tags from "tags"
import {addLabel, removeLabel} from "../../util/getData.js"
import style from "./index.styl"

export default React.createClass({
  clickHandler(cb) {
    return _ => Object.keys(this.props.labels).forEach(cb)
  },
  render: function() {
    return (
      <div className={this.props.className}>
        <Tags className="tags--tag-list" 
          activeLabels={this.props.activeLabels}
          labels={this.props.labels} />
      </div>
    )
  }
})
