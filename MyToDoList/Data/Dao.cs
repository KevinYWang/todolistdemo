using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyToDoList.Data
{
    public abstract class Dao
    {
        protected TodoDbContext DataContext;

        protected Dao(TodoDbContext dataContext)
        {
            DataContext = dataContext;
        }
    }
}
