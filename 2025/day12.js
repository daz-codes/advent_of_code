import { $ } from "https://esm.sh/rubymonkey@1.2.0"

const data = `
4x4: 0 0 0 0 2 0
12x5: 1 0 1 0 2 2
12x5: 1 0 1 0 3 2
`

const day12 = data => {
  const regions = data.trim().split("\n")
  return regions.count(region => {
    const [dimensions,presents] = region.split(": ")
    const area = dimensions.split("x").map($`to_i`).inject((P,n) => P*n)
    const result = presents.split(" ").map($`to_i`).map((n,i) => n * 7).sum
    return result < area
  })
}
