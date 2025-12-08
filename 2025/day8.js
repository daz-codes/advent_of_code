import { $ } from "https://esm.sh/rubymonkey@1.2.0"

const data = `
162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689
`

const day8 = data => {
  const coords = data.trim().split("\n").map(coord => coord.split(",").map($`to_i`))
  const dist = (a,b) => Math.hypot(a[0]-b[0],a[1]-b[1],a[2]-b[2])
  let junctions = []
  for(let i = 0;i < coords.size; i++){
    for(let j = i+1;j < coords.size; j++){
      const d = dist(coords[i],coords[j])
      junctions.push({box: [i,j], dist: d})
    }
  }
  
  const boxes = junctions.toSorted((a,b) => a.dist - b.dist).map(junction => junction.box)
  const connections = []
  const add_box = box => {
    const overlap = box.map(junction => connections.findIndex(connection => connection.includes(junction))).filter(x => x > -1)
    if(overlap.empty) connections.push(box)
    if(overlap.one()) connections[overlap.first] = connections[overlap.first].concat(box).uniq
    if(overlap.size == 2 && overlap.first != overlap.second){
      connections[overlap.first] = connections[overlap.first].concat(connections[overlap.second])
      connections.delete_at(overlap.second)
    }
  }
  let answer
  for(let i=0; i < boxes.size; i++){
     add_box(boxes[i])
     if(connections.size == 1 && connections.first.size == coords.size) {
       answer = coords[boxes[i].first].first * coords[boxes[i].second].first
       break
     }
   }
  return answer
}

console.log(day8(data))
