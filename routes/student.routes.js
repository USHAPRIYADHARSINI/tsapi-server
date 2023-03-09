import express from 'express';
import { client } from '../index.js';
const router = express.Router();
import * as dotenv from 'dotenv'
import { CreateStudent,deletestudentById,EditStudent,getAllStudents,getAllUnselectedStuds,getStudentById,getstudentByName} from '../services/student.services.js';
dotenv.config();

router.get(`/`, async function(req, res){
  const allStudents = await getAllStudents(req)
  console.log(allStudents)
  if(allStudents){
      res.status(200).send(allStudents)
  }else res.status(400).send(error)
})

router.get(`/unselected`, async function(req, res){
  try{
      const unselectedStuds = await getAllUnselectedStuds(req)
      console.log(unselectedStuds)
      if(unselectedStuds){
        res.status(200).send(unselectedStuds)
      }
    }catch(error){
      res.status(400).send(error)
    }  
}
)

router.get(`/:id`, async function(req, res){
  const {id} = req.params;
  const student = await getStudentById(id)
  console.log(student)
  if(student){
      res.status(200).send(student)
  }else res.status(400).send(error)
})

router.delete(`/delete/:id`, async function(req, res){
  try{
    const {id} = req.params;
    console.log(id)
    await deletestudentById(id);
    res.status(200).send({msg: "Deleted successfully"})
  }catch(error){
     res.status(400).send(error)
  }
})

  router.post('/add', async function(request, response){
    const {name,email,id,mentor} = request.body; 
    console.log(request.body)

    const studentFromDb = await getstudentByName(email);
    const studentidfromdb = await getStudentById(id);

    if(studentFromDb || studentidfromdb){
      response.status(400).send({msg:"User Already Exist"})
    }else{
      const result = await CreateStudent({
        name:name, 
        email:email,
        id:id,
        mentor:mentor
      });
      response.status(200).send({msg:"student successfully registered"})
    }
  })

  router.put(`/edit/:id`, async function(request, response){ //done
    const {id} = request.params;
    const {mentor} = request.body;  
    console.log(id, mentor)
    const studentFromDb = await getStudentById(id);
    if(!studentFromDb){
      response.status(400).send({msg:"Invalid Credentials or user doesnot exist"})
    }
    else{
      const edited = await EditStudent({
        id:id,
        mentor:mentor
      });
      response.send({msg:"Edited Successfully",edited: edited})
      console.log(edited)
    }
  })

  
  export default router ;