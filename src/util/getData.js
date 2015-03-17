import {ideas as proposals} from "../../data/data.json"
import {labels} from "../../data/labels.json"
import labelKeys from "../../data/labelsSorted.json"

var state = {}
var effect

const has = (xs, x) => xs.indexOf(x) > -1
const getProjects = data => data.map(function(x) {
  return {
    project: x.project, 
    proposals: [x]
  }
}).reduce(function(xs, y) {
  const x_ = xs[0] || {}

  if (x_.project == y.project) {
    x_.proposals.push(y.proposals[0]) 
  } else {
    xs.unshift(y) 
  }

  return xs
}, [])


const applyLabels = state => {
  const _proposals = state.activeLabels.length > 0? 
    proposals.filter(x =>
      x.labels.filter(y => has(state.activeLabels, y)).length > 0
    ) : proposals
  state.proposals = _proposals
  state.projects = getProjects(_proposals)
  
  return state
}

export default {
  init: (_effect) => {

    const projects = getProjects(proposals) 
    const activeLabels = []
    
    state = {proposals, projects, labels, activeLabels, labelKeys}

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
