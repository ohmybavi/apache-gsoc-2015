import http from "http"
import React from "react"

var effect
var data
var labels 

const applyLabels = _ => 
  data.filter(x =>
    x.labels.filter(y =>
      labels[y] == true   
    ).length
)

export default {
  init: (query, _effect) => {
    http.get(query, res1 => {
        var _data = ""
        var _labels = ""
        res1.on("data", chunk => {_data   += chunk.toString()})
        res1.on("end", _ => {
          http.get("http://localhost:8080/labels.json", res2 => {
            res2.on("data", chunk => {_labels += chunk.toString()})
            res2.on("end", _ => {
              data = JSON.parse(_data).ideas
              labels = JSON.parse(_labels).labels.reduce(
                (o, k) => Object.defineProperty(o, k, {
                  value: false, enumerable: true, writable: true}), {})
              effect = _effect 
              effect(applyLabels(data), labels)
            })
          }).on("error", e => console.log(e))

        })
    }).on("error", e => console.log(e))
  },
  addLabel: x => {
    labels[x] = true
    effect(applyLabels(data), labels)
  },
  removeLabel: x => {
    labels[x] = false
    effect(applyLabels(data), labels)
  },
  update: f => {
    effect(f(data)) 
  }
}
