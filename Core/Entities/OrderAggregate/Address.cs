﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities.OrderAggregate
{
    public class Address
    {

        public Address()
        {

        }
        public Address(string firstName, string lastName,
                string street, string city, string state, string zipcode)
        {
            FirstName = firstName;
            LastName = lastName;
            Stree = street;
            City = city;
            State = state;
            Zipcode = zipcode;


        }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Stree { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zipcode { get; set; }
    }
}
