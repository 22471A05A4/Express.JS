const e = require("express")
const express=require("express")
const app=express()
const port=3000
app.use(express.json())
let stud=[
    {id:1,name:"sat",roll:"80"},
        {id:2,name:"jan",roll:"81"}
]
///logger
const logger = (req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next(); // Call the next middleware or route handler
};

app.use(logger);
//url encoder
app.use(express.urlencoded({ extended: true }));


////crud operations
//get
app.get('/stud',(req,res)=>{
 res.send(stud)
})

//get by id
// app.get('/stud/:id',(req,res)=>{
//     const id=parseInt(req.params.id)
//     if(st){
//         res.send(st)
//     }
//     else
//     {
//         res.status(404)
//     }
// })

//fetch api
// async function check() {
//     let response = await fetch("https://jsonplaceholder.typicode.com/posts");
//     let data = await response.json();
//      //console.log(data);
//      app.get('/',(req,res)=>{
//         res.send(data)
//      })
//      app.get('/data/:id',(req,res)=>{
//     const id=parseInt(req.params.id)
//     const st=data.find(s=>s.id==id)
//     if(st){
//         res.send(st)
//     }
//     else
//     {
//         res.status(404)
//     }
// })

// }
// check()

//post
app.post('/stud',(req,res)=>{
    const {name,roll}=req.body
    const newStud={
        id:stud.length+1,
        name,roll
    }
    stud.push(newStud)
    res.status(201).json(newStud)
})

//put
app.put('/stud/:id',(req,res)=>{
    const id=parseInt(req.params.id)
    const {name,roll}=req.body
    const st=stud.find(s=>s.id==id)
    if(st){
        st.name=name||st.name
        st.roll=roll||st.roll
        res.json(st)

    }
    else{
        res.status(404)
    }
})
//delete
app.delete('/stud/:id',(req,res)=>{
    const id=parseInt(req.params.id)
    const index=stud.find(s=>s.id===id)
    if(index!==-1){
        const del=stud.splice(index,1)
        res.json(del[0])
    }
    else{
        res.status(404)
    }
})
//search
app.get('/search',(req,res)=>{
    const {roll}=req.query
    const result=stud.filter(s=>s.roll==roll)
    res.json(result)
})

//url encoder
app.post("/submit", (req, res) => {
    res.send(`Name: ${req.body.name}}, Roll: ${req.body.roll}`);
})

//serving static files
app.use('/static',express.static('public'));

app.listen(port,()=>{console.log("http://localhost:3000")})

//third party middlewares




