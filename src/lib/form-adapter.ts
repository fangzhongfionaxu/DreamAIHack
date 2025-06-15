
// Form handling adapter - abstracts form library specifics
import { useForm as useReactHookForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { FieldValues, UseFormProps, FieldPath, Control } from "react-hook-form";
import type { ZodSchema } from "zod";
import React from "react";

export interface FormOptions<T extends FieldValues> extends Omit<UseFormProps<T>, 'resolver'> {
  schema?: ZodSchema<T>;
}

export function useForm<T extends FieldValues = FieldValues>(
  options: FormOptions<T> = {}
) {
  const { schema, ...formOptions } = options;
  
  return useReactHookForm<T>({
    ...formOptions,
    resolver: schema ? zodResolver(schema) : undefined,
  });
}

export interface FieldProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  render: (props: { field: any; fieldState: any }) => React.ReactElement;
}

export function Field<T extends FieldValues>({ name, control, render }: FieldProps<T>) {
  return React.createElement(Controller<T>, {
    name,
    control,
    render: ({ field, fieldState }) => render({ field, fieldState })
  });
}
