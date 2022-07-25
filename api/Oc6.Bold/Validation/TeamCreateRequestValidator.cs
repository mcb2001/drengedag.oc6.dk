using FluentValidation;
using Oc6.Bold.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Oc6.Bold.Validation
{
    public class TeamCreateRequestValidator : AbstractValidator<TeamCreateRequest>
    {
        public TeamCreateRequestValidator()
        {
            RuleFor(x => x.TeamCount)
                .Custom((teamCount, action) =>
                {
                    if (teamCount > action.InstanceToValidate.PlayerIds.Count)
                    {
                        action.AddFailure("Can't create more teams than players");
                    }
                });

            RuleFor(x => x.PlayerIds)
                .NotEmpty()
                .WithMessage("Must have at least one player")
                .Must(ids => ids.All(id => id > 0))
                .WithMessage("Invalid id");
        }
    }
}
