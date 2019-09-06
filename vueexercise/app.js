//存取localStorge中的数据

var store = {
    save(key,value){
        localStorage.setItem(key,JSON.stringify(value));
    },
    fetch(key){
        return JSON.parse(localStorage.getItem(key)) || [];
    }
}

/*var list = [
    {
        title:"吃饭打豆豆",
        isChecked:false   //状态为false：未选中
    },
    {
        title:"吃饭打豆豆",
        isChecked:true    //状态为true：选中
    }
];*/


//取出所有的值
var list = store.fetch("exercise")


//过滤的时候有三种情况 all finished unfinished
var filter = {
    all:function(){
        return list;
    },
    finished:function(){
        return list.filter(function(item){
            return item.isChecked;
        })
    },
    unfinished:function(){
        return list.filter(function(item){
            return !item.isChecked;
        })
    }
}

var vm = new Vue({
    el:".main",
    data:{
        list:list,
        todo:"",
        edtorTodos:'', //记录正在编辑的数据
        beforeTitle:'',//记录正在编辑的数据的title
        visibility:"all" //通过这个属性值的变化对数据进行筛选
    },
    watch: {
       /* list:function(){  //监控list属性，当属性对应的值发生变化就会执行函数
            store.save("exercise",this.list);
        } */
        list:{
            handler:function(){
                store.save("exercise",this.list);
            },
            deep:true
        }
    },  
    computed: {
        noCheckedLength:function(){
            return this.list.filter(function(item){
                return !item.isChecked
            }).length
        },
        filteredList:function(){
            //找到了过滤函数，就返回过滤后的数据，如果没有就返回所有数据
            return filter[this.visibility] ? filter[this.visibility](list):list;
        }
    },
    methods: {
        addTodo(){    //添加任务
            this.list.push({
                title:this.todo,
                isChecked:false
            });
            this.todo = '';
        },
        deleteTodo(todo){     //删除任务
            var index = this.list.indexOf(todo);
            this.list.splice(index,1);
        },
        edtorTodo(todo){   //编辑任务
            console.log(todo);
            //编辑任务时，记录一下编辑这条任务的title，方便在取消编辑时重新给之前的title
            
            this.beforeTitle = todo.title;
            this.edtorTodos = todo;
            
        },
        edtorTodoed(todo){   //编辑任务成功
            this.edtorTodos ='';
        },                                                                                           
        cancelTodo(item){    //取消编辑任务
            item.title = this.beforeTitle;

            //让div显示出来，input隐藏
            this.edtorTodos =''
        }
    },
    directives:{
        "focus":{
            update(el,binding){
                console.log(el);
                console.log(binding);
                if(binding.value){
                    el.focus();
                }
            }
        }
    }
});
function watchHashChange(){
    var hash = window.location.hash.slice(1);
    vm.visibility = hash;
}

watchHashChange();


window.addEventListener("hashchange",watchHashChange);