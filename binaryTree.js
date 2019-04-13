var Node = function(val, left, right){
    this.val = val;
    if(left) this.left = left;
    if(right) this.right = right;
}   

let nodeArr = [];
let testNumber = 30;
for(let i=0;i<testNumber;i++){
    nodeArr.push(parseInt(Math.random()*testNumber));
}

var BinaryTree = function(nodeArr){
    this.root = null;

    this.getRoot = function(){
        return this.root;
    }

    this.getMin = function(){
        let cur = this.root;
        while(cur.left){
            cur = cur.left;
        }
        return cur; 
    },

    this.getMax = function(){
        let cur = this.root;
        while(cur.right){
            cur = cur.right;
        }
        return cur;
    }

    this.insertNode = function(node){
        if(typeof(node) === "number"){
            node = new Node(node);
        }
        let cur = this.root;
        while(cur){
            if(cur.val == node.val){
                return this;
            }
            if(node.val < cur.val){
                if(cur.left){
                    cur = cur.left;
                }else{
                    cur.left = node;
                }
            }else{
                if(cur.right){
                    cur = cur.right;
                }else{
                    cur.right = node;
                }
            }
        }
        return this;
    }

    this.make = function(){
        // console.time("make");
        this.root = new Node(nodeArr[0]);
        for(let i=1;i<nodeArr.length;i++){
            this.insertNode(new Node(nodeArr[i]));
        }
        // console.timeEnd("make");
        return this;
    }

    this.removeTree = function(val){
        let cur = this.root;
        let pre = null;
        let isLeft = false;
        while(cur){
            if(cur.val == val){
                if(pre){
                    if(isLeft){
                        deepRemove(pre.left);
                        pre.left = null;
                    }else{
                        deepRemove(pre.right);
                        pre.right = null;
                    }
                }else{
                    deepRemove(this.root);
                }
                break;
            }
            pre = cur;

            if(cur.val > val){
                cur = cur.left;
                isLeft = true;
            }else{
                cur = cur.right;
                isLeft = false;
            }
        }
        function deepRemove(node){
            if(node.left){
                deepRemove(node.left);
            }
            if(node.right){
                deepRemove(node.right);
            }
            delete node;
        }
    }

    this.removeNode = function(val){
        console.time("removeNode");
        let pre = null;
        let isLeft = false;
        let cur = this.root;
        while(cur){
            if(cur.val == val){
                if(cur.right){
                    let left = cur.left;
                    if(pre){
                        if(isLeft){
                            pre.left = cur.right;
                        }else{
                            pre.right = cur.right;
                        } 
                    }else{
                        this.root = this.root.right;
                    }

                    if(left){
                        this.insertNode(left);
                    }
                }else if(cur.left){
                    if(pre){
                        if(isLeft){
                            pre.left = cur.left;
                        }else{
                            pre.right = cur.left;
                        }
                    }else{
                        this.root = this.root.left;
                    }

                }else{
                    if(pre){
                        if(isLeft){
                            pre.left = null;
                        }else{
                            pre.right = null;
                        }
                    }else{
                        this.root = null;
                    }

                }
                cur = null;
                // console.timeEnd("removeNode");
                return "remove success";
            }
            pre = cur;
            if(cur.val > val){
                cur = cur.left;
                isLeft = true;
            }else{
                cur = cur.right;
                isLeft = false;
            }
        }
        console.timeEnd("removeNode");
        return "remove fail";
    } 

    this.preorderTraversal = function(){
        function iter(node){
            if(node){
                result.push(node.val);
                iter(node.left);
                iter(node.right);
            }
        }
        console.time("preNodes");
        let result = [];
        iter(this.root);
        console.timeEnd("preNodes");
        return result;
    }

    this.midorderTraversal = function(){
        function iter(node){
            if(node){
                iter(node.left);
                result.push(node.val);
                iter(node.right);
            }
        }
        console.time("midNodes");
        let result = [];
        iter(this.root);
        console.timeEnd("midNodes");
        return result;
    }

    this.backorderTraversal = function(){
        function iter(node){
            if(node){
                iter(node.left);
                iter(node.right);
                result.push(node.val);
            }
        }
        console.time("backNodes");
        let result = [];
        iter(this.root);
        console.timeEnd("backNodes");
        return result;
    }


    this.clone = function(){

        console.time("clone");

        let node = this.root;
        let newBinaryTree = new BinaryTree([node.val]);
        newBinaryTree.make();

        let cur = newBinaryTree.getRoot();

        iter(cur, node);
        function iter(cur, node){
            if(node.left){
                cur.left = new Node(node.left.val);
                iter(cur.left, node.left);
            }
            if(node.right){
                cur.right = new Node(node.right.val);
                iter(cur.right, node.right);
            }
        }

        console.timeEnd("clone");
        return newBinaryTree;
    }
}
