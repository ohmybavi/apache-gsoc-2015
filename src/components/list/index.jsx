/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
        <li key={x + j} className="list--project">
          <h2 className="list--project--title">{x.project}</h2>
          <ul className="list--project--proposals">
            {x.proposals.map((x, i, xs) =>
              <li key={x + i} className="list--project--proposal">
                <input className="list--trigger"
                  id={"trigger-" + x.project + i}
                  defaultChecked={false}
                  type="checkbox" />
                <label className="list--label"
                  htmlFor={"trigger-" + x.project + i}>
                {x.summary} <a className="list--link icon-link-ext" href={x.link}></a>
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
