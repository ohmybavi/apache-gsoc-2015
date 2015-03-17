var state = {}
var initialState = {}
var effect

const has = (xs, x) => xs.indexOf(x) > -1
const getProjects = data => data.map(function(x) {
  return {
    project: x.project, 
    proposals: [
      Object.defineProperty(x, "isOpen", {
        value: false, enumerable: true, writable: true
      })
    ]
  }
}).reduce(function(a, b) {
  const a_ = a[0] || {}

  if (a_.project == b.project) {
    a_.proposals.push(b.proposals[0]) 
  } else {
    a.unshift(b) 
  }

  return a
}, [])


const applyLabels = state => {
  const proposals = state.activeLabels.length > 0? 
    initialState.proposals.filter(x =>
      x.labels.filter(y => has(state.activeLabels, y)).length > 0
    ) : initialState.proposals.slice(0)
  state.proposals = proposals
  state.projects = getProjects(proposals)
  
  return state
}

export default {
  init: (_effect) => {
    var r1 = new XMLHttpRequest()
    var r2 = new XMLHttpRequest()
    r1.open("GET", "data.json", true) 
    r2.open("GET", "labels.json", true) 
    r1.send()
    r1.onreadystatechange = e1 => { 
      if (r1.readyState != 4 || r1.status != 200) return

      r2.send()
      r2.onreadystatechange = e2 => { 
        if (r2.readyState != 4 || r2.status != 200) return

        const proposals = JSON.parse(e1.target.response).ideas
        const projects = getProjects(proposals) 
        const labels = JSON.parse(e2.target.response).labels
        const activeLabels = []

        state = {proposals, projects, labels, activeLabels}

        initialState = Object.freeze({
          proposals, projects, labels, activeLabels
        })

        effect = _effect 
        effect(state)
      } 
    } 
  },
  addLabel: x => {
    state.activeLabels.push(x)
    effect(applyLabels(state))
  },
  removeLabel: x => {
    state.activeLabels = state.activeLabels.filter(y => y != x)
    effect(applyLabels(state))
  }
}
