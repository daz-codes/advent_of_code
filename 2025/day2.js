import "https://esm.sh/rubymonkey"

const data = `
11-22,95-115,998-1012,1188511880-1188511890,222220-222224,
1698522-1698528,446443-446449,38593856-38593862,565653-565659,
824824821-824824827,2121212118-2121212124
`

const get_invalid_ids = (a,b,start_number="1",i=2,ids=[]) => {
  const length = b.to_s.length
  const number = start_number.repeat(i).to_i
  if(number.between(a,b)) ids.push(number)
  const next_number = (start_number.to_i+1).to_s 
  return (next_number.repeat(2).to_i <= b) ? get_invalid_ids(a,b,i > length ? next_number : start_number,i > length ? 2 : i+1,ids) : ids.uniq
}

const day2 = data => {
  const codes = data.trim().split(",")
  const total = codes.inject((sum,code) => {
    const [low,high] = code.split("-")
    return sum += get_invalid_ids(low.to_i,high.to_i).flatten.sum
  },0)
  return total
}

console.log(day2(data))
