import "https://esm.sh/rubymonkey"

const data = `
L68
L30
R48
L5
R60
L55
L1
L99
R14
L82
`

const instructions = data.trim().split("\n")
let dial = 50

const answer = instructions.map(instruction => {
  const left = instruction.first.eql("L")
  const [full_turns,change] = (instruction.slice(1).to_i).divmod(100)
  const passed_zero = dial.nonzero && left ? change >= dial : change >= (100 - dial)
  dial = (dial + (left ? 100 - change : change)).mod(100)
  return full_turns + (passed_zero ? 1 : 0)
}).sum

console.log(answer)
