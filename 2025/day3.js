import { $ } from "https://esm.sh/rubymonkey"

const data = `
987654321111111
811111111111119
234234234234278
818181911112111
`

const NUMBER_OF_BATTERIES = 12

const day3 = data => {
  const banks = data.trim().split("\n").map(x => x.split``)
  const joltage = banks.inject((sum,batteries) =>{
    const subtotal = NUMBER_OF_BATTERIES.pred.downto(1).inject((subtotal,n) => {
      const max = batteries.slice(0,-n).max
      const index = batteries.findIndex($`eql(max)`)
      batteries.splice(0,index.next)
      return subtotal + max * 10 ** n
    },0)
    return sum + subtotal + batteries.max
  },0)
  
  return joltage
}

console.log(day3(data))
