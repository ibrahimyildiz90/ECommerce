﻿using ECommerce.Application.Repository;
using ECommerce.Domain.Entities;
using ECommerce.Persistence.Concretes;
using ECommerce.Persistence.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Persistence.Repositories
{
    public class OrderWriteRepository : WriteRepository<Order>, IOrderWriteRepository
    {
        public OrderWriteRepository(ECommerceDbContext context) : base(context)
        {
        }
    }
}
