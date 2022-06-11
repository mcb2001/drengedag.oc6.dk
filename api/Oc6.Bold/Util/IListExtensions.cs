using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Oc6.Bold.Util
{
    public static class IListExtensions
    {
        public static IList<T> Shuffle<T>(this IList<T> list)
        {
            for (int i = list.Count - 1; i > 0; --i)
            {
                int j = Random.Shared.Next(0, i + 1);
                (list[j], list[i]) = (list[i], list[j]);
            }

            return list;
        }
    }
}
