import React from "react"
import Tags from "tags"
import style from "./index.styl"

export default React.createClass({
  render() {
    return (
      <div className={this.props.className}>
        <h2>{this.props.project}</h2>
        <h3><a href={this.props.link}>{this.props.summary}</a></h3>
        <div dangerouslySetInnerHTML={{__html: this.props.description}}></div>
        <ul>
          {this.props.labels.map(x => <li>{x}</li>)}
        </ul>
      </div>
    )
  }
})
