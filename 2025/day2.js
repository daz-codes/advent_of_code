import { $ } from "https://esm.sh/rubymonkey"

const data = `
11-22,95-115,998-1012,1188511880-1188511890,222220-222224,
1698522-1698528,446443-446449,38593856-38593862,565653-565659,
824824821-824824827,2121212118-2121212124
`
const day2 = data => {
  const ranges = data.trim().split(",")
  
  const total = ranges.inject((sum,range) => {
    const [lower_bound,upper_bound] = range.split("-").map($`to_i`)
    const subtotal = lower_bound.upto(upper_bound).inject((subtotal,number) => {
      const length = number.to_s.length
      const possibles = length.factors.map(factor => factor < length && number.to_s.first_(factor).repeat(length/factor))
      return subtotal += possibles.any(value => value.to_i == number) ? number : 0
    },0)
    return sum += subtotal
  },0) 
  return total
}

console.log(day2(data))
