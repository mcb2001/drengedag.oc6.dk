using Microsoft.EntityFrameworkCore;
using Oc6.Bold.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Oc6.Bold.Services
{
    public class NameService
    {
        private static readonly (int, int)[] keys = new (int, int)[] { (3, 5), (3, 3), (0, 3), (5, 2), (3, 6), (5, 3), (4, 0), (1, 2), (0, 5), (0, 1), (5, 4), (3, 0), (5, 7), (4, 3), (2, 2), (5, 0), (0, 6), (1, 4), (3, 7), (1, 1), (3, 1), (1, 7), (3, 4), (4, 7), (1, 5), (2, 7), (4, 1), (1, 3), (2, 1), (4, 2), (2, 5), (4, 5), (4, 6), (3, 2), (0, 7), (5, 6), (2, 0), (5, 1), (4, 4), (0, 2), (5, 5), (2, 6), (0, 0), (2, 4), (2, 3), (1, 6), (0, 4), (1, 0) };

        public static readonly string[] FirstNames = new string[]
        {
            "Røv",
            "Numse",
            "Penis",
            "Bagdels",
            "Flæske",
            "Fede"
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
            "Svin",
        };
        private readonly BoldContext context;

        public NameService(BoldContext context)
        {
            this.context = context;
        }

        public async Task<string> GetUniqueNameAsync()
        {
            List<string> names = await context.Players
                .AsNoTracking()
                .Select(x => x.Name)
                .ToListAsync();

            var (first, last) = keys[names.Count];

            string firstname = FirstNames[first];

            string lastname = LastNames[last];

            return $"{firstname} {lastname}";
        }
    }
}
