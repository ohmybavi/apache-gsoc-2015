import React from "react"
import Detail from "detail"
import {toggleProposal} from "../../util/getData.js"
import style from "./index.styl"

export default React.createClass({
  render: function() {
    [].map.call(
      document.querySelectorAll(".list--trigger:checked"), 
      x => x.checked = false
    )

    return (
      <ul className={this.props.className}>{this.props.data.map((x, j) => 
        <li className="list--project">
          <h2 className="list--project--title">{x.project}</h2>
          <ul className="list--project--proposals">
            {x.proposals.map((x, i, xs) => 
              <li className="list--project--proposal">
                <input className="list--trigger" 
                  id={"trigger-" + x.project + i} 
                  defaultChecked={false}
                  type="checkbox" />
                <label className="list--label"
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
