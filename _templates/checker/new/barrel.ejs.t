---
inject: true
to: src/checks/index.ts
at_line: 0
skip_if: <%= h.inflection.dasherize(name) %>
---
export * from './<%= h.inflection.dasherize(name) %>.check';