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

  const extra_turn_past_zero = (amount_turned,dir) =>
      dial_value.isNonzero && (dir.eql("L")
        ? amount_turned >= dial_value
        : amount_turned >= (100 - dial_value)) ? 1 : 0

  const update_dial = (dial_value,amount_turned,dir) =>
      (dial_value + (dir.eql("L") 
         ? 100 - amount_turned 
         : amount_turned)
      ).mod(100)

  const total_times_past_zero = instructions.inject((sum,instruction) => {
    const [dir,steps] = [instruction.first,instruction.slice(1).to_i]
    const [full_turns,amount_turned] = steps.divmod(100)
    sum += full_turns + extra_turn_past_zero(amount_turned,dir)
    dial_value = update_dial(dial_value,amount_turned,dir)
    return sum
  },0)
  
  return total_times_past_zero
}


console.log(day1(data))
