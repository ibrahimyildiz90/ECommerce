using ECommerce.Application.ViewModels.Products;
using FluentValidation;
using System.Security.Cryptography.X509Certificates;

namespace ECommerce.Application.Validators.Products
{
    public class CreateProductValidation : AbstractValidator<CreateProductModel>
    {
        public CreateProductValidation()
        {
            RuleFor(x => x.Name)
                .NotEmpty()
                .NotNull()
                    .WithMessage("The name field cannot be empty")
                .MaximumLength(150)
                .MinimumLength(5)
                    .WithMessage("The name field maximum lent must be qual to 150 and minimum lenght equal to 5");

            RuleFor(x => x.Stock)
                .NotEmpty()
                .NotNull()
                    .WithMessage("The stock cannot be emty")
                .Must(x => x >= 0)
                    .WithMessage("The stock must be greater than zero");

            RuleFor(x => x.Price)
               .NotEmpty()
               .NotNull()
                   .WithMessage("The price cannot be emty")
               .Must(x => x >= 0)
                   .WithMessage("The price must be greater than zero");



        }
    }
}
