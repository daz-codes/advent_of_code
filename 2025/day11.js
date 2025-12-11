import { $ } from "https://esm.sh/rubymonkey@1.2.0"

const data = `
svr: aaa bbb
aaa: fft
fft: ccc
bbb: tty
tty: ccc
ccc: ddd eee
ddd: hub
hub: fff
eee: dac
dac: fff
fff: ggg hhh
ggg: out
hhh: out
`

const day11 = data => {
  const network = data.trim().split("\n").map(x => x.split(":")).inject((ob,data) => ({...ob, [data.first]: data.second.trim().split(" ")}),{})
  const cache = new Map()
  const connect = (node,fft,dac) => {
    const has_fft = fft || node == "fft"
    const has_dac = dac || node == "dac"
    if(cache.has(node+has_fft+has_dac)) return cache.get(node+has_fft+has_dac)
    const connections = network[node].size == 1 && network[node].first == "out" ? ((has_fft && has_dac) ? 1 : 0)
    : network[node].map(n => connect(n,has_fft,has_dac)).sum
    cache.set(node+has_fft+has_dac,connections)
    return connections
  }
  return connect("svr")
}

console.log(day11(data))
