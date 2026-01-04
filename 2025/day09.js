import { $ } from "https://esm.sh/rubymonkey@1.2.0"

const data = `
7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3
`

const day9 = data => {
  const coords = data.trim().split("\n").map(coord => coord.split(",").map($`to_i`))

  const edges_original = coords.concat([coords.first]).each_cons(2).map(([[a,b],[p,q]]) => b == q ? [a,p].min.upto([[a,p].max]).map(n => [n,b]) : [b,q].min.upto([[b,q].max]).map(n => [a,n]))

  const edges = coords.concat([coords.first]).each_cons(2).map(([[a,b],[p,q]]) => {
    const horizontal = b == q
    const direction = horizontal ? a < p ? "right" : "left" : b < q ? "down" : "up"
    return horizontal ? {dir: "horizontal", constant: b, min: [a,p].min, max: [a,p].max, direction} : {dir: "vertical", constant: a, min: [b,q].min, max: [b,q].max, direction }
  })
  const verticals = edges.filter(edge => edge.dir == "vertical").toSorted((a,b) => b.constant - a.constant)
  const boundary = coords.map(([x,y],i) => {
    const next_x = coords[i.next.modulo(coords.size)]?.first
    const next_y = coords[i.next.modulo(coords.size)]?.second
    return x == next_x ? [y,next_y].min.upto([y,next_y].max).map(n=> [x,n]) : [x,next_x].min.upto([x,next_x].max).map(n=> [n,y])
  }).flatten
  const boundary_set = new Set(boundary.map(coord => `(${coord})`))
  let max_area = 0
  
  const ray_trace = (x,y,test=false) => {
    let corner = false
    const intersections = verticals.count(vertical => {
      if(test) console.log("vertical: ", vertical.constant, vertical.constant < x , vertical.min <= y , vertical.max >= y , !corner)
      if(vertical.min == y || vertical.max == y) {
        if(test)console.log(`corner at (${vertical.constant},${y})`)
        corner = !corner
      }
      return vertical.constant < x && vertical.min <= y && vertical.max >= y && !corner
    })
    if(test) console.log("intersections: ",x,y,intersections)
    return intersections.odd
  }
  
  const greens = new Set()
  const outside = new Set()
    
  const red_or_green = (x,y) => {
    if(boundary_set.has(`(${x},${y})`)) return true
    if(greens.has(`(${x},${y})`)) return true
    if(outside.has(`(${x},${y})`)) return false
    const green = ray_trace(x,y)
    if(green) greens.add(`(${x},${y})`)
    else outside.add(`(${x},${y})`)
    return green
  }
  
  const line_is_green_or_red = line => {
    for(let i=line.min;i<=line.max;i++){
      const x = line.dir == "horizontal" ? i : line.constant
      const y = line.dir == "horizontal" ? line.constant : i
      if(!red_or_green(x,y)) {
        // console.log("failed with: ", x,y)
        return false
      }
    }
    return true
  }


for(let i = 0;i < coords.size; i++){
    for(let j = i.next;j < coords.size; j++){
      const [left,right] = [coords[i].first,coords[j].first].minmax
      const [top,bottom] = [coords[i].second,coords[j].second].minmax
      const left_side = { dir: "vertical", constant: left, min: top, max: bottom }
      const right_side = { dir: "vertical", constant: right, min: top, max: bottom }
      const top_side = { dir: "horizontal", constant: top, min: left, max: right }
      const bottom_side = { dir: "horizontal", constant: bottom, min: left, max: right }
      
      const area = (right - left).next * (bottom - top).next
      if(area < max_area) continue
    
      if(!line_is_green_or_red(left_side)) {
        continue
      }
      if(!line_is_green_or_red(right_side)){
        continue
      }
      if(!line_is_green_or_red(top_side)) {
        continue
      }
      if(!line_is_green_or_red(bottom_side)) {
        continue
      }
      max_area =  area
    }
  } 
  
return max_area
}

console.log(day9(data))
