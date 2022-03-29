---
inject: true
to: src/scorer.ts
after: Checker injection point
skip_if: checkers.<%= h.inflection.dasherize(name) %>
---
  checkers.check_<%= h.inflection.underscore(name) %>,