import express from 'express';
import { client } from '../index.js';
const router = express.Router();
import * as dotenv from 'dotenv'
import { CreateMentor, deleteMentorByName, EditdelMentor, EditMentor, getAllMentors, getMentorById, getMentorByName, overwriteMentor, SetEditMentor, UpdateMentor } from '../services/mentor.services.js';
dotenv.config();

  router.post('/add', async function(request, response){
    const {mentor,mentorId,email,students} = request.body; 
    console.log(request.body)

    const mentorFromDb = await getMentorByName(email);
    const mentoridfromdb = await getMentorById(mentorId);

    if(mentorFromDb || mentoridfromdb){
      response.status(400).send({msg:"mentor Already Exist"})
    }else{
      const result = await CreateMentor({
        mentor:mentor, 
        email:email,
        mentorId:mentorId,
        students:students
      });
      response.status(200).send({msg:"Mentor added successfully"});
    }
  })

  router.get(`/:id`, async function(req, res){
    try{
      const {id} = req.params;
      console.log(id);
      const mentor = await getMentorById(id)
      console.log(mentor)
    if(mentor){
      res.status(200).send(mentor)
    }
    }catch(error){
      res.status(400).send(error)
    }
  })

  router.put(`/edit/:id`, async function(request, response){ //done
    try{
      const {id} = request.params;
    const {students} = request.body;  
    console.log(students, id)
    const mentorFromDb = await getMentorById(id);
    console.log(mentorFromDb);
    if(!mentorFromDb){
      response.status(400).send({msg:"Invalid Credentials or user doesnot exist"})
      console.log("no mentor")
    }else{
      console.log("editing")
     if(mentorFromDb.students === []){ 
        const edited = await EditMentor({
          mentorId:id,
          students:students
      });
      response.send({
        msg:"Edited Successfully",
        edited: edited
      });
      console.log(edited)
    }else{
      const edited = await UpdateMentor({
        mentorId:id,
        students:students
      })
      response.send({
        msg:"Students added successfully to the list",
        edited: edited
      });
      console.log(edited)
    }
    }}catch(error){
      response.status(400).send(error)
    }
  });

  router.put(`/editstud/:id`, async function(request, response){ //done
    try{
      const {id} = request.params;
    const data = request.body;  
    console.log(data.students,"hello", id)
    const mentorFromDb = await getMentorById(id);
    console.log(mentorFromDb);
    if(!mentorFromDb){
      response.status(400).send({msg:"Invalid Credentials or user doesnot exist"})
      console.log("no mentor")
    }else{
      if(mentorFromDb.students === null){
        console.log("overwriting")

        let edited = await EditMentor({
          mentorId:id,
          students: [...data.students]
          });
      edited = await getMentorById(id);
      console.log(edited);

      response.send({
        msg:"Edited Successfully",
        edited: edited
        });
      }else{
        console.log("push in array")

        let edited = await UpdateMentor({
          mentorId:id,
          students: data.students
          });
      edited = await getMentorById(id);
      console.log(edited);

      response.send({
        msg:"Edited Successfully",
        edited: edited
        });
      }
    
    }}catch(error){
      response.status(400).send(error)
    }
  });

  router.put(`/editdelstud/:id`, async function(request, response){ //done
    try{
      const {id} = request.params;
    const {students} = request.body;  
    console.log(students, id)
    const mentorFromDb = await getMentorById(id);
    console.log(mentorFromDb);
    if(!mentorFromDb){
      response.status(400).send({msg:"Invalid Credentials or user doesnot exist"})
      console.log("no mentor")
    }else{
      console.log("editing")

        const edited = await EditdelMentor({
          mentorId:id,
          students:students
      });
      response.send({
        msg:"Student removed Successfully",
        edited: edited
      });
      console.log(edited)
    
    }}catch(error){
      response.status(400).send(error)
    }
  });

  router.put(`/editdel/:id`, async function(request, response){ //done
    try{
      const {id} = request.params;
    const {students} = request.body;  
    console.log(students, id)
    const mentorFromDb = await getMentorById(id);
    console.log(mentorFromDb);
    if(!mentorFromDb){
      response.status(400).send({msg:"Invalid Credentials or user doesnot exist"})
      console.log("no mentor")
    }else{
      console.log("editing")
      const edited = await overwriteMentor({
        mentorId:id,
        students:students
      });
      response.send({
        msg:"Edited Successfully",
        edited: edited
      });
      console.log(edited)
    }}catch(error){
      response.status(400).send(error)
    }
  });

  router.get(`/`, async function(req, res){
    const allmentors = await getAllMentors(req)
    console.log(allmentors)
    if(allmentors){
        res.status(200).send(allmentors)
    }else res.status(400).send(error)
  })

  router.delete(`/delete/:id`, async function(req, res){
   try{ 
    console.log("deleting")
    const {id} = req.params;
    console.log(id)
    await deleteMentorByName(id);
    res.status(200).send({msg:"Deleted successfully"})
    }catch(error){
        res.status(400).send(error)
    }
  })

  
  export default router ;