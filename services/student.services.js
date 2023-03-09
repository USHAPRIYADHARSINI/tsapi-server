import { client } from '../index.js';


export async function CreateStudent(data) {
    return await client.db('tsapi').collection('student').insertOne(data);
}

export async function EditStudent(data) {
    return await client.db('tsapi').collection('student').findOneAndUpdate({id:data.id},{$set:{mentor: data.mentor}})
}

export async function getAllStudents(req) {
    return await client.db('tsapi').collection('student').find(req.query).toArray();
}

export async function deletestudentById(id) { 
    return await client.db('tsapi').collection('student').deleteOne({id:id});
}
export async function getAllUnselectedStuds(){
    return await client.db('tsapi').collection('student').find({mentor:""}).toArray();
}

export async function getStudentById(id) { 
    return await client.db('tsapi').collection('student').findOne({id:id});
}

export async function getstudentByName(email) { 
    return await client.db('tsapi').collection('student').findOne({email:email});
}

export async function getstudentByEmail(email) {
    return await client.db('tsapi').collection('student').findOne({email:email});
}