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

let traits = Object.keys(byTrait)

let json = { typeLimit: 5,
             right: { hint: 'Yes' },
             left: { hint: 'No' },
             cards: traits.map ((trait) => {
               return { type: trait,
                        cards: [makeCards (trait, 1),
                                makeCards (trait, -1)] }
             }) }

console.log(JSON.stringify(json,null,2))

function makeCards (trait, sign) {
  let cards = {
    reward: {},
    cards: byTrait[trait][sign]
  }
  cards.reward[trait] = sign
  return cards
}
