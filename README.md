# GSoC 2015 - Apache org proposals

Visualize all Apache GSoC 2015 proposals from https://.apache.org/gsoc2015ideas

```
  #go to https://.apache.org/gsoc2015ideas
  #Export as XML
  #update URL with  ..?tempMax=300
  #Shift+Cmd+S, save as ASF-JIRA-gsoc-2015.xml

  virtualenv .venv
  source .venv/bin/activate
  pip install -r requirments
  ./jira_xml_to_json.py ASF-JIRA-gsoc-2015.xml

  #verify
  cat asf-gsoc2016.json | jq ".ideas | length"
  cat asf-gsoc2016.json | jq -c ".ideas[]" | wc -l

  cat asf-gsoc2016.json | jq -c ".ideas | sort_by(.project) | .[].project" | uniq | wc -l
```