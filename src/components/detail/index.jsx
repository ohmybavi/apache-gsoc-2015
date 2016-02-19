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
