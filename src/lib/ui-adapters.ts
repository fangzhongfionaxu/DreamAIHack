
// UI component adapters - insulates app from shadcn/ui changes
import { Button as ShadcnButton } from "@/components/ui/button";
import { Input as ShadcnInput } from "@/components/ui/input";
import { Textarea as ShadcnTextarea } from "@/components/ui/textarea";
import { Progress as ShadcnProgress } from "@/components/ui/progress";
import { Slider as ShadcnSlider } from "@/components/ui/slider";
import { Select as ShadcnSelect, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover as ShadcnPopover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar as ShadcnAvatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { ComponentProps } from "react";

// Export wrapped components with consistent interfaces
export const Button = ShadcnButton;
export const Input = ShadcnInput;
export const Textarea = ShadcnTextarea;
export const Progress = ShadcnProgress;
export const Slider = ShadcnSlider;

export const Select = Object.assign(ShadcnSelect, {
  Content: SelectContent,
  Item: SelectItem,
  Trigger: SelectTrigger,
  Value: SelectValue,
});

export const Popover = Object.assign(ShadcnPopover, {
  Content: PopoverContent,
  Trigger: PopoverTrigger,
});

export const Avatar = Object.assign(ShadcnAvatar, {
  Fallback: AvatarFallback,
  Image: AvatarImage,
});

// Type exports for consistency
export type ButtonProps = ComponentProps<typeof Button>;
export type InputProps = ComponentProps<typeof Input>;
export type TextareaProps = ComponentProps<typeof Textarea>;
export type ProgressProps = ComponentProps<typeof Progress>;
export type SliderProps = ComponentProps<typeof Slider>;
