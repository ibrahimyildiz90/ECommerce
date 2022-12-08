using ECommerce.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Application.Repository
{
    public interface IWriteRepository<T> : IRepository<T> where T : BaseEntity
    {
        Task<bool> AddAsync(T model);
        Task<bool> AddRangeAsync(List<T> model);
        bool Remove(T data);
        Task<bool> RemoveAsync(string id);
        bool RemoveRange(List<T> datalist);
        bool Update(T model);

        Task<int> SaveAsync();
    }
}
