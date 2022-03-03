const { todo } = require("../../models");
const sequelize = require('sequelize')

exports.getTodos = async (req, res) => {
  try {
    const data = await todo.findAll({      
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },     
    });   

    res.send({
      status: "success",
      data
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getTodo = async (req, res) => {
  try {
    let { id } = req.params;
    let data = await todo.findOne({   
      where: {
        id: id,
      },                 
      attributes: {              
        exclude: ["createdAt", "updatedAt"],
      }     
  });             

    res.send({
      status: "success",
      data
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getTodoIsDone = async (req, res) => {
  try {
    let data = await todo.findAll({   
      where: {
        isDone: false,
      },                 
      attributes: {              
        exclude: ["createdAt", "updatedAt"],
      }     
  });             

    res.send({
      status: "success",
      data
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;           

    const datas = {
      title: req?.body?.title,
    };   

    await todo.update(datas, {
      where: {
        id,
      },
    });

    let data = await todo.findOne({
        where: {
          id,
        },        
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
    });    

    res.send({
      status: "success",      
      data
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.updateIsDone = async (req, res) => {
  try {
    const { id } = req.body;           

    const datas = {
      id,
      isDone: req?.body?.isDone,
    };   

    await todo.update(datas, {
      where: {
        id,
      },
    });

    let data = await todo.findOne({
        where: {
          id,
        },        
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
    });    

    res.send({
      status: "success",      
      data
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.body;

    await todo.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      data:{
        id
      } 
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.addTodo = async (req, res) => {  
  try {
    const { id } = req.params; 

    const newTodo = await todo.create({
      title: req?.body?.title,
      isDone: 0
    });
      

    let data = await todo.findOne({
      where: {
        id: newTodo.id,
      },      
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });

    data = JSON.parse(JSON.stringify(data));

    // code here
    data = {
      ...data,
    };

    res.send({
      data
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};