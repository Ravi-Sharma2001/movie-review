const { json } = require('express');
const db = require('../config/db');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require("dotenv").config();
class Post {
    // constructor(title, body){
    //     this.title = title;
    //     this.body = body;
    // }
    // async save() {
    //     let d = new Date();
    //     let yyyy = d.getFullYear();
    //     let mm = d.getMonth()+1;
    //     let dd = d.getDate();

    //     let createdAtDate = `${yyyy}-${mm}-${dd}`;
    //     let sql =  `INSERT INTO posts(title, body, created_at) values('${this.title}','${this.body}','${createdAtDate}');`

    //         return db.execute(sql);
    // }
    static register(age , gender, name, username , password){
        let sql = `SELECT COUNT(username) as count FROM UserProfile WHERE username = '${username}';`;
        db.query(sql).then(async ([row])=>{
            console.log(row[0].count)
            if(row[0].count != 0){
                //  REGISTERATION NOT POSSIBLE
                console.log("NOT UNIQUE USERNAME")
            }
            else{
                // INSERT into TABLE
                const hashedPassword = await bcrypt.hash(password,10)
                console.log(hashedPassword)
                let ins = `INSERT INTO UserProfile values(${age},'${gender}','${name}','${username}','${hashedPassword}');`;
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
    static async login(username, password){
        let sql = `SELECT COUNT(username) as count FROM UserProfile WHERE username = '${username}';`;
        return db.query(sql).then(([row])=>{
            console.log(row[0].count)
            if(row[0].count == 0){
                //  WRONG USERNAME AND PASSWORD
                console.log("INVALID CREDENTIALS")
            }
            else{
                // LOGIN
                let ins = `SELECT * FROM UserProfile WHERE username = '${username}';`;
                return db.query(ins).then(async ([row])=>{
                    try {
                        if(await bcrypt.compare(password,row[0].password)){
                            console.log(row[0])
                            var jsonToken = jwt.sign({result: row[0].username}, process.env.ACCESS_KEY)
                            return jsonToken
                        }
                    } catch (error) {
                        console.log("WRONG PASSWORD")
                        return "wrong password"
                    }
                }).catch(error =>{
                    throw error;
                })
            }
        }).catch(error =>{
            throw error;
        })
    }
    static reset(username, password, newpassword){
        let sql = `SELECT COUNT(username) as count FROM UserProfile WHERE username = '${username}';`;
        return db.query(sql).then(async ([row])=>{
            console.log(row[0].count)
            if(row[0].count == 0){
                //  WRONG USERNAME AND PASSWORD
                console.log("username doesn't exist")
            }
            else{
                let check = `SELECT * FROM UserProfile WHERE username = '${username}';`;
                return db.query(check).then(async ([row])=>{
                    try {
                        if(await bcrypt.compare(password,row[0].password)){
                            const hashedPassword = await bcrypt.hash(newpassword,10)
                            console.log(hashedPassword)
                            let upd = `UPDATE UserProfile 
                            SET password = '${hashedPassword}'
                            WHERE username = '${username}';`;
                            return db.query(upd).then(([row])=>{
                                return "SUCCESSFUL";
                            }).catch(error =>{
                                throw error;
                            })
                        }
                        else{
                            return "WRONG PASSWORD"
                        }
                    } catch (error) {
                        throw error;
                    }
                }).catch(error =>{
                    throw error;
                })
            }
        }).catch(error =>{
            throw error;
        })
    }
    //FIND MOVIES BY WORK ID
    static findByWork(work_id){
            let sql = `select movie_id as id from People WHERE work_id = '${work_id}';`;
                db.query(sql).then(([row])=>{
                    row.forEach(element => console.log(element))
                }).catch(error =>{
                    throw error;
                })
    }
    //GET MOVIE INFO BY WORK ID
    static findMovieByID(movie_id){
        let sql = `select * from Movie WHERE movie_id = '${movie_id}';`;
                db.query(sql).then(([row])=>{
                    let review = `select * from Review WHERE movie_id = '${movie_id}';`;
                    db.query(review).then(([result])=>{
                        const resultt = {
                            description: row,
                            review: result
                        }
                         console.log(resultt)
                    }).catch(error =>{
                        throw error;
                    })                    
                }).catch(error =>{
                    throw error;
                })
    }
    static findAllMovies(){
        let sql =  `select * from Movie;`;
        return db.execute(sql);
    }
};

module.exports = Post;