let atomtemplate = {
	H: {rb: 1, name:"H", amount: 50, contains: {"H": 1}},
	O: {rb: 2, name:"O", amount:5, contains: {"O": 1}},
	N: {rb: 3, name:"N", amount:2, contains: {"N": 1}},
	C: {rb: 4, name:"C", amount:1, contains: {"C": 1}},
	Li:{rb: -1, name:"Li", amount:1, contains: {"Li": 1}}
}
let reqbonds
function bond(Fr, Sr){
	if (Fr.rb > 0 && Sr.rb > 0){
		let i = 1;
		for (let atom in atoms){
			if (atoms[atom].name == Fr.name + Sr.name){
				i += 1
			} else if(atoms[atom].name == Sr.name + Fr.name){
				i += 1
			}
		}
		reqbonds = Math.abs(Fr.rb - Sr.rb)
		let contain = {}
		for (item in Sr.contains){
			if (contain.hasOwnProperty(item)){
				contain[item] += Sr.contains[item]
			} else{
				contain[item] = 1
			}
		}
		for (item in Fr.contains){
			if (contain.hasOwnProperty(item)){
				contain[item] += Fr.contains[item]
			} else{
				contain[item] = 1
			}
		}
		sorted = Object.keys(contain)
	.sort()
	.reduce((acc, key) => ({
			...acc, [key]: contain[key]
	}), {})
		contain = sorted
		let name = ''
		let x = 0
		if (contain.hasOwnProperty("C")){
			if (contain["C"] == 1){
				name += "C"
			} else{
				name += "C" + contain["C"].toString()
			}
			if (contain["H"] == 1){
				name += "H"
			} else if(!contain.hasOwnProperty("H")){
			} else{
				name += "H" + contain["H"].toString()
			}
			x = 2
			Camount = contain.C
			Hamount = contain.H
			contain.C = 0
			contain.H = 0
		}
		if (contain.O > 1 && contain.H > 1){
			x = 1
			contain.O -= 1
			contain.H -= 1
		}
		for (item in contain){
			if (contain[item] == 1){
				name += item
			} else if(contain[item] == 0){
			} else{
				name += item + contain[item].toString()
			}
		}
		if (x == 1){
			name += "OH"
			contain.O += 1
			contain.H += 1
		} else if (x ==2){
			contain.C = Camount
			contain.H = Hamount
		}
		name += '.' + i.toString()
		atoms[name] = {rb:reqbonds, name: Fr.name + Sr.name, id: name, contains: contain}
		delete atoms[Fr.id]
		delete atoms[Sr.id]
	} else if((Fr.rb < 0 && Sr.rb > 0) || (Fr.Rb > 0 && Sr.rb < 0)){
		let i = 1;
		for (let atom in atoms){
			if (atoms[atom].name == Fr.name + Sr.name){
				i += 1
			} else if(atoms[atom].name == Fr.name + Sr.name){
				i += 1
			}
		}
		if (Fr.rb < 0){
			reqbonds = Math.abs(Sr.rb + Fr.rb)
		} else{
			reqbonds = Math.abs(Fr.rb + Sr.rb)
		}
		let contain = {}
		for (item in Sr.contains){
			if (contain.hasOwnProperty(item)){
				contain[item] += Sr.contains[item]
			} else{
				contain[item] = 1;
			}
		}
		for (item in Fr.contains){
			if (contain.hasOwnProperty(item)){
				contain[item] += Fr.contains[item]
			} else{
				contain[item] = 1;
			}
		}
		sorted = Object.keys(contain)
		.sort()
		.reduce((acc, key) => ({
			...acc, [key]: contain[key]
		}), {})
		contain = sorted
		if (contain.O > 1 && contain.H > 1){
			x = 1
			contain.O -= 1
			contain.H -= 1
		}
		let name = ''
		let oldname
		for (item in contain){
			if (atomtemplate[item].rb < 0){
				oldname = name
				name = ''
				if (contain[item] == 1){
					name += item
				} else if(contain[item] == 0){
				} else{
					name += item + contain[item].toString()
				}
				if (Fr.rb < 0){
					for (item in Sr.contains){
						if (Sr.contains[item] == 1){
							name += item
						} else if(Sr.contains[item] == 0){
						} else{
							name += item + Sr.contains[item].toString()
						}
					}
				}
				name += oldname
			} else{
				if (contain[item] == 1){
					name += item
				} else if(contain[item] == 0){
				} else{
					name += item + contain[item].toString()
				}
			}
		}
		if (x == 1){
			name += "OH"
			contain.O += 1
			contain.H += 1
		}
		name += '.' + i.toString()
		atoms[name] = {rb: reqbonds, name: Fr.name + Sr.name, id: name, contains: contain}
		delete atoms[Fr.id]
		delete atoms[Sr.id]
	}
}


function getRandom(obj) {
  const keys = Object.keys(obj)
  return obj[keys[Math.floor(Math.random() * keys.length)]]
}
let atoms = {}
for (let atom in atomtemplate) {
  for (i = 0; i < atomtemplate[atom].amount; i++){
		let num = i+1
		atoms[atomtemplate[atom].name + "." + num.toString()] = JSON.parse(JSON.stringify(atomtemplate[atom]))
		delete atoms[atomtemplate[atom].name  + "." +  num.toString()].amount
		atoms[atomtemplate[atom].name  + "." +  num.toString()].id = atomtemplate[atom].name  + "." +  num.toString()
	}
}
console.log(atoms)
let x = 0
while (true){
	for (i in atoms){
		r1 = getRandom(atoms)
		r2 = getRandom(atoms)
		if (r1 == r2){
			continue
		}
		bond(r1, r2)
	}
	for (atom in atoms){
		if (!atoms[atom].rb == 0){
			x += 1
		}
	}
	console.log("atoms", atoms)
	if (x < 2){
		console.log("No more possible bonds!")
		break
	}
	x = 0
}