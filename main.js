let w = 20, h = 20;
// 0:default 1:wall 2:start 3:end
let divMap = [];
for(let i=0;i<w;i++){
	divMap[i] = [];
}
let map = [
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0],
	[0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,3,1,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,1,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],
	[0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
	[0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];

let start, end;
let container = document.getElementById("container");
for(let i=0;i<w;i++){
	for(let j=0;j<h;j++){
		let div = document.createElement("div");
		div.style.left = 12 * i + "px";
		div.style.top = 12 * j + "px";

		switch(map[j][i]){
			case 0:{
				div.className = "default cube";
				break;
			}
			case 1:{
				div.className = "wall cube";
				break;
			}
			case 2:{
				div.className = "start cube";
				start = {
					x:i,
					y:j
				};
				break;
			}
			case 3:{
				div.className = "end cube";
				end = {
					x:i,
					y:j
				};
				break;
			}
		}
		divMap[j][i] = div;
		container.appendChild(div);
	}
}

let reForwardArray = [];
let isBack = false;
// console.log(start,end);
let passedArray = [];
let dx = end.x - start.x;
let dy = end.y - start.y;
let distance = getDisM();
// console.log("distance",distance)
let cur = {
	x: start.x,
	y: start.y
};
let step = 0;
find();
// console.log("step",step)
console.log("reForwardArray",reForwardArray)
function find(){
	if(step > 0){
		if(dx !== 0 || dy !== 0){
			divMap[cur.y][cur.x].className = "cube passed";
			divMap[cur.y][cur.x]._passed = true;
			passedArray.push();
		}
	}
	step++;

	if(dx > 0){ // toRight
		if(!isWall(cur.x+1,cur.y)){
			if(!divMap[cur.y][cur.x+1]._passed){
				if(isBack){
					reForwardArray.push({
						x:cur.x,
						y:cur.y
					});
				}
				cur.x ++;
				dx --;
				isBack = false;
				find();
			}
		}
	}
	if(dx < 0){ // toLeft
		if(!isWall(cur.x-1,cur.y)){
			if(!divMap[cur.y][cur.x-1]._passed){
				if(isBack){
					reForwardArray.push({
						x:cur.x,
						y:cur.y
					});
				}
				cur.x --;
				dx ++;
				isBack = false;
				find();
			}
		}
	}
	if(dy > 0){ // toDown
		if(!isWall(cur.x,cur.y+1)){
			if(!divMap[cur.y+1][cur.x]._passed){
				if(isBack){
					reForwardArray.push({
						x:cur.x,
						y:cur.y
					});
				}
				cur.y ++;
				dy --;
				isBack = false;
				find();
			}
		}
	}
	if(dy < 0){ // toUp
		if(!isWall(cur.x,cur.y-1)){
			if(!divMap[cur.y-1][cur.x]._passed){
				if(isBack){
					reForwardArray.push({
						x:cur.x,
						y:cur.y
					});
				}
				cur.y --;
				dy ++;
				isBack = false;
				find();
			}
		}
	}

	// console.log(getDisM(),dx,dy)
	isBack = true;
	if(canToLeft()){
		cur.x --;
		dx ++;
		find();
	}
	if(canToRight()){
		cur.x ++;
		dx --;
		find();
	}
	if(canToUp()){
		cur.y --;
		dy ++;
		find();
	}
	if(canToDown()){
		cur.y ++;
		dy --;
		find();
	}
}



function getDisO(){

}
function getDisM(){
	return Math.abs(dx)+Math.abs(dy);
}

function canToLeft(){
	return cur.x > 0 && !isWall(cur.x-1,cur.y) && !isPassed(cur.x-1, cur.y)
}
function canToRight(){
	return cur.x<w-1 && !isWall(cur.x+1,cur.y) && !isPassed(cur.x+1, cur.y)
}
function canToUp(){
	return cur.y>0 && !isWall(cur.x,cur.y-1) && !isPassed(cur.x, cur.y-1)
}
function canToDown(){
	return cur.y<h-1 && !isWall(cur.x,cur.y+1) && !isPassed(cur.x, cur.y+1)
}

function isPassed(x,y){
	return divMap[y][x]._passed;
}


function isWall(x,y){
	return map[y][x] === 1;
}

function isLeft(x1,x2){
	return x1 < x2;
}
function isDown(y1,y2){
	return y1 > y2;
}
function getLeft(x,y){
	if(x > 0){
		return map[y][x-1];
	}else{
		return null;
	}
}
function getRight(x,y){
	if(x < w){
		return map[y][x+1];
	}else{
		return null;
	}
}
function getUp(x,y){
	if(y > 0){
		return map[x][y-1];
	}else{
		return null;
	}
}
function getDown(x,y){
	if(y < h){
		return map[x][y+1];
	}else{
		return null;
	}
}