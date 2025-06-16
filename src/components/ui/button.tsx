import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        primary: "bg-transparent items-stretch min-w-[44px] border-[2px] border-primary-100 text-primary-foreground [&_.button-content]:bg-primary-100 [&_.button-content]:px-4 [&_.button-content]:py-2 [&_.button-content]:flex-1 [&:hover_.icon-container]:w-[16%] transition focus:ring-2 focus:ring-primary-100 focus:ring-offset-2 rounded-none",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        loading: "opacity-70 cursor-wait",
        error: "border-error text-error hover:bg-error/10",
      },
      size: {
        default: "h-10 px-4 py-2",
        primary: "h-24",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        mobile: "h-12 w-full min-h-[48px]",
      },
      font: {
        primary: "text-[24px] leading-[100%] tracking-[0%] font-[700]",
        mobile: "text-[18px] leading-[100%] tracking-[0%] font-[600]",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  icon?: React.ReactNode
}

/**
 * A versatile button component that supports various variants, sizes, and states.
 * @param {ButtonProps} props - The component props
 * @returns {JSX.Element} A button element
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    font, 
    asChild = false, 
    icon, 
    children, 
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, font, className }))}
        ref={ref}
        {...props}
      >
        <div 
          className="button-content flex items-center justify-center"
          role="presentation"
        >
          {children}
        </div>
        {
          icon ? (
            <div 
              className="inline-flex items-center justify-center bg-transparent w-[21%] icon-container transition-all duration-300"
              role="presentation"
              aria-hidden="true"
            >
              {icon}
            </div>
          ) : null
        }
      </Comp>
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }
