#!/usr/bin/env python


# Converts XML import from JIRA to JSON format

import json
import sys
import xmltodict

from lxml import etree

from collections import namedtuple
from collections import defaultdict

ProjectIdea = namedtuple('ProjectIdea', 'id summary link project votes watches comments labels description')

def main():
  if len(sys.argv) < 2:
    print "Usage: jira_xml_to_json.py <export.xml>"
    return 0

  with open(sys.argv[1], 'r') as xml, open('asf-gsoc2015.json', 'w') as json_out:
    tree = etree.parse(xml)
    issues = tree.xpath('//item')
    ideasDict =  defaultdict(list)
    for issue in issues:
      item = xmltodict.parse(etree.tostring(issue))
      i = item['item']
      p = ProjectIdea(i['key']['#text'],
                      i['summary'],
                      i['link'],
                      i['project']['#text'],
                      i['votes'],
                      i['watches'],
                      get_comments(i),
                      get_labels(i),
                      i['description']
      )
      ideasDict["ideas"].append(p.__dict__)
    json_out.write(json.dumps(ideasDict))


def get_comments(item):
  if 'comments' in item:
    return len(item['comments']['comment'])
  else:
    return 0

def get_labels(item):
  res = item['labels']['label']
  if not isinstance(res, list):
    res = [res]
  return [lable.lower() for lable in res ] #if lable != 'gsoc2015' and lable != 'mentor']


lablesDoc = {"java":    "This project will be using the Java programming language",
                    "cloud":	"This project deals with Cloud technology",
                    "ddd":	"domain-driven design",
                    "framework":	"This is part of a framework",
                    "domain-driven-design":	"domain-driven design",
                    "nakedobjects":	"The framework is an implementation of the Naked Objects pattern",
                    "dsl":	"domain-specific language",
                    "ruby":	"This project involves the Ruby programming language",
                    "python":	"This project involves the Python programming language",
                    "javascript":	"This project involves the JavaScript programming language",
                    "coffeescript":	"This project involves the CoffeeScript programming language",
                    "agile":	"This project requires either Agile skills or enthusiam to learn",
                    "test-driven":	"This project uses a test-driven approach",
                    "rest":	"Utilizing a RESTful, hypermedia API",
                    "hypermedia":	"Utilizing a RESTful, hypermedia API",
                    "android":	"Android",
                    "javafx":	"Involving JavaFX APIs",
                    "flex":	"Involving Apache Flex.",
                    "cordova":	"To use Apache Cordova",
                    "erlang":	"Uses the Erlang programming language",
                    "couchdb":	"This project deals with CouchDB",
                    "html":	"Involving HTML",
                    "database":	"Project involves database technology"}


if __name__ == '__main__':
    main()
