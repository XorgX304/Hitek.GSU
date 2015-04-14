﻿using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Hitek.GSU.Logic.Database
{
    public partial class Entities : DbContext
    {
        public Entities()
            : base("name=EntityContext")
        {
        }

      //  public virtual DbSet<Account> Account { get; set; }
        public virtual DbSet<Test> Test { get; set; }
        public virtual DbSet<TestQuestion> TestQuestion { get; set; }
        public virtual DbSet<TestAnswer> TestAnswer { get; set; } 
        public virtual DbSet<TestHistory> TestHistory { get; set; }
    //    public virtual DbSet<Role> Role { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }
}