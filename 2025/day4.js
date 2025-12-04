import { $ } from "https://esm.sh/rubymonkey"

const data = `
..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.
`

const adjacent_cells = 
  (arr,i,j) => ([
                  arr[i.pred]?.[j.pred],arr[i.pred]?.[j],arr[i.pred]?.[j.next],
                  arr[i]?.[j.pred],arr[i]?.[j.next],
                  arr[i.next]?.[j.pred],arr[i.next]?.[j],arr[i.next]?.[j.next]
                 ])

const NUMBER_OF_EMPTIES = 4
let total_rolls_removed = 0

const day4 = data => {
  let diagram = data.trim().split("\n").map(x => x.split``)
  while("rolling") {
    const rolls_removed = diagram.inject((sum,row,i) => {
      const rolls_removed_from_row = row.inject((sum,roll,j) => {
        if(roll != "@") return sum
        const adjacents = adjacent_cells(diagram,i,j)
        const count = adjacents.count(roll => roll =="@" || roll =="!")
        if(count < NUMBER_OF_EMPTIES) diagram[i][j] = "!"
        return sum + (count < NUMBER_OF_EMPTIES ? 1 : 0)
      },0)
    return sum + rolls_removed_from_row
  },0)
  total_rolls_removed += rolls_removed
  diagram = diagram.map(row => row.map(cell => cell == "!" ? "." : cell))
  if(rolls_removed.zero) break
}
  return total_rolls_removed
}

console.log(day4(data))
