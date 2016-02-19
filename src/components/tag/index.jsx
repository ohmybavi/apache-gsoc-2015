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
import {addLabel, removeLabel} from "../../util/getData.js"
import style from "./index.styl"

export default React.createClass({
  clickHandler(cb, x) {
    return e => {
      e.stopPropagation()
      cb(x)
    }
  },
  render() {
    const {label, active, value} = this.props
    const cb = active? removeLabel : addLabel
    const activeClass = active? " is-active" : ""
    return (
      <li className={this.props.className + activeClass}>
        <label className={"tag--card" + activeClass}
          onClick={this.clickHandler(cb, label)}>
          {label} <span className="tag--card--value">{value}</span>
        </label>
      </li>
    )
  }
})


