using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyToDoList.Model;

namespace MyToDoList.Data
{
    public interface ITodoListDao
    {
        Task<List<ToDoItem>> GetToDoItems();
        Task<ToDoItem> AddOrUpdateItem(ToDoItem item);
        Task<bool> DeleteTodoItem(ToDoItem item);
    }

    public class TodoListDao : Dao, ITodoListDao
    {
        public TodoListDao(TodoDbContext dataContext) : base(dataContext)
        {
        }

        public Task<List<ToDoItem>> GetToDoItems()
        {
            return Task.Run(() =>
                {
                    return DataContext.TodoItems.OrderBy(x => x.IsCompleted).ThenBy(y => y.Id).ToList();
                });
        }

        public async Task<ToDoItem> AddOrUpdateItem(ToDoItem item)
        {
            var existingItem = await DataContext.FindAsync<ToDoItem>(item.Id);

            if (existingItem == null)
            {
                existingItem = item;
                DataContext.TodoItems.Add(existingItem);
            }
            else
            {
                existingItem.IsCompleted = item.IsCompleted;
                existingItem.Description = item.Description;
                DataContext.TodoItems.Update(existingItem);
            }

            DataContext.SaveChanges();

            return existingItem;
        }

        public async Task<bool> DeleteTodoItem(ToDoItem item)
        {
            try
            {
                var existingItem = await DataContext.FindAsync<ToDoItem>(item.Id);
                if (existingItem == null) return false;
                DataContext.TodoItems.Remove(existingItem);
                DataContext.SaveChanges();
            }
            catch (Exception ex)
            {
                return false;
            }

            return true;
        }
    }
}