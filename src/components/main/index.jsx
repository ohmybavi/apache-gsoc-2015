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
import List from "list"
import TagFilter from "tag-filter"
import Toggle from "toggle"
import Count from "count"
import {toggle, removeLabel} from "../../util/getData.js"
import Tags from "tags"
import style from "./index.styl"

export default React.createClass({
  clickHandler(cb) {
    return _ => this.props.activeLabels.forEach(cb)
  },
  render: function() {
    const {proposals, projects, labels, activeLabels} = this.props
    const labelKeys = this.props.labelKeys
    const isModified = activeLabels.length > 0
    return (
      <div className="main">
        <input id="tags--toggle" className="main--toggle-tags" type="checkbox"/>
        <div className="main--cover">
          <h1 className="main--header">Apache Software Foundation Proposals</h1>
          <h2 className="main--header">Google Summer of Code</h2>
        </div>
        <div className="main--toolbar">
          <Count className="main--count" data={proposals.length}>
            Proposal
          </Count>
          <span> in </span>
          <Count className="main--count" data={projects.length}>
            Project
          </Count>
          <span> </span>
          <label
            className="main--reset-tags"
            onClick={this.clickHandler(removeLabel)}
            style={{display: isModified? "inline-block" : "none"}}>
            (Show all)
          </label>
          <label className="main--show-tags" htmlFor="tags--toggle">
            labels
          </label>
        </div>
        <Tags className="main--tag-list"
          activeLabels={activeLabels}
          labelKeys={labelKeys}
          labels={labels} />
        <List className="main--list" data={projects} />
        <div className="main--footer">
          <span className="footer--source">
            Source:
            <a href="https://project-new.apache.org">
              https://project-new.apache.org
            </a>
          </span>
          <span className="footer--byline">Made in Seoul</span>
        </div>
      </div>
    )
  }
})



