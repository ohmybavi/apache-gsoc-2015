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
import style from "./index.styl"

export default React.createClass({
  render() {
    const {children, type, className, fn} = this.props

    const Tag = type || "div"
    const container = {
      className: className
    }

    const _id = Math.random() + "-toggle"
    const _className = className.split("--")[1]
    const input = {
      id: _id,
      type: fn.toLowerCase() == "and"? "checkbox" : "radio",
      className: _className + "--toggle"
    }

    const label = {
      htmlFor: _id,
      className: _className + "--trigger"
    }

    return (
      <Tag {...container}>
        <input {...input}/>
        <label {...label}>{this.props.label}</label>
        {children}
      </Tag>
    )
  }
})
