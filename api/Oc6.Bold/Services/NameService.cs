using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Oc6.Bold.Services
{
    public class NameService
    {
        public static readonly string[] FirstNames = new string[]
        {
            "Røv",
            "Numse",
            "Penis",
            "Bagdels",
            "Flæske",
        };

        public static readonly string[] LastNames = new string[]
        {
            "Giraf",
            "Bavian",
            "Pingvin",
            "Bøffel",
            "Elefant",
            "Preben",
            "Gunnar",
        };

        public string GetName()
        {
            int first = Random.Shared.Next(0, FirstNames.Length);
            string firstname = FirstNames[first];

            int last = Random.Shared.Next(0, LastNames.Length);
            string lastname = LastNames[last];

            return $"{firstname} {lastname}";
        }
    }
}
