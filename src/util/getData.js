import http from "http"
import React from "react"


var effect
var proposals = []
var projects = []
var activeLabels = []
var labels = []
var projectFilter = ""

const has = (xs, x) => xs.indexOf(x) > -1
const normalize = x => x.toLowerCase()
const getActiveLabels = _ => 
  activeLabels.length == 0? Object.keys(labels) : activeLabels

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


const applyLabels = data => {
  const proposals = data.filter(x =>
    x.labels.filter(y => has(getActiveLabels(), y)).length > 0
  )
  
  return {
    proposals: proposals,
    projects: getProjects(proposals)
  }
}

export default {
  init: (query, _effect) => {
    http.get(query, res1 => {
        var _data = ""
        var _labels = ""
        res1.on("data", chunk => {_data += chunk.toString()})
        res1.on("end", _ => {
          http.get("http://localhost:8080/labels.json", res2 => {
            res2.on("data", chunk => {_labels += chunk.toString()})
            res2.on("end", _ => {
              proposals = JSON.parse(_data).ideas
              labels = JSON.parse(_labels).labels
              effect = _effect 
              effect(applyLabels(proposals), labels, activeLabels)
            })
          }).on("error", e => console.log(e))

        })
    }).on("error", e => console.log(e))
  },
  addLabel: x => {
    activeLabels.push(x)
    effect(applyLabels(proposals), labels, activeLabels)
  },
  removeLabel: x => {
    activeLabels = activeLabels.filter(y => y != x)
    effect(applyLabels(proposals), labels, activeLabels)
  },
  toggleProposal: (i, j, v) => {
    var data = applyLabels(proposals)
    var lens = data.projects[i].proposals[j]
    lens.isOpen = v
    effect(data, labels, activeLabels)
  },
  filterByProject: p => {
    projectFilter = p
    effect(applyLabels(proposals), labels, activeLabels) 
  },
  update: f => {
    effect(f(applyLabels(proposals)), labels, activeLabels) 
  }
}
