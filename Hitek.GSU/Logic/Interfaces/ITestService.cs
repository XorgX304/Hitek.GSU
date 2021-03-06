﻿using Hitek.GSU.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hitek.GSU.Logic.Interfaces
{
    public interface ITestService
    {

        ICollection<TestInfo> GetAllTest();

        ICollection<TestInfo> GetTestBySubjectId(long subjectId);

        TestInfo GetTestById(long id);
        /// <summary>
        /// Получение теста его вопросов и ответов по ID
        /// </summary>
        /// <param name="id">ID Теста</param>
        /// <returns></returns>
        TestFull GetExistTestById(long id,bool withRightAnswer=false);

        long GenerateTest(long id);

        object CheckTest(Hitek.GSU.Models.Validation.Test.TestForCheack raw);

        Hitek.GSU.Models.Validation.Admin.Test.CreatingTest CreateOrEditTest(Hitek.GSU.Models.Validation.Admin.Test.CreatingTest raw);

        

        void DeleteTestById(long id);
        Hitek.GSU.Models.Validation.Admin.Test.CreatingTest GetTestForEditById( long id);
    
    }
}
