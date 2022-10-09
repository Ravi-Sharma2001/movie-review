const db = require('../config/db');
class Post {
    constructor(title, body){
        this.title = title;
        this.body = body;
    }
    async save() {
        let d = new Date();
        let yyyy = d.getFullYear();
        let mm = d.getMonth()+1;
        let dd = d.getDate();

        let createdAtDate = `${yyyy}-${mm}-${dd}`;
        let sql =  `INSERT INTO posts(title, body, created_at) values('${this.title}','${this.body}','${createdAtDate}');`

            return db.execute(sql);
    }

    static findAll(){
        let sql = "SELECT * FROM posts;";
        return db.execute(sql);
    }
    static findById(id){
        let sql =  `SELECT * FROM posts WHERE id = ${id};`;
        return db.execute(sql);
    }
    static register(age , gender, name, username , password){
        let sql = `SELECT COUNT(username) as count FROM UserProfile WHERE username = '${username}';`;
        db.query(sql).then(([row])=>{
            console.log(row[0].count)
            if(row[0].count != 0){
                //  REGISTERATION NOT POSSIBLE
                console.log("NOT UNIQUE USERNAME")
            }
            else{
                // INSERT into TABLE
                let ins = `INSERT INTO UserProfile values(${age},'${gender}','${name}','${username}','${password}');`;
                db.query(ins).then(([row])=>{
                    console.log("SUCCESSFUL");
                }).catch(error =>{
                    throw error;
                })

            }
        }).catch(error =>{
            throw error;
        })
    };
    static login(username, password){
        let sql = `SELECT COUNT(username) as count FROM UserProfile WHERE username = '${username}' and password = '${password}';`;
        db.query(sql).then(([row])=>{
            console.log(row[0].count)
            if(row[0].count == 0){
                //  WRONG USERNAME AND PASSWORD
                console.log("INVALID CREDENTIALS")
            }
            else{
                // LOGIN
                let ins = `SELECT * FROM UserProfile WHERE username = '${username}' and password = '${password}';`;
                db.query(ins).then(([row])=>{
                    console.log(row);
                }).catch(error =>{
                    throw error;
                })
            }
        }).catch(error =>{
            throw error;
        })
    }
    static reset(username, password, newpassword){
        let sql = `SELECT COUNT(username) as count FROM UserProfile WHERE username = '${username}' and password = '${password}';`;
        db.query(sql).then(([row])=>{
            console.log(row[0].count)
            if(row[0].count == 0){
                //  WRONG USERNAME AND PASSWORD
                console.log("INVALID CREDENTIALS")
            }
            else{
                // LOGIN
                let ins = `UPDATE UserProfile 
                SET password = '${newpassword}'
                WHERE username = '${username}' and password = '${password}';`;
                db.query(ins).then(([row])=>{
                    console.log("SUCCESSFUL");
                }).catch(error =>{
                    throw error;
                })
            }
        }).catch(error =>{
            throw error;
        })
    }
};

module.exports = Post;