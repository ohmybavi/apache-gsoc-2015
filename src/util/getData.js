import http from "http"
import React from "react"

var effect
var data
var activeLabels = []
var labels 
var projectFilter = ""

const has = (xs, x) => xs.indexOf(x) > -1
const normalize = x => x.toLowerCase()
const getActiveLabels = _ => 
  activeLabels.length == 0? Object.keys(labels) : activeLabels

const applyLabels = data => 
  data.filter(x =>
    x.labels.filter(y => has(getActiveLabels(), y)).length > 0 &&
    has.apply(null, [x.project, projectFilter].map(normalize))
)

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
              data = JSON.parse(_data).ideas
              labels = JSON.parse(_labels).labels
              effect = _effect 
              effect(applyLabels(data), labels, activeLabels)
            })
          }).on("error", e => console.log(e))

        })
    }).on("error", e => console.log(e))
  },
  addLabel: x => {
    activeLabels.push(x)
    effect(applyLabels(data), labels, activeLabels)
  },
  removeLabel: x => {
    activeLabels = activeLabels.filter(y => y != x)
    effect(applyLabels(data), labels, activeLabels)
  },
  filterByProject: p => {
    projectFilter = p
    effect(applyLabels(data), labels, activeLabels) 
  },
  update: f => {
    effect(f(applyLabels(data)), labels, activeLabels) 
  }
}
