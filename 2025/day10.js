import { $ } from "https://esm.sh/rubymonkey@1.2.0"

const data = `
[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}
[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}
`

const gaussian = (matrix,r=0,c=0) => {
    if(r == matrix.size.pred || r == matrix.first.size - 2) {
      const free_vars = (matrix.first.size-2).downto(0).difference(matrix.map(row => row.findIndex(n => n.nonzero)))
      return [matrix,free_vars]
    }
    if(matrix[r][c].zero) {
      const index = matrix.findIndex((row,i) => row[c].nonzero && i > r);
      if(index > -1) [matrix[r],matrix[index]] = [matrix[index],matrix[r]]
      else gaussian(matrix,r,c.next)
    }
    for(let i=r.next;i<matrix.size;i++){
      if(matrix[i][c].nonzero) matrix[i] = matrix[i].map((n,j) => n*matrix[r][c] - matrix[i][c]*matrix[r][j])
    }
    return gaussian(matrix,r.next,c.next)
}

const solver = (matrix,free,free_values) => {
  const numVars = matrix.first.size.pred
  const solutions = new Array(numVars).fill(0)
  free.each((x,i) => solutions[x] = free_values[i])
   // Back substitution - go from bottom non-zero row to top
  for (let row = matrix.length - 1; row >= 0; row--) {
    const pivot = matrix[row].findIndex(n => n.nonzero)
    if (pivot === -1) continue
    const sum = matrix[row][numVars] - matrix[row].slice(pivot.next,numVars).map((n,i) => n * solutions[i+pivot.next]).sum
    solutions[pivot] = sum / matrix[row][pivot]
  }
  return solutions
}

const day10 = data => {
  const manual = data.trim().split("\n").map(line => line.split(" ").map(x => x.slice(1,-1)))
  const sum = manual.inject((total,line,hey) => {
    const schematics = line.slice(1,-1)
    const joltages = line.last.split(",")
    const number_of_vars = schematics.size
    let min = joltages.map($`to_i`).sum
    const eqns = joltages.map((joltage,i) => schematics.map(schematic => schematic.includes(i) ? 1 : 0).concat([joltage.to_i]))
    const [echelon,free_vars] = gaussian(eqns)
    const upper_bounds = free_vars.map(fv => schematics[fv].split(",").map($`to_i`).map(i => joltages[i].to_i).min)
    const free_options = upper_bounds.empty ? [] : (0).upto(upper_bounds.first).producty(...upper_bounds.slice(1).map(x => (0).upto(x)))
    if(free_vars.empty) min = solver(echelon,free_vars,free_options).sum
    else {
      free_options.each(options => {
        const solutions = solver(echelon,free_vars,options)
        if(solutions.sum < min && solutions.all(x => x >= 0) && solutions.all($`integer`)) {
          min = solutions.sum
        }
      })
    }
    return total += min
  },0)
return sum
}

console.log(day10(data))
