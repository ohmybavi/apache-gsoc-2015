import _proposals from "../../data/data.json"
import _labels from "../../data/labels.json"
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

    const proposals = _proposals.ideas
    const projects = getProjects(proposals) 
    const labels = _labels.labels
    const activeLabels = []

    state = {proposals, projects, labels, activeLabels}

    initialState = Object.freeze({
      proposals, projects, labels, activeLabels
    })
    
    effect = _effect 
    effect(state)
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
