import { $ } from "https://esm.sh/rubymonkey"

const data = `
987654321111111
811111111111119
234234234234278
818181911112111
`

const day3 = data => {
  const banks = data.trim().split("\n").map(x => x.split``)
  const joltage = banks.inject((sum,bank) =>{
    const subtotal = (1).upto(11).reverse().inject((subtotal,n) => {
      const max = bank.slice(0,-n).max
      const index = bank.findIndex(x => x == max)
      bank.splice(0,index.next)
      return subtotal + max * 10 ** n
    },0)
    return sum + subtotal + bank.max
  },0)
  
  return joltage
}

console.log(day3(data))
