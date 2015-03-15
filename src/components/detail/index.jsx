import React from "react"
import Tags from "tags"
import style from "./index.styl"

export default React.createClass({
  render() {
    return (
      <div className={this.props.className}>
        <div dangerouslySetInnerHTML={{__html: this.props.description}}></div>
      </div>
    )
  }
})


        // <ul className="detail--tags">
        //   Labels: {this.props.labels.map(x => <li>{x}</li>)}
        // </ul>
