#!/usr/bin/env node

const fs = require('fs')
let big5 = fs.readFileSync('big5.csv').toString().split('\n')
    .map ((line) => line.split(','))

let byTrait = {}
big5.forEach ((line) => {
  let text = line[0], trait = line[1].toLowerCase(), sign = parseInt(line[2])
  text = 'I ' + text[0].toLowerCase() + text.substr(1)
  byTrait[trait] = byTrait[trait] || { '1': [], '-1': [] }
  byTrait[trait][sign].push (text)
})

console.log(byTrait)

