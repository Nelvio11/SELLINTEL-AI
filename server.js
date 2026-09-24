const express=require("express"),crypto=require("crypto"),fs=require("fs"),path=require("path");
const app=express(),PORT=process.env.PORT||3000,DB=path.join(__dirname,"data/db.json"),sessions=new Map();
app.use(express.json({limit:"100kb"}));app.use(express.static(path.join(__dirname,"../frontend")));
function db(){if(!fs.existsSync(path.dirname(DB)))fs.mkdirSync(path.dirname(DB),{recursive:true});if(!fs.existsSync(DB))fs.writeFileSync(DB,JSON.stringify({users:[],products:[]},null,2));return JSON.parse(fs.readFileSync(DB))}
function save(x){fs.writeFileSync(DB,JSON.stringify(x,null,2))}
function id(){return crypto.randomUUID()} function email(x){return String(x||"").trim().toLowerCase()}
function hp(p){let salt=crypto.randomBytes(16).toString("hex"),hash=crypto.scryptSync(p,salt,64).toString("hex");return{salt,hash}}
function verify(p,s,h){let x=crypto.scryptSync(p,s,64).toString("hex");return crypto.timingSafeEqual(Buffer.from(x,"hex"),Buffer.from(h,"hex"))}
function auth(req,res,next){let h=req.headers.authorization||"",t=h.startsWith("Bearer ")?h.slice(7):"",u=sessions.get(t);if(!u)return res.status(401).json({error:"Sessão inválida."});req.userId=u;req.token=t;next()}
app.get("/api/health",(q,s)=>s.json({ok:true,service:"SELLINTEL AI FINAL"}));
app.post("/api/auth/register",(q,s)=>{let e=email(q.body.email),p=String(q.body.password||"");if(!/^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(e))return s.status(400).json({error:"Email inválido."});if(p.length<8)return s.status(400).json({error:"Use pelo menos 8 caracteres."});let d=db();if(d.users.some(x=>x.email===e))return s.status(409).json({error:"Conta já existe."});let h=hp(p),u={id:id(),email:e,passwordHash:h.hash,passwordSalt:h.salt,createdAt:new Date().toISOString()};d.users.push(u);save(d);let t=crypto.randomBytes(32).toString("hex");sessions.set(t,u.id);s.json({token:t,user:{id:u.id,email:e}})});
app.post("/api/auth/login",(q,s)=>{let e=email(q.body.email),p=String(q.body.password||""),d=db(),u=d.users.find(x=>x.email===e);if(!u||!verify(p,u.passwordSalt,u.passwordHash))return s.status(401).json({error:"Email ou palavra-passe incorretos."});let t=crypto.randomBytes(32).toString("hex");sessions.set(t,u.id);s.json({token:t,user:{id:u.id,email:e}})});
app.get("/api/auth/me",auth,(q,s)=>{let u=db().users.find(x=>x.id===q.userId);if(!u)return s.status(401).json({error:"Conta não encontrada."});s.json({user:{id:u.id,email:u.email}})});
app.post("/api/auth/logout",auth,(q,s)=>{sessions.delete(q.token);s.json({ok:true})});
app.get("/api/products",auth,(q,s)=>s.json({products:db().products.filter(x=>x.userId===q.userId)}));
app.post("/api/products",auth,(q,s)=>{let x=q.body;if(!String(x.name||"").trim())return s.status(400).json({error:"Produto obrigatório."});let d=db(),p={...x,id:id(),userId:q.userId,createdAt:new Date().toISOString()};d.products.push(p);save(d);s.status(201).json({product:p})});
app.delete("/api/products/:id",auth,(q,s)=>{let d=db(),n=d.products.length;d.products=d.products.filter(x=>!(x.id===q.params.id&&x.userId===q.userId));if(n===d.products.length)return s.status(404).json({error:"Produto não encontrado."});save(d);s.json({ok:true})});
app.get("*",(q,s)=>s.sendFile(path.join(__dirname,"../frontend/index.html")));
app.listen(PORT,()=>console.log("SELLINTEL AI em http://localhost:"+PORT));