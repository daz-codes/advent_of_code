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

const day1 = data => {
  const instructions = data.trim().split("\n")
  let dial_value = 50

  const part_turn_goes_past_zero = (amount_turned,dir) =>
      dial_value.isNonzero && dir.eql("L")
        ? amount_turned >= dial_value
        : amount_turned >= (100 - dial_value)

  const total_times_past_zero = instructions.inject((sum,instruction) => {
    const [dir,steps] = [instruction.first,instruction.slice(1).to_i]
    const [full_turns,amount_turned] = steps.divmod(100)
    sum += full_turns
    if(part_turn_goes_past_zero(amount_turned,dir)) sum += 1
    dial_value += dir.eql("L") ? 100 - amount_turned : amount_turned
    dial_value %= 100
    return sum
  },0)
  
  return total_times_past_zero
}

console.log(day1(data))
