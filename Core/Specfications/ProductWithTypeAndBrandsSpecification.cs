﻿using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specfications
{
    public class ProductWithTypeAndBrandsSpecification : BaseSpecifications<Product>
    {
        public ProductWithTypeAndBrandsSpecification()
        {
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductBrand);


        }
        public ProductWithTypeAndBrandsSpecification(int id):
            base(x=>x.Id ==id)
        {
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductBrand);

        }

    }
}
