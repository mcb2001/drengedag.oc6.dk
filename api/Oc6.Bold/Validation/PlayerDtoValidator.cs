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
            RuleFor(player => player.Name)
                .NotEmpty()
                .WithMessage("Navn kan ikke være tomt")
                .NotNull()
                .WithMessage("Navn kan ikke være null");

            RuleFor(player => player.Email)
                .NotEmpty()
                .WithMessage("Email kan ikke være tomt")
                .NotNull()
                .WithMessage("Email kan ikke være null");
        }
    }
}
