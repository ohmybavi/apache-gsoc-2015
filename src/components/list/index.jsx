import React from "react"
import Detail from "detail"
import style from "./index.styl"

export default React.createClass({
  getInitialState() {
    return {data: this.props.data.map(x => ({
      proposals: x.proposals.map(y => ({isOpen: false}))
    }))}
  },
  render: function() {
    return (
      <ul className={this.props.className}>{this.props.data.map((x, j) => 
        <li className="list--project">
            <h2 className="list--project--title">{x.project}</h2>
            <ul className="list--project--proposals">
              {x.proposals.map((x, i) => 
              <li className={
                this.state.data[j].proposals[i].isOpen?
                 "icon-down-open-mini" : "icon-right-open-mini"}>
                  <input 
                    onChange={_ => {
                      var _data = this.state.data.slice(0)
                      var lens = _data[j].proposals[i]
                      lens.isOpen = !lens.isOpen
                      this.setState({
                        data: _data 
                      })}}
                    className="list--trigger" 
                    id={"trigger-" + x.project + i} 
                    type="checkbox" />
                  <label 
                    className="list--label"
                    htmlFor={"trigger-" + x.project + i}>
                  {x.summary} (<a className="list--link" href={x.link}>link</a>)
                  </label>
                  <Detail className="list--detail" {...x} />
                </li>
              
              )}
            </ul>
        </li>)}
      </ul>
    )
  }
})
