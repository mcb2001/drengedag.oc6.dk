using FluentValidation;
using FluentValidation.Results;
using Oc6.Bold.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Oc6.Bold.Validation
{
    public class PlayerDtoValidator : AbstractValidator<PlayerDto>
    {
        public PlayerDtoValidator()
        {
            RuleFor(player => player.Email)
                .NotEmpty()
                .WithMessage("Email kan ikke være tom")
                .NotNull()
                .WithMessage("Email kan ikke være null");

            RuleFor(player => player.Points)
                .Must(value => value >= 0)
                .WithMessage("Point skal være større end nul");
        }
    }
}
