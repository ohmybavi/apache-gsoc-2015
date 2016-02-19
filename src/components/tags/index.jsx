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
