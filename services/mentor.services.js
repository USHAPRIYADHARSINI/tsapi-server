import { client } from '../index.js';


export async function CreateMentor(data) {
    return await client.db('tsapi').collection('mentor').insertOne(data);
}

export async function EditMentor(data) {
    return await client.db('tsapi').collection('mentor').findOneAndUpdate({mentorId: data.mentorId},{$set:{students: data.students}})
}

export async function EditdelMentor(data) {
    return await client.db('tsapi').collection('mentor').findOneAndUpdate({mentorId: data.mentorId},{$set:{students: null}})
}

export async function SetEditMentor(data) {
    return await client.db('tsapi').collection('mentor').findOneAndUpdate({mentorId: data.mentorId},{$set:{students: data.students}})
}

export async function UpdateMentor(data) {
    return await client.db('tsapi').collection('mentor').findOneAndUpdate({mentorId: data.mentorId},{$push:{students: [...data.students]}})
}

export async function overwriteMentor(data) {
    return await client.db('tsapi').collection('mentor').findOneAndUpdate({mentorId: data.mentorId},{$pullAll:{students: data.students}})
}

export async function getAllMentors(req) {
    return await client.db('tsapi').collection('mentor').find(req.query).toArray();
}

export async function deleteMentorByName(id) { 
    return await client.db('tsapi').collection('mentor').deleteOne({mentorId:id});
}

export async function getMentorById(id) { 
    return await client.db('tsapi').collection('mentor').findOne({mentorId:id});
}

export async function getMentorByName(email) { 
    return await client.db('tsapi').collection('mentor').findOne({email:email});
}

export async function getMentorByEmail(email) {
    return await client.db('tsapi').collection('mentor').findOne({email:email});
}