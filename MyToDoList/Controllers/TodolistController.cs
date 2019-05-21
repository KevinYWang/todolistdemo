using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Design;
using MyToDoList.Data;
using MyToDoList.Model;

namespace MyToDoList.Controllers
{
//     [Route("[controller]")]
//     [ApiController]
    public class TodolistController : ControllerBase
    {
        private readonly ITodoListDao _todoListDao;

        public TodolistController(ITodoListDao todoListDao)
        {
            _todoListDao = todoListDao;
        }

        [HttpGet]
        public async Task<IActionResult> GetTodoList()
        {
            var results = await _todoListDao.GetToDoItems();
            return Ok(results);
        }

        [HttpPost]
        public async Task<IActionResult> AddOrUpdateItem([FromBody] ToDoItem item)
        {
            var results = await _todoListDao.AddOrUpdateItem(item);
            return Ok(results);
        }

        [HttpPost]
        public async Task<IActionResult> DeleteItem([FromBody] ToDoItem item)
        {
            var results = await _todoListDao.DeleteTodoItem(item);
            return Ok(results);
        }
    }
}