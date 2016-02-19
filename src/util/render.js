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
import hash from "../../hash"

export default (App, container) => {
  const _container = document.querySelector(container)

  if (location.hash == hash) {
    return data =>
      _container.innerHTML = React.renderToString(<App {...data}/>)
  } else {
    return data => React.render(<App {...data}/>, _container)
  }

}

