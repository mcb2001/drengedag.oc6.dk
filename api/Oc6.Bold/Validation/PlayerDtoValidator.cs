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
                .NotNull();

            RuleFor(player => player.Email)
                .NotEmpty()
                .NotNull();
        }
    }
}
