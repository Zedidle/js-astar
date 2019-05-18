const g_ShowProgress = true;
let AStarSearcher = function(map, start, end, renderer){
	console.log("aStarSearch")
	let self = this;
	let close = {
		_data:{},
		contain(y, x){
			/*
				params
					y Number
					x Number
				return Boolean
			 */
			if(this._data[y]){
				return this._data[y][x];
			}else{
				return false;
			}
		},
		add(y, x){
			/*
				params
					y Number
					x Number
				return undefined
			 */
			if(!this._data[y]){
				this._data[y] = {};
			}
			this._data[y][x] = true;
			map[y][x] = 3;
			if(self.showProgress && !(y === start.y && x === start.x)){
				renderer.changeDiv(y, x, 3);
			}

		},
	};
	let open = {
		estimateTree: new BinaryTree([getDisToEnd(start.y, start.x)]).make(),
		_data:{},

		contain(toStart, y, x){
			/*
				params
					toStart Number
					y Number
					x Number
				return Boolean
			 */
			// console.log("open.contain", this._data)
			let estimateVal = toStart + getDisToEnd(y,x);
			if(this._data[estimateVal]){
				let e = this._data[estimateVal];
				for(let i=0;i<e.length;i++){
					if(e[i].y === y && e[i].x === x){
						return true;
					}
				}
				return false;
			}else{
				return false;
			}
		},
		add(toStart, y, x, pre){
			/*
				params
					toStart Number
					y Number
					x Number
					pre {
						toStart, y, x, pre
					}
				return Boolean
			 */
			if(this.contain(toStart, y, x)){
				return false;
			}else{
				map[y][x] = 2;
				if(self.showProgress && !(y === start.y && x === start.x)){
					renderer.changeDiv(y, x, 2);
				}
				let estimateVal = toStart　+ getDisToEnd(y, x);
				this.estimateTree.insertNode(estimateVal);
				if(!this._data[estimateVal]){
					this._data[estimateVal] = [];
				}
				let dot = { toStart, y, x, pre };
				this._data[estimateVal].push(dot);
				return dot;
			}
		},
		sub(estimateVal){
			/*
				params
					estimateVal Number
				return undefined	
			 */
			if(this._data[estimateVal].length > 0){
				if(this._data[estimateVal].length === 1){
					this.estimateTree.removeNode(estimateVal);
				}
				return this._data[estimateVal].pop();
			}
		},
		check(cur){
			/*
				params 
					cur {
						toStart, y, x, pre
					}
				return undifined
			 */
			// console.log("open.check cur",cur,this._data)
			let {toStart, y, x, pre} = cur;
			if(!close.contain(y-1, x) && !isObstacle(y-1, x)){ // up
				open.add(toStart+1, y-1, x, cur);
			}
			if(!close.contain(y, x+1) && !isObstacle(y, x+1)){ // right
				open.add(toStart+1, y, x+1, cur);
			}
			if(!close.contain(y+1, x) && !isObstacle(y+1, x)){ // down
				open.add(toStart+1, y+1, x, cur);
			}
			if(!close.contain(y, x-1) && !isObstacle(y, x-1)){ // left
				open.add(toStart+1, y, x-1, cur);
			}
		},
		getMinEstimate(){
			/*
				params void
				return 
					{ y, x, toStart, pre }
					null
			*/
			let minEstimateNode = this.estimateTree.getMin();
			if(minEstimateNode){
				return this.sub(minEstimateNode.val);
			}else{
				return null;
			}
		},
	};

	this.search = function(showProgress){
		this.showProgress = Boolean(showProgress);
		renderer.showMap();
		if(!this.showProgress){
			console.time("Use time(ms)");
		}

		let couldFind = true;
		let step = 0;
		let cur = open.add(0, start.y, start.x, null);

		if(showProgress){
			(function lambda(){
				step ++;
				if(getDisToEnd(cur.y, cur.x) > 0){
					close.add(cur.y, cur.x);
					open.check(cur);
					cur = open.getMinEstimate();
					if(cur){
						setTimeout(lambda, 4);
					}else{
						couldFind = false;
					}
				}
			})();
		}else{
			while(getDisToEnd(cur.y, cur.x) > 0){
				step ++;
				close.add(cur.y, cur.x);
				open.check(cur);
				cur = open.getMinEstimate();
				if(!cur){
					couldFind = false;
					break;
				}
			}
		}

		if(couldFind){
			while(cur){
				map[cur.y][cur.x] = "*";
				renderer.changeDiv(cur.y, cur.x, 4);
				cur = cur.pre;
			}
		}

		if(!this.showProgress){
			console.timeEnd("Use time(ms)");
			if(!couldFind){
				console.log("Can not find result!");
			}else{
				console.log("Use steps", step);
			}
		}
	}

	function isObstacle(y, x){
		if(map[y]){
			if(map[y][x]===0){
				return false;
			}else{
				return true;
			}
		}else{
			return true;
		}
	}

	function getDisToEnd(y,x){
		return Math.abs(x-end.x) + Math.abs(y-end.y);
	}
};

let Renderer = function(){
	let divMap = [];
	let container = document.getElementById("container"); 
	let getClassName = function(index){
		let classList = ["default","obstacle","open","close","result"];
		return classList[index] + " cube";
	};
	this.showMap = function(){
		for(let y=0;y<map.length;y++){
			divMap[y] = [];
			for(let x=0;x<map[y].length;x++){
				let div = document.createElement("div");
				div.style.top = 12 * y + "px";
				div.style.left = 12 * x + "px";
				div.className = getClassName(map[y][x]);
				divMap[y][x] = div;
				container.appendChild(div);
			}
		}
		map[start.y][start.x] = 0;
		map[end.y][end.x] = 0;
		divMap[start.y][start.x].className = "start cube";
		divMap[end.y][end.x].className = "end cube";
		// console.log(divMap)
	},
	this.changeDiv = function(y, x, classIndex){
		divMap[y][x].className = getClassName(classIndex);
	}
}

let renderer = new Renderer();
let aStarSearcher = new AStarSearcher(map, start, end, renderer);
aStarSearcher.search(g_ShowProgress);
